import React from "react";
import { Player } from "@remotion/player";
import { Check, Play } from "lucide-react";
import { chapterTakeaways } from "../data/evidence.js";
import { AgendaMapVideo } from "../remotion/AgendaMapVideo.jsx";

export function RemotionSection({ activeId }) {
  return (
    <section id="video" className="video-section">
      <div className="video-copy">
        <p className="eyebrow">Watch the case</p>
        <h2>A quick visual map of the sequence</h2>
        <p>
          The video follows the same machine as the page: a new theory of power, pressure on the
          institutions that can say no, national control over voting rules, movement force, and
          enforcement leverage.
        </p>
        <ul className="check-list">
          {chapterTakeaways.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="player-shell">
        <div className="player-label">
          <Play aria-hidden="true" />
          Five moves in sequence
        </div>
        <Player
          component={AgendaMapVideo}
          inputProps={{ activeId }}
          durationInFrames={240}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          controls
          loop
          style={{ width: "100%", aspectRatio: "16 / 9" }}
        />
      </div>
    </section>
  );
}
