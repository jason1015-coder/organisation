import {
  Check,
  Code,
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
import { Footer } from "@/components/layout-v2/Footer";
import { CommunityStats } from "@/components/product/CommunityStats";
import { type Feature, FeatureGrid } from "@/components/product/FeatureGrid";
import { FinalCTA } from "@/components/product/FinalCTA";
import { ProductHero } from "@/components/product/ProductHero";
import {
  type InstallCommand,
  QuickStart,
} from "@/components/product/QuickStart";
import { type Reason, ReasonsGrid } from "@/components/product/ReasonsGrid";
import { SponsorsSection } from "@/components/product/SponsorsSection";
import { SectionReveal } from "@/components/ui/motion";
import { fetchProductStats, type ProductStats } from "@/lib/product-stats";

const GITHUB_URL = "https://github.com/Nano-Collective/nanotune";
const DOCS_URL = "https://docs.nanocollective.org/nanotune/getting-started";

const features: Feature[] = [
  {
    icon: Cpu,
    title: "Apple Silicon Native",
    description:
      "Optimized for MLX to leverage unified memory architecture, delivering blazing fast local fine-tuning on Mac.",
  },
  {
    icon: Globe,
    title: "Interactive TUI",
    description:
      "No complex YAML configs or endless CLI flags. A clean, interactive interface guides you through every step.",
  },
  {
    icon: Zap,
    title: "End-to-End Pipeline",
    description:
      "Automatically handles dataset validation, ChatML formatting, training loops, and LoRA fusion.",
  },
  {
    icon: Settings,
    title: "Built-In Evaluation",
    description:
      "Validate model performance with integrated LLM judge and benchmarking suites directly from the CLI.",
  },
  {
    icon: Server,
    title: "GGUF Export",
    description:
      "Export your tuned models to standard GGUF format for direct use in Ollama, LM Studio, or llama.cpp.",
  },
  {
    icon: Code,
    title: "Instant Chat REPL",
    description:
      "Test your fine-tuned models immediately via the built-in chat interface. No external tools required.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Train models entirely offline. Your proprietary datasets never leave your machine.",
  },
  {
    icon: Terminal,
    title: "Terminal Native",
    description:
      "Designed explicitly for terminal workflows. Fits seamlessly into your existing developer environment.",
  },
];

const reasons: Reason[] = [
  {
    icon: Code,
    title: "100% Open Source",
    description:
      "Read the code. Audit the code. Improve the code. It belongs to the community, not a corporation.",
  },
  {
    icon: Cpu,
    title: "Apple Silicon Optimized",
    description:
      "Built specifically for M-series chips to maximize training efficiency using MLX.",
  },
  {
    icon: Globe,
    title: "Zero Vendor Lock-In",
    description:
      "Export your models to universally supported formats. Your workflow remains entirely yours.",
  },
  {
    icon: Shield,
    title: "Absolute Privacy",
    description:
      "Fine-tune on sensitive company data without fear of leaks or API terms of service changes.",
  },
  {
    icon: Zap,
    title: "Community Driven",
    description:
      "Features are built based on what developers actually need, not what looks good in a marketing pitch.",
  },
  {
    icon: Settings,
    title: "Highly Extensible",
    description:
      "Seamlessly integrates with the broader MLX and llama.cpp ecosystems for advanced use cases.",
  },
];

const installCommands: InstallCommand[] = [
  { label: "NPM", command: "npm install -g @nanocollective/nanotune" },
  { label: "NPX", command: "npx @nanocollective/nanotune init" },
];

export default function NanotunePage({ stats }: { stats: ProductStats }) {
  return (
    <>
      <Head>
        <title>Nanotune | Nano Collective</title>
        <meta
          name="description"
          content="A simple, interactive CLI for fine-tuning small language models on Apple Silicon. Built by a community collective rather than a company."
        />
        <meta property="og:title" content="Nanotune | Nano Collective" />
        <meta
          property="og:description"
          content="A simple, interactive CLI for fine-tuning small language models on Apple Silicon. Built by a community collective rather than a company."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanocollective.org/nanotune" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        <ProductHero
          eyebrow="OPEN SOURCE MODEL TUNING"
          title="Nanotune"
          description="A simple, interactive CLI for fine-tuning small language models on Apple Silicon. No YAML configs, no complex flags - just an interactive TUI."
          githubUrl={GITHUB_URL}
          docsUrl={DOCS_URL}
          demo={
            // biome-ignore lint/performance/noImgElement: GIF animation needs native img
            <img
              src="/nanotune/example.gif"
              alt="Animation of the Nanotune interactive TUI fine-tuning a model"
              loading="lazy"
              className="w-full h-auto block invert hue-rotate-180 contrast-[1.1] brightness-[1.1] dark:invert-0 dark:hue-rotate-0 dark:contrast-100 dark:brightness-100"
            />
          }
        />

        <CommunityStats stats={stats} />

        <main className="flex-1">
          {/* What Is Nanotune */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Not for profit. For the community.
                  </h2>
                  <div className="space-y-6 text-md sm:text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                    <p>
                      Nanotune is a simple, interactive CLI for fine-tuning
                      small language models on Apple Silicon. No YAML configs,
                      no complex flags - just an interactive TUI that guides you
                      through each step.
                    </p>
                    <p>
                      Built by the Nano Collective, a community collective
                      building AI tooling not for profit, but for the community.
                      Everything we build is open, transparent, and driven by
                      the people who use it.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <FeatureGrid features={features} />

          {/* Workflow Examples */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-12 sm:mb-16 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                      Realistic workflows.
                    </h2>
                    <p className="text-md text-foreground/70 mt-4 max-w-2xl mx-auto">
                      Nanotune handles dataset formatting, local fine-tuning,
                      and inference testing natively in your terminal.
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
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                          $ nanotune data add
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Processing input dataset...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">
                          {" "}
                          Found 1,240 instruction pairs.
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Formatting to ChatML...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">
                          {" "}
                          Split: 90% train / 10% eval
                        </div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> Data pipeline complete.
                        </div>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Train
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                          $ nanotune train --model mistral-7b
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Initializing MLX backend...
                        </div>
                        <div className="text-foreground/80 dark:text-zinc-300 mb-4 border-l-2 border-foreground/20 dark:border-zinc-700 pl-4 py-2 bg-muted/50 dark:bg-zinc-900/50 font-mono text-xs">
                          Epoch 1: Loss 1.2054
                          <br />
                          Epoch 2: Loss 0.9841
                          <br />
                          Epoch 3: Loss 0.8122
                        </div>
                        <div className="text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                          ✔ Training converged successfully
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 flex items-center gap-2">
                          Model saved to ./adapters/mistral-7b-v1
                        </div>
                      </div>
                    </div>

                    {/* Example 3 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Chat
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                          $ nanotune chat
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Loading adapter from ./adapters/mistral-7b-v1
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">
                          {" "}
                          Memory usage: 4.2GB / 16.0GB
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Launching REPL...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">
                          {" "}
                          Type /help for commands
                        </div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> Ready for inference.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <QuickStart commands={installCommands} />

          <ReasonsGrid product="Nanotune" reasons={reasons} />

          <SponsorsSection exclude={["Atlas Cloud"]} />

          <FinalCTA docsUrl={DOCS_URL} githubUrl={GITHUB_URL} />
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  stats: ProductStats;
}> = async () => {
  const stats = await fetchProductStats("Nano-Collective/nanotune");
  return { props: { stats } };
};
