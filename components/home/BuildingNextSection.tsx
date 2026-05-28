import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BuildingNextSection() {
  return (
    <section className="pb-12 -mt-8">
      <div className="container mx-auto px-4">
        <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 flex-1">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                <Rocket className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base">
                  Want to build something under the Nano Collective?
                </span>
                <span className="text-sm text-muted-foreground">
                  Anyone can propose. Whitepaper, public review, then build.
                </span>
              </div>
            </div>
            <Button asChild className="group shrink-0 w-full sm:w-auto">
              <Link href="/pipeline">
                See the project pipeline
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
