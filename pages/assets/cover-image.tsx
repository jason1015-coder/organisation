"use client";

import Head from "next/head";
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Alignment = "left" | "center" | "right";

type CoverProps = {
  width: number;
  height: number;
  alignment: Alignment;
  bottomPadding: number;
  sidePadding: number;
  contentScale: number;
  showSubtitle: boolean;
  showIcons: boolean;
  showWebsite: boolean;
};

const SUBTITLE_TEXT = "Join the collective";
const WEBSITE_TEXT = "nanocollective.org";
const ZINC_500 = "#71717a";
const ZINC_400 = "#a1a1aa";

function getPositionStyles(alignment: Alignment, sp: number): CSSProperties {
  switch (alignment) {
    case "left":
      return {
        left: sp,
        right: "auto",
        transform: "none",
        textAlign: "left",
        alignItems: "flex-start",
      };
    case "center":
      return {
        left: "50%",
        right: "auto",
        transform: "translateX(-50%)",
        textAlign: "center",
        alignItems: "center",
      };
    case "right":
      return {
        left: "auto",
        right: sp,
        transform: "none",
        textAlign: "right",
        alignItems: "flex-end",
      };
  }
}

function CoverPreview({
  width,
  height,
  alignment,
  bottomPadding,
  sidePadding,
  contentScale,
  showSubtitle,
  showIcons,
  showWebsite,
  iconsContainerRef,
}: CoverProps & {
  iconsContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cs = contentScale / 100;
  const iconSize = 56 * cs;
  const iconGap = 32 * cs;
  const iconMb = 20 * cs;
  const subtitleSize = 18 * cs;
  const websiteSize = 48 * cs;
  const contentGap = 12 * cs;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-[#1a1a2e] to-zinc-950" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute rounded-full opacity-40"
        style={{
          width: "384px",
          height: "384px",
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          filter: "blur(64px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-30"
        style={{
          width: "256px",
          height: "256px",
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          bottom: "-50px",
          left: "-50px",
          filter: "blur(64px)",
        }}
      />
      <div
        className="absolute z-10 flex flex-col"
        style={{
          bottom: `${bottomPadding}px`,
          gap: `${contentGap}px`,
          ...getPositionStyles(alignment, sidePadding),
        }}
      >
        {showSubtitle && (
          <p
            className="font-medium text-zinc-500 uppercase tracking-wide"
            style={{ fontSize: `${subtitleSize}px`, lineHeight: 1 }}
          >
            {SUBTITLE_TEXT}
          </p>
        )}
        {showIcons && (
          <div
            ref={iconsContainerRef}
            className="flex items-center"
            style={{ gap: `${iconGap}px`, marginBottom: `${iconMb}px` }}
          >
            <a
              href="https://github.com/Nano-Collective"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaGithub size={iconSize} />
            </a>
            <a
              href="https://discord.gg/ktPDV6rekE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaDiscord size={iconSize} />
            </a>
            <a
              href="https://x.com/nano_collective"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaXTwitter size={iconSize} />
            </a>
            <a
              href="https://www.linkedin.com/company/nano-collective/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={iconSize} />
            </a>
          </div>
        )}
        {showWebsite && (
          <p
            className="font-bold text-zinc-400"
            style={{ fontSize: `${websiteSize}px`, lineHeight: 1 }}
          >
            {WEBSITE_TEXT}
          </p>
        )}
      </div>
      <div
        className="absolute top-0 left-0 bg-gradient-to-br from-violet-500/20 to-transparent"
        style={{ width: "96px", height: "96px" }}
      />
      <div
        className="absolute bottom-0 right-0 bg-gradient-to-tl from-cyan-500/20 to-transparent"
        style={{ width: "96px", height: "96px" }}
      />
    </div>
  );
}

async function svgToImage(
  svgEl: SVGElement,
  color: string,
): Promise<HTMLImageElement> {
  const clone = svgEl.cloneNode(true) as SVGElement;
  let xml = new XMLSerializer().serializeToString(clone);
  // React-Icons SVGs use currentColor; replace with the resolved color so
  // the standalone SVG renders the right tint.
  xml = xml.replace(/currentColor/g, color);
  // Ensure xmlns is present (browser usually adds it, but belt-and-braces).
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

export default function CoverImage() {
  const [width, setWidth] = useState(1500);
  const [height, setHeight] = useState(500);
  const [alignment, setAlignment] = useState<Alignment>("center");
  const [bottomPadding, setBottomPadding] = useState(40);
  const [sidePadding, setSidePadding] = useState(40);
  const [showWebsite, setShowWebsite] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [contentScale, setContentScale] = useState(100);
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const available = containerRef.current.clientWidth;
      const next = Math.min(1, available / width);
      setScale(next);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts?.ready?.catch(() => {});
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await document.fonts?.ready;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Background diagonal gradient (zinc-950 → #1a1a2e → zinc-950)
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#09090b");
      bg.addColorStop(0.5, "#1a1a2e");
      bg.addColorStop(1, "#09090b");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Grid pattern at 30% opacity
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
      ctx.lineWidth = 1;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Blurred glowing orbs.
      // Orb 1: purple, 384px, top:-100, right:-100, opacity 0.4.
      // Orb 2: cyan, 256px, bottom:-50, left:-50, opacity 0.3.
      ctx.save();
      ctx.filter = "blur(64px)";
      ctx.globalAlpha = 0.4;
      // Orb 1: right edge at width+100, top edge at -100, 384×384.
      const orb1Cx = width + 100 - 192;
      const orb1Cy = -100 + 192;
      const orb1 = ctx.createRadialGradient(
        orb1Cx,
        orb1Cy,
        0,
        orb1Cx,
        orb1Cy,
        192,
      );
      orb1.addColorStop(0, "#8b5cf6");
      orb1.addColorStop(0.7, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = orb1;
      ctx.beginPath();
      ctx.arc(orb1Cx, orb1Cy, 192, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2
      ctx.globalAlpha = 0.3;
      const orb2Cx = -50 + 128;
      const orb2Cy = height + 50 - 128;
      const orb2 = ctx.createRadialGradient(
        orb2Cx,
        orb2Cy,
        0,
        orb2Cx,
        orb2Cy,
        128,
      );
      orb2.addColorStop(0, "#06b6d4");
      orb2.addColorStop(0.7, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = orb2;
      ctx.beginPath();
      ctx.arc(orb2Cx, orb2Cy, 128, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Corner accents
      const tlGrad = ctx.createLinearGradient(0, 0, 96, 96);
      tlGrad.addColorStop(0, "rgba(139, 92, 246, 0.2)");
      tlGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = tlGrad;
      ctx.fillRect(0, 0, 96, 96);

      const brGrad = ctx.createLinearGradient(
        width,
        height,
        width - 96,
        height - 96,
      );
      brGrad.addColorStop(0, "rgba(6, 182, 212, 0.2)");
      brGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = brGrad;
      ctx.fillRect(width - 96, height - 96, 96, 96);

      // 5. Content layout
      const cs = contentScale / 100;
      const iconSize = 56 * cs;
      const iconGap = 32 * cs;
      const iconMb = 20 * cs;
      const subtitleSize = 18 * cs;
      const websiteSize = 48 * cs;
      const contentGap = 12 * cs;

      type Item = { type: "subtitle" | "icons" | "website"; h: number };
      const items: Item[] = [];
      if (showSubtitle) items.push({ type: "subtitle", h: subtitleSize });
      if (showIcons) items.push({ type: "icons", h: iconSize + iconMb });
      if (showWebsite) items.push({ type: "website", h: websiteSize });

      const totalHeight = items.reduce(
        (sum, it, i) => sum + it.h + (i > 0 ? contentGap : 0),
        0,
      );
      let cy = height - bottomPadding - totalHeight;

      // Pre-load icon SVGs as Images (only if needed)
      let iconImages: HTMLImageElement[] = [];
      if (showIcons && iconsContainerRef.current) {
        const svgs = Array.from(
          iconsContainerRef.current.querySelectorAll("svg"),
        );
        iconImages = await Promise.all(
          svgs.map((s) => svgToImage(s, ZINC_400)),
        );
      }

      ctx.textBaseline = "top";

      const xForWidth = (w: number) => {
        switch (alignment) {
          case "left":
            return sidePadding;
          case "center":
            return (width - w) / 2;
          case "right":
            return width - sidePadding - w;
        }
      };

      for (let i = 0; i < items.length; i++) {
        if (i > 0) cy += contentGap;
        const item = items[i];
        if (item.type === "subtitle") {
          ctx.font = `500 ${subtitleSize}px Poppins, sans-serif`;
          ctx.fillStyle = ZINC_500;
          // tracking-wide = 0.025em
          const ls = subtitleSize * 0.025;
          const ctxAny = ctx as CanvasRenderingContext2D & {
            letterSpacing?: string;
          };
          const prevLs = ctxAny.letterSpacing;
          if ("letterSpacing" in ctx) ctxAny.letterSpacing = `${ls}px`;
          const text = SUBTITLE_TEXT.toUpperCase();
          const w = ctx.measureText(text).width;
          ctx.fillText(text, xForWidth(w), cy);
          if ("letterSpacing" in ctx) ctxAny.letterSpacing = prevLs ?? "0px";
          cy += subtitleSize;
        } else if (item.type === "icons") {
          const totalW = 4 * iconSize + 3 * iconGap;
          let cx = xForWidth(totalW);
          for (let j = 0; j < iconImages.length; j++) {
            ctx.drawImage(iconImages[j], cx, cy, iconSize, iconSize);
            cx += iconSize + iconGap;
          }
          cy += iconSize + iconMb;
        } else if (item.type === "website") {
          ctx.font = `700 ${websiteSize}px Poppins, sans-serif`;
          ctx.fillStyle = ZINC_400;
          const text = WEBSITE_TEXT;
          const w = ctx.measureText(text).width;
          ctx.fillText(text, xForWidth(w), cy);
          cy += websiteSize;
        }
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `nano-collective-cover-${width}x${height}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const sharedProps: CoverProps = {
    width,
    height,
    alignment,
    bottomPadding,
    sidePadding,
    contentScale,
    showSubtitle,
    showIcons,
    showWebsite,
  };

  return (
    <>
      <Head>
        <title>Cover Image - Nano Collective</title>
      </Head>
      <div className="min-h-screen bg-zinc-950 p-4 overflow-auto">
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">W:</span>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-24"
              min={100}
              max={3000}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">H:</span>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-24"
              min={100}
              max={1500}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Align:</span>
            <Select
              value={alignment}
              onValueChange={(v) => setAlignment(v as Alignment)}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Side:</span>
            <Input
              type="number"
              value={sidePadding}
              onChange={(e) => setSidePadding(Number(e.target.value))}
              className="w-20"
              min={0}
              max={200}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Bottom:</span>
            <Input
              type="number"
              value={bottomPadding}
              onChange={(e) => setBottomPadding(Number(e.target.value))}
              className="w-20"
              min={0}
              max={200}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Scale %:</span>
            <Input
              type="number"
              value={contentScale}
              onChange={(e) => setContentScale(Number(e.target.value))}
              className="w-20"
              min={10}
              max={400}
              step={5}
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSubtitle}
                onChange={(e) => setShowSubtitle(e.target.checked)}
                className="w-4 h-4 accent-violet-500"
              />
              <span className="text-sm text-zinc-400">Subtitle</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showIcons}
                onChange={(e) => setShowIcons(e.target.checked)}
                className="w-4 h-4 accent-violet-500"
              />
              <span className="text-sm text-zinc-400">Icons</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showWebsite}
                onChange={(e) => setShowWebsite(e.target.checked)}
                className="w-4 h-4 accent-violet-500"
              />
              <span className="text-sm text-zinc-400">Website</span>
            </label>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="ml-2"
          >
            {isDownloading ? "Rendering…" : `Download ${width}×${height} PNG`}
          </Button>
        </div>

        <div ref={containerRef} className="flex justify-center">
          <div
            style={{
              width: `${width * scale}px`,
              height: `${height * scale}px`,
            }}
          >
            <div
              className="origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              <CoverPreview
                {...sharedProps}
                iconsContainerRef={iconsContainerRef}
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500 text-center">
          Preview is scaled to fit; download produces a {width}×{height} PNG
          rendered directly to canvas.
        </p>
      </div>
    </>
  );
}
