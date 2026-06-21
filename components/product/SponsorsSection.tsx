import Link from "next/link";
import { SponsorLogo } from "@/components/SponsorLogo";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { allSponsors } from "@/lib/sponsors";

export function SponsorsSection({ exclude = [] }: { exclude?: string[] }) {
  const sponsors = allSponsors.filter((s) => !exclude.includes(s.name));
  const placeholders = ["a", "b"].slice(0, Math.max(0, 2 - sponsors.length));

  return (
    <SectionReveal>
      <section className="py-12 md:py-24 px-4 md:px-6 container mx-auto border-b border-foreground/20">
        <div>
          <div className="mb-8 sm:mb-16 border-b border-foreground/20 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Supported by
              </h2>
              <p className="text-sm sm:text-lg text-foreground/70 font-mono max-w-2xl leading-relaxed">
                Sponsorship funds the people building open, privacy-respecting
                AI tools, and keeps every line of it free at the point of use.
              </p>
            </div>
            <Link
              href="/sponsor"
              className="inline-flex h-12 items-center justify-center rounded-none bg-[#0000EE] dark:bg-foreground px-8 text-sm font-semibold tracking-wide text-white dark:text-background transition-colors hover:bg-[#0000EE]/90 dark:hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground shrink-0"
            >
              Become a sponsor
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsors.map((sponsor) => (
              <StaggerItem key={sponsor.name}>
                <SponsorLogo
                  sponsor={sponsor}
                  className="w-full rounded-none border-foreground/20 hover:border-foreground/20 bg-background hover:bg-muted h-24 sm:h-32 flex items-center justify-center p-8 transition-colors group"
                  imgClassName="max-h-8 sm:max-h-12 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                />
              </StaggerItem>
            ))}
            {placeholders.map((slot) => (
              <StaggerItem key={slot}>
                <Link
                  href="/sponsor"
                  className="bg-transparent border border-dashed border-foreground/30 h-24 sm:h-32 flex items-center justify-center group hover:border-foreground/20 transition-colors"
                >
                  <span className="font-mono text-sm font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                    [ Your brand here ]
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </SectionReveal>
  );
}
