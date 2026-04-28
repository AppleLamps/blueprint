#!/usr/bin/env python3
"""Scrape Marc Elias Democracy Docket Premium articles to Markdown and JSONL.

This is a one-off authenticated scraper. It deliberately never prints the
cookie value; if authentication fails, refresh the cookie from browser DevTools.
"""

from __future__ import annotations

import argparse
import email.utils
import html
import json
import os
import random
import re
import sys
import time
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Comment, NavigableString, Tag


BASE_URL = "https://member.democracydocket.com"
AUTHOR_ARCHIVE_URL_TEMPLATE = BASE_URL + "/author/marc-elias/page/{page}"
DEFAULT_OUTPUT_DIR = Path("articles")
DEFAULT_JSONL_PATH = Path("articles.jsonl")
JSONL_CHUNK_SIZE = 10

REQUEST_TIMEOUT_SECONDS = 30
REQUEST_DELAY_RANGE_SECONDS = (1.0, 2.0)
MAX_RETRIES = 4
BACKOFF_BASE_SECONDS = 2.0

USER_AGENT = (
    "MarcEliasArticleArchiveScraper/1.0 "
    "(personal archive export; requests + BeautifulSoup)"
)

COOKIE_ENV_VAR = "DEMOCRACY_DOCKET_COOKIE"

CATEGORY_NAMES = {
    "Notes",
    "Interviews",
    "Top Lines",
    "Reading Lists",
    "The Opposition",
    "Tip Sheets",
    "Q&A",
    "Litigation Assessment",
    "Weekly Digest",
    "Events",
    "State of Democracy",
}

ILLEGAL_FILENAME_CHARS = re.compile(r'[/\\:*?"<>|]+')
WHITESPACE_RE = re.compile(r"\s+")
DATE_TEXT_RE = re.compile(
    r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|"
    r"Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|"
    r"Nov(?:ember)?|Dec(?:ember)?)\.?\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b",
    re.IGNORECASE,
)


class AuthenticationExpiredError(RuntimeError):
    """Raised when the response is a login/paywall/unauthorized page."""


def get_cookie_header() -> str:
    cookie_header = os.environ.get(COOKIE_ENV_VAR, "").strip()
    if not cookie_header:
        raise RuntimeError(
            f"Missing {COOKIE_ENV_VAR}. Set it to the Cookie header value from "
            "member.democracydocket.com before running the scraper."
        )
    return cookie_header


@dataclass(frozen=True)
class ArchiveArticle:
    title: str
    category: str
    date: str
    url: str


@dataclass
class ArticleRecord:
    title: str
    date: str
    category: str
    author: str
    url: str
    tags: list[str]
    images: list[str]
    outbound_links: list[str]
    body: str

    def to_json(self) -> dict[str, object]:
        return {
            "title": self.title,
            "date": self.date,
            "category": self.category,
            "author": self.author,
            "url": self.url,
            "tags": self.tags,
            "images": self.images,
            "outbound_links": self.outbound_links,
            "body": self.body,
        }


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    return WHITESPACE_RE.sub(" ", html.unescape(value)).strip()


def absolute_url(href: str | None, base_url: str = BASE_URL) -> str:
    return urljoin(base_url, href or "").split("#", 1)[0]


def is_same_site(url: str) -> bool:
    return urlparse(url).netloc.lower() == "member.democracydocket.com"


