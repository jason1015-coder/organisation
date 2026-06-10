// Font stacks used by the generator. Each key in FONT_STACK maps a
// `FontFamily` token (used in component state) to a CSS font stack that
// the browser and the canvas can both render.
//
// The four families: sans (Poppins), mono (Fira Code), serif (Lora),
// display (Inter Tight). Poppins/Fira Code/Lora come from globals.css;
// display uses a system fallback so we don't have to ship a new webfont.

import type { FontFamily } from "./types";

export const FONT_SANS = "Poppins, sans-serif";
export const FONT_MONO = '"Fira Code", ui-monospace, monospace';
export const FONT_SERIF = "Lora, Georgia, serif";
export const FONT_DISPLAY =
  '"Inter Tight", "Helvetica Neue", system-ui, -apple-system, sans-serif';

export const FONT_STACK: Record<FontFamily, string> = {
  sans: FONT_SANS,
  mono: FONT_MONO,
  serif: FONT_SERIF,
  display: FONT_DISPLAY,
};

// Resolve a stored font token (or raw CSS stack) to a concrete font stack.
// Returns Poppins for unknown values so the preview is never broken.
export function resolveFont(family: FontFamily | string | undefined): string {
  if (!family) return FONT_SANS;
  if (family in FONT_STACK) return FONT_STACK[family as FontFamily];
  return family;
}
