import {
  Boxes,
  Check,
  Code,
  Cpu,
  FileCode2,
  FileText,
  Gauge,
  Globe,
  Layers,
  Link2,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
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

const GITHUB_URL = "https://github.com/Nano-Collective/get-md";
const DOCS_URL = "https://docs.nanocollective.org/get-md/docs";

const features: Feature[] = [
  {
    icon: Zap,
    title: "Sub-100ms",
    description:
      "Turndown and Mozilla Readability convert clean, structured Markdown in under 100ms, with no model download required.",
  },
  {
    icon: Link2,
    title: "URL or HTML",
    description:
      "Pass raw HTML, a local file, or a URL. get-md handles fetching, retries, and content extraction for you.",
  },
  {
    icon: Sparkles,
    title: "Optional LLM",
    description:
      "Enable a local ReaderLM-v2 model for higher-quality conversion when a page needs it. Entirely on your machine.",
  },
  {
    icon: FileText,
    title: "Metadata Extraction",
    description:
      "Pulls title, author, reading time, and more into clean YAML frontmatter, ready for downstream pipelines.",
  },
  {
    icon: SlidersHorizontal,
    title: "Content Filtering",
    description:
      "Toggle images, links, and tables, or strip noise entirely. Keep exactly the signal your model needs.",
  },
  {
    icon: Terminal,
    title: "Library & CLI",
    description:
      "Use it as a typed Node.js library or straight from the terminal. Same engine, whichever fits your workflow.",
  },
  {
    icon: Smartphone,
    title: "React Native",
    description:
      "Full React Native support means the same converter runs in your mobile app, not just on the server.",
  },
  {
    icon: Layers,
    title: "Batch & Sitemap",
    description:
      "Crawl an entire sitemap or a list of URLs with bounded concurrency, then write one file per page.",
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
    icon: Gauge,
    title: "Fast by Default",
    description:
      "The standard path is pure TypeScript and ships no heavy native binaries. Convert thousands of pages without waiting.",
  },
  {
    icon: Cpu,
    title: "Local LLM Option",
    description:
      "When you do want AI-powered conversion, it runs on a local model. Your content never leaves your machine.",
  },
  {
    icon: FileCode2,
    title: "Built for LLMs",
    description:
      "Output is tuned for token efficiency and clean structure, exactly what retrieval and prompting pipelines need.",
  },
  {
    icon: Boxes,
    title: "Library or CLI",
    description:
      "Drop it into a TypeScript project or script it from the shell. No lock-in to a single way of working.",
  },
  {
    icon: Globe,
    title: "Community Driven",
    description:
      "Features are built based on what developers actually need, not what looks good in a marketing pitch.",
  },
];

const installCommands: InstallCommand[] = [
  { label: "NPM", command: "npm install @nanocollective/get-md" },
  { label: "Global", command: "npm install -g @nanocollective/get-md" },
  { label: "NPX", command: "npx @nanocollective/get-md https://example.com" },
];

export default function GetMdPage({ stats }: { stats: ProductStats }) {
  return (
    <>
      <Head>
        <title>get-md | Nano Collective</title>
        <meta
          name="description"
          content="A fast, lightweight HTML to Markdown converter optimized for LLM consumption. Built by a community collective rather than a company."
        />
        <meta property="og:title" content="get-md | Nano Collective" />
        <meta
          property="og:description"
          content="A fast, lightweight HTML to Markdown converter optimized for LLM consumption. Built by a community collective rather than a company."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanocollective.org/get-md" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        <ProductHero
          eyebrow="OPEN SOURCE HTML TO MARKDOWN"
          title="get-md"
          description="A fast, lightweight HTML to Markdown converter optimized for LLM consumption. Pass in HTML or a URL and get clean, structured Markdown back — as a library or from the command line."
          githubUrl={GITHUB_URL}
          docsUrl={DOCS_URL}
          demo={
            <div className="font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 p-6">
              <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                $ getmd https://example.com
              </div>
              <div className="text-foreground/90 dark:text-blue-400 mb-1">
                ● Fetching https://example.com...
              </div>
              <div className="text-foreground/50 dark:text-zinc-500 mb-1">
                {"  "}Extracting main content...
              </div>
              <div className="text-foreground/90 dark:text-blue-400 mb-1">
                ● Converting to Markdown...
              </div>
              <div className="text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" /> Done in 84ms
              </div>
              <div className="text-foreground/80 dark:text-zinc-300 border-l-2 border-foreground/20 dark:border-zinc-700 pl-4 py-2 bg-muted/50 dark:bg-zinc-900/50">
                <span className="text-foreground/50 dark:text-zinc-500">
                  ---
                  <br />
                  title: Example Domain
                  <br />
                  ---
                </span>
                <br />
                <br /># Example Domain
                <br />
                <br />
                This domain is for use in
                <br />
                illustrative examples...
              </div>
            </div>
          }
        />

        <CommunityStats stats={stats} />

        <main className="flex-1">
          {/* What Is get-md */}
          <SectionReveal>
            <section className="py-16 sm:py-24 border-b border-foreground/20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Clean Markdown. Built for models.
                  </h2>
                  <div className="space-y-6 text-md sm:text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium">
                    <p>
                      get-md is a fast, lightweight HTML to Markdown converter
                      optimized for LLM consumption. The standard path uses
                      Turndown and Mozilla Readability to return clean,
                      structured Markdown in under 100ms.
                    </p>
                    <p>
                      Built by the Nano Collective rather than a company, it
                      runs as a typed library or a CLI, ships no forced
                      telemetry, and keeps the optional AI conversion on a local
                      model so your content never leaves your machine.
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
                      get-md handles single pages, content filtering, and whole
                      sitemaps from the terminal or your codebase.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Example 1 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Terminal className="w-4 h-4" />
                        Convert
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                          $ getmd https://blog.example.com/post -o post.md
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Fetching page...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">
                          {"  "}Extracted 1,820 words
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Writing post.md...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">
                          {"  "}Frontmatter: title, author, readingTime
                        </div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> Saved post.md in 91ms.
                        </div>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Code className="w-4 h-4" />
                        Library
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">
                          {"import { convertToMarkdown }"}
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">
                          {'  from "@nanocollective/get-md";'}
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          const result = await
                        </div>
                        <div className="text-foreground/80 dark:text-zinc-300 mb-4 border-l-2 border-foreground/20 dark:border-zinc-700 pl-4 py-2 bg-muted/50 dark:bg-zinc-900/50">
                          convertToMarkdown(
                          <br />
                          {'  "https://example.com"'}
                          <br />
                          );
                        </div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> result.markdown ready.
                        </div>
                      </div>
                    </div>

                    {/* Example 3 */}
                    <div className="flex flex-col border border-foreground/20 bg-background">
                      <div className="h-10 border-b border-foreground/20 flex items-center px-4 bg-muted/30 gap-2 font-mono text-xs text-foreground/70 uppercase tracking-widest font-bold">
                        <Layers className="w-4 h-4" />
                        Crawl
                      </div>
                      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background dark:bg-[#111] text-foreground dark:text-zinc-300 flex-1">
                        <div className="text-[#0000EE] dark:text-pink-400 mb-4 font-bold dark:font-normal">
                          $ getmd --sitemap https://example.com/sitemap.xml
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Walking sitemap...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-2">
                          {"  "}Found 142 URLs
                        </div>
                        <div className="text-foreground/90 dark:text-blue-400 mb-2">
                          ● Converting (concurrency: 5)...
                        </div>
                        <div className="text-foreground/50 dark:text-zinc-500 mb-4">
                          {"  "}Wrote 142 files to ./out
                        </div>
                        <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                          <Check className="w-4 h-4" /> Batch complete.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          <QuickStart commands={installCommands} />

          <ReasonsGrid product="get-md" reasons={reasons} />

          <SponsorsSection />

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
  const stats = await fetchProductStats("Nano-Collective/get-md");
  return { props: { stats } };
};
