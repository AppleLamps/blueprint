import React from "react";
import { AlertTriangle, Quote } from "lucide-react";
import {
  claimStatusMeta,
  getReceiptsForClaim,
} from "../data/evidence.js";

export function ReceiptsPanel({ chapter, claim }) {
  const meta = claimStatusMeta[claim.status];
  const receipts = getReceiptsForClaim(chapter, claim);

  return (
    <aside className="receipts-panel" aria-label="Receipts drawer">
      <header>
        <p className="eyebrow">Receipts drawer</p>
        <h2>{claim.label}</h2>
        <span className={`status-pill ${claim.status}`}>{meta.label}</span>
      </header>

      <p className="claim-text">{claim.text}</p>
      <p className="status-help">{meta.description}</p>

      {receipts.length > 0 ? (
        <div className="receipt-stack">
          {receipts.map((receipt) => (
            <article className="receipt" key={receipt.id}>
              <Quote aria-hidden="true" />
              <blockquote>{receipt.quote}</blockquote>
              <dl>
                <div>
                  <dt>Speaker</dt>
                  <dd>{receipt.speaker}</dd>
                </div>
                <div>
                  <dt>Transcript</dt>
                  <dd>{receipt.transcript}</dd>
                </div>
                <div>
                  <dt>Locator</dt>
                  <dd>
                    <code>{receipt.locator}</code>
                  </dd>
                </div>
              </dl>
              <p>{receipt.interpretation}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-receipts">
          <AlertTriangle aria-hidden="true" />
          <strong>Needs another source</strong>
          <p>This article claim is intentionally visible, but no transcript receipt is attached yet.</p>
        </div>
      )}
    </aside>
  );
}
