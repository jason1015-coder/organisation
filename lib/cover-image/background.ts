// Background style for the main canvas. Each style maps to a single
// CSS `background` string. Used by the live preview; the canvas version
// in `render.ts` mirrors the gradient/radial/mesh logic with native
// canvas primitives.

import { hexToRgba } from "./color";
import type { BgStyle, Colors } from "./types";

export function getBackgroundStyle(bgStyle: BgStyle, colors: Colors): string {
  const mid = colors.bgMid;
  const p = hexToRgba(colors.primary, 0.4);
  const s = hexToRgba(colors.secondary, 0.3);
  switch (bgStyle) {
    case "gradient":
      return `linear-gradient(to bottom right, #09090b 0%, ${mid} 50%, #09090b 100%)`;
    case "radial":
      // Vignette: bright tinted centre, dark edges.
      return `radial-gradient(ellipse at center, ${mid} 0%, #09090b 75%)`;
    case "mesh":
      // Four overlapping colour tints at the corners — looks great with
      // the hue slider because all four tints track the palette.
      return (
        `radial-gradient(at 20% 25%, ${p} 0px, transparent 50%), ` +
        `radial-gradient(at 80% 20%, ${s} 0px, transparent 55%), ` +
        `radial-gradient(at 75% 85%, ${p} 0px, transparent 50%), ` +
        `radial-gradient(at 15% 80%, ${s} 0px, transparent 55%), ` +
        `${mid}`
      );
    case "solid":
      return mid;
  }
}
