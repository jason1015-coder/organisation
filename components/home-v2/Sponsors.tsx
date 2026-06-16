import Link from "next/link";
import React from "react";
import { SponsorLogo } from "@/components/SponsorLogo";
import { allSponsors } from "@/lib/sponsors";

export function Sponsors() {
  const placeholders = ["a", "b"].slice(
    0,
    Math.max(0, 2 - allSponsors.length),
  );

  return (
    <section className="py-24 px-6 container mx-auto">
      <div className="mb-16 border-b border-black pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-black mb-4">
            Supported by
          </h2>
          <p className="text-lg text-black/70 font-mono max-w-2xl leading-relaxed">
            Sponsorship funds the people building open, privacy-respecting AI
            tools, and keeps every line of it free at the point of use.
          </p>
        </div>
        <Link
          href="/sponsor"
          className="inline-flex h-12 items-center justify-center rounded-none bg-black px-8 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black shrink-0"
        >
          Become a sponsor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allSponsors.map((sponsor) => (
          <SponsorLogo
            key={sponsor.name}
            sponsor={sponsor}
            className="rounded-none border-black hover:border-black bg-white hover:bg-[#FAFAFA] h-32 flex items-center justify-center p-8 transition-colors group"
            imgClassName="max-h-12 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
          />
        ))}
        {placeholders.map((slot) => (
          <Link
            key={slot}
            href="/sponsor"
            className="bg-transparent border border-dashed border-black/30 h-32 flex items-center justify-center group hover:border-black transition-colors"
          >
            <span className="font-mono text-sm font-bold text-black/40 group-hover:text-black transition-colors">
              [ Your brand here ]
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
