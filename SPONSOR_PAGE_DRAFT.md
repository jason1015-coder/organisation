# Sponsorship

> **This is the draft copy for `nanocollective.org/sponsor`.** It is written in brand voice, follows every decision locked into `SPONSORSHIP_PLAN.md`, and is structured top-to-bottom in the order a prospective sponsor reads. Stats reference `/growth` and update automatically. Once the copy is approved, this becomes the Next.js page.

---

## Sponsor the Nano Collective

The Nano Collective is a community-led group of developers, designers, and maintainers building open-source AI tools for the people who use them. We build not for profit, but for the community.

Sponsorship funds the people doing the work. The Collective is fiscally hosted by [Open Source Collective](https://opencollective.com/nano-collective); every pound, dollar, and sat received is published transparently in real time. Funds go to two places, and only those two: the cost of operating the Collective, and the community fund that pays bounties to OSS contributors. Full terms are in the [Economics Charter](https://docs.nanocollective.org/collective/organisation/economics-charter).

## Why this matters

AI is becoming the most personal piece of infrastructure most people use — the place they think out loud, work through problems, and hand off real parts of their workflow. The systems people are coming to depend on are largely owned by a small number of companies whose incentives are not aligned with the people using them.

The Nano Collective exists because the alternative needs to be built deliberately, in the open, by people who care about getting it right. Sponsorship is how that work gets funded.

## What the Collective ships today

The Collective ships four open-source projects, with **{{TOTAL_DOWNLOADS}} total npm downloads** to date across them. Live download counts, release history, and growth statistics are published at [nanocollective.org/growth](/growth).

- **[Nanocoder](https://github.com/Nano-Collective/nanocoder)** — local-first CLI coding agent with multi-provider AI support
- **[Nanotune](https://github.com/Nano-Collective/nanotune)** — interactive CLI for fine-tuning small language models on Apple Silicon
- **[get-md](https://github.com/Nano-Collective/get-md)** — fast HTML-to-Markdown converter optimised for LLM consumption
- **[json-up](https://github.com/Nano-Collective/json-up)** — type-safe JSON migration tool with Zod schema validation

## Tiers

A small, deliberately simple program. Same rule across every tier: more dollars = more surfaces. No exclusivity, no slot caps, no influence over the roadmap. Sponsors fund the work; the Collective directs it.

### Individual — $5, $25, or $100 per month

For individuals who want to support recurringly.

- Name listed on this page under *Individual sponsors*
- Listed on the public Open Collective ledger

Sign up via [Open Collective](https://opencollective.com/nano-collective).

### Supporter — $250 per month

For companies, indie teams, and small SaaS that want a visible association with the Collective.

- Logo + link on this page
- Logo + link on the [Nano-Collective GitHub organisation profile](https://github.com/Nano-Collective)
- One-time acknowledgement across the Collective's social presences when sponsorship begins
- Listed as a financial contributor on the public Open Collective page

### Builder — $1,000 per month

For infrastructure companies, hosting providers, and aligned foundations that want sustained visibility across every Nano Collective surface.

Everything in Supporter, plus:

- Larger logo placement on this page
- Logo on the README of every Nano Collective project — Nanocoder, Nanotune, get-md, json-up, and any future NC project
- Logo on the nanocollective.org homepage and the docs site footer
- One dedicated welcome post on the Nano Collective blog when sponsorship begins
- Quarterly sponsor update — what shipped, where the fund went, what's next

### Bespoke partnerships

For organisations interested in a larger or named arrangement — publicly named partnership, joint content, a direct relationship with the core team, or anything outside the standard tiers. Designed case by case. Terms are agreed and published before the relationship begins.

Open a conversation via [Discord](https://discord.gg/ktPDV6rekE) or contact the core team directly.

### What sponsorship does not include

- No early access to unshipped products
- No influence over the roadmap, prioritisation, or which contributors get bounties
- No routing of recurring sponsorship dollars to a specific project's payouts. To direct funds to specific work, use a designated donation
- No exclusivity at any tier — sponsors at the same tier are listed alphabetically

Annual prepayments at any tier receive a 10% discount. Invoice-based contributions are supported via Open Source Collective — contact us to set this up.

## One-off contributions

### General donation

Any amount, one time, into the community fund. No perks attached.

- Fiat via [Open Source Collective](https://opencollective.com/nano-collective)
- Bitcoin direct to the Nano Collective wallet — request the address via [Discord](https://discord.gg/ktPDV6rekE)

### Designated donation

A specific piece of work, scoped and agreed with the core team before the donation is accepted. Nothing is open-ended. Nothing is retrospective. You know what the work is and how it will be delivered before the donation is made. Delivery is reported publicly.

The program is new; there are no completed examples to cite yet. The first delivered designated donation will be the first listed here.

To scope a designated donation, reach out via [Discord](https://discord.gg/ktPDV6rekE) or to the core team directly.

## Current sponsors

The sponsorship program is newly launched. Sponsors will be listed here once they join — by tier, with logos. The first organisation in at each tier sets the tone for the rest. If that's you, [open a conversation](https://discord.gg/ktPDV6rekE).

Individual sponsors are listed automatically via Open Collective.

*This section restructures into a tiered logo wall (Bespoke → Builder → Supporter → Individual) once at least one sponsor at any tier is active.*

## Who we accept

The Nano Collective reserves the right to decline any sponsorship. We will decline if a prospective sponsor's stated mission, product, or public conduct conflicts materially with what the Collective is building — privacy-respecting, local-first, open AI tooling. Declining is not a moral judgement; it is a recognition that some associations would undermine the work for everyone else who participates. Decisions are made by the core team and are not appealable.

## How sponsorship is handled

The Nano Collective is fiscally hosted by [Open Source Collective](https://opencollective.com/nano-collective). All incoming and outgoing fiat payments are visible on the public Open Collective ledger in real time. Bitcoin donations to the published Nano Collective wallet address are verifiable on-chain.

For exactly how funds reach contributors, see the [Economics Charter](https://docs.nanocollective.org/collective/organisation/economics-charter). For sponsorship operations, including logo specifications and the onboarding process, see [Sponsorship Operations](https://docs.nanocollective.org/collective/organisation/sponsorship-operations).

## Start a conversation

- **Recurring sponsorship at any tier** — sign up via [Open Collective](https://opencollective.com/nano-collective). For Builder or bespoke arrangements, message us first via [Discord](https://discord.gg/ktPDV6rekE) so we can welcome you properly.
- **Bespoke partnership** — open a conversation on [Discord](https://discord.gg/ktPDV6rekE) or contact the core team directly.
- **Designated donation** — reach out before sending. We scope and agree the work together first.

---

## Draft notes (for review — not part of the live page)

- **Length** — ~700 words, tight. A page that takes ~3 minutes to read on a desktop. Long enough to be credible, short enough to send to a CFO.
- **Headline stat — `{{TOTAL_DOWNLOADS}}` placeholder** — replace at build time with aggregated npm downloads across all NC projects. The `/growth` page already computes this in `getStaticProps`. Cleanest implementation: extract the npm-fetch + sum logic from `pages/growth.tsx` into a shared helper (e.g. `lib/npm-stats.ts`) and call it from both `/growth` and `/sponsor`'s `getStaticProps`. One source of truth, both pages stay accurate on every deploy.
- **GitHub Sponsors — not set up.** Removed all `github.com/sponsors/Nano-Collective` links. The sign-up flow points only at Open Collective for now. Setting up GH Sponsors at the org level later involves: verifying the org for Sponsors eligibility, connecting payout (Stripe-backed bank account), defining tier benefits to match those on this page, and enabling the Sponsor button. Not a launch blocker — Open Collective covers the same use cases with full transparency. Worth doing later because the GH Sponsor button on individual repos drives discovery.
- **Open Collective tier URLs** — OSC will support Supporter ($250) and Builder ($1,000) tiers at these prices. Once tiers are created, link directly to each tier's checkout URL from the Supporter and Builder sections rather than the OSC homepage.
- **Empty-state — current sponsors** — collapsed from four "No X yet" lines into a single tasteful paragraph with a built-in CTA. Once the first sponsor at any tier signs, the section restructures into a proper tiered logo wall. The transition is handled in code (conditional rendering on sponsor data), not by hand-editing copy each time.
- **Editorial line** — uses the §8 wording verbatim from the plan. Decided.
- **Why this matters** — kept. Pairs the framing with a project list one screen below so it earns its keep per the brand guide.
- **Core team — no names.** Generic "the core team" references kept where functional; no individual names anywhere on the page.
