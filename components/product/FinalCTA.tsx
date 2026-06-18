import { SectionReveal, SubtleButtonLink } from "@/components/ui/motion";

export function FinalCTA({
  docsUrl,
  githubUrl,
}: {
  docsUrl: string;
  githubUrl: string;
}) {
  return (
    <SectionReveal>
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#0000EE] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest mb-6 opacity-80">
            [ Join the Collective ]
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8">
            Build with us.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl opacity-90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join developers building the future of local-first AI tooling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SubtleButtonLink
              href={docsUrl}
              className="inline-flex h-14 items-center justify-center rounded-none bg-white px-10 text-sm font-bold tracking-wide text-[#0000EE] transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
            >
              Get Started
            </SubtleButtonLink>
            <SubtleButtonLink
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-none border-2 border-white bg-transparent px-10 text-sm font-bold tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0000EE]"
            >
              View on GitHub
            </SubtleButtonLink>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
