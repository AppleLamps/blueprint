import React from "react";
import { ArrowRight, CheckCircle2, Scale } from "lucide-react";

export function MoveImpactCards({ rows }) {
  return (
    <section className="impact-section" aria-label="Traditional limit and progressive replacement">
      {rows.map((row) => (
        <article className="impact-card" key={row.issue}>
          <header>
            <span>{row.issue}</span>
            <Scale aria-hidden="true" />
          </header>
          <div className="impact-flow">
            <div>
              <small>Traditional limit</small>
              <p>{row.traditional}</p>
            </div>
            <ArrowRight aria-hidden="true" />
            <div>
              <small>Progressive replacement</small>
              <p>{row.blueprint}</p>
            </div>
          </div>
          <footer>
            <CheckCircle2 aria-hidden="true" />
            <strong>Result:</strong>
            <p>{row.result}</p>
          </footer>
        </article>
      ))}
    </section>
  );
}
