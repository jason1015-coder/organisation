import type { LucideIcon } from "lucide-react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <SectionReveal>
      <section className="py-16 sm:py-24 border-b border-foreground/20 bg-muted/5">
        <div className="container mx-auto px-4 md:px-6">
          <div>
            <div className="mb-12 sm:mb-16 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Premium capabilities.
                <br />
                <span className="text-foreground/50">Zero paid tiers.</span>
              </h2>
            </div>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/20 border border-foreground/20">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="bg-background p-8 space-y-4 hover:bg-muted transition-colors h-full">
                    <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
