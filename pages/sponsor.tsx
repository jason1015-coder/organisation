import {
  Bitcoin,
  Gift,
  Heart,
  Mail,
  MessageCircle,
  Wallet,
} from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Footer from "@/components/footer";
import { SponsorLogo } from "@/components/SponsorLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchTotalDownloads } from "@/lib/npm-stats";
import { builderSponsors, supporterSponsors } from "@/lib/sponsors";

interface SponsorPageProps {
  totalDownloads: number;
}

const projects = [
  {
    name: "Nanocoder",
    url: "https://github.com/Nano-Collective/nanocoder",
    description: "CLI coding agent with multi-provider AI support",
  },
  {
    name: "Nanotune",
    url: "https://github.com/Nano-Collective/nanotune",
    description:
      "Interactive CLI for fine-tuning small language models on Apple Silicon",
  },
  {
    name: "get-md",
    url: "https://github.com/Nano-Collective/get-md",
    description:
      "Fast HTML-to-Markdown converter optimised for LLM consumption",
  },
  {
    name: "json-up",
    url: "https://github.com/Nano-Collective/json-up",
    description: "Type-safe JSON migration tool with Zod schema validation",
  },
];

const tiers = [
  {
    name: "Individual",
    price: "$5 / $25 / $100",
    cadence: "per month",
    audience: "For individuals who want to support recurringly.",
    perks: [
      "Name listed on this page under Individual sponsors",
      "Listed on the public Open Collective ledger",
    ],
    cta: {
      label: "Sponsor on Open Collective",
      href: "https://opencollective.com/nano-collective",
    },
  },
  {
    name: "Supporter",
    price: "$250",
    cadence: "per month",
    audience:
      "For companies, indie teams, and small SaaS that want a visible association with the Collective.",
    perks: [
      "Logo + link on this page",
      "Logo + link on the Nano-Collective GitHub organisation profile",
      "One-time acknowledgement across the Collective's social presences when sponsorship begins",
      "Listed as a financial contributor on the public Open Collective page",
    ],
    cta: {
      label: "Sponsor on Open Collective",
      href: "https://opencollective.com/nano-collective",
    },
  },
  {
    name: "Builder",
    price: "$1,000",
    cadence: "per month",
    audience:
      "For infrastructure companies, hosting providers, and aligned foundations that want sustained visibility across every Nano Collective surface.",
    perks: [
      "Everything in Supporter",
      "Larger logo placement on this page",
      "Logo on the README of every Nano Collective project",
      "Logo on the nanocollective.org homepage and the docs site footer",
      "One dedicated welcome post on the Nano Collective blog when sponsorship begins",
      "Quarterly sponsor update: what shipped, where the fund went, what's next",
    ],
    cta: {
      label: "Open a conversation",
      href: "https://discord.gg/ktPDV6rekE",
    },
  },
];

