import React from "react";

export function ComparisonTable({ rows }) {
  return (
    <div className="comparison-table" role="table" aria-label="Constitutional order comparison">
      <div className="comparison-row comparison-head" role="row">
        <div role="columnheader">Issue</div>
        <div role="columnheader">Traditional Constitutional Order</div>
        <div role="columnheader">Progressive Blueprint</div>
      </div>
      {rows.map((row) => (
        <div className="comparison-row" role="row" key={row.issue}>
          <div role="cell" data-label="Issue">
            {row.issue}
          </div>
          <div role="cell" data-label="Traditional Constitutional Order">
            {row.traditional}
          </div>
          <div role="cell" data-label="Progressive Blueprint">
            {row.blueprint}
          </div>
        </div>
      ))}
    </div>
  );
}
