import Link from "next/link";
import React from "react";
import { Terminal } from "@/components/ui/Terminal";
import NanocoderTerminal from "@/components/NanocoderTerminal";

interface ProductsProps {
  nanocoderVersion: string;
}

export function Products({ nanocoderVersion }: ProductsProps) {
  return (
    <section id="products" className="py-24 px-6 container mx-auto">
      <div className="mb-16 border-b border-black pb-8">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
          Featured Projects
        </h2>
        <p className="text-lg text-black/70 font-mono">
          Open-source tools built by the community.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {/* Nanocoder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-stretch bg-white border border-black group relative">
          <div className="space-y-8 p-8 lg:p-12 lg:pr-16 lg:border-r border-black flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-[#0000EE]">
                  [ 01 ]
                </span>
                <h3 className="text-3xl font-bold tracking-tight">Nanocoder</h3>
              </div>
              <p className="text-lg text-black/70 leading-relaxed">
                An open-source, local-first coding agent. Automate your
                workflows without sending your proprietary code to the cloud.
              </p>
            </div>

            <ul className="space-y-3 py-4 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">Local-first architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">Multi-provider model support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">Extensible skills system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">Workflow automation</span>
              </li>
            </ul>

            <div>
              <Link
                href="/nanocoder"
                className="inline-flex h-12 items-center justify-center rounded-none bg-black px-8 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Nanocoder
              </Link>
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
            <div className="w-full relative z-10">
              <NanocoderTerminal version={nanocoderVersion} themeMode="light" variant="brutalist" />
            </div>
          </div>
        </div>

        {/* Nanotune Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-stretch bg-white border border-black group relative">
          <div className="p-8 lg:p-12 bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden lg:order-last lg:border-l border-black">
            <div className="w-full relative z-10 border border-black bg-white">
              {/* biome-ignore lint/performance/noImgElement: GIF animation needs native img */}
              <img
                src="/nanotune/example.gif"
                alt="Nanotune CLI demonstration"
                className="w-full h-auto object-contain invert hue-rotate-180 contrast-[1.1] brightness-[1.1]"
              />
            </div>
          </div>

          <div className="space-y-8 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-[#0000EE]">
                  [ 02 ]
                </span>
                <h3 className="text-3xl font-bold tracking-tight">Nanotune</h3>
              </div>
              <p className="text-lg text-black/70 leading-relaxed">
                Fine-tune LLMs locally on your own hardware. Optimize weights
                for your specific workflows effortlessly.
              </p>
            </div>

            <ul className="space-y-3 py-4 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">LoRA & QLoRA training</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">Automated benchmarking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0000EE] font-bold">&gt;</span>
                <span className="text-black">GGUF/Ollama export support</span>
              </li>
            </ul>

            <div>
              <Link
                href="/nanotune"
                className="inline-flex h-12 items-center justify-center rounded-none bg-black px-8 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Nanotune
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