def is_probable_article_url(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return False
    if parsed.netloc.lower() != "member.democracydocket.com":
        return False

    path = parsed.path.strip("/")
    if not path or "/" in path:
        return False
    if "." in path.rsplit("/", 1)[-1]:
        return False

    blocked_prefixes = {
        "author",
        "category",
        "tag",
        "page",
        "login",
        "logout",
        "account",
        "membership",
        "members",
        "search",
        "privacy",
        "terms",
        "wp-",
    }
    return not any(path.lower().startswith(prefix) for prefix in blocked_prefixes)


def canonical_title(raw_title: str) -> str:
    title = clean_text(raw_title)
    for separator in (" | Democracy Docket", " - Democracy Docket"):
        if separator in title:
            title = title.split(separator, 1)[0].strip()
    return title


def parse_date(value: str | None) -> str:
    text = clean_text(value)
    if not text:
        return ""

    text = re.sub(r"(\d{1,2})(st|nd|rd|th)", r"\1", text, flags=re.IGNORECASE)
    text = text.replace("Sept ", "Sep ")

    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.date().isoformat()
    except ValueError:
        pass

    try:
        parsed = email.utils.parsedate_to_datetime(text)
        if parsed:
            return parsed.date().isoformat()
    except (TypeError, ValueError, IndexError, OverflowError):
        pass

    for fmt in (
        "%B %d, %Y",
        "%b %d, %Y",
        "%B %d %Y",
        "%b %d %Y",
        "%Y-%m-%d",
        "%m/%d/%Y",
    ):
        try:
            return datetime.strptime(text, fmt).date().isoformat()
        except ValueError:
            continue

    match = DATE_TEXT_RE.search(text)
    if match:
        return parse_date(match.group(0))
    return ""


def find_first_date_text(tag: Tag) -> str:
    time_tag = tag.select_one("time[datetime]")
    if time_tag and time_tag.get("datetime"):
        parsed = parse_date(time_tag["datetime"])
        if parsed:
            return parsed

    time_tag = tag.select_one("time")
    if time_tag:
        parsed = parse_date(time_tag.get_text(" ", strip=True))
        if parsed:
            return parsed

    match = DATE_TEXT_RE.search(tag.get_text(" ", strip=True))
    return parse_date(match.group(0)) if match else ""


def normalize_category(values: Iterable[str], *, fallback_to_first: bool = True) -> str:
    cleaned_values = [clean_text(value) for value in values if clean_text(value)]
    lower_to_category = {category.lower(): category for category in CATEGORY_NAMES}
    for value in cleaned_values:
        if value.lower() in lower_to_category:
            return lower_to_category[value.lower()]
    for value in cleaned_values:
        for category in CATEGORY_NAMES:
            if category.lower() in value.lower():
                return category
    return cleaned_values[0] if fallback_to_first and cleaned_values else ""


def unique_preserving_order(values: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        cleaned = clean_text(value) if not value.startswith("http") else value.strip()
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            result.append(cleaned)
    return result


def sanitize_filename_component(value: str, max_chars: int = 150) -> str:
    cleaned = ILLEGAL_FILENAME_CHARS.sub("-", clean_text(value))
    cleaned = re.sub(r"[\x00-\x1f]+", "", cleaned)
    cleaned = WHITESPACE_RE.sub(" ", cleaned).strip(" .")
    if len(cleaned) > max_chars:
        cleaned = cleaned[:max_chars].rsplit(" ", 1)[0].strip(" .")
    return cleaned or "Untitled"


def article_markdown_path(article: ArchiveArticle | ArticleRecord, output_dir: Path) -> Path:
    date = article.date[:10] if article.date else "unknown-date"
    title = sanitize_filename_component(article.title)
    return output_dir / f"{date} - {title}.md"


def yaml_string(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def render_frontmatter(record: ArticleRecord) -> str:
    lines = [
        "---",
        f"title: {yaml_string(record.title)}",
        f"date: {yaml_string(record.date)}",
        f"category: {yaml_string(record.category)}",
        f"author: {yaml_string(record.author)}",
        f"url: {yaml_string(record.url)}",
    ]
    if record.images:
        lines.append("images:")
        lines.extend(f"  - {yaml_string(image_url)}" for image_url in record.images)
    else:
        lines.append("images: []")
    lines.append("---")
    return "\n".join(lines) + "\n\n"


def remove_unwanted_nodes(container: Tag) -> None:
    selectors = [
        "script",
        "style",
        "noscript",
        "iframe",
        "form",
        "nav",
        "footer",
        "aside",
        "[role='navigation']",
        "[aria-label*='breadcrumb' i]",
        ".breadcrumb",
        ".breadcrumbs",
        ".related",
        ".related-posts",
        "[class*='related' i]",
        "[id*='related' i]",
        ".advertisement",
        ".advert",
        ".ad",
        "[class*='advert' i]",
        "[class*='newsletter' i]",
        "[class*='subscribe' i]",
        "[class*='share' i]",
        "[class*='social' i]",
        "[id*='comments' i]",
        ".comments",
    ]
    for selector in selectors:
        for node in container.select(selector):
            node.decompose()


def extract_meta_content(soup: BeautifulSoup, *names: str) -> str:
    for name in names:
        tag = soup.find("meta", attrs={"property": name}) or soup.find(
            "meta", attrs={"name": name}
        )
        if tag and tag.get("content"):
            return clean_text(tag["content"])
    return ""


def looks_like_auth_wall(response: requests.Response, soup: BeautifulSoup) -> bool:
    if response.status_code in {401, 403}:
        return True

    if soup.select_one("input[type='password']"):
        return True

    title = clean_text(soup.title.get_text(" ", strip=True) if soup.title else "").lower()
    if title in {"login", "sign in", "log in", "member login"}:
        return True

    page_text = clean_text(soup.get_text(" ", strip=True)).lower()[:3000]
    auth_markers = (
        "you must log in",
        "please log in",
        "sign in to continue",
        "log in to continue",
        "this content is for members",
        "members-only content",
        "become a member to continue",
        "access denied",
        "unauthorized",
        "forbidden",
    )
    return any(marker in page_text for marker in auth_markers)


class Scraper:
    def __init__(self) -> None:
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie": get_cookie_header(),
            }
        )
        self._requests_made = 0

    def fetch_soup(self, url: str, *, allow_404: bool = False) -> BeautifulSoup | None:
        last_error: Exception | None = None
        for attempt in range(1, MAX_RETRIES + 1):
            if self._requests_made:
                delay = random.uniform(*REQUEST_DELAY_RANGE_SECONDS)
                time.sleep(delay)

            self._requests_made += 1
            try:
                response = self.session.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
            except requests.RequestException as exc:
                last_error = exc
                if attempt == MAX_RETRIES:
                    break
                self._sleep_for_retry(attempt)
                continue

            if allow_404 and response.status_code == 404:
                return None

            if response.status_code in {429, 500, 502, 503, 504} and attempt < MAX_RETRIES:
                self._sleep_for_retry(attempt, response)
                continue

            response.raise_for_status()
            response.encoding = response.apparent_encoding or response.encoding or "utf-8"
            soup = BeautifulSoup(response.text, "html.parser")
            if looks_like_auth_wall(response, soup):
                raise AuthenticationExpiredError(
                    "The cookie is expired and needs to be refreshed from DevTools "
                    "(F12 -> Application -> Cookies -> member.democracydocket.com)."
                )
            return soup

        raise RuntimeError(f"Failed to fetch {url} after {MAX_RETRIES} attempts: {last_error}")

    @staticmethod
    def _sleep_for_retry(
        attempt: int, response: requests.Response | None = None
    ) -> None:
        retry_after = response.headers.get("Retry-After") if response else None
        if retry_after and retry_after.isdigit():
            delay = float(retry_after)
        else:
            delay = (BACKOFF_BASE_SECONDS ** attempt) + random.uniform(0, 1.0)
        time.sleep(delay)


def extract_archive_articles(soup: BeautifulSoup) -> list[ArchiveArticle]:
    containers = soup.select("article, .post, .hentry, .card, .archive-item, .entry")
    if not containers:
        containers = [soup]

    articles_by_url: dict[str, ArchiveArticle] = {}
    for container in containers:
        article_links = [
            absolute_url(anchor.get("href"))
            for anchor in container.select("a[href]")
            if is_probable_article_url(absolute_url(anchor.get("href")))
        ]
        if not article_links:
            continue
        url = article_links[0]

        title = ""
        title_node = container.select_one("h1 a, h2 a, h3 a, h1, h2, h3")
        if title_node:
            title = canonical_title(title_node.get_text(" ", strip=True))
        if not title:
            for anchor in container.select("a[href]"):
                candidate_url = absolute_url(anchor.get("href"))
                candidate_title = canonical_title(anchor.get_text(" ", strip=True))
                if candidate_url == url and len(candidate_title) > 5:
                    title = candidate_title
                    break

        category_values = [
            node.get_text(" ", strip=True)
            for node in container.select(
                "a[href*='/category/'], a[href*='/tag/'], .category, .cat-links, .post-category"
            )
        ]
        date = find_first_date_text(container)

        if title and url not in articles_by_url:
            articles_by_url[url] = ArchiveArticle(
                title=title,
                category=normalize_category(category_values),
                date=date,
                url=url,
            )

    return list(articles_by_url.values())


def extract_article_body_container(soup: BeautifulSoup) -> Tag:
    remove_unwanted_nodes(soup)
    selectors = [
        "#hs_cos_wrapper_post_body",
        "article .entry-content",
        "article .post-content",
        "article .article-content",
        "article .content",
        ".entry-content",
        ".post-content",
        ".article-content",
        ".article-body",
        ".hs_cos_wrapper_type_rich_text",
        "article",
        "main",
    ]
    for selector in selectors:
        candidates = soup.select(selector)
        if candidates:
            return max(candidates, key=lambda node: len(clean_text(node.get_text(" ", strip=True))))
    if soup.body:
        return soup.body
    raise RuntimeError("Could not find an article body container.")


def extract_title(soup: BeautifulSoup, fallback: str) -> str:
    meta_title = canonical_title(extract_meta_content(soup, "og:title", "twitter:title"))
    h1 = soup.select_one("h1")
    h1_title = canonical_title(h1.get_text(" ", strip=True)) if h1 else ""
    document_title = canonical_title(soup.title.get_text(" ", strip=True) if soup.title else "")
    return meta_title or h1_title or document_title or fallback


def extract_author(soup: BeautifulSoup) -> str:
    author = extract_meta_content(soup, "author", "article:author")
    if author:
        return author

    selectors = [
        "[rel='author']",
        "a[href*='/author/']",
        ".author",
        ".byline",
        "[class*='author' i]",
    ]
    for selector in selectors:
        node = soup.select_one(selector)
        if not node:
            continue
        text = clean_text(node.get_text(" ", strip=True))
        text = re.sub(r"^by\s+", "", text, flags=re.IGNORECASE).strip()
        if text and len(text) <= 120:
            return text
    return ""


def extract_article_date(soup: BeautifulSoup, fallback: str) -> str:
    meta_date = extract_meta_content(
        soup,
        "article:published_time",
        "article:modified_time",
        "date",
        "pubdate",
        "publish_date",
    )
    return parse_date(meta_date) or find_first_date_text(soup) or fallback


def extract_tags_and_category(
    soup: BeautifulSoup, archive_category: str
) -> tuple[list[str], str]:
    meta_tags = [
        clean_text(tag.get("content"))
        for tag in soup.find_all("meta", attrs={"property": "article:tag"})
        if tag.get("content")
    ]
    link_tags = [
        node.get_text(" ", strip=True)
        for node in soup.select(
            ".gb-module-blog-post-body-tags a[href*='/tag/'], "
            ".gb-module-blog-post-body-tags a[href*='/category/'], "
            "main a[rel][href*='/tag/'], "
            "main a[rel][href*='/category/']"
        )
    ]
    tags = unique_preserving_order([*meta_tags, *link_tags])
    category = normalize_category(tags, fallback_to_first=False)
    if not category:
        category = archive_category
    return tags, category


def src_from_srcset(value: str | None) -> str:
    if not value:
        return ""
    first_candidate = value.split(",", 1)[0].strip()
    return first_candidate.split(" ", 1)[0].strip()


def extract_image_urls(container: Tag, page_url: str) -> list[str]:
    image_urls: list[str] = []
    for image in container.select("img"):
        src = (
            image.get("src")
            or image.get("data-src")
            or image.get("data-lazy-src")
            or src_from_srcset(image.get("srcset"))
        )
        if src:
            image_urls.append(absolute_url(src, page_url))
    for source in container.select("source[srcset]"):
        src = src_from_srcset(source.get("srcset"))
        if src:
            image_urls.append(absolute_url(src, page_url))
    return unique_preserving_order(image_urls)


def extract_outbound_links(container: Tag, page_url: str) -> list[str]:
    outbound: list[str] = []
    for anchor in container.select("a[href]"):
        url = absolute_url(anchor.get("href"), page_url)
        parsed = urlparse(url)
        if parsed.scheme in {"http", "https"} and not is_same_site(url):
            outbound.append(url)
    return unique_preserving_order(outbound)


def inline_markdown(node: Tag | NavigableString, page_url: str) -> str:
    if isinstance(node, Comment):
        return ""
    if isinstance(node, NavigableString):
        return clean_text(str(node))
    if not isinstance(node, Tag):
        return ""

    name = node.name.lower()
    if name == "br":
        return "\n"
    if name in {"strong", "b"}:
        text = children_inline_markdown(node, page_url)
        return f"**{text}**" if text else ""
    if name in {"em", "i"}:
        text = children_inline_markdown(node, page_url)
        return f"*{text}*" if text else ""
    if name == "code":
        text = clean_text(node.get_text(" ", strip=True)).replace("`", "\\`")
        return f"`{text}`" if text else ""
    if name == "a":
        text = children_inline_markdown(node, page_url) or clean_text(node.get_text(" ", strip=True))
        href = absolute_url(node.get("href"), page_url)
        if text and href and urlparse(href).scheme in {"http", "https"}:
            return f"[{text}]({href})"
        return text
    if name == "img":
        src = (
            node.get("src")
            or node.get("data-src")
            or node.get("data-lazy-src")
            or src_from_srcset(node.get("srcset"))
        )
        if not src:
            return ""
        alt = clean_text(node.get("alt"))
        return f"![{alt}]({absolute_url(src, page_url)})"

    return children_inline_markdown(node, page_url)


def children_inline_markdown(node: Tag, page_url: str) -> str:
    pieces = [inline_markdown(child, page_url) for child in node.children]
    text = " ".join(piece for piece in pieces if piece)
    text = re.sub(r" +([,.;:!?])", r"\1", text)
    text = re.sub(r"\s+\n\s+", "\n", text)
    return clean_text(text)


def block_markdown(node: Tag | NavigableString, page_url: str) -> str:
    if isinstance(node, Comment):
        return ""
    if isinstance(node, NavigableString):
        return clean_text(str(node))
    if not isinstance(node, Tag):
        return ""

    name = node.name.lower()
    if name in {"script", "style", "noscript"}:
        return ""
    if name in {"p", "figcaption"}:
        text = children_inline_markdown(node, page_url)
        return f"{text}\n\n" if text else ""
    if name in {"h1", "h2", "h3", "h4", "h5", "h6"}:
        level = int(name[1])
        text = children_inline_markdown(node, page_url)
        return f"{'#' * level} {text}\n\n" if text else ""
    if name == "blockquote":
        text = markdown_from_container(node, page_url)
        quoted = "\n".join(f"> {line}" if line else ">" for line in text.splitlines())
        return f"{quoted}\n\n" if quoted.strip() else ""
    if name in {"ul", "ol"}:
        lines: list[str] = []
        for index, item in enumerate(node.find_all("li", recursive=False), start=1):
            marker = f"{index}." if name == "ol" else "-"
            text = markdown_from_container(item, page_url).strip()
            text = re.sub(r"\n{2,}", "\n", text)
            text = text.replace("\n", "\n  ")
            if text:
                lines.append(f"{marker} {text}")
        return "\n".join(lines) + ("\n\n" if lines else "")
    if name == "pre":
        code = node.get_text("", strip=False).strip("\n")
        return f"```\n{code}\n```\n\n" if code else ""
    if name == "table":
        return table_to_markdown(node) + "\n\n"
    if name == "img":
        text = inline_markdown(node, page_url)
        return f"{text}\n\n" if text else ""

    return "".join(block_markdown(child, page_url) for child in node.children)


def table_to_markdown(table: Tag) -> str:
    rows: list[list[str]] = []
    for row in table.select("tr"):
        cells = [clean_text(cell.get_text(" ", strip=True)) for cell in row.select("th, td")]
        if cells:
            rows.append(cells)
    if not rows:
        return ""

    width = max(len(row) for row in rows)
    padded_rows = [row + [""] * (width - len(row)) for row in rows]
    header = padded_rows[0]
    separator = ["---"] * width
    body = padded_rows[1:]

    def render_row(row: list[str]) -> str:
        escaped = [cell.replace("|", "\\|") for cell in row]
        return "| " + " | ".join(escaped) + " |"

    return "\n".join([render_row(header), render_row(separator), *map(render_row, body)])


def markdown_from_container(container: Tag, page_url: str) -> str:
    markdown = "".join(block_markdown(child, page_url) for child in container.children)
    markdown = re.sub(r"[ \t]+\n", "\n", markdown)
    markdown = re.sub(r"\n{3,}", "\n\n", markdown)
    return markdown.strip()


def strip_leading_article_chrome(body: str, title: str, author: str, date: str) -> str:
    lines = body.splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)

    title_heading = re.compile(r"^#{1,6}\s+" + re.escape(clean_text(title)) + r"\s*$", re.IGNORECASE)
    if lines and title_heading.match(clean_text(lines[0])):
        lines.pop(0)
        while lines and not lines[0].strip():
            lines.pop(0)

    chrome_values = {clean_text(author).lower(), clean_text(date).lower()}
    while lines:
        first_line = clean_text(lines[0])
        normalized = re.sub(r"^by\s+", "", first_line, flags=re.IGNORECASE).lower()
        if normalized in chrome_values or parse_date(first_line) == date[:10]:
            lines.pop(0)
            while lines and not lines[0].strip():
                lines.pop(0)
            continue
        break

    return "\n".join(lines).strip()


