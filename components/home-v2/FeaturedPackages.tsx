import Link from "next/link";
import React from "react";

export function FeaturedPackages() {
  return (
    <section className="py-24 px-6 container mx-auto">
      <div className="mb-16 border-b border-black pb-8">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
          Featured Packages
        </h2>
        <p className="text-lg text-black/70 font-mono">
          Lightweight utilities built by the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* get-md */}
        <div className="bg-white border border-black p-8 group hover:bg-[#FAFAFA] transition-colors flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold text-[#0000EE]">
                [ pkg ]
              </span>
              <h3 className="text-3xl font-bold tracking-tight">get-md</h3>
            </div>
            <span className="font-mono text-xs font-bold bg-[#0000EE]/10 text-[#0000EE] px-3 py-1 uppercase tracking-wider">
              TypeScript
            </span>
          </div>
          <p className="text-lg text-black/70 leading-relaxed mb-8 flex-grow">
            A fast, lightweight HTML to Markdown converter optimized for LLM
            consumption. Clean, well-structured markdown with intelligent
            content extraction.
          </p>
          <div>
            <a
              href="https://github.com/Nano-Collective/get-md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center border border-black bg-transparent px-8 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <span className="mr-3 font-bold text-[#0000EE] group-hover:text-white transition-colors">&gt;</span> 
              View on GitHub
            </a>
          </div>
        </div>

        {/* json-up */}
        <div className="bg-white border border-black p-8 group hover:bg-[#FAFAFA] transition-colors flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold text-[#0000EE]">
                [ pkg ]
              </span>
              <h3 className="text-3xl font-bold tracking-tight">json-up</h3>
            </div>
            <span className="font-mono text-xs font-bold bg-[#0000EE]/10 text-[#0000EE] px-3 py-1 uppercase tracking-wider">
              TypeScript
            </span>
          </div>
          <p className="text-lg text-black/70 leading-relaxed mb-8 flex-grow">
            A fast, type-safe JSON migration tool with Zod schema validation.
            Fluent builder API with automatic version tracking and full
            TypeScript type inference.
          </p>
          <div>
            <a
              href="https://github.com/Nano-Collective/json-up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center border border-black bg-transparent px-8 text-sm font-semibold tracking-wide text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <span className="mr-3 font-bold text-[#0000EE] group-hover:text-white transition-colors">&gt;</span> 
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
