import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Sponsor } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

interface SponsorLogoProps {
  sponsor: Sponsor;
  // Styling for the clickable card wrapping the logo.
  className?: string;
  // Styling for the logo image (mainly max-height).
  imgClassName?: string;
}

export function SponsorLogo({
  sponsor,
  className,
  imgClassName,
}: SponsorLogoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          title={sponsor.name}
          aria-label={`About ${sponsor.name}`}
          className={cn(
            "group flex cursor-pointer items-center justify-center rounded-xl border border-border/40 bg-background/50 transition-all hover:border-primary/40 hover:bg-accent/30",
            className,
          )}
        >
          {/* biome-ignore lint/performance/noImgElement: static export, images unoptimized */}
          <img
            src={sponsor.logoLight}
            alt={`${sponsor.name} logo`}
            className={cn(
              "w-auto max-w-full object-contain dark:hidden",
              imgClassName,
            )}
          />
          {/* biome-ignore lint/performance/noImgElement: static export, images unoptimized */}
          <img
            src={sponsor.logoDark}
            alt={`${sponsor.name} logo`}
            className={cn(
              "hidden w-auto max-w-full object-contain dark:block",
              imgClassName,
            )}
          />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sponsor.name}</DialogTitle>
          <DialogDescription>{sponsor.description}</DialogDescription>
        </DialogHeader>
        {sponsor.promo ? (
          <p className="text-sm leading-relaxed text-foreground">
            {sponsor.promo}
          </p>
        ) : null}
        <DialogFooter>
          {sponsor.links.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={link.primary ? "default" : "outline"}
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