def extract_article_record(
    soup: BeautifulSoup, archive_article: ArchiveArticle
) -> ArticleRecord:
    title = extract_title(soup, archive_article.title)
    author = extract_author(soup)
    date = extract_article_date(soup, archive_article.date)
    tags, category = extract_tags_and_category(soup, archive_article.category)

    body_container = extract_article_body_container(soup)
    images = extract_image_urls(body_container, archive_article.url)
    outbound_links = extract_outbound_links(body_container, archive_article.url)
    body = strip_leading_article_chrome(
        markdown_from_container(body_container, archive_article.url), title, author, date
    )

    return ArticleRecord(
        title=title,
        date=date,
        category=category,
        author=author,
        url=archive_article.url,
        tags=tags,
        images=images,
        outbound_links=outbound_links,
        body=body,
    )


def write_article_markdown(record: ArticleRecord, output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    target = article_markdown_path(record, output_dir)
    target.write_text(render_frontmatter(record) + record.body + "\n", encoding="utf-8")
    return target


def jsonl_chunk_path(path: Path, chunk_number: int) -> Path:
    stem = path.stem if path.suffix.lower() == ".jsonl" else path.name
    return path.with_name(f"{stem}-{chunk_number:03d}.jsonl")


def jsonl_chunk_glob(path: Path) -> str:
    stem = path.stem if path.suffix.lower() == ".jsonl" else path.name
    return f"{stem}-*.jsonl"


def iter_existing_jsonl_paths(path: Path) -> list[Path]:
    paths: list[Path] = []
    if path.exists():
        paths.append(path)

    chunk_paths = sorted(path.parent.glob(jsonl_chunk_glob(path)))
    for chunk_path in chunk_paths:
        if chunk_path not in paths:
            paths.append(chunk_path)
    return paths


def load_existing_jsonl(path: Path) -> tuple[dict[str, dict[str, object]], list[str], int]:
    records_by_url: dict[str, dict[str, object]] = {}
    ordered_urls: list[str] = []
    duplicate_records = 0

    for jsonl_path in iter_existing_jsonl_paths(path):
        with jsonl_path.open("r", encoding="utf-8") as handle:
            for line_number, line in enumerate(handle, start=1):
                if not line.strip():
                    continue
                try:
                    record = json.loads(line)
                except json.JSONDecodeError:
                    print(
                        f"Warning: skipping invalid JSONL line {line_number} in {jsonl_path}",
                        file=sys.stderr,
                    )
                    continue
                url = str(record.get("url") or "")
                if not url:
                    continue
                if url in records_by_url:
                    duplicate_records += 1
                    continue
                records_by_url[url] = record
                ordered_urls.append(url)
    return records_by_url, ordered_urls, duplicate_records


def write_jsonl_chunks(
    path: Path,
    records_by_url: dict[str, dict[str, object]],
    ordered_urls: list[str],
    *,
    chunk_size: int = JSONL_CHUNK_SIZE,
) -> list[Path]:
    path.parent.mkdir(parents=True, exist_ok=True)
    expected_paths: list[Path] = []

    for start in range(0, len(ordered_urls), chunk_size):
        chunk_number = (start // chunk_size) + 1
        chunk_path = jsonl_chunk_path(path, chunk_number)
        expected_paths.append(chunk_path)
        chunk_urls = ordered_urls[start : start + chunk_size]
        with chunk_path.open("w", encoding="utf-8") as handle:
            for url in chunk_urls:
                record = records_by_url[url]
                handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")

    expected_set = set(expected_paths)
    for stale_path in path.parent.glob(jsonl_chunk_glob(path)):
        if stale_path not in expected_set:
            stale_path.unlink()

    if path.exists() and path not in expected_set:
        path.unlink()

    return expected_paths


def record_to_article(record: dict[str, object]) -> ArticleRecord:
    return ArticleRecord(
        title=str(record.get("title") or ""),
        date=str(record.get("date") or ""),
        category=str(record.get("category") or ""),
        author=str(record.get("author") or ""),
        url=str(record.get("url") or ""),
        tags=[str(value) for value in record.get("tags") or []],
        images=[str(value) for value in record.get("images") or []],
        outbound_links=[str(value) for value in record.get("outbound_links") or []],
        body=str(record.get("body") or ""),
    )


def write_missing_markdown_from_jsonl(
    record: dict[str, object], output_dir: Path
) -> tuple[Path, bool] | None:
    article = record_to_article(record)
    if not article.title or not article.date:
        return None
    target = article_markdown_path(article, output_dir)
    if target.exists():
        return target, False
    output_dir.mkdir(parents=True, exist_ok=True)
    target.write_text(render_frontmatter(article) + article.body + "\n", encoding="utf-8")
    return target, True


def known_markdown_paths(
    records_by_url: dict[str, dict[str, object]], output_dir: Path
) -> set[Path]:
    paths: set[Path] = set()
    for record in records_by_url.values():
        article = record_to_article(record)
        if article.title and article.date:
            paths.add(article_markdown_path(article, output_dir))
    return paths


def find_existing_markdown_for_archive_article(
    archive_article: ArchiveArticle, output_dir: Path, known_paths: set[Path]
) -> Path | None:
    expected_path = article_markdown_path(archive_article, output_dir)
    if expected_path.exists():
        return expected_path
    for known_path in known_paths:
        if known_path.exists() and known_path.name.endswith(
            f" - {sanitize_filename_component(archive_article.title)}.md"
        ):
            return known_path
    return None


def extract_frontmatter_url(markdown_path: Path) -> str:
    try:
        with markdown_path.open("r", encoding="utf-8") as handle:
            first_line = handle.readline()
            if first_line.strip() != "---":
                return ""
            for line in handle:
                if line.strip() == "---":
                    return ""
                match = re.match(r'^url:\s*"?([^"\n]+)"?\s*$', line.strip())
                if match:
                    return match.group(1).strip()
    except OSError:
        return ""
    return ""


def cleanup_duplicate_markdown_files(
    output_dir: Path, records_by_url: dict[str, dict[str, object]]
) -> int:
    if not output_dir.exists():
        return 0

    canonical_paths_by_url: dict[str, Path] = {}
    for url, record in records_by_url.items():
        article = record_to_article(record)
        if article.title and article.date:
            canonical_paths_by_url[url] = article_markdown_path(article, output_dir)

    removed = 0
    for markdown_path in output_dir.glob("*.md"):
        url = extract_frontmatter_url(markdown_path)
        canonical_path = canonical_paths_by_url.get(url)
        if canonical_path and markdown_path.resolve() != canonical_path.resolve():
            markdown_path.unlink()
            removed += 1
    return removed


def summarize(records: Iterable[dict[str, object]]) -> tuple[Counter[str], str]:
    category_counts: Counter[str] = Counter()
    dates: list[str] = []
    for record in records:
        category = str(record.get("category") or "Uncategorized")
        category_counts[category] += 1
        date = str(record.get("date") or "")[:10]
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
            dates.append(date)

    date_range = f"{min(dates)} to {max(dates)}" if dates else "unknown"
    return category_counts, date_range


def scrape(args: argparse.Namespace) -> int:
    output_dir = Path(args.output_dir)
    jsonl_path = Path(args.jsonl)
    scraper = Scraper()

    records_by_url, ordered_urls, duplicate_jsonl_records = load_existing_jsonl(jsonl_path)
    markdown_paths_by_record = known_markdown_paths(records_by_url, output_dir)
    discovered = 0
    saved = 0
    skipped = 0
    jsonl_repaired = 0
    markdown_repaired = 0
    refreshed = 0
    duplicate_archive_links = 0
    stale_markdown_removed = 0

    page = 1
    while True:
        archive_url = args.archive_url_template.format(page=page, N=page)
        soup = scraper.fetch_soup(archive_url, allow_404=True)
        if soup is None:
            print(f"Archive page {page} returned 404; stopping.")
            break

        archive_articles = extract_archive_articles(soup)
        if not archive_articles:
            print(f"Archive page {page} had no article links; stopping.")
            break

        discovered += len(archive_articles)
        print(f"Page {page} scraped: found {len(archive_articles)} article link(s).")

        for archive_article in archive_articles:
            has_jsonl = archive_article.url in records_by_url
            existing_markdown = find_existing_markdown_for_archive_article(
                archive_article, output_dir, markdown_paths_by_record
            )
            has_markdown = existing_markdown is not None

            if has_markdown and has_jsonl and not args.refresh_existing:
                skipped += 1
                continue

            if has_jsonl and not args.refresh_existing:
                repair_result = write_missing_markdown_from_jsonl(
                    records_by_url[archive_article.url], output_dir
                )
                if repair_result:
                    repaired_path, created = repair_result
                    markdown_paths_by_record.add(repaired_path)
                    if created:
                        markdown_repaired += 1
                    skipped += 1
                    continue
                duplicate_archive_links += 1
                skipped += 1
                continue

            article_soup = scraper.fetch_soup(archive_article.url)
            record = extract_article_record(article_soup, archive_article)
            record_path = article_markdown_path(record, output_dir)
            previous_record = records_by_url.get(record.url)
            previous_path = (
                article_markdown_path(record_to_article(previous_record), output_dir)
                if previous_record
                else None
            )

            if args.refresh_existing and record_path.exists():
                write_article_markdown(record, output_dir)
                refreshed += 1
            elif not record_path.exists():
                write_article_markdown(record, output_dir)
                saved += 1
            else:
                skipped += 1

            if previous_path and previous_path != record_path and previous_path.exists():
                previous_path.unlink()
                markdown_paths_by_record.discard(previous_path)
                stale_markdown_removed += 1

            if record.url not in records_by_url:
                ordered_urls.append(record.url)
                if has_markdown and not has_jsonl:
                    jsonl_repaired += 1
            elif not args.refresh_existing:
                duplicate_archive_links += 1
            records_by_url[record.url] = record.to_json()
            markdown_paths_by_record.add(record_path)
            write_jsonl_chunks(jsonl_path, records_by_url, ordered_urls)

        print(f"Progress: {saved} saved, {skipped} skipped.")
        page += 1

        if args.max_pages and page > args.max_pages:
            print(f"Reached --max-pages={args.max_pages}; stopping.")
            break

    stale_markdown_removed += cleanup_duplicate_markdown_files(output_dir, records_by_url)
    jsonl_paths = write_jsonl_chunks(jsonl_path, records_by_url, ordered_urls)
    category_counts, date_range = summarize(records_by_url.values())

    print("\nFinal summary")
    print(f"Total articles scraped this run: {saved + refreshed + jsonl_repaired}")
    print(f"Total article links discovered this run: {discovered}")
    print(f"Markdown files saved this run: {saved}")
    if refreshed:
        print(f"Markdown/JSONL records refreshed this run: {refreshed}")
    if stale_markdown_removed:
        print(f"Stale duplicate Markdown files removed this run: {stale_markdown_removed}")
    print(f"Markdown files skipped this run: {skipped}")
    if markdown_repaired:
        print(f"Markdown files repaired from existing JSONL this run: {markdown_repaired}")
    if jsonl_repaired:
        print(f"JSONL records repaired this run: {jsonl_repaired}")
    if duplicate_jsonl_records:
        print(f"Duplicate JSONL records ignored on load: {duplicate_jsonl_records}")
    if duplicate_archive_links:
        print(f"Duplicate archive/article URLs ignored this run: {duplicate_archive_links}")
    print(f"Total JSONL records: {len(records_by_url)}")
    print(f"JSONL chunk files written: {len(jsonl_paths)}")
    print("Breakdown by category:")
    for category, count in category_counts.most_common():
        print(f"  {category}: {count}")
    print(f"Date range covered: {date_range}")

    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Scrape Marc Elias Democracy Docket Premium author archive to Markdown."
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory for article Markdown files. Default: articles",
    )
    parser.add_argument(
        "--jsonl",
        default=str(DEFAULT_JSONL_PATH),
        help=(
            "JSONL output base path. Records are written in 10-article chunks, "
            "for example articles-001.jsonl and articles-002.jsonl. "
            "Default base: articles.jsonl"
        ),
    )
    parser.add_argument(
        "--archive-url-template",
        default=AUTHOR_ARCHIVE_URL_TEMPLATE,
        help=(
            "Paginated archive URL template. Use {page} or {N} for the page number. "
            f"Default: {AUTHOR_ARCHIVE_URL_TEMPLATE}"
        ),
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=0,
        help="Optional safety limit for archive pages. Default: no limit.",
    )
    parser.add_argument(
        "--refresh-existing",
        action="store_true",
        help="Re-fetch and rewrite articles that are already present, without duplicating JSONL records.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    try:
        return scrape(args)
    except AuthenticationExpiredError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    except requests.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else "unknown"
        if status_code in {401, 403}:
            print(
                "ERROR: The cookie is expired and needs to be refreshed from DevTools "
                "(F12 -> Application -> Cookies -> member.democracydocket.com).",
                file=sys.stderr,
            )
            return 2
        print(f"ERROR: HTTP request failed with status {status_code}.", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
