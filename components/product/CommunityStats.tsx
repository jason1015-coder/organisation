import { Fragment } from "react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import type { ProductStats } from "@/lib/product-stats";

export function CommunityStats({ stats }: { stats: ProductStats }) {
  const items = [
    { value: stats.stars, label: "GitHub Stars" },
    { value: stats.contributors, label: "Contributors" },
    { value: stats.forks, label: "Forks" },
    { value: stats.releases, label: "Releases" },
    { value: stats.discordMembers, label: "Discord Members" },
  ];

  return (
    <SectionReveal>
      <section className="border-y-2 border-foreground/20 bg-background">
        <div className="container mx-auto px-6 py-6">
          <StaggerContainer className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-start md:items-center gap-y-8 gap-x-4 max-w-5xl mx-auto">
            {items.map((item, i) => (
              <Fragment key={item.label}>
                <StaggerItem className="flex flex-col items-center sm:items-start gap-1">
                  <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                </StaggerItem>
                {i < items.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-black/40 dark:bg-white/40" />
                )}
              </Fragment>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </SectionReveal>
  );
}
