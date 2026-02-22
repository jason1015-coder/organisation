import { GitPullRequest, Star, Terminal, Users } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { EffectScene } from "@/components/EffectScene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrgStatsData {
  stars: number;
  contributors: number;
  pullRequests: number;
  discordMembers: number;
  error: string | null;
}

interface HeroSectionProps {
  orgStats: OrgStatsData;
}

export function HeroSection({ orgStats }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[80vh]">
      {/* ASCII Video Background - full screen absolute */}
      <div className="absolute inset-0" style={{ minHeight: "80vh" }}>
        <EffectScene />
      </div>
      <div className="absolute inset-0 pointer-events-none hero-overlay" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
        <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0 space-y-8">
          <div className="inline-block animate-on-scroll">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
              Open Source AI
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground animate-on-scroll animate-delay-100">
            Nano Collective
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed animate-on-scroll animate-delay-200">
            Creating powerful, privacy-first AI tools, developed by the
            community for the community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-center sm:items-start pt-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="group text-base w-full sm:w-auto"
              asChild
            >
              <a
                href="https://github.com/Nano-Collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View on GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group text-base w-full sm:w-auto"
              asChild
            >
              <a
                href="https://github.com/Nano-Collective/nanocoder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Try Nanocoder
              </a>
            </Button>
          </div>

          {/* Subtle org stats */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-8 pt-8 text-sm text-muted-foreground">
            {!orgStats.error ? (
              <>
                <div className="group flex items-center gap-2">
                  <Star className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span className="font-semibold text-foreground">
                    {orgStats.stars.toLocaleString()}
                  </span>
                  <span>stars</span>
                </div>
                <div className="group flex items-center gap-2">
                  <Users className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span className="font-semibold text-foreground">
                    {orgStats.contributors.toLocaleString()}
                  </span>
                  <span>contributors</span>
                </div>
                <div className="group flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span className="font-semibold text-foreground">
                    {orgStats.pullRequests.toLocaleString()}
                  </span>
                  <span>PRs</span>
                </div>
                {orgStats.discordMembers > 0 && (
                  <div className="group flex items-center gap-2">
                    <FaDiscord className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    <span className="font-semibold text-foreground">
                      {orgStats.discordMembers.toLocaleString()}
                    </span>
                    <span>members</span>
                  </div>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground">
                Stats temporarily unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
