export interface SponsorLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Sponsor {
  name: string;
  url: string;
  // White wordmark for dark mode, black wordmark for light mode.
  logoLight: string;
  logoDark: string;
  // Shown in the dialog that opens when the logo is clicked.
  description: string;
  promo?: string;
  links: SponsorLink[];
}

// Builder tier displays 3 slots on the sponsor page, Supporter tier 4. Real
// sponsors fill from the start; remaining slots render as open placeholders.
export const builderSponsors: Sponsor[] = [];

export const supporterSponsors: Sponsor[] = [
  {
    name: "Atlas Cloud",
    url: "https://www.atlascloud.ai/console/coding-plan",
    logoLight: "/sponsors/atlas-cloud-black.png",
    logoDark: "/sponsors/atlas-cloud-white.png",
    description:
      "Atlas Cloud is a full-modal AI inference platform that gives developers a single AI API to access video generation, image generation, and LLM APIs. Instead of managing multiple vendor integrations, you connect once and get unified access to 300+ curated models across all modalities.",
    promo:
      "Check out Atlas Cloud's new coding plan promotion for more budget-friendly API access.",
    links: [
      {
        label: "Explore the coding plan",
        href: "https://www.atlascloud.ai/console/coding-plan",
        primary: true,
      },
      { label: "Visit atlascloud.ai", href: "https://www.atlascloud.ai" },
    ],
  },
];

// All sponsors, highest tier first, for surfaces that list everyone together
// (e.g. the homepage "Supported by" section).
export const allSponsors: Sponsor[] = [
  ...builderSponsors,
  ...supporterSponsors,
];
