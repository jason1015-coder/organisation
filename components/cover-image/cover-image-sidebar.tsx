// Right-hand sidebar with every control. Stateless: it receives the
// current values + setters from the page and renders them. Splitting
// this out keeps the page file focused on layout and the render path.

import { X } from "lucide-react";
import { Checkbox, Field, Section } from "@/components/cover-image/controls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPACING_LABELS } from "@/lib/cover-image/spacing";
import type {
  BgStyle,
  FontFamily,
  Mode,
  Pattern,
  Spacing,
} from "@/lib/cover-image/types";

type SizePreset = { label: string; w: number; h: number };

// Sentinel for the "no preset selected" state in the dropdown. We can't
// use an empty string here because Radix Select's value would resolve
// to the literal text of an item with that value.
const CUSTOM_PRESET = "custom" as const;

const SIZE_PRESETS: SizePreset[] = [
  { label: "OG 1200×630", w: 1200, h: 630 },
  { label: "Square 1080", w: 1080, h: 1080 },
  { label: "Banner 1500×500", w: 1500, h: 500 },
  { label: "Story 1080×1920", w: 1080, h: 1920 },
];

export type SidebarState = {
  // Mode + dimensions
  mode: Mode;
  width: number;
  height: number;
  setWidth: (n: number) => void;
  setHeight: (n: number) => void;
  // Layout
  alignment: "left" | "center" | "right";
  setAlignment: (v: "left" | "center" | "right") => void;
  sidePadding: number;
  bottomPadding: number;
  contentScale: number;
  setSidePadding: (n: number) => void;
  setBottomPadding: (n: number) => void;
  setContentScale: (n: number) => void;
  spacing: Spacing;
  setSpacing: (v: Spacing) => void;
  // Color theme
  hue: number;
  setHue: (n: number) => void;
  primaryColor: string;
  secondaryColor: string;
  pattern: Pattern;
  setPattern: (v: Pattern) => void;
  bgStyle: BgStyle;
  setBgStyle: (v: BgStyle) => void;
  // Cover content
  coverSubtitle: string;
  setCoverSubtitle: (v: string) => void;
  coverWebsite: string;
  setCoverWebsite: (v: string) => void;
  showCoverSubtitle: boolean;
  showCoverIcons: boolean;
  showCoverWebsite: boolean;
  setShowCoverSubtitle: (v: boolean) => void;
  setShowCoverIcons: (v: boolean) => void;
  setShowCoverWebsite: (v: boolean) => void;
  // Post content
  postTitle: string;
  setPostTitle: (v: string) => void;
  postSubtitle: string;
  setPostSubtitle: (v: string) => void;
  postTitleFont: FontFamily;
  setPostTitleFont: (v: FontFamily) => void;
  postSubtitleFont: FontFamily;
  setPostSubtitleFont: (v: FontFamily) => void;
  postTitleSize: number;
  setPostTitleSize: (n: number) => void;
  postSubtitleSize: number;
  setPostSubtitleSize: (n: number) => void;
  postTitleMono: boolean;
  setPostTitleMono: (v: boolean) => void;
  postBadges: string;
  setPostBadges: (v: string) => void;
  showPostTitle: boolean;
  showPostSubtitle: boolean;
  showPostBadges: boolean;
  showPostIcons: boolean;
  setShowPostTitle: (v: boolean) => void;
  setShowPostSubtitle: (v: boolean) => void;
  setShowPostBadges: (v: boolean) => void;
  setShowPostIcons: (v: boolean) => void;
};

export function CoverImageSidebar({
  open,
  onClose,
  state,
}: {
  open: boolean;
  onClose: () => void;
  state: SidebarState;
}) {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[360px] bg-background border-l border-foreground/20 shadow-xl z-30 transition-transform duration-200 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/20">
        <h2 className="text-sm font-semibold text-foreground">Controls</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close controls"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div
        className="overflow-y-auto px-4 py-5 space-y-7"
        style={{ height: "calc(100% - 49px)" }}
      >
        <DimensionsSection state={state} />
        <LayoutSection state={state} />
        <ColorThemeSection state={state} />
        {state.mode === "cover" ? (
          <CoverContentSection state={state} />
        ) : (
          <PostContentSection state={state} />
        )}
      </div>
    </aside>
  );
}

