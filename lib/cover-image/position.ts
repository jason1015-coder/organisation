// Position styles for the content block in the preview. Translates the
// {alignment, verticalCenter} pair into absolute positioning + transform.

import type { CSSProperties } from "react";

import type { Alignment } from "./types";

export function getPositionStyles(
  alignment: Alignment,
  sp: number,
  vCenter: boolean,
  bp: number,
): CSSProperties {
  const styles: CSSProperties = {};

  if (alignment === "left") {
    styles.left = sp;
    styles.right = "auto";
    styles.textAlign = "left";
    styles.alignItems = "flex-start";
  } else if (alignment === "center") {
    styles.left = "50%";
    styles.right = "auto";
    styles.textAlign = "center";
    styles.alignItems = "center";
  } else {
    styles.left = "auto";
    styles.right = sp;
    styles.textAlign = "right";
    styles.alignItems = "flex-end";
  }

  if (vCenter) {
    styles.top = "50%";
    styles.bottom = "auto";
  } else {
    styles.bottom = bp;
    styles.top = "auto";
  }

  const tx = alignment === "center" ? "-50%" : "0";
  const ty = vCenter ? "-50%" : "0";
  styles.transform =
    tx === "0" && ty === "0" ? "none" : `translate(${tx}, ${ty})`;

  return styles;
}