export default function Sponsor({ totalDownloads }: SponsorPageProps) {
  const downloadsLabel =
    totalDownloads > 0 ? totalDownloads.toLocaleString() : null;

  return (
    <>
      <Head>
        <title>Sponsorship | Nano Collective</title>
        <meta
          name="description"
          content="Sponsor the Nano Collective. Fund the community fund that pays bounties to OSS contributors building privacy-respecting, local-first AI tooling."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Sponsorship | Nano Collective" />
        <meta
          property="og:description"
          content="Sponsor the Nano Collective. Fund the community fund that pays bounties to OSS contributors building privacy-respecting, local-first AI tooling."
        />
        <meta property="og:url" content="https://nanocollective.org/sponsor" />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      <div className="min-h-screen bg-background font-sans">
        {/* Hero */}
        <section className="border-b border-border/40 pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-1.5">
                Sponsorship
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                Sponsor the Nano Collective
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">
                The Nano Collective is a community-led group of developers,
                designers, and maintainers building open-source AI tools for the
                people who use them. We build not for profit, but for the
                community.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                Sponsorship funds the people doing the work. The Collective is
                fiscally hosted by{" "}
                <a
                  href="https://opencollective.com/nano-collective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open Source Collective
                </a>
                ; every pound, dollar, and sat received is published
                transparently in real time. Funds go to two places, and only
                those two: the cost of operating the Collective, and the
                community fund that pays bounties to OSS contributors. Full
                terms are in the{" "}
                <a
                  href="https://docs.nanocollective.org/collective/organisation/economics-charter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Economics Charter
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Current sponsors */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Current sponsors
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                  The sponsorship program is newly launched. Most spots below
                  are still open. The first organisations in at each tier set
                  the tone for the rest.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Builders
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    $1,000 / month
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {builderSponsors.map((sponsor) => (
                    <SponsorLogo
                      key={sponsor.name}
                      sponsor={sponsor}
                      className="h-32 px-8"
                      imgClassName="max-h-16"
                    />
                  ))}
                  {["b1", "b2", "b3"]
                    .slice(0, Math.max(0, 3 - builderSponsors.length))
                    .map((slot) => (
                      <a
                        key={slot}
                        href="https://discord.gg/ktPDV6rekE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-background/50 transition-all hover:border-primary/40 hover:bg-accent/30"
                      >
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          Your brand here
                        </span>
                      </a>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Supporters
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    $250 / month
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {supporterSponsors.map((sponsor) => (
                    <SponsorLogo
                      key={sponsor.name}
                      sponsor={sponsor}
                      className="h-24 px-5"
                      imgClassName="max-h-12"
                    />
                  ))}
                  {["s1", "s2", "s3", "s4"]
                    .slice(0, Math.max(0, 4 - supporterSponsors.length))
                    .map((slot) => (
                      <a
                        key={slot}
                        href="https://opencollective.com/nano-collective"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-background/50 transition-all hover:border-primary/40 hover:bg-accent/30"
                      >
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          Your brand here
                        </span>
                      </a>
                    ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground pt-2 max-w-4xl">
                Individual sponsors are listed automatically via Open Collective
                as they join. Bespoke partnership spots are open:{" "}
                <a
                  href="https://discord.gg/ktPDV6rekE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  open a conversation
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Why this matters */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why this matters
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                AI is becoming the most personal piece of infrastructure most
                people use: the place they think out loud, work through
                problems, and hand off real parts of their workflow. The systems
                people are coming to depend on are largely owned by a small
                number of companies whose incentives are not aligned with the
                people using them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                The Nano Collective exists because the alternative needs to be
                built deliberately, in the open, by people who care about
                getting it right. Sponsorship is how that work gets funded.
              </p>
            </div>
          </div>
        </section>

        {/* What the Collective ships */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">
                  What the Collective ships today
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                  The Collective ships four open-source projects
                  {downloadsLabel ? (
                    <>
                      , with{" "}
                      <strong className="text-foreground">
                        {downloadsLabel} total npm downloads
                      </strong>{" "}
                      to date across them
                    </>
                  ) : null}
                  . Live download counts, release history, and growth statistics
                  are published at{" "}
                  <Link href="/growth" className="text-primary hover:underline">
                    nanocollective.org/growth
                  </Link>
                  .
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border/40 p-5 hover:border-primary/40 hover:bg-accent/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaGithub className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">Tiers</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                  A small, deliberately simple program. Same rule across every
                  tier: more support = more surfaces, whether that support is
                  cash or in-kind resources valued at their fair equivalent. No
                  exclusivity, no slot caps, no influence over the roadmap.
                  Sponsors fund the work; the Collective directs it.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {tiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className="flex flex-col h-full bg-background"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription>
                        <span className="text-foreground text-2xl font-semibold">
                          {tier.price}
                        </span>{" "}
                        <span className="text-sm">{tier.cadence}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tier.audience}
                      </p>
                      <ul className="space-y-2 text-sm flex-1">
                        {tier.perks.map((perk) => (
                          <li
                            key={perk}
                            className="flex gap-2 text-muted-foreground leading-relaxed"
                          >
                            <span className="text-primary mt-0.5">·</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full" variant="outline">
                        <a
                          href={tier.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tier.cta.label}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bespoke */}
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Bespoke partnerships
                  </CardTitle>
                  <CardDescription>By arrangement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    For organisations interested in a larger or named
                    arrangement: publicly named partnership, joint content, a
                    direct relationship with the core team, or anything outside
                    the standard tiers. Designed case by case. Terms are agreed
                    and published before the relationship begins.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To see exactly what your support reaches and how
                    contributors and project proposers access it, see{" "}
                    <a
                      href="https://docs.nanocollective.org/collective/organisation/contributor-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Contributor Resources
                    </a>
                    .
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="default">
                      <a
                        href="https://discord.gg/ktPDV6rekE"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaDiscord className="mr-2 h-4 w-4" />
                        Open a conversation
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="mailto:hello@nanocollective.org">
                        <Mail className="mr-2 h-4 w-4" />
                        Email us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Non-cash sponsorship */}
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Gift className="h-5 w-5 text-primary" />
                    Sponsor with resources, not just cash
                  </CardTitle>
                  <CardDescription>In-kind support is welcome.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Sponsorship does not have to be money. We welcome non-cash
                    support such as cloud and API credits, compute, software
                    licenses, hardware, and other resources that help our
                    contributors build. There is no Open Collective sign-up for
                    in-kind support, since no money changes hands.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Reach out and we will work out together what your
                    contribution gets you in return, recognised on the same
                    basis as the tiers above.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="default">
                      <a
                        href="https://discord.gg/ktPDV6rekE"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaDiscord className="mr-2 h-4 w-4" />
                        Open a conversation
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="mailto:hello@nanocollective.org">
                        <Mail className="mr-2 h-4 w-4" />
                        Email us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* What's not included */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  What sponsorship does not include
                </h3>
                <ul className="space-y-2 text-muted-foreground leading-relaxed max-w-4xl">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">·</span>
                    <span>No early access to unshipped products</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">·</span>
                    <span>
                      No influence over the roadmap, prioritisation, or which
                      contributors get bounties
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">·</span>
                    <span>
                      No routing of recurring sponsorship dollars to a specific
                      project's payouts. To direct funds to specific work, use a
                      designated donation
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">·</span>
                    <span>
                      No exclusivity at any tier. Sponsors at the same tier are
                      listed alphabetically
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground pt-2 max-w-4xl">
                  Annual prepayments at any tier receive a 10% discount.
                  Invoice-based contributions are supported via Open Source
                  Collective. Contact us to set this up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* One-off contributions */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold">
                One-off contributions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Heart className="h-5 w-5 text-primary" />
                      General donation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Any amount, one time, into the community fund. No perks
                      attached, no need to reach out. Donate directly on Open
                      Collective, or send Bitcoin to the Nano Collective wallet.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                      <li className="flex items-start gap-2">
                        <Wallet className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>Fiat via Open Source Collective</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Bitcoin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>
                          Bitcoin: wallet address available on{" "}
                          <a
                            href="https://discord.gg/ktPDV6rekE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Discord
                          </a>
                        </span>
                      </li>
                    </ul>
                    <Button asChild className="w-full">
                      <a
                        href="https://opencollective.com/nano-collective"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Donate on Open Collective
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Designated donation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground leading-relaxed">
                      A specific piece of work, scoped and agreed with the core
                      team before the donation is accepted. Nothing is
                      open-ended. Nothing is retrospective. You know what the
                      work is and how it will be delivered before the donation
                      is made. Delivery is reported publicly.
                    </p>
                    <p className="text-sm text-muted-foreground italic flex-1">
                      The program is new; there are no completed examples to
                      cite yet. The first delivered designated donation will be
                      the first listed here.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href="https://discord.gg/ktPDV6rekE"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Scope a designated donation
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who we accept */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Who we accept</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                The Nano Collective reserves the right to decline any
                sponsorship. We will decline if a prospective sponsor's stated
                mission, product, or public conduct conflicts materially with
                what the Collective is building: privacy-respecting,
                local-first, open AI tooling. Declining is not a moral
                judgement; it is a recognition that some associations would
                undermine the work for everyone else who participates. Decisions
                are made by the core team and are not appealable.
              </p>
            </div>
          </div>
        </section>

        {/* How it's handled */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                How sponsorship is handled
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                The Nano Collective is fiscally hosted by{" "}
                <a
                  href="https://opencollective.com/nano-collective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Open Source Collective
                </a>
                . All incoming and outgoing fiat payments are visible on the
                public Open Collective ledger in real time. Bitcoin donations to
                the published Nano Collective wallet address are verifiable
                on-chain.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                For exactly how funds reach contributors, see the{" "}
                <a
                  href="https://docs.nanocollective.org/collective/organisation/economics-charter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Economics Charter
                </a>
                . For sponsorship operations, including logo specifications and
                the onboarding process, see{" "}
                <a
                  href="https://docs.nanocollective.org/collective/organisation/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Support the Collective
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Start a conversation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Start a conversation
              </h2>
              <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-4xl">
                <li className="flex gap-3">
                  <span className="text-primary">·</span>
                  <span>
                    <strong className="text-foreground">
                      Recurring sponsorship at any tier
                    </strong>
                    : sign up via{" "}
                    <a
                      href="https://opencollective.com/nano-collective"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open Collective
                    </a>
                    . For Builder or bespoke arrangements, message us first via{" "}
                    <a
                      href="https://discord.gg/ktPDV6rekE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Discord
                    </a>{" "}
                    so we can welcome you properly.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">·</span>
                  <span>
                    <strong className="text-foreground">
                      Bespoke partnership
                    </strong>
                    : open a conversation on{" "}
                    <a
                      href="https://discord.gg/ktPDV6rekE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Discord
                    </a>{" "}
                    or contact the core team directly.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">·</span>
                  <span>
                    <strong className="text-foreground">
                      Designated donation
                    </strong>
                    : reach out before sending. We scope and agree the work
                    together first.
                  </span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" asChild>
                  <a
                    href="https://opencollective.com/nano-collective"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sponsor on Open Collective
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://discord.gg/ktPDV6rekE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord className="mr-2 h-5 w-5" />
                    Discord
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:hello@nanocollective.org">
                    <Mail className="mr-2 h-5 w-5" />
                    Email us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<SponsorPageProps> = async () => {
  const totalDownloads = await fetchTotalDownloads();

  return {
    props: {
      totalDownloads,
    },
  };
};
