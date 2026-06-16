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
    <section className="py-24 px-6 bg-white border-y border-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-black pb-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
              Why Nano Collective
            </h2>
            <p className="text-lg text-black/70 font-mono">
              The principles behind our tools.
            </p>
          </div>
          <div className="font-mono text-sm font-bold text-[#0000EE] uppercase tracking-widest hidden md:block">
            [ Core Philosophy ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="flex flex-col items-start gap-4">
              <div className="text-2xl font-mono font-bold text-[#0000EE] mb-2 border-b border-[#0000EE] pb-2 inline-block">
                [{pillar.id}]
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-black/70 leading-relaxed font-mono text-sm">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
