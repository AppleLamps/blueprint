import React from "react";
import { ArrowLeft, ArrowRight, FileSearch } from "lucide-react";
import {
  claimStatusMeta,
  getNextChapterId,
  getPreviousChapterId,
} from "../data/evidence.js";
import { ComparisonTable } from "./ComparisonTable.jsx";

export function ChapterView({ chapter, selectedClaimId, onSelectClaim, onSelectChapter }) {
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

      <section className="source-note">
        <FileSearch aria-hidden="true" />
        <p>{chapter.sourceStatus}</p>
      </section>

      <ComparisonTable rows={chapter.comparisonRows} />

      <section className="claim-strip" aria-label="Chapter claims">
        {chapter.claims.map((claim) => {
          const meta = claimStatusMeta[claim.status];
          return (
            <button
              type="button"
              key={claim.id}
              className={`claim-chip ${selectedClaimId === claim.id ? "active" : ""}`}
              data-status={claim.status}
              onClick={() => onSelectClaim(claim.id)}
            >
              <span>{meta.label}</span>
              <strong>{claim.label}</strong>
            </button>
          );
        })}
      </section>

      <footer className="chapter-pager">
        <button type="button" onClick={() => onSelectChapter(getPreviousChapterId(chapter.id))}>
          <ArrowLeft aria-hidden="true" />
          Previous
        </button>
        <button type="button" onClick={() => onSelectChapter(getNextChapterId(chapter.id))}>
          Next
          <ArrowRight aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}