function DimensionsSection({ state }: { state: SidebarState }) {
  return (
    <Section title="Dimensions">
      <Field label="Width">
        <Input
          type="number"
          value={state.width}
          onChange={(e) => state.setWidth(Number(e.target.value))}
          className="w-28"
          min={100}
          max={4000}
        />
      </Field>
      <Field label="Height">
        <Input
          type="number"
          value={state.height}
          onChange={(e) => state.setHeight(Number(e.target.value))}
          className="w-28"
          min={100}
          max={4000}
        />
      </Field>
      <Field label="Preset">
        <Select
          value={
            SIZE_PRESETS.find(
              (p) => p.w === state.width && p.h === state.height,
            )?.label ?? CUSTOM_PRESET
          }
          onValueChange={(v) => {
            if (v === CUSTOM_PRESET) return;
            const preset = SIZE_PRESETS.find((p) => p.label === v);
            if (preset) {
              state.setWidth(preset.w);
              state.setHeight(preset.h);
            }
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SIZE_PRESETS.map((p) => (
              <SelectItem key={p.label} value={p.label}>
                {p.label}
              </SelectItem>
            ))}
            <SelectItem value={CUSTOM_PRESET}>Custom</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </Section>
  );
}

function LayoutSection({ state }: { state: SidebarState }) {
  return (
    <Section title="Layout">
      <Field label="Align">
        <Select
          value={state.alignment}
          onValueChange={(v) =>
            state.setAlignment(v as "left" | "center" | "right")
          }
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
          value={state.sidePadding}
          onChange={(e) => state.setSidePadding(Number(e.target.value))}
          className="w-24"
          min={0}
          max={500}
        />
      </Field>
      <Field label="Bottom padding">
        <Input
          type="number"
          value={state.bottomPadding}
          onChange={(e) => state.setBottomPadding(Number(e.target.value))}
          className="w-24"
          min={0}
          max={1000}
        />
      </Field>
      <Field label="Scale %">
        <Input
          type="number"
          value={state.contentScale}
          onChange={(e) => state.setContentScale(Number(e.target.value))}
          className="w-24"
          min={10}
          max={400}
          step={5}
        />
      </Field>
      <Field label="Spacing">
        <Select
          value={state.spacing}
          onValueChange={(v) => state.setSpacing(v as Spacing)}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SPACING_LABELS) as Spacing[]).map((s) => (
              <SelectItem key={s} value={s}>
                {SPACING_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </Section>
  );
}

function ColorThemeSection({ state }: { state: SidebarState }) {
  return (
    <Section title="Color theme">
      <input
        type="range"
        min={0}
        max={359}
        value={state.hue}
        onChange={(e) => state.setHue(Number(e.target.value))}
        className="w-full h-3 rounded-full cursor-pointer appearance-none"
        style={{
          background:
            "linear-gradient(to right, hsl(0 90% 66%), hsl(60 90% 66%), hsl(120 90% 66%), hsl(180 90% 66%), hsl(240 90% 66%), hsl(300 90% 66%), hsl(360 90% 66%))",
          accentColor: state.primaryColor,
        }}
        aria-label="Theme hue"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Hue {state.hue}°</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-5 h-5 rounded-none border border-foreground/20"
            style={{ background: state.primaryColor }}
            title={state.primaryColor}
          />
          <span
            className="w-5 h-5 rounded-none border border-foreground/20"
            style={{ background: state.secondaryColor }}
            title={state.secondaryColor}
          />
        </span>
      </div>
      <Field label="Pattern">
        <Select
          value={state.pattern}
          onValueChange={(v) => state.setPattern(v as Pattern)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
            <SelectItem value="diagonal">Diagonal</SelectItem>
            <SelectItem value="waves">Waves</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Background">
        <Select
          value={state.bgStyle}
          onValueChange={(v) => state.setBgStyle(v as BgStyle)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="radial">Radial</SelectItem>
            <SelectItem value="mesh">Mesh</SelectItem>
            <SelectItem value="solid">Solid</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </Section>
  );
}

function CoverContentSection({ state }: { state: SidebarState }) {
  return (
    <Section title="Cover content">
      <Field label="Subtitle">
        <Input
          type="text"
          value={state.coverSubtitle}
          onChange={(e) => state.setCoverSubtitle(e.target.value)}
          className="w-44"
        />
      </Field>
      <Field label="Website">
        <Input
          type="text"
          value={state.coverWebsite}
          onChange={(e) => state.setCoverWebsite(e.target.value)}
          className="w-44"
        />
      </Field>
      <div className="flex flex-col gap-2 pt-1">
        <Checkbox
          label="Show subtitle"
          checked={state.showCoverSubtitle}
          onChange={state.setShowCoverSubtitle}
        />
        <Checkbox
          label="Show icons"
          checked={state.showCoverIcons}
          onChange={state.setShowCoverIcons}
        />
        <Checkbox
          label="Show website"
          checked={state.showCoverWebsite}
          onChange={state.setShowCoverWebsite}
        />
      </div>
    </Section>
  );
}

function PostContentSection({ state }: { state: SidebarState }) {
  return (
    <Section title="Post content">
      <Field label="Title">
        <Input
          type="text"
          value={state.postTitle}
          onChange={(e) => state.setPostTitle(e.target.value)}
          className="w-44"
        />
      </Field>
      <Field label="Title font">
        <Select
          value={state.postTitleFont}
          onValueChange={(v) => state.setPostTitleFont(v as FontFamily)}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mono">Mono</SelectItem>
            <SelectItem value="sans">Sans</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="display">Display</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Title size %">
        <Input
          type="number"
          value={state.postTitleSize}
          onChange={(e) => state.setPostTitleSize(Number(e.target.value))}
          className="w-24"
          min={50}
          max={200}
          step={5}
        />
      </Field>
      <Field label="Subtitle">
        <Input
          type="text"
          value={state.postSubtitle}
          onChange={(e) => state.setPostSubtitle(e.target.value)}
          className="w-44"
        />
      </Field>
      <Field label="Subtitle font">
        <Select
          value={state.postSubtitleFont}
          onValueChange={(v) => state.setPostSubtitleFont(v as FontFamily)}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mono">Mono</SelectItem>
            <SelectItem value="sans">Sans</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="display">Display</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Subtitle size %">
        <Input
          type="number"
          value={state.postSubtitleSize}
          onChange={(e) => state.setPostSubtitleSize(Number(e.target.value))}
          className="w-24"
          min={50}
          max={200}
          step={5}
        />
      </Field>
      <Field label="Badges">
        <Input
          type="text"
          value={state.postBadges}
          onChange={(e) => state.setPostBadges(e.target.value)}
          className="w-44"
          placeholder="open-source, typescript, cli"
        />
      </Field>
      <div className="flex flex-col gap-2 pt-1">
        <Checkbox
          label="Show title"
          checked={state.showPostTitle}
          onChange={state.setShowPostTitle}
        />
        <Checkbox
          label="Show subtitle"
          checked={state.showPostSubtitle}
          onChange={state.setShowPostSubtitle}
        />
        <Checkbox
          label="Show badges"
          checked={state.showPostBadges}
          onChange={state.setShowPostBadges}
        />
        <Checkbox
          label="Show icons"
          checked={state.showPostIcons}
          onChange={state.setShowPostIcons}
        />
        <Checkbox
          label="Monospace title"
          checked={state.postTitleMono}
          onChange={state.setPostTitleMono}
        />
      </div>
    </Section>
  );
}
