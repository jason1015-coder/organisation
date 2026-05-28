import { ArrowRight, Clock, ExternalLink, Lightbulb } from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { FaDiscord } from "react-icons/fa";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  daysUntil,
  docsUrlFor,
  fetchWhitepapers,
  type Whitepaper,
  type WhitepaperStatus,
} from "@/lib/whitepapers";

const DOCS_PIPELINE_URL =
  "https://docs.nanocollective.org/collective/projects/how-a-project-comes-to-life";

const DOCS_WHITEPAPERS_URL =
  "https://docs.nanocollective.org/collective/whitepapers";

const STATUS_ORDER: WhitepaperStatus[] = [
  "In public review",
  "Build approved",
  "Building",
  "Shipped",
  "Draft",
  "Paused",
  "Declined",
  "Superseded",
];

const STATUS_DESCRIPTIONS: Record<WhitepaperStatus, string> = {
  Draft: "Whitepaper PR is open but not yet merged.",
  "In public review":
    "Merged whitepapers inside the 30-day review window. Anyone can read, comment, and shape these.",
  "Build approved":
    "Public review complete. The core team has approved building. Maintainer named.",
  Building: "Repository live and the project is under active build.",
  Shipped: "Project has reached v0.1+ and is in the projects list.",
  Paused: "Approved or in-progress work that has stalled.",
  Declined: "Reviewed and decided against. Rationale on the whitepaper page.",
  Superseded: "Replaced by a newer whitepaper or folded into another project.",
};

interface PipelineProps {
  whitepapers: Whitepaper[];
}

export default function Pipeline({ whitepapers }: PipelineProps) {
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: whitepapers.filter((w) => w.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <Head>
        <title>Project Pipeline | Nano Collective</title>
        <meta
          name="description"
          content="Whitepapers and projects in flight under the Nano Collective. From idea to shipped v0.1, in the open."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Project Pipeline | Nano Collective"
        />
        <meta
          property="og:description"
          content="Whitepapers and projects in flight under the Nano Collective. From idea to shipped v0.1, in the open."
        />
        <meta
          property="og:url"
          content="https://nanocollective.org/pipeline"
        />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans">
        {/* Hero */}
        <section className="border-b border-border/40 pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6 max-w-4xl">
              <Badge variant="secondary" className="text-sm px-4 py-1.5">
                Project Pipeline
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                What's in flight
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Every project that ships under the Nano Collective starts with
                a whitepaper, gets argued in public for at least 30 days, and
                only then becomes code. This page shows where every active
                whitepaper sits, in real time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" asChild className="group">
                  <a
                    href={DOCS_PIPELINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read how the pipeline works
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href={DOCS_WHITEPAPERS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Browse whitepapers
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Grouped whitepapers */}
        {grouped.map(({ status, items }) => (
          <section key={status} className="border-b border-border/40 py-12">
            <div className="container mx-auto px-4">
              <div className="space-y-2 mb-8">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-3xl font-bold">{status}</h2>
                  <span className="text-sm text-muted-foreground">
                    {items.length}{" "}
                    {items.length === 1 ? "whitepaper" : "whitepapers"}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {STATUS_DESCRIPTIONS[status]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((w) => {
                  const remaining =
                    w.status === "In public review" && w.reviewCloses
                      ? daysUntil(w.reviewCloses)
                      : null;
                  return (
                    <a
                      key={w.slug}
                      href={docsUrlFor(w.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <Card className="h-full hover:border-primary/40 transition-colors">
                        <CardHeader className="space-y-3">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {w.title}
                          </CardTitle>
                          <CardDescription className="text-sm leading-relaxed">
                            {w.description}
                          </CardDescription>
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 flex-wrap gap-2">
                            <span>
                              Proposed by{" "}
                              <span className="text-foreground">
                                {w.proposer}
                              </span>
                            </span>
                            {remaining !== null && remaining > 0 && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Closes in {remaining}{" "}
                                {remaining === 1 ? "day" : "days"}
                              </span>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Want to build something */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
              <div className="flex flex-col items-start gap-6">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                  Propose a project
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Want to build something?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Anyone can propose. No application form, no contribution
                  history required. If your idea fits the collective's shape
                  (AI tooling that respects privacy, runs locally, is open
                  source, or is an open variant of something proprietary), the
                  process is built for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                  <Button size="lg" asChild className="group">
                    <a
                      href={DOCS_PIPELINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the pipeline
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://discord.gg/ktPDV6rekE"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDiscord className="mr-2 h-4 w-4" />
                      Start in Discord
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<PipelineProps> = async () => {
  const whitepapers = await fetchWhitepapers();
  return { props: { whitepapers } };
};
