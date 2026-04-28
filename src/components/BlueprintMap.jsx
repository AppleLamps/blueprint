import React from "react";
import { chapters } from "../data/evidence.js";

export function BlueprintMap({ activeId, onSelect }) {
  return (
    <div className="blueprint-map" aria-label="Five move plan navigation">
      <div className="map-heading">
        <span>Five-move route</span>
        <strong>From branch theory to DOJ pressure</strong>
      </div>
      <div className="chapter-line" aria-hidden="true" />
      <div className="chapter-nodes">
        {chapters.map((chapter) => (
          <button
            type="button"
            key={chapter.id}
            className={`chapter-node ${activeId === chapter.id ? "active" : ""}`}
            style={{ "--accent": chapter.color }}
            onClick={() => onSelect(chapter.id)}
          >
            <span>{chapter.number}</span>
            <strong>{chapter.shortLabel}</strong>
            <small>{chapter.title}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
