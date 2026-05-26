"use client";

import { Minus, Plus, Settings, X } from "lucide-react";
import Head from "next/head";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
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
type Mode = "cover" | "post";

type Colors = {
  primary: string;
  secondary: string;
  grid: string;
  bgMid: string;
};

type SocialIcon = { href: string; Icon: IconType };

const SOCIAL_ICONS: SocialIcon[] = [
  { href: "https://github.com/Nano-Collective", Icon: FaGithub },
  { href: "https://discord.gg/ktPDV6rekE", Icon: FaDiscord },
  { href: "https://x.com/nano_collective", Icon: FaXTwitter },
  {
    href: "https://www.linkedin.com/company/nano-collective/",
    Icon: FaLinkedin,
  },
];

type TextItem = {
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

type IconsItem = {
  kind: "icons";
  size: number;
  gap: number;
  color: string;
  marginBottom?: number;
};

type ContentItem = TextItem | IconsItem;

const ZINC_100 = "#f4f4f5";
const ZINC_400 = "#a1a1aa";
const ZINC_500 = "#71717a";

const FONT_SANS = "Poppins, sans-serif";
const FONT_MONO = '"Fira Code", ui-monospace, monospace';

// Base palette derived from #8b5cf6 (violet), #06b6d4 (cyan), and the
// dark blue-violet #1a1a2e background tint. The hue slider rotates all
// three at once, preserving their relative distances so the pairing
// stays harmonised at any rotation.
const PRIMARY_BASE = { h: 258, s: 90, l: 66 };
const SECONDARY_BASE = { h: 189, s: 94, l: 43 };
const BG_MID_BASE = { h: 240, s: 33, l: 14 }; // #1a1a2e
const SECONDARY_HUE_OFFSET =
  (((SECONDARY_BASE.h - PRIMARY_BASE.h) % 360) + 360) % 360; // 291°
const BG_MID_HUE_OFFSET =
  (((BG_MID_BASE.h - PRIMARY_BASE.h) % 360) + 360) % 360; // 342°
const DEFAULT_HUE = PRIMARY_BASE.h;

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

function paletteFromHue(hue: number): Colors {
  const primary = hslToHex(hue, PRIMARY_BASE.s, PRIMARY_BASE.l);
  const secondary = hslToHex(
    hue + SECONDARY_HUE_OFFSET,
    SECONDARY_BASE.s,
    SECONDARY_BASE.l,
  );
  const bgMid = hslToHex(hue + BG_MID_HUE_OFFSET, BG_MID_BASE.s, BG_MID_BASE.l);
  return { primary, secondary, grid: primary, bgMid };
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getPositionStyles(
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

async function svgToImage(
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

type PreviewProps = {
  width: number;
  height: number;
  alignment: Alignment;
  bottomPadding: number;
  sidePadding: number;
  contentGap: number;
  verticalCenter: boolean;
  colors: Colors;
  items: ContentItem[];
  iconsContainerRef: React.RefObject<HTMLDivElement | null>;
};

function CoverPreview({
  width,
  height,
  alignment,
  bottomPadding,
  sidePadding,
  contentGap,
  verticalCenter,
  colors,
  items,
  iconsContainerRef,
}: PreviewProps) {
  const iconsIndex = items.findIndex((it) => it.kind === "icons");

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(to bottom right, #09090b 0%, ${colors.bgMid} 50%, #09090b 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(${hexToRgba(colors.grid, 0.4)} 1px, transparent 1px),
            linear-gradient(90deg, ${hexToRgba(colors.grid, 0.4)} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute rounded-full opacity-40"
        style={{
          width: "384px",
          height: "384px",
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
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
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
          bottom: "-50px",
          left: "-50px",
          filter: "blur(64px)",
        }}
      />
      <div
        className="absolute z-10 flex flex-col"
        style={{
          gap: `${contentGap}px`,
          ...getPositionStyles(
            alignment,
            sidePadding,
            verticalCenter,
            bottomPadding,
          ),
        }}
      >
        {items.map((item, idx) => {
          if (item.kind === "text") {
            return (
              <p
                // biome-ignore lint/suspicious/noArrayIndexKey: stable per-item slot
                key={idx}
                style={{
                  fontSize: `${item.size}px`,
                  fontWeight: item.weight,
                  color: item.color,
                  fontFamily: item.fontFamily ?? FONT_SANS,
                  textTransform: item.uppercase ? "uppercase" : undefined,
                  letterSpacing: item.letterSpacing
                    ? `${item.letterSpacing}em`
                    : undefined,
                  lineHeight: 1,
                  margin: 0,
                  marginBottom: item.marginBottom
                    ? `${item.marginBottom}px`
                    : undefined,
                  whiteSpace: "pre",
                }}
              >
                {item.text}
              </p>
            );
          }
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: stable per-item slot
              key={idx}
              ref={idx === iconsIndex ? iconsContainerRef : undefined}
              className="flex items-center"
              style={{
                gap: `${item.gap}px`,
                marginBottom: item.marginBottom
                  ? `${item.marginBottom}px`
                  : undefined,
              }}
            >
              {SOCIAL_ICONS.map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  style={{ color: item.color }}
                >
                  <Icon size={item.size} />
                </a>
              ))}
            </div>
          );
        })}
      </div>
      <div
        className="absolute top-0 left-0"
        style={{
          width: "96px",
          height: "96px",
          background: `linear-gradient(to bottom right, ${hexToRgba(colors.primary, 0.2)}, transparent)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "96px",
          height: "96px",
          background: `linear-gradient(to top left, ${hexToRgba(colors.secondary, 0.2)}, transparent)`,
        }}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-zinc-400 shrink-0">{label}</span>
      <div className="flex-1 min-w-0 flex justify-end">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-violet-500"
      />
      <span className="text-sm text-zinc-400">{label}</span>
    </label>
  );
}

export default function CoverImage() {
  const [mode, setMode] = useState<Mode>("post");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dimensions are per-mode so switching gives a sensible default for each.
  const [coverWidth, setCoverWidth] = useState(1500);
  const [coverHeight, setCoverHeight] = useState(500);
  const [postWidth, setPostWidth] = useState(1200);
  const [postHeight, setPostHeight] = useState(750);
  const width = mode === "cover" ? coverWidth : postWidth;
  const height = mode === "cover" ? coverHeight : postHeight;
  const setWidth = mode === "cover" ? setCoverWidth : setPostWidth;
  const setHeight = mode === "cover" ? setCoverHeight : setPostHeight;

  const [alignment, setAlignment] = useState<Alignment>("center");
  const [bottomPadding, setBottomPadding] = useState(40);
  const [sidePadding, setSidePadding] = useState(40);
  const [contentScale, setContentScale] = useState(100);

  // Cover content
  const [coverSubtitle, setCoverSubtitle] = useState("Join the collective");
  const [coverWebsite, setCoverWebsite] = useState("nanocollective.org");
  const [showCoverSubtitle, setShowCoverSubtitle] = useState(true);
  const [showCoverIcons, setShowCoverIcons] = useState(true);
  const [showCoverWebsite, setShowCoverWebsite] = useState(true);

  // Post content
  const [postTitle, setPostTitle] = useState("get-md");
  const [postSubtitle, setPostSubtitle] = useState("v1.5.0");
  const [showPostTitle, setShowPostTitle] = useState(true);
  const [showPostSubtitle, setShowPostSubtitle] = useState(true);
  const [showPostIcons, setShowPostIcons] = useState(false);
  const [postTitleMono, setPostTitleMono] = useState(true);

  // Single hue slider drives a harmonised palette.
  const [hue, setHue] = useState(DEFAULT_HUE);
  const colors = paletteFromHue(hue);
  const {
    primary: primaryColor,
    secondary: secondaryColor,
    grid: gridColor,
  } = colors;

  const [autoFit, setAutoFit] = useState(1);
  const [zoom, setZoom] = useState(1);
  const scale = autoFit * zoom;
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const update = () => {
      const available = node.clientWidth;
      setAutoFit(Math.min(1, available / width));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts?.ready?.catch(() => {});
  }, []);

  const cs = contentScale / 100;
  const contentGap = 12 * cs;
  // Post art reads better centered in the frame; cover banners are
  // bottom-anchored so the icons/url sit near the edge.
  const verticalCenter = mode === "post";

  const items: ContentItem[] = (() => {
    if (mode === "cover") {
      const out: ContentItem[] = [];
      if (showCoverSubtitle) {
        out.push({
          kind: "text",
          text: coverSubtitle,
          size: 18 * cs,
          weight: 500,
          color: ZINC_500,
          uppercase: true,
          letterSpacing: 0.025,
        });
      }
      if (showCoverIcons) {
        out.push({
          kind: "icons",
          size: 56 * cs,
          gap: 32 * cs,
          color: ZINC_400,
          marginBottom: 20 * cs,
        });
      }
      if (showCoverWebsite) {
        out.push({
          kind: "text",
          text: coverWebsite,
          size: 48 * cs,
          weight: 700,
          color: ZINC_400,
        });
      }
      return out;
    }
    const out: ContentItem[] = [];
    if (showPostTitle) {
      out.push({
        kind: "text",
        text: postTitle,
        size: 96 * cs,
        weight: 700,
        color: ZINC_100,
        fontFamily: postTitleMono ? FONT_MONO : FONT_SANS,
      });
    }
    if (showPostSubtitle) {
      out.push({
        kind: "text",
        text: postSubtitle,
        size: 36 * cs,
        weight: 500,
        color: ZINC_400,
      });
    }
    if (showPostIcons) {
      out.push({
        kind: "icons",
        size: 56 * cs,
        gap: 32 * cs,
        color: ZINC_400,
      });
    }
    return out;
  })();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await document.fonts?.ready;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background diagonal gradient (middle stop follows the hue).
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#09090b");
      bg.addColorStop(0.5, colors.bgMid);
      bg.addColorStop(1, "#09090b");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Grid pattern
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = hexToRgba(gridColor, 0.4);
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

      // Orbs
      ctx.save();
      ctx.filter = "blur(64px)";
      ctx.globalAlpha = 0.4;
      const o1cx = width + 100 - 192;
      const o1cy = -100 + 192;
      const orb1 = ctx.createRadialGradient(o1cx, o1cy, 0, o1cx, o1cy, 192);
      orb1.addColorStop(0, primaryColor);
      orb1.addColorStop(0.7, hexToRgba(primaryColor, 0));
      ctx.fillStyle = orb1;
      ctx.beginPath();
      ctx.arc(o1cx, o1cy, 192, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.3;
      const o2cx = -50 + 128;
      const o2cy = height + 50 - 128;
      const orb2 = ctx.createRadialGradient(o2cx, o2cy, 0, o2cx, o2cy, 128);
      orb2.addColorStop(0, secondaryColor);
      orb2.addColorStop(0.7, hexToRgba(secondaryColor, 0));
      ctx.fillStyle = orb2;
      ctx.beginPath();
      ctx.arc(o2cx, o2cy, 128, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Corner accents
      const tl = ctx.createLinearGradient(0, 0, 96, 96);
      tl.addColorStop(0, hexToRgba(primaryColor, 0.2));
      tl.addColorStop(1, hexToRgba(primaryColor, 0));
      ctx.fillStyle = tl;
      ctx.fillRect(0, 0, 96, 96);

      const br = ctx.createLinearGradient(
        width,
        height,
        width - 96,
        height - 96,
      );
      br.addColorStop(0, hexToRgba(secondaryColor, 0.2));
      br.addColorStop(1, hexToRgba(secondaryColor, 0));
      ctx.fillStyle = br;
      ctx.fillRect(width - 96, height - 96, 96, 96);

      // Content
      const totalHeight = items.reduce((sum, item, i) => {
        const h = item.size + (item.marginBottom ?? 0);
        return sum + h + (i > 0 ? contentGap : 0);
      }, 0);
      let cy = verticalCenter
        ? (height - totalHeight) / 2
        : height - bottomPadding - totalHeight;

      let iconImages: HTMLImageElement[] = [];
      const iconsItem = items.find(
        (it): it is IconsItem => it.kind === "icons",
      );
      if (iconsItem && iconsContainerRef.current) {
        const svgs = Array.from(
          iconsContainerRef.current.querySelectorAll("svg"),
        );
        iconImages = await Promise.all(
          svgs.map((s) => svgToImage(s, iconsItem.color)),
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
        if (item.kind === "text") {
          const family = item.fontFamily ?? FONT_SANS;
          ctx.font = `${item.weight} ${item.size}px ${family}`;
          ctx.fillStyle = item.color;
          const ctxAny = ctx as CanvasRenderingContext2D & {
            letterSpacing?: string;
          };
          const prevLs = ctxAny.letterSpacing;
          if (item.letterSpacing && "letterSpacing" in ctx) {
            ctxAny.letterSpacing = `${item.size * item.letterSpacing}px`;
          }
          const text = item.uppercase ? item.text.toUpperCase() : item.text;
          const w = ctx.measureText(text).width;
          ctx.fillText(text, xForWidth(w), cy);
          if ("letterSpacing" in ctx) ctxAny.letterSpacing = prevLs ?? "0px";
          cy += item.size + (item.marginBottom ?? 0);
        } else {
          const count = SOCIAL_ICONS.length;
          const total = count * item.size + (count - 1) * item.gap;
          let x = xForWidth(total);
          for (const img of iconImages) {
            ctx.drawImage(img, x, cy, item.size, item.size);
            x += item.size + item.gap;
          }
          cy += item.size + (item.marginBottom ?? 0);
        }
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const slug = mode === "cover" ? "cover" : "post";
      link.download = `nano-collective-${slug}-${width}x${height}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Asset Generator - Nano Collective</title>
      </Head>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
        {/* Main area */}
        <div
          className={`flex-1 min-w-0 flex flex-col transition-[margin] duration-200 ${
            sidebarOpen ? "lg:mr-[360px]" : "mr-0"
          }`}
        >
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 bg-zinc-950/80 backdrop-blur border-b border-zinc-900">
            <div className="inline-flex rounded-md border border-zinc-800 p-0.5 bg-zinc-900/50">
              <button
                type="button"
                onClick={() => setMode("cover")}
                className={`px-3 py-1.5 text-sm rounded ${
                  mode === "cover"
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Cover
              </button>
              <button
                type="button"
                onClick={() => setMode("post")}
                className={`px-3 py-1.5 text-sm rounded ${
                  mode === "post"
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Post
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 mr-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((z) => Math.max(0.05, z / 1.25))}
                  aria-label="Zoom out"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="text-xs text-zinc-400 hover:text-zinc-100 tabular-nums w-12 text-center"
                  title="Reset zoom"
                >
                  {Math.round(scale * 100)}%
                </button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((z) => Math.min(20, z * 1.25))}
                  aria-label="Zoom in"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading
                  ? "Rendering…"
                  : `Download ${width}×${height} PNG`}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle controls"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 p-4 overflow-auto">
            <div ref={containerRef} className="flex justify-center min-w-fit">
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
                    width={width}
                    height={height}
                    alignment={alignment}
                    bottomPadding={bottomPadding}
                    sidePadding={sidePadding}
                    contentGap={contentGap}
                    verticalCenter={verticalCenter}
                    colors={colors}
                    items={items}
                    iconsContainerRef={iconsContainerRef}
                  />
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs text-zinc-500 text-center">
              Preview is scaled to fit; download produces a {width}×{height} PNG
              rendered directly to canvas.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full w-[360px] bg-zinc-900 border-l border-zinc-800 shadow-xl z-30 transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-100">Controls</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close controls"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div
            className="overflow-y-auto px-4 py-5 space-y-7"
            style={{ height: "calc(100% - 49px)" }}
          >
            <Section title="Dimensions">
              <Field label="Width">
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-28"
                  min={100}
                  max={4000}
                />
              </Field>
              <Field label="Height">
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-28"
                  min={100}
                  max={4000}
                />
              </Field>
            </Section>

            <Section title="Layout">
              <Field label="Align">
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
              </Field>
              <Field label="Side padding">
                <Input
                  type="number"
                  value={sidePadding}
                  onChange={(e) => setSidePadding(Number(e.target.value))}
                  className="w-24"
                  min={0}
                  max={500}
                />
              </Field>
              <Field label="Bottom padding">
                <Input
                  type="number"
                  value={bottomPadding}
                  onChange={(e) => setBottomPadding(Number(e.target.value))}
                  className="w-24"
                  min={0}
                  max={1000}
                />
              </Field>
              <Field label="Scale %">
                <Input
                  type="number"
                  value={contentScale}
                  onChange={(e) => setContentScale(Number(e.target.value))}
                  className="w-24"
                  min={10}
                  max={400}
                  step={5}
                />
              </Field>
            </Section>

            <Section title="Color theme">
              <input
                type="range"
                min={0}
                max={359}
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="w-full h-3 rounded-full cursor-pointer appearance-none"
                style={{
                  background:
                    "linear-gradient(to right, hsl(0 90% 66%), hsl(60 90% 66%), hsl(120 90% 66%), hsl(180 90% 66%), hsl(240 90% 66%), hsl(300 90% 66%), hsl(360 90% 66%))",
                  accentColor: primaryColor,
                }}
                aria-label="Theme hue"
              />
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Hue {hue}°</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded border border-zinc-800"
                    style={{ background: primaryColor }}
                    title={primaryColor}
                  />
                  <span
                    className="w-5 h-5 rounded border border-zinc-800"
                    style={{ background: secondaryColor }}
                    title={secondaryColor}
                  />
                </span>
              </div>
            </Section>

            {mode === "cover" ? (
              <Section title="Cover content">
                <Field label="Subtitle">
                  <Input
                    type="text"
                    value={coverSubtitle}
                    onChange={(e) => setCoverSubtitle(e.target.value)}
                    className="w-44"
                  />
                </Field>
                <Field label="Website">
                  <Input
                    type="text"
                    value={coverWebsite}
                    onChange={(e) => setCoverWebsite(e.target.value)}
                    className="w-44"
                  />
                </Field>
                <div className="flex flex-col gap-2 pt-1">
                  <Checkbox
                    label="Show subtitle"
                    checked={showCoverSubtitle}
                    onChange={setShowCoverSubtitle}
                  />
                  <Checkbox
                    label="Show icons"
                    checked={showCoverIcons}
                    onChange={setShowCoverIcons}
                  />
                  <Checkbox
                    label="Show website"
                    checked={showCoverWebsite}
                    onChange={setShowCoverWebsite}
                  />
                </div>
              </Section>
            ) : (
              <Section title="Post content">
                <Field label="Title">
                  <Input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-44"
                  />
                </Field>
                <Field label="Subtitle">
                  <Input
                    type="text"
                    value={postSubtitle}
                    onChange={(e) => setPostSubtitle(e.target.value)}
                    className="w-44"
                  />
                </Field>
                <div className="flex flex-col gap-2 pt-1">
                  <Checkbox
                    label="Show title"
                    checked={showPostTitle}
                    onChange={setShowPostTitle}
                  />
                  <Checkbox
                    label="Show subtitle"
                    checked={showPostSubtitle}
                    onChange={setShowPostSubtitle}
                  />
                  <Checkbox
                    label="Show icons"
                    checked={showPostIcons}
                    onChange={setShowPostIcons}
                  />
                  <Checkbox
                    label="Monospace title"
                    checked={postTitleMono}
                    onChange={setPostTitleMono}
                  />
                </div>
              </Section>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
