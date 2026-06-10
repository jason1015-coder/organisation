// Overlay pattern styles for the preview. The canvas download re-implements
// these in `render.ts` to keep the export deterministic.

import type { CSSProperties } from "react";
import { hexToRgba } from "./color";
import type { Pattern } from "./types";

export function getPatternStyle(
  pattern: Pattern,
  gridColor: string,
): CSSProperties {
  if (pattern === "none") return {};
  const color = hexToRgba(gridColor, 0.4);
  switch (pattern) {
    case "grid":
      return {
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      };
    case "dots":
      return {
        backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
        backgroundSize: "40px 40px",
      };
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 1px, transparent 40px)`,
      };
    case "waves": {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20"><path d="M 0 10 Q 10 2 20 10 T 40 10" fill="none" stroke="${color}" stroke-width="1"/></svg>`;
      return {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`,
        backgroundSize: "40px 20px",
      };
    }
  }
}
