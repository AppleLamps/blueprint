import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { chapters, getChapterById } from "../data/evidence.js";

export function AgendaMapVideo({ activeId = chapters[0].id }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getChapterById(activeId);
  const intro = spring({ frame, fps, config: { damping: 20, stiffness: 92 } });
  const sweep = interpolate(frame, [20, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spotlightIndex = Math.min(
    chapters.length - 1,
    Math.floor(interpolate(frame, [44, 218], [0, chapters.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })),
  );
  const spotlight = chapters[spotlightIndex] ?? active;
  const receipt = active.receipts[0];

  return (
    <AbsoluteFill style={styles.stage}>
      <div style={styles.page}>
        <header style={styles.header}>
          <div>
            <div style={styles.kicker}>Special strategic report</div>
            <div style={styles.title}>The Jacobin Blueprint</div>
          </div>
          <div style={styles.counter}>5 chapters</div>
        </header>

        <div style={styles.rule} />

        <section style={styles.body}>
          <div style={styles.left}>
            <div style={styles.sequenceLabel}>Blueprint route</div>
            <div style={styles.timeline}>
              <div
                style={{
                  ...styles.timelineRule,
                  transform: `scaleX(${sweep})`,
                }}
              />
              {chapters.map((chapter, index) => {
                const reveal = spring({
                  frame: frame - index * 10,
                  fps,
                  config: { damping: 18, stiffness: 95 },
                });
                const isActive = chapter.id === active.id;
                const isSpotlight = chapter.id === spotlight.id;

                return (
                  <div
                    key={chapter.id}
                    style={{
                      ...styles.node,
                      borderColor: isActive ? active.color : "rgba(20,19,15,0.24)",
                      background: isActive ? tint(active.color) : "#fffef9",
                      opacity: reveal,
                      transform: `translateY(${isSpotlight ? -18 : 0}px) scale(${0.88 + reveal * 0.12})`,
                    }}
                  >
                    <div style={{ ...styles.nodeNumber, color: chapter.color }}>
                      {chapter.number}
                    </div>
                    <div style={styles.nodeShort}>{chapter.shortLabel}</div>
                    <div style={styles.nodeTitle}>{chapter.title}</div>
                  </div>
                );
              })}
            </div>

            <div style={styles.table}>
              {active.comparisonRows.slice(0, 3).map((row, index) => (
                <div
                  key={row.issue}
                  style={{
                    ...styles.tableRow,
                    opacity: interpolate(frame, [82 + index * 10, 100 + index * 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <div style={styles.tableIssue}>{row.issue}</div>
                  <div style={styles.tableCell}>{row.traditional}</div>
                  <div style={styles.tableCellAccent}>{row.blueprint}</div>
                </div>
              ))}
            </div>
          </div>

          <aside
            style={{
              ...styles.right,
              borderTopColor: active.color,
              opacity: intro,
            }}
          >
            <div style={{ ...styles.chapterKicker, color: active.color }}>{active.kicker}</div>
            <div style={styles.chapterTitle}>{active.title}</div>
            <div style={styles.thesis}>{active.thesis}</div>
            <div style={styles.quoteBlock}>
              <div style={styles.quoteLabel}>Transcript receipt</div>
              <div style={styles.quoteText}>{receipt.quote}</div>
              <div style={styles.source}>
                {receipt.speaker} / {receipt.locator}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </AbsoluteFill>
  );
}

function tint(color) {
  return `color-mix(in srgb, ${color}, white 88%)`;
}

const styles = {
  stage: {
    background: "#f7f4ea",
    color: "#14130f",
    fontFamily: '"Source Sans 3", Arial, sans-serif',
  },
  page: {
    margin: 54,
    height: "calc(100% - 108px)",
    border: "1px solid rgba(20,19,15,0.28)",
    background: "#fbfaf6",
    padding: 34,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 30,
  },
  kicker: {
    color: "#9f2f2f",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 8,
    fontFamily: "Georgia, serif",
    fontSize: 76,
    lineHeight: 1,
  },
  counter: {
    border: "1px solid #14130f",
    padding: "12px 16px",
    fontSize: 22,
    fontWeight: 800,
    textTransform: "uppercase",
  },
  rule: {
    height: 8,
    margin: "26px 0 32px",
    borderTop: "4px solid #14130f",
    borderBottom: "1px solid #14130f",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "1.18fr 0.82fr",
    gap: 28,
    height: "calc(100% - 148px)",
  },
  left: {
    minWidth: 0,
    borderRight: "1px solid rgba(20,19,15,0.2)",
    paddingRight: 28,
  },
  sequenceLabel: {
    color: "#635f55",
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  timeline: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 14,
    marginTop: 28,
    paddingTop: 22,
  },
  timelineRule: {
    position: "absolute",
    top: 66,
    left: "5%",
    right: "5%",
    height: 3,
    background: "#14130f",
    transformOrigin: "left center",
  },
  node: {
    position: "relative",
    minHeight: 174,
    border: "2px solid",
    padding: 16,
    zIndex: 2,
  },
  nodeNumber: {
    fontFamily: "monospace",
    fontSize: 26,
    fontWeight: 700,
  },
  nodeShort: {
    marginTop: 24,
    fontSize: 26,
    fontWeight: 900,
  },
  nodeTitle: {
    marginTop: 8,
    color: "#635f55",
    fontSize: 18,
    lineHeight: 1.15,
  },
  table: {
    marginTop: 40,
    borderTop: "4px solid #14130f",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "0.58fr 1fr 1fr",
    borderBottom: "1px solid rgba(20,19,15,0.22)",
  },
  tableIssue: {
    color: "#9f2f2f",
    fontSize: 18,
    fontWeight: 900,
    padding: 14,
  },
  tableCell: {
    borderLeft: "1px solid rgba(20,19,15,0.18)",
    color: "#363229",
    fontSize: 17,
    lineHeight: 1.35,
    padding: 14,
  },
  tableCellAccent: {
    borderLeft: "1px solid rgba(20,19,15,0.18)",
    color: "#14130f",
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.35,
    padding: 14,
  },
  right: {
    minWidth: 0,
    border: "1px solid rgba(20,19,15,0.24)",
    borderTop: "8px solid",
    background: "#fffef9",
    padding: 30,
  },
  chapterKicker: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  chapterTitle: {
    marginTop: 14,
    fontFamily: "Georgia, serif",
    fontSize: 54,
    lineHeight: 1.05,
  },
  thesis: {
    marginTop: 22,
    color: "#343128",
    fontSize: 25,
    lineHeight: 1.45,
  },
  quoteBlock: {
    marginTop: 34,
    borderTop: "3px double rgba(20,19,15,0.42)",
    paddingTop: 22,
  },
  quoteLabel: {
    color: "#635f55",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  quoteText: {
    marginTop: 14,
    fontFamily: "Georgia, serif",
    fontSize: 34,
    lineHeight: 1.2,
  },
  source: {
    marginTop: 18,
    color: "#635f55",
    fontSize: 18,
    fontWeight: 800,
  },
};
