import Link from "next/link";
import React from "react";
import AsciiWebsiteBackgroundGenerated from "@/components/ui/AsciiWebsiteBackgroundGenerated";

export function Hero() {
  return (
    <section className="pt-12 pb-12 sm:pb-20 px-6 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16 items-center">
        {/* Left side: Typography */}
        <div className="space-y-4 sm:space-y-8 lg:pr-8">
          <div className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest border-b border-black pb-2 max-w-[200px]">
            <span className="text-[#0000EE] font-bold">&gt;</span>
            Open Source AI Tools
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-black break-words">
            Developer tools for the local-first AI future
          </h1>

          <p className="text-sm sm:text-lg sm:text-xl text-black/70 max-w-[540px] leading-relaxed">
            Nano Collective builds privacy-first, local-first AI tools that help
            developers build, automate, and ship faster without surrendering
            control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 pt-4 sm:pt-6">
            <Link
              href="#products"
              className="inline-flex h-12 items-center justify-center rounded-none bg-[#0000EE] px-8 text-xs sm:text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#0000EE]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Explore Products
            </Link>
            <a
              href="https://github.com/Nano-Collective"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-none border border-black bg-white px-8 text-xs sm:text-sm font-semibold tracking-wide text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0 max-w-full overflow-hidden pt-4 pb-4 pr-4 pl-1">
          <div className="bg-[#FAFAFA] border-2 border-[#0000EE] shadow-[4px_4px_0px_0px_rgba(0,0,238,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,238,1)] transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,238,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,238,1)] max-w-[600px] overflow-hidden w-full">
            <div className="w-full overflow-hidden">
              <AsciiWebsiteBackgroundGenerated />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
