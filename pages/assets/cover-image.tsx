"use client";

import Head from "next/head";
import { type CSSProperties, useState } from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Alignment = "left" | "center" | "right";

export default function CoverImage() {
  const [width, setWidth] = useState(1500);
  const [height, setHeight] = useState(500);
  const [alignment, setAlignment] = useState<Alignment>("center");
  const [bottomPadding, setBottomPadding] = useState(40);
  const [sidePadding, setSidePadding] = useState(40);
  const [showWebsite, setShowWebsite] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);

  const getPositionStyles = (): CSSProperties => {
    switch (alignment) {
      case "left":
        return {
          left: sidePadding,
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
          right: sidePadding,
          transform: "none",
          textAlign: "right",
          alignItems: "flex-end",
        };
    }
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
        </div>

        <div className="flex justify-center">
          {/* Cover Preview */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-[#1a1a2e] to-zinc-950" />

            {/* Grid pattern */}
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

            {/* Glowing orbs */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                top: "-100px",
                right: "-100px",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
                bottom: "-50px",
                left: "-50px",
                animation: "pulse 4s ease-in-out infinite 2s",
              }}
            />

            {/* Content - website and social icons */}
            <div
              className="absolute z-10 flex flex-col gap-3"
              style={{
                bottom: `${bottomPadding}px`,
                ...getPositionStyles(),
              }}
            >
              {showSubtitle && (
                <p className="text-lg font-medium text-zinc-500 uppercase tracking-wide">
                  Join the collective
                </p>
              )}
              {showIcons && (
                <div className="flex items-center gap-8 mb-5">
                  <a
                    href="https://github.com/Nano-Collective"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-14 h-14" />
                  </a>
                  <a
                    href="https://discord.gg/ktPDV6rekE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <FaDiscord className="w-14 h-14" />
                  </a>
                  <a
                    href="https://x.com/nano_collective"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <FaXTwitter className="w-14 h-14" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/nano-collective/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-14 h-14" />
                  </a>
                </div>
              )}
              {showWebsite && (
                <p className="text-5xl font-bold text-zinc-400">
                  nanocollective.org
                </p>
              )}
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-transparent" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent" />

            <style jsx global>{`
              @keyframes pulse {
                0%,
                100% {
                  transform: scale(1);
                  opacity: 0.4;
                }
                50% {
                  transform: scale(1.1);
                  opacity: 0.2;
                }
              }
            `}</style>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500 text-center">
          Zoom the page so the banner is fully visible • Screenshot & crop
        </p>
      </div>
    </>
  );
}
