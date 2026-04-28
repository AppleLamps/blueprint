import React from "react";
import { chapters } from "../data/evidence.js";

export function ChapterRail({ activeId, onSelect }) {
  return (
    <aside className="chapter-rail" aria-label="Chapter rail">
      <label className="chapter-select">
        <span>Chapter</span>
        <select value={activeId} onChange={(event) => onSelect(event.target.value)}>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.number}. {chapter.title}
            </option>
          ))}
        </select>
      </label>

      <div className="rail-list">
        {chapters.map((chapter) => (
          <button
            type="button"
            key={chapter.id}
            className={activeId === chapter.id ? "active" : ""}
            style={{ "--accent": chapter.color }}
            onClick={() => onSelect(chapter.id)}
          >
            <span>{String(chapter.number).padStart(2, "0")}</span>
            <strong>{chapter.shortLabel}</strong>
            <small>{chapter.title}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}
