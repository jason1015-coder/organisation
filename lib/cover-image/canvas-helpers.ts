// Canvas-only drawing helpers used by the download path.

// Draw a filled rounded-rect path. Uses the newer ctx.roundRect when
// available and falls back to quadratic curves for older browsers so
// the badge row renders identically across runtimes.
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const rr = Math.min(r, w / 2, h / 2);
  if (
    typeof (ctx as unknown as { roundRect?: () => void }).roundRect ===
    "function"
  ) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, rr);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

// Convert an inline SVG element into a loaded HTMLImageElement so it can
// be drawn onto the canvas with the requested fill colour substituted in
// for `currentColor`.
export async function svgToImage(
  svgEl: SVGElement,
  color: string,
): Promise<HTMLImageElement> {
  const clone = svgEl.cloneNode(true) as SVGElement;
  let xml = new XMLSerializer().serializeToString(clone);
  xml = xml.replace(/currentColor/g, color);
  if (!xml.includes("xmlns=")) {
    xml = xml.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
    img.src = dataUri;
  });
  return img;
}
