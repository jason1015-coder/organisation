import {
  ArrowRight,
  Check,
  Code,
  Copy,
  Cpu,
  Globe,
  Server,
  Settings,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Footer } from "@/components/layout-v2/Footer";
import NanocoderTerminal from "@/components/NanocoderTerminal";
import { SponsorLogo } from "@/components/SponsorLogo";
import { allSponsors } from "@/lib/sponsors";

interface NanocoderStats {
  stars: number;
  contributors: number;
  forks: number;
  releases: number;
  discordMembers: number;
  error: string | null;
}

interface NanocoderPageProps {
  stats: NanocoderStats;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-2 shrink-0 hover:bg-foreground/10 transition-colors border-l border-foreground/10 flex items-center justify-center group">
      {copied ? <Check className="w-4 h-4 text-[#0000EE] dark:text-[#A1A1AA]" /> : <Copy className="w-4 h-4 text-foreground/50 group-hover:text-[#0000EE] dark:group-hover:text-[#A1A1AA] transition-colors" />}
    </button>
  );
};

export default function NanocoderPage({ stats }: NanocoderPageProps) {
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
    <>
      <Head>
        <title>Nanocoder | Nano Collective</title>
        <meta
          name="description"
          content="An open coding agent for your terminal, built by a community collective rather than a company."
        />
        <meta property="og:title" content="Nanocoder | Nano Collective" />
        <meta
          property="og:description"
          content="An open coding agent for your terminal, built by a community collective rather than a company."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanocollective.org/nanocoder" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* 1. Hero Section */}
        <section className="relative pt-12 pb-12 sm:pb-20 px-4 md:px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16 items-center">
            {/* Left side: Typography */}
            <div className="space-y-4 sm:space-y-8 lg:pr-8">
              <div className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest border-b border-foreground/20 pb-2 max-w-[250px]">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                OPEN SOURCE CODING AGENT
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-foreground break-words">
                Nanocoder
              </h1>
              
              <p className="text-sm sm:text-lg sm:text-xl text-foreground/70 max-w-[540px] leading-relaxed">
                An open coding agent for your terminal, built by a community collective rather than a company. Bring your own model, keep your code on your machine, and owe nothing to anyone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href="https://github.com/Nano-Collective/nanocoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-none bg-[#0000EE] dark:bg-foreground px-8 text-xs sm:text-sm font-semibold tracking-wide text-white dark:text-background transition-colors hover:bg-[#0000EE]/90 dark:hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
                <a
                  href="https://docs.nanocollective.org/nanocoder/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-none border border-foreground/20 bg-background px-8 text-xs sm:text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Documentation
                </a>
              </div>
            </div>
            
            <div className="w-full flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0 max-w-full overflow-hidden pt-4 pb-4">
              <div className="w-full max-w-[700px] border-1 border-[#0000EE] dark:border-[#A1A1AA] bg-muted relative">
                <NanocoderTerminal variant="brutalist" themeMode={themeMode} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Community Stats */}
        <section className="border-y-2 border-foreground/20 bg-background">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-start md:items-center gap-y-8 gap-x-4 max-w-5xl mx-auto">
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {stats.stars.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  GitHub Stars
                </span>
              </div>
              <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {stats.contributors.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  Contributors
                </span>
              </div>
              <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {stats.forks.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  Forks
                </span>
              </div>
              <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {stats.releases.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  Releases
                </span>
              </div>
              <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {stats.discordMembers.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  Discord Members
                </span>
              </div>

            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* 3. What Is Nanocoder */}
          <section className="py-16 sm:py-24 border-b border-foreground/20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  The open alternative.
                </h2>
                <div className="space-y-6 text-md sm:text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                  <p>
                    Nanocoder is a community-built, multi-provider coding agent that runs entirely in your terminal. It connects to Ollama for local execution, or OpenRouter, Anthropic, and Google for cloud inference.
                  </p>
                  <p>
                    Built by the Nano Collective rather than a company, it enforces a strict privacy-first model: your codebase never leaves your machine unless you explicitly send it to an API of your choice. No tracking, no forced telemetry, no vendor lock-in.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Feature Grid */}
          <section className="py-16 sm:py-24 border-b border-foreground/20 bg-muted/5">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16 text-center md:text-left">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Premium capabilities.
                    <br/>
                    <span className="text-foreground/50 md:ml-3">Zero paid tiers.</span>
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/20 border border-foreground/20">
                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Local First</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Runs entirely on your machine. Connect to local Ollama models for completely offline, zero-cost agentic coding.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Multi Provider</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Seamlessly switch between OpenRouter, Anthropic, OpenAI, and Google. You choose the intelligence engine.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Skills System</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Extend behavior through custom skills. Teach Nanocoder your codebase's exact conventions and workflows.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Settings className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Custom Tools</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Create and integrate your own Bash or Python tools directly into the agent's toolbelt.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Server className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Multiple Modes</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Boot directly into Normal, Plan, Auto-Accept, or YOLO mode depending on your trust level for the task.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Code className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Open Source</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Built in public by contributors. The codebase is yours to read, audit, and improve.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Privacy First</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      No forced telemetry. No silent data collection. Complete control over what leaves your network.
                    </p>
                  </div>

                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">Terminal Native</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Designed explicitly for terminal workflows. Fits seamlessly into your existing developer environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Workflow Examples */}
          <section className="py-16 sm:py-24 border-b border-foreground/20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Realistic workflows.
                  </h2>
                  <p className="text-md text-foreground/70 mt-4 max-w-2xl mx-auto">
                    Nanocoder handles architecture, refactoring, and feature building natively in your terminal.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Example 1 */}
                  <div className="flex flex-col border border-foreground/20 bg-background">
                    <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                      <Terminal className="w-4 h-4" />
                      Refactor
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                      <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanocoder run "refactor database module"</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Analyzing src/db/index.ts...</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Found 12 raw SQL queries.</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Converting to Prisma ORM syntax...</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Modified src/db/users.ts</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-4">  Modified src/db/posts.ts</div>
                      <div className="text-green-600 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Refactor completed successfully.</div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="flex flex-col border border-foreground/20 bg-background">
                    <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                      <Terminal className="w-4 h-4" />
                      Audit
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                      <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanocoder --mode plan run "audit auth module"</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Generating implementation plan...</div>
                      <div className="text-foreground/80 dark:text-zinc-300 mb-4 border-l-2 border-foreground/20 dark:border-zinc-700 pl-4 py-2 bg-muted/50 dark:bg-zinc-900/50">
                        1. Check JWT expiration logic<br/>
                        2. Verify password hashing rounds<br/>
                        3. Audit rate limiting on /login
                      </div>
                      <div className="text-amber-600 dark:text-yellow-400 mb-4 flex items-center gap-2">⚠ Found missing rate limiter on /login</div>
                      <div className="text-foreground/50 dark:text-zinc-500 flex items-center gap-2">Waiting for user approval to proceed...</div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="flex flex-col border border-foreground/20 bg-background">
                    <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                      <Terminal className="w-4 h-4" />
                      Build
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                      <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanocoder run "create settings page"</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Creating route handlers...</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Created app/settings/page.tsx</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Building UI components...</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Created components/SettingsForm.tsx</div>
                      <div className="text-foreground/90 dark:text-blue-400 mb-2">● Generating tests...</div>
                      <div className="text-foreground/50 dark:text-zinc-500 mb-4">  Created __tests__/Settings.test.tsx</div>
                      <div className="text-green-600 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Feature built and tests passed.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Quick Start */}
          <section className="py-16 sm:py-24 border-b border-foreground/20 bg-muted/10">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Install in seconds.
                  </h2>
                  <p className="text-md text-foreground/70">
                    Zero complex setup. Available on your favorite package manager.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 border border-foreground/20 bg-background p-4 sm:p-6 shadow-sm">
                    <div className="w-24 font-bold text-foreground/50 uppercase tracking-widest text-sm text-left w-full sm:w-auto mb-2 sm:mb-0">NPM</div>
                    <div className="flex-1 font-mono text-sm bg-muted/30 border border-foreground/10 w-full flex items-center justify-between">
                      <div className="px-4 py-3 overflow-x-auto whitespace-pre">npm install -g @nanocollective/nanocoder</div>
                      <CopyButton text="npm install -g @nanocollective/nanocoder" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 border border-foreground/20 bg-background p-4 sm:p-6 shadow-sm">
                    <div className="w-24 font-bold text-foreground/50 uppercase tracking-widest text-sm text-left w-full sm:w-auto mb-2 sm:mb-0">Homebrew</div>
                    <div className="flex-1 font-mono text-sm bg-muted/30 border border-foreground/10 w-full flex items-center justify-between">
                      <div className="px-4 py-3 overflow-x-auto whitespace-pre">brew install nanocoder</div>
                      <CopyButton text="brew install nanocoder" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 border border-foreground/20 bg-background p-4 sm:p-6 shadow-sm">
                    <div className="w-24 font-bold text-foreground/50 uppercase tracking-widest text-sm text-left w-full sm:w-auto mb-2 sm:mb-0">Nix Flakes</div>
                    <div className="flex-1 font-mono text-sm bg-muted/30 border border-foreground/10 w-full flex items-center justify-between">
                      <div className="px-4 py-3 overflow-x-auto whitespace-pre">nix run github:Nano-Collective/nanocoder</div>
                      <CopyButton text="nix run github:Nano-Collective/nanocoder" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 7. Why Developers Choose Nanocoder */}
          <section className="py-16 sm:py-24 border-b border-foreground/20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
                    Why developers choose Nanocoder
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Code className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">100% Open Source</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        Read the code. Audit the code. Improve the code. It belongs to the community, not a corporation.
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">Local Architecture</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        Designed from the ground up to run inference locally, ensuring maximum privacy and zero latency costs.
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">Bring Your Own Model</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        Plug in any compatible local model, or route through the APIs you already pay for.
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">Zero Vendor Lock-In</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        If you don't like Nanocoder, you can uninstall it. Your project history and Git tree remain completely untouched.
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">Community Driven</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        Features are built based on what developers actually need, not what looks good in a marketing pitch.
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-foreground/20 p-8 group hover:bg-muted transition-all hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <Settings className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">Highly Extensible</h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        A robust plugin ecosystem means you can tailor the agent perfectly to your unique tech stack.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Sponsors */}
          <section className="py-12 md:py-24 px-4 md:px-6 container mx-auto border-b border-foreground/20">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 sm:mb-16 border-b border-foreground/20 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                    Supported by
                  </h2>
                  <p className="text-sm sm:text-lg text-foreground/70 font-mono max-w-2xl leading-relaxed">
                    Sponsorship funds the people building open, privacy-respecting AI
                    tools, and keeps every line of it free at the point of use.
                  </p>
                </div>
                <Link
                  href="/sponsor"
                  className="inline-flex h-12 items-center justify-center rounded-none bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground shrink-0"
                >
                  Become a sponsor
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allSponsors.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor.name}
                    sponsor={sponsor}
                    className="rounded-none border-foreground/20 hover:border-foreground/20 bg-background hover:bg-muted h-24 sm:h-32 flex items-center justify-center p-8 transition-colors group"
                    imgClassName="max-h-8 sm:max-h-12 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                  />
                ))}
                {["a", "b"].slice(0, Math.max(0, 2 - allSponsors.length)).map((slot) => (
                  <Link
                    key={slot}
                    href="/sponsor"
                    className="bg-transparent border border-dashed border-foreground/20/30 h-24 sm:h-32 flex items-center justify-center group hover:border-foreground/20 transition-colors"
                  >
                    <span className="font-mono text-sm font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                      [ Your brand here ]
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Final CTA */}
          <section className="py-20 md:py-32 px-4 md:px-6 bg-[#0000EE] text-white">
            <div className="container mx-auto max-w-3xl text-center">
              <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest mb-6 opacity-80">
                [ Join the Collective ]
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8">
                Build with us.
              </h2>
              <p className="text-sm sm:text-lg md:text-xl opacity-90 mb-12 leading-relaxed max-w-2xl mx-auto">
                Join developers building the future of local-first AI tooling.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://docs.nanocollective.org/nanocoder/getting-started"
                  className="inline-flex h-14 items-center justify-center rounded-none bg-white px-10 text-sm font-bold tracking-wide text-[#0000EE] transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
                >
                  Get Started
                </a>
                <a
                  href="https://github.com/Nano-Collective/nanocoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-none border-2 border-white bg-transparent px-10 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<NanocoderPageProps> = async () => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const stats: NanocoderStats = {
    stars: 1250,
    contributors: 42,
    forks: 85,
    releases: 14,
    discordMembers: 1500,
    error: null,
  };

  try {
    // Repo stats
    const repoRes = await fetch("https://api.github.com/repos/Nano-Collective/nanocoder", { headers });
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      stats.stars = repoData.stargazers_count || stats.stars;
      stats.forks = repoData.forks_count || stats.forks;
    }

    // Releases count
    const releasesRes = await fetch("https://api.github.com/repos/Nano-Collective/nanocoder/releases?per_page=100", { headers });
    if (releasesRes.ok) {
      const releasesData = await releasesRes.json();
      if (Array.isArray(releasesData) && releasesData.length > 0) {
        stats.releases = releasesData.length;
      }
    }

    // Contributors count
    const contributorsRes = await fetch("https://api.github.com/repos/Nano-Collective/nanocoder/contributors?per_page=100", { headers });
    if (contributorsRes.ok) {
      const contributorsData = await contributorsRes.json();
      if (Array.isArray(contributorsData) && contributorsData.length > 0) {
        stats.contributors = contributorsData.length;
      }
    }

    // Discord members
    const discordRes = await fetch("https://discord.com/api/invites/ktPDV6rekE?with_counts=true");
    if (discordRes.ok) {
      const data = await discordRes.json();
      if (data.approximate_member_count) {
        stats.discordMembers = data.approximate_member_count;
      }
    }
  } catch (error) {
    console.error("Error fetching nanocoder stats:", error);
    stats.error = "Failed to fetch actual metrics";
  }

  return {
    props: {
      stats,
    },
  };
};
