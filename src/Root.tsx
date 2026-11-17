import React from "react";
import { Composition } from "remotion";
import { MiladAd, TOTAL_FRAMES } from "./MiladAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MiladAd"
      component={MiladAd}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
