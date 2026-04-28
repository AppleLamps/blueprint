import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Quote,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import {
  getNextChapterId,
  getPreviousChapterId,
} from "../data/evidence.js";
import { MoveImpactCards } from "./MoveImpactCards.jsx";

const detailItems = [
  ["The move", "move"],
  ["What they call it", "publicFrame"],
  ["What it does", "actualEffect"],
  ["Why it matters", "whyMatters"],
  ["How it fits", "howFits"],
];

export function ChapterView({ chapter, onSelectChapter }) {
  const signal = chapter.signals[0];
  const previousId = getPreviousChapterId(chapter.id);
  const nextId = getNextChapterId(chapter.id);

  return (
    <article className="chapter-view" style={{ "--accent": chapter.color }}>
      <header className="chapter-header">
        <p className="eyebrow">{chapter.kicker}</p>
        <h2>{chapter.title}</h2>
        <p className="chapter-thesis">{chapter.thesis}</p>
      </header>

      <section className="danger-strip">
        <span>Danger summary</span>
        <p>{chapter.danger}</p>
      </section>

      <section className="article-excerpt">
        <p>{chapter.articleExcerpt}</p>
      </section>

      <section className="strategic-imperative">
        <span>Strategic imperative</span>
        <p>{chapter.strategicImperative}</p>
      </section>

      <section className="move-detail-grid" aria-label="Move breakdown">
        {detailItems.map(([label, key]) => (
          <div className="move-detail-card" key={key}>
            <span>{label}</span>
            <p>{chapter[key]}</p>
          </div>
        ))}
      </section>

      <section className="move-detail-accordion" aria-label="Move breakdown">
        {detailItems.map(([label, key], index) => (
          <details key={key} open={index === 0}>
            <summary>{label}</summary>
            <p>{chapter[key]}</p>
          </details>
        ))}
      </section>

      <section className="directive-section" aria-label="Operating levers">
        <header>
          <ClipboardList aria-hidden="true" />
          <div>
            <span>Operating levers</span>
            <h3>How the move becomes real.</h3>
          </div>
        </header>
        <div className="directive-grid">
          {chapter.operationalDirectives.map((directive) => (
            <article key={directive.title}>
              <strong>{directive.title}</strong>
              <p>{directive.text}</p>
            </article>
          ))}
        </div>
      </section>

      {signal ? (
        <section className="signal-note">
          <Quote aria-hidden="true" />
          <blockquote>{signal.quote}</blockquote>
          <p>
            {signal.speaker}: {signal.interpretation}
          </p>
        </section>
      ) : null}

      <MoveImpactCards rows={chapter.comparisonRows} />

      <section className="claim-strip" aria-label="What this move changes">
        {chapter.claims.map((claim) => (
          <article key={claim.id} className="claim-card">
            <TriangleAlert aria-hidden="true" />
            <strong>{claim.label}</strong>
            <p>{claim.text}</p>
          </article>
        ))}
      </section>

      <section className="move-consequence">
        <ShieldAlert aria-hidden="true" />
        <div>
          <span>Consequence</span>
          <strong>{chapter.consequence}</strong>
          <p>{chapter.whyMatters}</p>
        </div>
      </section>

      <footer className="chapter-pager">
        <button type="button" onClick={() => onSelectChapter(previousId)}>
          <ArrowLeft aria-hidden="true" />
          Previous
        </button>
        <button type="button" onClick={() => onSelectChapter(nextId)}>
          Next
          <ArrowRight aria-hidden="true" />
        </button>
      </footer>

      <nav className="mobile-move-controls" aria-label="Mobile move controls">
        <button type="button" onClick={() => onSelectChapter(previousId)}>
          <ArrowLeft aria-hidden="true" />
          Previous
        </button>
        <span>
          {chapter.number} / 5
        </span>
        <button type="button" onClick={() => onSelectChapter(nextId)}>
          Next
          <ArrowRight aria-hidden="true" />
        </button>
      </nav>
    </article>
  );
}
