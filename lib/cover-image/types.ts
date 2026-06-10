// Shared types for the cover / post image generator.
//
// These describe the shapes of:
//   - user-controlled state values (Alignment, Mode, Pattern, BgStyle, FontFamily)
//   - the derived `Colors` palette produced by paletteFromHue
//   - the `ContentItem` discriminated union that drives both the live preview
//     and the canvas download
//   - the `PreviewProps` contract between the page and CoverPreview

export type Alignment = "left" | "center" | "right";
export type Mode = "cover" | "post";
export type Pattern = "grid" | "dots" | "diagonal" | "waves" | "none";
export type BgStyle = "gradient" | "radial" | "mesh" | "solid";
export type FontFamily = "sans" | "mono" | "serif" | "display";

// Coarse preset for the vertical gap between consecutive content
// items (title, subtitle, badges, icons). The page multiplies the
// chosen pixel value by the content scale, so the relative spacing
// stays consistent when the user bumps the scale slider.
export type Spacing = "tight" | "normal" | "relaxed" | "loose";

export type Colors = {
  primary: string;
  secondary: string;
  grid: string;
  bgMid: string;
};

export type TextItem = {
  kind: "text";
  text: string;
  size: number;
  weight: 400 | 500 | 600 | 700;
  color: string;
  uppercase?: boolean;
  letterSpacing?: number;
  fontFamily?: string;
  marginBottom?: number;
};

export type IconsItem = {
  kind: "icons";
  size: number;
  gap: number;
  color: string;
  marginBottom?: number;
};

export type BadgesItem = {
  kind: "badges";
  labels: string[];
  size: number;
  gap: number;
  padX: number;
  padY: number;
  color: string;
  fill: string;
  marginBottom?: number;
};

export type ContentItem = TextItem | IconsItem | BadgesItem;

export type PreviewProps = {
  width: number;
  height: number;
  alignment: Alignment;
  bottomPadding: number;
  sidePadding: number;
  contentGap: number;
  verticalCenter: boolean;
  bgStyle: BgStyle;
  pattern: Pattern;
  colors: Colors;
  items: ContentItem[];
  iconsContainerRef: React.RefObject<HTMLDivElement | null>;
};
