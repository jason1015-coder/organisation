// Theme + hue driven palette generation.
//
// The default accent is the Nano Collective brand blue (#0000EE, hue 240).
// The hue slider rotates the accent pair while the chosen theme (light or
// dark) controls the background and text colours, so the output always
// matches the site's branding on either a light or dark canvas.

import type { Colors, Theme } from "./types";

// Brand blue (#0000EE) sits at hue 240; the secondary trails it by a small
// offset to stay in the same blue family rather than clashing.
export const DEFAULT_HUE = 240;
const SECONDARY_HUE_OFFSET = 18;

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = ln - c / 2;
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function paletteFromHue(hue: number, theme: Theme = "dark"): Colors {
  const isLight = theme === "light";
  // Accent: vivid brand blue on light, brightened a touch on dark so it
  // reads against the navy background.
  const primary = hslToHex(hue, 100, isLight ? 47 : 60);
  const secondary = hslToHex(hue + SECONDARY_HUE_OFFSET, 90, isLight ? 55 : 68);

  if (isLight) {
    return {
      primary,
      secondary,
      grid: primary,
      bgMid: "#f4f4f5",
      bgEdge: "#ffffff",
      fg: "#18181b",
      fgMuted: "#52525b",
      fgFaint: "#71717a",
    };
  }

  return {
    primary,
    secondary,
    grid: primary,
    bgMid: "#161b2e",
    bgEdge: "#0a0c14",
    fg: "#f4f4f5",
    fgMuted: "#a1a1aa",
    fgFaint: "#71717a",
  };
}
