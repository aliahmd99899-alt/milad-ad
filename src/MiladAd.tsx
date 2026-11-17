import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Cairo";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["arabic", "latin"],
});

const C = {
  bg: "#0F1B2D",
  text: "#F5F7FA",
  muted: "#8A97AB",
  accent: "#5EEAD4",
  card: "rgba(255,255,255,0.06)",
  line: "rgba(255,255,255,0.12)",
};

const SCENES = [105, 120, 120, 120];
export const TOTAL_FRAMES = SCENES.reduce((a, b) => a + b, 0);

const Reveal: React.FC<{ delay?: number; children: React.ReactNode }> = ({
  delay = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>
      {children}
    </div>
  );
};

const Scene: React.FC<{ dur: number; children: React.ReactNode }> = ({
  dur,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, dur - 10, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        opacity,
        direction: "rtl",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        padding: "0 80px",
        textAlign: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 76, fontWeight: 700, color: C.text }}>{children}</div>
);

const Row: React.FC<{ main: string; side: string; ltr?: boolean }> = ({
  main,
  side,
  ltr,
}) => (
  <div
    style={{
      width: 800,
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: "34px 44px",
      background: C.card,
      border: `2px solid ${C.line}`,
      borderRadius: 32,
      fontSize: 54,
      fontWeight: 500,
      color: C.text,
    }}
  >
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        background: C.accent,
      }}
    />
    <span style={ltr ? { direction: "ltr", unicodeBidi: "isolate" } : undefined}>