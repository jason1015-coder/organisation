// Spacing presets. Each maps to a pixel value that becomes the
// inter-item gap (the space between consecutive content items in the
// cover/post stack). The page multiplies the value by the content
// scale, so a "loose" preset on a 200% scale is 80px, not 40.

import type { Spacing } from "./types";

export const SPACING_VALUES: Record<Spacing, number> = {
  tight: 4,
  normal: 12,
  relaxed: 24,
  loose: 40,
};

export const SPACING_LABELS: Record<Spacing, string> = {
  tight: "Tight",
  normal: "Normal",
  relaxed: "Relaxed",
  loose: "Loose",
};
