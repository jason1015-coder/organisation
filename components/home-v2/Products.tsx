"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Terminal } from "@/components/ui/Terminal";
import NanocoderTerminal from "@/components/NanocoderTerminal";

interface ProductsProps {
  nanocoderVersion: string;
}

export function Products({ nanocoderVersion }: ProductsProps) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    const updateTheme = () => {
      setThemeMode(html.classList.contains("dark") ? "dark" : "light");
    };
    
    updateTheme();
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="py-12 md:py-24 px-4 md:px-6 container mx-auto">
      <div className="mb-8 sm:mb-16 border-b border-foreground/20 pb-4 sm:pb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-lg text-foreground/70 font-mono">
          Open-source tools built by the community.
        </p>
      </div>

      <div className="flex flex-col gap-8 sm:gap-16">
        {/* Nanocoder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-0 items-stretch bg-background border border-foreground/20 group relative overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
          <div className="space-y-4 sm:space-y-8 p-8 lg:p-12 lg:pr-16 lg:border-r border-foreground/20 flex flex-col justify-center relative z-10">
            <div className="space-y-2 sm:space-y-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA]">
                  [ 01 ]
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Nanocoder</h3>
              </div>
              <p className="text-sm sm:text-lg text-foreground/70 leading-relaxed">
                An open-source, local-first coding agent. Automate your
                workflows without sending your proprietary code to the cloud.
              </p>
            </div>

            <ul className="space-y-3 py-4 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">Local-first architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">Multi-provider model support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">Extensible skills system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">Workflow automation</span>
              </li>
            </ul>

            <div>
              <Link
                href="/nanocoder"
                className="inline-flex h-12 items-center justify-center rounded-none bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Nanocoder
              </Link>
            </div>
          </div>

          <div className="bg-muted p-4 md:p-8 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-full">
              <NanocoderTerminal version={nanocoderVersion} themeMode={themeMode} variant="brutalist" />
            </div>
          </div>
        </div>

        {/* Nanotune Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-0 items-stretch bg-background border border-foreground/20 group relative overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
          <div className="space-y-4 sm:space-y-8 p-8 lg:p-12 flex flex-col justify-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA]">
                  [ 02 ]
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Nanotune</h3>
              </div>
              <p className="text-sm sm:text-lg text-foreground/70 leading-relaxed">
                Fine-tune LLMs locally on your own hardware. Optimize weights
                for your specific workflows effortlessly.
              </p>
            </div>

            <ul className="space-y-3 py-4 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">LoRA & QLoRA training</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">Automated benchmarking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                <span className="text-foreground">GGUF/Ollama export support</span>
              </li>
            </ul>

            <div>
              <Link
                href="/nanotune"
                className="inline-flex h-12 items-center justify-center rounded-none bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Nanotune
              </Link>
            </div>
          </div>
          <div className="bg-muted p-4 md:p-8 flex items-center justify-center overflow-hidden lg:order-last lg:border-l border-foreground/20">
            <div className="w-full relative z-10 border border-foreground/20 bg-background">
              {/* biome-ignore lint/performance/noImgElement: GIF animation needs native img */}
              <img
                src="/nanotune/example.gif"
                alt="Nanotune CLI demonstration"
                className="w-full h-auto object-contain invert hue-rotate-180 contrast-[1.1] brightness-[1.1] dark:invert-0 dark:hue-rotate-0 dark:contrast-100 dark:brightness-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
