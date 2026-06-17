import React from "react";

interface ProofBarProps {
  stats: {
    stars: number;
    contributors: number;
    pullRequests: number;
    discordMembers: number;
  };
}

export function ProofBar({ stats }: ProofBarProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const metrics = [
    { label: "Stars", value: formatNumber(stats.stars) },
    { label: "Contributors", value: formatNumber(stats.contributors) },
    { label: "Pull Requests", value: formatNumber(stats.pullRequests) },
    { label: "Discord", value: formatNumber(stats.discordMembers) },
  ];

  return (
    <section className="border-y-2 border-foreground/20 bg-background">
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between items-start md:items-center gap-y-8 gap-x-4 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <React.Fragment key={metric.label}>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="font-mono text-xl md:text-3xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-widest font-semibold">
                  {metric.label}
                </span>
              </div>
              {i < metrics.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-black/40" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
