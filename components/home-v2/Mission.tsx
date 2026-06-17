import React from "react";

export function Mission() {
  const pillars = [
    {
      id: "01",
      title: "Privacy First",
      description:
        "Your code, your data. Our tools are built to run in environments where you retain complete control over your intellectual property.",
    },
    {
      id: "02",
      title: "Open Source",
      description:
        "Built in public by developers, for developers. We believe the future of AI tooling should not be locked behind proprietary APIs.",
    },
    {
      id: "03",
      title: "Local First",
      description:
        "Harness the power of your own hardware. Run powerful AI workflows locally without cloud lock-in or subscription fees.",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-background border-y border-foreground/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-6 border-b border-foreground/20 pb-4 sm:pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Why Nano Collective
            </h2>
            <p className="text-sm sm:text-lg text-foreground/70 font-mono">
              The principles behind our tools.
            </p>
          </div>
          <div className="font-mono text-sm font-bold text-[#0000EE] dark:text-[#A1A1AA] uppercase tracking-widest hidden md:block">
            [ Core Philosophy ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="flex flex-col items-start gap-2 sm:gap-4">
              <div className="text-md sm:text-2xl font-mono font-bold text-[#0000EE] dark:text-[#A1A1AA] mb-2 border-b border-[#0000EE] dark:border-[#A1A1AA] pb-2 inline-block">
                [{pillar.id}]
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-mono text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
