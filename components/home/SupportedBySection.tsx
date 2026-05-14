import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SupportedBySection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Supported by</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Sponsorship funds the people building open, privacy-respecting AI
              tools — and keeps every line of it free at the point of use. The
              first organisations in at each tier set the tone for the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2">
            {[0, 1, 2].map((i) => (
              <Link
                key={i}
                href="/sponsor"
                className="group flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-background/50 transition-all hover:border-primary/40 hover:bg-accent/30"
              >
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Your brand here
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-4">
            <Button size="lg" asChild>
              <Link href="/sponsor">Become a sponsor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
