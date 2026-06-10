// Hue-driven palette generation.
//
// Base palette is derived from the Nano Collective brand colours:
//   #8b5cf6 (violet), #06b6d4 (cyan), and the dark blue-violet
//   #1a1a2e background tint. The hue slider rotates all three at once,
//   preserving their relative distances so the pairing stays harmonised
//   at any rotation.

import type { Colors } from "./types";

const PRIMARY_BASE = { h: 258, s: 90, l: 66 };
const SECONDARY_BASE = { h: 189, s: 94, l: 43 };
const BG_MID_BASE = { h: 240, s: 33, l: 14 }; // #1a1a2e
const SECONDARY_HUE_OFFSET =
  (((SECONDARY_BASE.h - PRIMARY_BASE.h) % 360) + 360) % 360; // 291°
const BG_MID_HUE_OFFSET =
  (((BG_MID_BASE.h - PRIMARY_BASE.h) % 360) + 360) % 360; // 342°
export const DEFAULT_HUE = PRIMARY_BASE.h;

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

export function paletteFromHue(hue: number): Colors {
  const primary = hslToHex(hue, PRIMARY_BASE.s, PRIMARY_BASE.l);
  const secondary = hslToHex(
    hue + SECONDARY_HUE_OFFSET,
    SECONDARY_BASE.s,
    SECONDARY_BASE.l,
  );
  const bgMid = hslToHex(hue + BG_MID_HUE_OFFSET, BG_MID_BASE.s, BG_MID_BASE.l);
  return { primary, secondary, grid: primary, bgMid };
}
