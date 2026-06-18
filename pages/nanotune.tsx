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
import { SponsorLogo } from "@/components/SponsorLogo";
import { allSponsors } from "@/lib/sponsors";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  SubtleButtonLink,
  CardHover,
  FadeIn
} from "@/components/ui/motion";

interface NanotuneStats {
  stars: number;
  contributors: number;
  forks: number;
  releases: number;
  discordMembers: number;
  error: string | null;
}

interface NanotunePageProps {
  stats: NanotuneStats;
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

export default function NanotunePage({ stats }: NanotunePageProps) {
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
        <title>Nanotune | Nano Collective</title>
        <meta
          name="description"
          content="An open coding agent for your terminal, built by a community collective rather than a company."
        />
        <meta property="og:title" content="Nanotune | Nano Collective" />
        <meta
          property="og:description"
          content="An open coding agent for your terminal, built by a community collective rather than a company."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanocollective.org/nanotune" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* 1. Hero Section */}
        <section className="relative pt-12 pb-12 sm:pb-20 px-4 md:px-6 container mx-auto">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-16 items-center">
            {/* Left side: Typography */}
            <div className="space-y-4 sm:space-y-8 lg:pr-8">
              <StaggerItem>
                <div className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest border-b border-foreground/20 pb-2 max-w-[250px]">
                  <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                  OPEN SOURCE MODEL TUNING
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-foreground break-words">
                  Nanotune
                </h1>
              </StaggerItem>
              
              <StaggerItem>
                <p className="text-sm sm:text-lg sm:text-xl text-foreground/70 max-w-[540px] leading-relaxed">
                  A simple, interactive CLI for fine-tuning small language models on Apple Silicon. No YAML configs, no complex flags - just an interactive TUI.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 pt-4 sm:pt-6">
                  <SubtleButtonLink
                    href="https://github.com/Nano-Collective/nanotune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-none bg-[#0000EE] dark:bg-foreground px-8 text-xs sm:text-sm font-semibold tracking-wide text-white dark:text-background transition-colors hover:bg-[#0000EE]/90 dark:hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                    View on GitHub
                  </SubtleButtonLink>
                  <SubtleButtonLink
                    href="https://docs.nanocollective.org/nanotune/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-none border border-foreground/20 bg-background px-8 text-xs sm:text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Documentation
                  </SubtleButtonLink>
                </div>
              </StaggerItem>
            </div>
            
            <StaggerItem className="w-full flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0 max-w-full overflow-hidden pt-4 pb-4">
              <FadeIn className="w-full max-w-[700px] border-1 border-[#0000EE] dark:border-[#A1A1AA] bg-muted relative">
                <img src="/nanotune/example.gif" alt="Nanotune Demo" className="w-full h-auto block invert hue-rotate-180 contrast-[1.1] brightness-[1.1] dark:invert-0 dark:hue-rotate-0 dark:contrast-100 dark:brightness-100" />
              </FadeIn>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* 2. Community Stats */}
        <SectionReveal>
          <section className="border-y-2 border-foreground/20 bg-background">
            <div className="container mx-auto px-6 py-6">
              <StaggerContainer className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-start md:items-center gap-y-8 gap-x-4 max-w-5xl mx-auto">
                
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {stats.stars.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    GitHub Stars
                  </span>
                </StaggerItem>
                <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
                
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {stats.contributors.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Contributors
                  </span>
                </StaggerItem>
                <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
                
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {stats.forks.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Forks
                  </span>
                </StaggerItem>
                <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
                
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {stats.releases.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Releases
                  </span>
                </StaggerItem>
                <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
                
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {stats.discordMembers.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    Discord Members
                  </span>
                </StaggerItem>

              </StaggerContainer>
            </div>
          </section>
        </SectionReveal>

        <main className="flex-1">
          {/* 3. What Is Nanotune */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Not for profit. For the community.
                  </h2>
                  <div className="space-y-6 text-md sm:text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                    <p>
                      Nanotune is a simple, interactive CLI for fine-tuning small language models on Apple Silicon. No YAML configs, no complex flags - just an interactive TUI that guides you through each step.
                    </p>
                    <p>
                      Built by the Nano Collective, a community collective building AI tooling not for profit, but for the community. Everything we build is open, transparent, and driven by the people who use it.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* 4. Feature Grid */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20 bg-muted/5">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-12 sm:mb-16 text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      Premium capabilities.
                      <br />
                      <span className="text-foreground/50 md:ml-3">Zero paid tiers.</span>
                    </h2>
                  </div>
                  
                  <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/20 border border-foreground/20">
                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Apple Silicon Native</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Optimized for MLX to leverage unified memory architecture, delivering blazing fast local fine-tuning on Mac.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Globe className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Interactive TUI</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          No complex YAML configs or endless CLI flags. A clean, interactive interface guides you through every step.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">End-to-End Pipeline</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Automatically handles dataset validation, ChatML formatting, training loops, and LoRA fusion.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Settings className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Built-In Evaluation</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Validate model performance with integrated LLM judge and benchmarking suites directly from the CLI.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Server className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">GGUF Export</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Export your tuned models to standard GGUF format for direct use in Ollama, LM Studio, or llama.cpp.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Code className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Instant Chat REPL</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Test your fine-tuned models immediately via the built-in chat interface. No external tools required.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Privacy First</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Train models entirely offline. Your proprietary datasets never leave your machine.
                        </p>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <Terminal className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">Terminal Native</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Designed explicitly for terminal workflows. Fits seamlessly into your existing developer environment.
                        </p>
                      </CardHover>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* 5. Workflow Examples */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-12 sm:mb-16 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      Realistic workflows.
                    </h2>
                    <p className="text-md text-foreground/70 mt-4 max-w-2xl mx-auto">
                      Nanotune handles dataset formatting, local fine-tuning, and inference testing natively in your terminal.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Example 1 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Dataset
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanotune data add</div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">● Processing input dataset...</div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Found 1,240 instruction pairs.</div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">● Formatting to ChatML...</div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">  Split: 90% train / 10% eval</div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Data pipeline complete.</div>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Train
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanotune train --model mistral-7b</div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">● Initializing MLX backend...</div>
                        <div className="text-foreground/80 dark:text-zinc-300 mb-4 border-l-2 border-foreground/20 dark:border-zinc-700 pl-4 py-2 bg-muted/50 dark:bg-zinc-900/50 font-mono text-xs">
                          Epoch 1: Loss 1.2054<br/>
                          Epoch 2: Loss 0.9841<br/>
                          Epoch 3: Loss 0.8122
                        </div>
                        <div className="text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">✔ Training converged successfully</div>
                        <div className="text-foreground/50 dark:text-zinc-500 flex items-center gap-2">Model saved to ./adapters/mistral-7b-v1</div>
                      </div>
                    </div>

                    {/* Example 3 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Chat
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">$ nanotune chat</div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">● Loading adapter from ./adapters/mistral-7b-v1</div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">  Memory usage: 4.2GB / 16.0GB</div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">● Launching REPL...</div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">  Type /help for commands</div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Ready for inference.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* 6. Quick Start */}
          <SectionReveal>
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
                        <div className="px-4 py-3 overflow-x-auto whitespace-pre">npm install -g @nanocollective/nanotune</div>
                        <CopyButton text="npm install -g @nanocollective/nanotune" />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 border border-foreground/20 bg-background p-4 sm:p-6 shadow-sm">
                      <div className="w-24 font-bold text-foreground/50 uppercase tracking-widest text-sm text-left w-full sm:w-auto mb-2 sm:mb-0">NPX</div>
                      <div className="flex-1 font-mono text-sm bg-muted/30 border border-foreground/10 w-full flex items-center justify-between">
                        <div className="px-4 py-3 overflow-x-auto whitespace-pre">npx @nanocollective/nanotune init</div>
                        <CopyButton text="npx @nanocollective/nanotune init" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </SectionReveal>

          {/* 7. Why Developers Choose Nanotune */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
                      Why developers choose Nanotune
                    </h2>
                  </div>

                  <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
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
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full gap-4">
                          <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                            <Cpu className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-2xl tracking-tight mt-2">Apple Silicon Optimized</h3>
                          <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                            Built specifically for M-series chips to maximize training efficiency using MLX.
                          </p>
                        </div>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full gap-4">
                          <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                            <Globe className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-2xl tracking-tight mt-2">Zero Vendor Lock-In</h3>
                          <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                            Export your models to universally supported formats. Your workflow remains entirely yours.
                          </p>
                        </div>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full gap-4">
                          <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                            <Shield className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-2xl tracking-tight mt-2">Absolute Privacy</h3>
                          <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                            Fine-tune on sensitive company data without fear of leaks or API terms of service changes.
                          </p>
                        </div>
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
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
                      </CardHover>
                    </StaggerItem>

                    <StaggerItem>
                      <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full gap-4">
                          <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                            <Settings className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-2xl tracking-tight mt-2">Highly Extensible</h3>
                          <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                            Seamlessly integrates with the broader MLX and llama.cpp ecosystems for advanced use cases.
                          </p>
                        </div>
                      </CardHover>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* 8. Sponsors */}
          <SectionReveal>
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
                  <SubtleButtonLink
                    href="/sponsor"
                    className="inline-flex h-12 items-center justify-center rounded-none bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground shrink-0"
                  >
                    Become a sponsor
                  </SubtleButtonLink>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allSponsors.filter(s => s.name !== "Atlas Cloud").map((sponsor) => (
                    <StaggerItem key={sponsor.name}>
                      <SponsorLogo
                        sponsor={sponsor}
                        className="rounded-none border-foreground/20 hover:border-foreground/20 bg-background hover:bg-muted h-24 sm:h-32 flex items-center justify-center p-8 transition-colors group"
                        imgClassName="max-h-8 sm:max-h-12 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      />
                    </StaggerItem>
                  ))}
                  {["a", "b"].slice(0, Math.max(0, 2 - allSponsors.filter(s => s.name !== "Atlas Cloud").length)).map((slot) => (
                    <StaggerItem key={slot}>
                      <Link
                        href="/sponsor"
                        className="bg-transparent border border-dashed border-foreground/20/30 h-24 sm:h-32 flex items-center justify-center group hover:border-foreground/20 transition-colors"
                      >
                        <span className="font-mono text-sm font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                          [ Your brand here ]
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          </SectionReveal>

          {/* 9. Final CTA */}
          <SectionReveal>
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
                  <SubtleButtonLink
                    href="https://docs.nanocollective.org/nanotune/getting-started"
                    className="inline-flex h-14 items-center justify-center rounded-none bg-white px-10 text-sm font-bold tracking-wide text-[#0000EE] transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
                  >
                    Get Started
                  </SubtleButtonLink>
                  <SubtleButtonLink
                    href="https://github.com/Nano-Collective/nanotune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center rounded-none border-2 border-white bg-transparent px-10 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
                  >
                    View on GitHub
                  </SubtleButtonLink>
                </div>
              </div>
            </section>
          </SectionReveal>

        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<NanotunePageProps> = async () => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const stats: NanotuneStats = {
    stars: 0,
    contributors: 0,
    forks: 0,
    releases: 0,
    discordMembers: 0,
    error: null,
  };

  try {
    // Repo stats
    const repoRes = await fetch("https://api.github.com/repos/Nano-Collective/nanotune", { headers });
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      stats.stars = repoData.stargazers_count || stats.stars;
      stats.forks = repoData.forks_count || stats.forks;
    }

    // Releases count
    const releasesRes = await fetch("https://api.github.com/repos/Nano-Collective/nanotune/releases?per_page=100", { headers });
    if (releasesRes.ok) {
      const releasesData = await releasesRes.json();
      if (Array.isArray(releasesData) && releasesData.length > 0) {
        stats.releases = releasesData.length;
      }
    }

    // Contributors count
    const contributorsRes = await fetch("https://api.github.com/repos/Nano-Collective/nanotune/contributors?per_page=100", { headers });
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
    console.error("Error fetching nanotune stats:", error);
    stats.error = "Failed to fetch actual metrics";
  }

  return {
    props: {
      stats,
    },
  };
};
