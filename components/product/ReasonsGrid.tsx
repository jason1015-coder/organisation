import type { LucideIcon } from "lucide-react";
import {
  CardHover,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

export interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ReasonsGrid({
  product,
  reasons,
}: {
  product: string;
  reasons: Reason[];
}) {
  return (
    <SectionReveal>
      <section className="py-16 sm:py-24 border-b border-foreground/20">
        <div className="container mx-auto px-4 md:px-6">
          <div>
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
                Why developers choose {product}
              </h2>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason) => (
                <StaggerItem key={reason.title}>
                  <CardHover className="bg-background border border-foreground/20 p-8 group transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full gap-4">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-muted/30 text-foreground transition-colors">
                        <reason.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight mt-2">
                        {reason.title}
                      </h3>
                      <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </CardHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
