import React from "react";
import { Search } from "lucide-react";
import {
  claimStatusLabels,
  claimStatusMeta,
  getChapterById,
} from "../data/evidence.js";

const filterKeys = ["all", "direct_quote", "interpretation", "needs_source"];

export function EvidenceExplorer({
  query,
  statusFilter,
  claims,
  onQueryChange,
  onStatusFilterChange,
  onSelectClaim,
}) {
  return (
    <div className="evidence-explorer">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Evidence index</p>
          <h2>Search claims, speakers, and quote text</h2>
        </div>
        <label className="search-box">
          <Search aria-hidden="true" />
          <span className="sr-only">Search evidence</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search Raskin, tariffs, Smith file..."
          />
        </label>
      </div>

      <div className="status-filters" aria-label="Evidence status filters">
        {filterKeys.map((key) => (
          <button
            type="button"
            key={key}
            className={statusFilter === key ? "active" : ""}
            onClick={() => onStatusFilterChange(key)}
          >
            {claimStatusLabels[key]}
          </button>
        ))}
      </div>

      {claims.length > 0 ? (
        <div className="evidence-results">
          {claims.map((claim) => {
            const chapter = getChapterById(claim.chapterId);
            const meta = claimStatusMeta[claim.status];
            return (
              <button
                type="button"
                key={claim.id}
                className="evidence-result"
                style={{ "--accent": chapter.color }}
                onClick={() => onSelectClaim(claim)}
              >
                <span className={`status-pill ${claim.status}`}>{meta.label}</span>
                <small>
                  Chapter {chapter.number} / {chapter.title}
                </small>
                <strong>{claim.label}</strong>
                <p>{claim.text}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching receipts.</strong>
          <p>Try a broader search term or switch the evidence status filter back to All.</p>
        </div>
      )}
    </div>
  );
}
