# Democracy Docket Premium Article Export

This one-off scraper exports Marc Elias articles from Democracy Docket Premium to:

- `articles/YYYY-MM-DD - Article Title.md`
- chunked JSONL files named `articles-001.jsonl`, `articles-002.jsonl`, and so on

The script uses `requests` and `beautifulsoup4`, sends a polite 1-2 second delay between requests, retries 429/5xx responses with exponential backoff, and skips articles already present in Markdown/JSONL output so interrupted runs can resume without duplicates.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run

```powershell
python democracy_docket_scraper.py
```

Each JSONL file contains at most 10 unique article records. If an older consolidated `articles.jsonl` exists from a previous run, the script reads it for resume state, writes chunked files, and removes the old consolidated file after the chunks are safely written.

Optional safety run:

```powershell
python democracy_docket_scraper.py --max-pages 2
```

To re-fetch and rewrite already-saved articles without duplicating JSONL records:

```powershell
python democracy_docket_scraper.py --refresh-existing
```

## Refresh the Cookie

The scraper reads the authenticated cookie from the `DEMOCRACY_DOCKET_COOKIE` environment variable.
Do not commit cookies to the repository.

If the script exits with a missing or expired-cookie error:

1. Open Democracy Docket Premium in your browser and sign in.
2. Open DevTools with `F12`.
3. Go to `Application` -> `Cookies` -> `https://member.democracydocket.com`.
4. Copy the current cookie values needed by the site into a normal `Cookie` header string:

   ```text
   name=value; another_name=another_value
   ```

5. Set it for the current shell:

   ```powershell
   $env:DEMOCRACY_DOCKET_COOKIE = 'name=value; another_name=another_value'
   ```

6. Re-run the script. Existing Markdown files in `articles/` will be skipped.

Do not paste or print the cookie in logs, issue trackers, commits, or chat after the scrape. Rotate the session cookie after the export completes.

## Website

This repository also contains a Vite/React website for **The Jacobin Blueprint**, a five-chapter
guided report that maps the article against transcript evidence.

```powershell
npm install
npm run dev
npm run build
```

The site is Vercel-ready. `vercel.json` sets the build command to `npm run build` and the output directory to `dist`.

Remotion commands:

```powershell
npm run remotion:studio
npm run remotion:still
```

The evidence data lives in `src/data/evidence.js`. The site labels claims as direct transcript
quotes, strategic interpretation, or claims needing another source, and direct quotes include a
speaker, transcript filename, and locator from the local `info/` folder.
