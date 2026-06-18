import { SectionReveal } from "@/components/ui/motion";
import { CopyButton } from "./CopyButton";

export interface InstallCommand {
  label: string;
  command: string;
}

export function QuickStart({ commands }: { commands: InstallCommand[] }) {
  return (
    <SectionReveal>
      <section className="py-16 sm:py-24 border-b border-foreground/20 bg-muted/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Install in seconds.
              </h2>
              <p className="text-md text-foreground/70">
                Zero complex setup. Available on your favorite package manager.
              </p>
            </div>

            <div className="space-y-6">
              {commands.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row items-center gap-4 border border-foreground/20 bg-background p-4 sm:p-6 shadow-sm"
                >
                  <div className="font-bold text-foreground/50 uppercase tracking-widest text-sm text-left w-full sm:w-auto mb-2 sm:mb-0">
                    {item.label}
                  </div>
                  <div className="flex-1 font-mono text-sm bg-muted/30 border border-foreground/10 w-full flex items-center justify-between">
                    <div className="px-4 py-3 overflow-x-auto whitespace-pre">
                      {item.command}
                    </div>
                    <CopyButton text={item.command} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
