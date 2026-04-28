import React from "react";
import { Composition } from "remotion";
import { AgendaMapVideo } from "./AgendaMapVideo.jsx";

export function RemotionRoot() {
  return (
    <Composition
      id="AgendaMap"
      component={AgendaMapVideo}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ activeId: "congressional-supremacy" }}
    />
  );
}
