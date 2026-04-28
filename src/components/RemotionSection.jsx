import React from "react";
import { Player } from "@remotion/player";
import { Check, Play } from "lucide-react";
import { chapterTakeaways } from "../data/evidence.js";
import { AgendaMapVideo } from "../remotion/AgendaMapVideo.jsx";

export function RemotionSection({ activeId }) {
  return (
    <section id="video" className="video-section">
      <div className="video-copy">
        <p className="eyebrow">Remotion layer</p>
        <h2>Animated blueprint module</h2>
        <p>
          The Remotion player uses the same five-chapter data as the page, so the selected chapter
          becomes the visual focus in the animation.
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
          Current chapter synced to page selection
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
