import { ExternalLink } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Footer } from "@/components/layout-v2/Footer";
import {
  CardHover,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { CONTRIBUTORS, type Contributor } from "@/lib/contributors";

function ContributorCard({ contributor }: { contributor: Contributor }) {
  const initials = contributor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <CardHover className="flex flex-col h-full bg-background border border-foreground/20 transition-all p-6 sm:p-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 shrink-0 bg-muted flex items-center justify-center overflow-hidden border border-foreground/10">
            {contributor.photo ? (
              // biome-ignore lint/performance/noImgElement: static export uses unoptimized images
              <img
                src={`/contributors/${contributor.photo}`}
                alt={contributor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold opacity-30">{initials}</span>
            )}
          </div>
          {contributor.coreTeam && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0000EE] dark:text-[#A1A1AA] border border-foreground/10 px-2 py-1">
              Core
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-[#0000EE] dark:group-hover:text-[#A1A1AA] transition-colors">
          {contributor.name}
        </h3>

        {contributor.bio && (
          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6 flex-1">
            {contributor.bio}
          </p>
        )}

        {contributor.focus && contributor.focus.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {contributor.focus.map((area) => (
              <span
                key={area}
                className="text-xs font-mono text-foreground/60 uppercase tracking-wider"
              >
                [{area}]
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-foreground/10 mt-auto">
          {contributor.github && (
            <a
              href={`https://github.com/${contributor.github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${contributor.name}'s GitHub`}
              className="text-sm font-mono font-bold uppercase tracking-widest hover:text-[#0000EE] dark:hover:text-[#A1A1AA] transition-colors flex items-center gap-2"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
          )}
          {contributor.website && (
            <a
              href={contributor.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${contributor.name}'s website`}
              className="text-sm font-mono font-bold uppercase tracking-widest hover:text-[#0000EE] dark:hover:text-[#A1A1AA] transition-colors flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Web
            </a>
          )}
        </div>
      </div>
    </CardHover>
  );
}

export default function ContributorsPage() {
  return (
    <>
      <Head>
        <title>Contributors - Nano Collective</title>
        <meta
          name="description"
          content="Meet the contributors who make Nano Collective possible. Join our open-source AI tools collective."
        />
      </Head>

      <div className="min-h-screen bg-background flex flex-col font-sans">
        {/* Minimal Hero */}
        <SectionReveal>
          <section className="py-12 md:py-20 border-b border-foreground/10">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-5xl mx-auto text-center">
                <div className="font-mono text-xs font-bold uppercase tracking-widest mb-6 text-muted-foreground">
                  [ Community ]
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 break-words">
                  Meet our contributors.
                </h1>
                <p className="text-xs sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0">
                  The engineers, designers, and hackers behind Nano Collective.
                  We are an open-source collective building privacy-first AI
                  tools.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/nano-collective"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center bg-foreground text-background px-8 text-sm font-bold tracking-wide hover:opacity-90 transition-colors"
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                    View GitHub
                  </a>
                  <Link
                    href="#how-to-contribute"
                    className="inline-flex h-12 items-center justify-center border border-foreground/20 bg-transparent px-8 text-sm font-bold tracking-wide hover:bg-muted transition-colors"
                  >
                    How to Contribute
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Main Content */}
        <SectionReveal>
          <main className="flex-1 container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
              {/* Contributors Grid */}
              {CONTRIBUTORS.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
                  {CONTRIBUTORS.map((contributor) => (
                    <StaggerItem key={contributor.name}>
                      <ContributorCard contributor={contributor} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="py-32 text-center border border-foreground/10 mb-32 bg-muted/20">
                  <p className="text-lg text-foreground/60 font-mono tracking-tight">
                    No contributors found yet.
                  </p>
                </div>
              )}

              {/* How to Contribute Section */}
              <section
                id="how-to-contribute"
                className="max-w-3xl mx-auto space-y-6 sm:space-y-8 scroll-m-24 mb-32 px-2 sm:px-0"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
                  How to Contribute
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-xs sm:text-lg text-foreground/70 leading-relaxed text-center">
                    We build tools for the people who use them. If you care
                    about privacy, performance, and keeping AI tools out of
                    walled gardens, you belong here.
                  </p>
                  <StaggerContainer className="space-y-4 pt-4">
                    <StaggerItem className="flex items-start gap-4 p-6 border border-foreground/10 bg-muted/10">
                      <div className="font-mono text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA] pt-1">
                        01
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 tracking-tight">
                          Check the Bounties
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                          We run a community fund. Significant features and bug
                          fixes often carry bounties. Check our GitHub issues
                          for the{" "}
                          <code className="bg-muted px-2 py-0.5 rounded text-xs">
                            bounty
                          </code>{" "}
                          label.
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem className="flex items-start gap-4 p-6 border border-foreground/10 bg-muted/10">
                      <div className="font-mono text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA] pt-1">
                        02
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 tracking-tight">
                          Join the Discord
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                          Say hi in the #contributors channel. We're happy to
                          help you find a good first issue or discuss a feature
                          you want to build.
                        </p>
                      </div>
                    </StaggerItem>
                    <StaggerItem className="flex items-start gap-4 p-6 border border-foreground/10 bg-muted/10">
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA] pt-1">
                        03
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 tracking-tight">
                          Open a PR
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          Once your first PR is merged, you'll be added to this
                          page and receive your contributor invite.
                        </p>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </section>
            </div>
          </main>
        </SectionReveal>

        <Footer />
      </div>
    </>
  );
}
