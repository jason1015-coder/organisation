// Build the derived `ContentItem[]` from the current user state.
//
// This is a pure function of the form state — no React, no DOM, no
// refs — so it's easy to test and reason about. Both the live preview
// (`CoverPreview`) and the canvas download (`render.ts`) consume the
// same output, so the export always matches what the user sees.

import { hexToRgba } from "./color";
import { FONT_SANS } from "./fonts";
import type { ContentItem, FontFamily } from "./types";

export type BuildItemsInput = {
  mode: "cover" | "post";
  // Cover state
  coverSubtitle: string;
  coverWebsite: string;
  showCoverSubtitle: boolean;
  showCoverIcons: boolean;
  showCoverWebsite: boolean;
  // Post state
  postTitle: string;
  postSubtitle: string;
  showPostTitle: boolean;
  showPostSubtitle: boolean;
  showPostIcons: boolean;
  postTitleFont: FontFamily;
  postSubtitleFont: FontFamily;
  postTitleMono: boolean;
  postTitleSize: number; // 0-200 percentage
  postSubtitleSize: number; // 0-200 percentage
  postBadges: string;
  showPostBadges: boolean;
  // Derived
  primaryColor: string;
  // Theme-aware text colours (from the active palette).
  fg: string;
  fgMuted: string;
  fgFaint: string;
  // Size scaling (post-build, content-scale %)
  contentScale: number;
};

export function buildItems(input: BuildItemsInput): ContentItem[] {
  const cs = input.contentScale / 100;
  if (input.mode === "cover") {
    const out: ContentItem[] = [];
    if (input.showCoverSubtitle) {
      out.push({
        kind: "text",
        text: input.coverSubtitle,
        size: 18 * cs,
        weight: 500,
        color: input.fgFaint,
        uppercase: true,
        letterSpacing: 0.025,
        fontFamily: FONT_SANS,
      });
    }
    if (input.showCoverIcons) {
      out.push({
        kind: "icons",
        size: 56 * cs,
        gap: 32 * cs,
        color: input.fgMuted,
        marginBottom: 20 * cs,
      });
    }
    if (input.showCoverWebsite) {
      out.push({
        kind: "text",
        text: input.coverWebsite,
        size: 48 * cs,
        weight: 700,
        color: input.fg,
        fontFamily: FONT_SANS,
      });
    }
    return out;
  }

  const out: ContentItem[] = [];
  if (input.showPostTitle) {
    // postTitleMono is the legacy single-bit toggle. postTitleFont takes
    // precedence so users can pick mono/sans/serif/display directly.
    const titleFont: FontFamily = input.postTitleMono
      ? "mono"
      : input.postTitleFont;
    out.push({
      kind: "text",
      text: input.postTitle,
      size: 96 * cs * (input.postTitleSize / 100),
      weight: 700,
      color: input.fg,
      fontFamily: titleFont,
    });
  }
  if (input.showPostSubtitle) {
    out.push({
      kind: "text",
      text: input.postSubtitle,
      size: 36 * cs * (input.postSubtitleSize / 100),
      weight: 500,
      color: input.fgMuted,
      fontFamily: input.postSubtitleFont,
    });
  }
  if (input.showPostBadges && input.postBadges.trim().length > 0) {
    const labels = input.postBadges
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);
    if (labels.length > 0) {
      out.push({
        kind: "badges",
        labels,
        size: 22 * cs,
        gap: 12 * cs,
        padX: 14 * cs,
        padY: 8 * cs,
        color: input.fg,
        fill: hexToRgba(input.primaryColor, 0.18),
      });
    }
  }
  if (input.showPostIcons) {
    out.push({
      kind: "icons",
      size: 56 * cs,
      gap: 32 * cs,
      color: input.fgMuted,
    });
  }
  return out;
}
