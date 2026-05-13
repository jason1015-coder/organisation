# Nano Collective Sponsorship — Rollout Plan

Working planning doc. Goal: ship a public, brand-compliant sponsorship program that pays into the community fund, gets logos onto the surfaces sponsors care about, and doesn't need monthly copy-edits to stay accurate.

This is internal/working — not for public consumption until decisions are agreed.

---

## 1. Goals and constraints

**Goals**

- Convert the "rolling out now / one-on-one conversation" state (per Support page) into a published, productised offer.
- Fund the community fund and operating costs (per Economics Charter) — no other use of funds.
- Get visible logo placement that sponsors can point their marketing teams at, without compromising the docs/website aesthetic.
- Make the sponsorship page self-updating where possible — stats live in one place, the page links to or pulls from it.

**Constraints (non-negotiable)**

- Must comply with the Brand Guidelines. No "Sovereign AI", "Trustless AI", "Intelligent infrastructure". Operational, understated voice. No marketing register.
- No promising unshipped products. Anything offered as a perk must already exist.
- All funds flow through Open Source Collective (fiat) or the published BTC address. Transparency is structural.
- Program stays simple — a small number of clearly-defined tiers, no scope choices, no slot caps. Bespoke partnerships handled off-menu.

---

## 2. Naming the program

**Recommendation:** call it **"Sponsorship"** or **"Nano Collective Sponsorship"** — nothing more. The brand voice is operational. A program name like "Nano Collective Partner Program" reads as marketing register.

The public URL on the website should be `nanocollective.org/sponsor` (singular, action-oriented). The page lives here permanently and is the canonical link to share — no PDFs, no one-pagers, no copies that go stale. The current sponsor list (the logo wall) can either live at `/sponsors` (plural) or fold into the same `/sponsor` page; recommend folding into one for simplicity. On the docs, the existing `/collective/organisation/support` page is the right home for terms and policy and links out to the website page for tiers.

**Tier names (decided):**

- **Individual** — personal sponsors, name-only.
- **Supporter** — kept from the original deck. Operational, accurate.
- **Builder** — kept from the original deck. Works for the target audience (dev tools, infra companies).
- **Bespoke** — anything larger or named. Not a tier you sign up for on the page; a door you knock on. Replaces the "Sovereign Partner" / "Anchor" concept from earlier drafts of this plan.

---

## 3. Tier structure and pricing

**Decided:** simplified program with two productised org tiers plus an Individual tier. No Anchor. No scope choice. Larger or named partnerships are handled bespoke ("contact us") rather than productised — matches the existing Support page wording (*"the conversation is one-on-one"*).

### Pricing

- **Individual — $5 / $25 / $100 per month.** Self-serve via GitHub Sponsors and Open Collective. For individuals who want to support recurringly.
- **Supporter — $250 per month.** Logo on `/sponsors` and the org README. For indie companies, dev tool shops, small SaaS that want a visible association with NC.
- **Builder — $1,000 per month.** Everything in Supporter, plus logo across every project README and the docs site footer, a welcome blog post, and a quarterly update email. For infra companies, hosting providers, and aligned foundations that want sustained visibility across all NC surfaces.
- **Bespoke partnerships — contact us.** For organisations interested in a larger, named, or otherwise custom arrangement (publicly named partnership, joint content, direct relationship with the core team). Not productised — designed case-by-case, written down publicly when agreed.

Annual prepay: **10% discount** (standard).

No public commitment on future pricing. If rates change later, that conversation happens when there's evidence for it, not now.

> **For the record — what was simplified out:**
> - Earlier drafts included an **Anchor tier** ($3,000/mo, 3 slots) with named partnership, quarterly calls, and joint content. Removed from v1 — the same outcome is available bespoke for the orgs that actually want it, without committing publicly to perks or slot counts NC would then have to honour. Productise it later if real demand surfaces.
> - Earlier drafts also offered **two visibility scopes** (Collective vs Project). Removed — too much to communicate, and Project-specific intent is already served by Designated Donations (§5), which actually direct funds toward a project's work rather than just visibility.

---

## 4. Perks by tier

Brand-compliant principle: every perk must be a **concrete, named surface** the sponsor can actually see their name on, or a **specific, deliverable thing** that already exists. No "exposure to a privacy-first audience" — that's marketing register.

Single rule across the program: **more dollars = more surfaces.** No scope choices, no per-project tiering. Sponsors who care about one project specifically use a Designated Donation (§5) on top.

### Individual ($5–$100/mo)

- Name listed on `nanocollective.org/sponsors` under "Individual sponsors"
- Listed on the public Open Collective ledger (automatic)

### Supporter ($250/mo)

- Logo + link on `nanocollective.org/sponsors`
- Logo + link on the `Nano-Collective` org profile README in the "Supported by" section
- One-time acknowledgement across NC's social presences when sponsorship begins
- Listed as a financial contributor on the Open Collective page

**Best for:** companies that want a visible, low-cost association with NC.

### Builder ($1,000/mo)

Everything in Supporter, plus:

- Larger logo placement on `nanocollective.org/sponsors` (above Supporters in the same section)
- Logo on the README of **every** Nano Collective project (Nanocoder, Nanotune, get-md, json-up, and any future NC project)
- Logo in the docs site footer
- One dedicated welcome post on the NC blog when sponsorship begins
- Quarterly sponsor update email — what shipped, where the fund went, what's next

**Best for:** infrastructure / dev tools / hosting companies that want sustained visibility across the whole NC surface area.

### Bespoke partnerships (contact us)

For organisations interested in a larger or named arrangement — publicly named partnership, joint content, direct relationship with the core team, or anything else outside the standard tiers.

- Designed case-by-case
- Terms agreed and written down publicly before the relationship begins
- Logo placements, content commitments, and any other deliverables published on `/sponsors` once agreed
- Funds flow through Open Source Collective on the same transparent ledger as everything else

This is deliberately not productised. The Support page already says the conversation is one-on-one; this preserves that, while making clear to bigger prospective partners that there is a door to knock on.

**Decided — Builder perk depth:** logo-surface-area is the differentiator between Supporter and Builder. No maintainer-time perks. Keeps the program operationally simple and prevents the Builder tier from creating an implicit time commitment from contributors.

> **What we are NOT offering — explicit list:**
> - **No** early access to unshipped products. This rules out the "NC Privacy API early access" perk from the original deck — that product is not public per the docs, and the brand guide forbids referencing it.
> - **No** influence over the roadmap, prioritisation, or which contributors get bounties.
> - **No** routing of recurring sponsorship dollars to a specific project's payouts. To direct funds to specific work, use a Designated Donation (§5).
> - **No** exclusivity at a tier (sponsors at the same tier are listed alphabetically).

---

## 5. One-off contributions

Two clean buckets, named so sponsors can pick which one fits.

### General donation

Any amount, one time. Fiat via Open Collective, Bitcoin direct to wallet. Goes to the community fund. No perks attached.

### Designated donation

A specific piece of work, scoped and agreed with the core team before the donation is accepted. Wording lifted from the Economics Charter: *"Nothing is open-ended. Nothing is retrospective. You know what you will be paid before you start."*

No worked examples to cite yet — the program is new and no designated donations have been completed at the time of writing. The `/sponsor` page should describe the mechanism honestly (it exists, it works like this, here's how to start a conversation) and leave the worked-example slot empty until the first real one is delivered. Once the first designated donation is shipped, cite it by name with date and PR link — that becomes the anchor example.

**Decided:** ship the mechanism without fabricated examples. First real completed designated donation becomes the first cited example.

---

## 6. Stats — single source of truth

The original markdown draft hardcoded a table that goes stale every month. Two changes:

1. **Create `nanocollective.org/growth` (or `/stats`)** as the canonical, always-current growth page. Pulls from:
   - npm download counts (Nanocoder, Nanotune, get-md, json-up) — via the npm registry API at build time
   - GitHub stars, contributors per project — via the GitHub API at build time
   - Open Collective totals — via the OC public API
   - The page rebuilds on every site deploy, so it's never more than a deploy stale.

2. **The sponsorship page references the `/growth` page, doesn't duplicate it.** A single line: *"Current stats: nanocollective.org/growth"* under each headline metric. Or — since both are pages on the same site — pull the numbers directly into the sponsorship page at build time, so they update together on every deploy.

For the sponsorship page itself, keep a handful of **anchored** numbers that won't move much:
- "Multiple projects shipped — Nanocoder, Nanotune, get-md, json-up" (true unless we ship more)
- "All four projects open source under permissive licences" (structurally true)
- A single growth highlight written as a range, e.g. *"Tens of thousands of monthly downloads across NC projects, growing month over month — current numbers at /growth."*

Brand guide says: *"Describe shipped work in present tense; describe planned work as planned."* The growth narrative should be present-tense, no projections.

**Decided — `/growth` already exists.** The page is live (with the engagement alerts removed). The sponsorship page can link to it or pull from it at build time as designed.

---

## 7. Logo placements — surface-by-surface

Single rule across all surfaces: **more dollars = more surfaces.** Builders appear everywhere Supporters do, plus more places. Supporters appear in the collective-wide surfaces only. Individuals are name-only.

### nanocollective.org (website)

**`/sponsors` page** — the canonical home for all sponsor recognition. Structured top-to-bottom as:

- Builder sponsors — logos, larger size, placed first.
- Supporter sponsors — logos, smaller size, below Builders.
- Bespoke partners (if any) — named in their own section with a paragraph each, placement decided when the partnership is agreed.
- Individual sponsors — names only, at the bottom.

**Homepage** — small "Supported by" strip (decided to include):

- Builders only. Small logos, alphabetical.
- Supporters and Individuals do not appear on the homepage.

**Site footer**:

- Builders only. Same as the homepage strip.

### docs.nanocollective.org

**Support page** — sponsors list:

- Builders and Supporters get logos.
- Individuals do not appear here.

**Docs site footer**:

- Builders only.

Recommendation: keep docs minimal. The docs are operational documentation. A logo strip in the footer is fine. Per-page sidebar logos are too noisy.

### GitHub

**`Nano-Collective` org profile README — "Supported by" section**:

- Builders appear first, larger logos.
- Supporters appear below, smaller logos.
- Individuals do not appear here.

**Each project's README (Nanocoder, Nanotune, get-md, json-up) — Sponsors section**:

- Builders appear — logos in the project's Sponsors section, same treatment across every project (Builder logos cross-list to all project READMEs).
- Supporters do not appear on individual project READMEs (they're on the org README and `/sponsors` only — this is the Supporter / Builder differentiator).
- Individuals do not appear here.

**`.github/FUNDING.yml`** — exists in every repo, links to Open Collective and GitHub Sponsors. This puts the "Sponsor" button at the top of each repo with zero ongoing maintenance.

**Recommendation:** every NC repo should have a `.github/FUNDING.yml` pointing to Open Collective. Should ship as part of week 1, independent of any sponsorship signed.

### Logo spec (decided — industry standard)

Sponsors submit one of each, named consistently (`sponsor-name.svg`, `sponsor-name.png`):

- **SVG** — preferred everywhere. Transparent background. Used on the website (`/sponsor`, homepage, footer) and on the docs site.
- **PNG** — required as a fallback, exported at 2x the target render width (for retina). Used in GitHub READMEs, where SVGs from external sources don't always render reliably — especially across light/dark mode toggles. PNG keeps READMEs predictable.

**Max widths on desktop (in render — both formats sized to these targets):**

- **Supporter** — 160px wide. Lower-cost tier, smaller visual presence.
- **Builder** — 220px wide. Top productised tier, appears across every NC surface.
- **Bespoke** — agreed during partnership scoping. Typically 240–280px for named lead partnerships; tied to whatever framing the partnership doc commits to.

**Other requirements:**

- Transparent background, no built-in padding (NC controls spacing in layout).
- Logo must read on both light and dark backgrounds — NC defaults to dark mode. If a sponsor's logo only works on one, request a single-colour or inverted variant for the other.
- Heights scale to preserve aspect ratio; the widths above are the maximum, narrower logos render at their natural width within the same row.
- Source files stored in the website repo under `public/sponsors/`. Logos in project READMEs reference the same files via raw GitHub URLs so there's one source of truth per sponsor.

These specs go into the Sponsorship Operations docs page (§9) so contributors adding logos to a README don't have to guess.

---

## 8. Editorial line — who we accept, who we decline

This needs to be written down once and made public, before the first sponsor signs. It is one of the things that makes a values-driven sponsorship program actually credible.

**Proposed wording (draft):**

> The Nano Collective reserves the right to decline any sponsorship. We will decline if a prospective sponsor's stated mission, product, or public conduct conflicts materially with what the collective is building — privacy-respecting, local-first, open AI tooling. Declining is not a moral judgement; it is a recognition that some associations would undermine the work for everyone else who participates. Decisions are made by the core team and are not appealable.

Add to the Support page or as a section of `/sponsors`. Sponsors should know this exists before they enquire.

**Decided:** no public list of categories. The single paragraph above is enough — keeps NC flexible and avoids fighting on definitions.

---

## 9. Operational mechanics

Two categories of work: things that ship *for launch*, and things that happen *only when a sponsor signs*. The sponsor-triggered work is documented in §7 (placements) and below — when the first sponsor comes through, the playbook tells us exactly what to edit. No placeholder logo slots, no empty "Supported by" sections that look bare on a fresh page.

### Ships for launch

- [ ] **`/sponsor` page on nanocollective.org** — the pitch, the tiers, the bespoke door, plus an empty-but-named "Current sponsors" section (heading only, "no sponsors yet" is honest at a new-program launch). Web page, not a PDF, linked anywhere.
- [ ] **`/growth` page on nanocollective.org** — stats source of truth, fed by npm / GitHub / OC APIs at build time. Engagement alerts already removed.
- [ ] **Updated Support page in docs** — link to the productised tiers, remove "tiers being finalised" language, mention the bespoke partnership door.
- [ ] **`.github/FUNDING.yml`** in every NC repo. Adds the "Sponsor" button to each repo with no ongoing maintenance — the only repo-level touch needed before the first sponsor.
- [ ] **Sponsor onboarding playbook** — operational doc published in the collective docs alongside *Creating a New Project* and the *Economics Charter*. Logo intake, invoice setup, welcome post draft, social post, the exact list of files to edit when a sponsor signs (using §7 as the source). Openly published — transparency about how the program runs is part of why sponsors should trust it.
- [ ] **Sponsor offboarding playbook** — same pattern, published in the collective docs. Covers what happens when a sponsorship ends (lapses, cancelled, declined-by-NC). 30-day logo removal window is the proposed default. Public and written down so a sponsor knows what to expect before they sign up.
- [ ] **Sponsorship Operations docs page** — public reference at `docs.nanocollective.org/collective/organisation/sponsorship-operations` (or similar). Mirrors §7 of this plan: which logos go on which surfaces, at what tier. Linked from the onboarding playbook. This is what a contributor opening a sponsorship PR consults — they shouldn't need this internal planning doc.
- [ ] **Editorial-line paragraph (§8)** published on the Support page or `/sponsor`.

### Happens when a sponsor signs (documented now, executed then)

The placement rules in §7 of this plan are the source for what to do — but they need to live in the **public collective docs** too, not just this internal planning doc. A new contributor opening a sponsorship-related PR should be able to find the canonical "where do logos go" reference at `docs.nanocollective.org`, alongside *Creating a New Project*, *Brand Guidelines*, and the *Economics Charter*.

So: publish a **Sponsorship Operations** page in the collective docs that mirrors §7 (placement rules) and the lists below (what to edit when a sponsor signs). The onboarding playbook links to it. This way, §7 in this plan is the design; the docs page is the public operational reference.

Per the placement rules in §7. No empty placeholders sitting on surfaces today.

- **For any tier** — sponsor added to `/sponsor` page's "Current sponsors" section.
- **For Supporter sign-ups** — also add the logo to the `Nano-Collective` org profile README's "Supported by" section. Create that section in the same PR if it doesn't exist yet.
- **For Builder sign-ups** — also add the logo to every project's README sponsors section (create the section in each README in the same PR if it doesn't exist yet), to the docs site footer, and to the homepage strip if that's decided. Publish the welcome blog post. Send the first quarterly update email after the next quarter closes.
- **For Bespoke partnerships** — placements agreed during the partnership scoping conversation and applied as part of the sign-up PR. Publish the agreed terms on `/sponsor` so the partnership is on the record.

### Not a launch blocker

- **Outreach list** — build over time as opportunities surface. No list of warm prospects today, and that's fine — launch is public and any future outreach happens against an already-live page.

**Decided — invoicing:** OSC supports invoices for >$1k contributions. The onboarding playbook will document the OSC invoice flow before the first Builder signs, since $1,000/mo sits right at the threshold. Verification of the flow itself is a parallel todo, not a launch blocker.

---

## 10. Rollout

Single push, no phased soft-launch. Ship everything together and announce publicly as a new program. Empty sponsor list at launch is fine — the framing is *"new program, here's how it works, here's the door"*, not *"sponsorship platform pretending it's been running for ages"*. Honest tone matches the brand voice.

**What ships in the launch push:**

- `/growth` page (live stats, recommended to build first since the sponsorship page references it)
- Sponsorship page at `nanocollective.org/sponsor` (pitch + tiers + current sponsors + bespoke door, all in one place)
- `FUNDING.yml` added to every repo
- Sponsors-section stub in every project README + the org profile README
- Support page on docs updated to point at the published tiers and the bespoke door
- Editorial-line paragraph published (proposed §8 wording)
- Sponsor onboarding + offboarding playbooks published in collective docs

**Announcement:**

- Post on the NC blog framing it as a new program — what it is, why it exists, what funds do, how to get involved
- Cross-post to all NC social presences (Discord, X, LinkedIn, etc.)
- Update the Nanocoder release notes / announcement on the next version
- Submit to relevant places (HN, OSS sponsorship roundups) — empty wall is fine since the framing is "new program, just launched"

**After launch (parallel, no fixed timeline):**

- Build an outreach list as opportunities surface — companies that come up in Discord, on Twitter, in maintainer conversations. Don't gate the launch on having one ready.
- Reach out warmly to anyone who naturally lands in the funnel.
- Iterate the sponsorship page based on questions and friction the first conversations surface.

---

## 11. Open questions — consolidated

For Will / Ben / Matt to decide before we write public copy:

1. ~~**Pricing:** Option A or Option B?~~ **Decided: $250 Supporter / $1,000 Builder.** Bespoke partnerships handled case-by-case, no productised top tier for v1.
2. ~~**Tier names:** `Supporter / Builder / Anchor` — agreed?~~ **Decided: Supporter / Builder. Anchor removed; bespoke partnerships replace it.**
3. ~~**Individual tier:** ship or skip?~~ **Decided: ship. $5 / $25 / $100 per month, name-on-sponsors-page only.**
4. ~~**Builder differentiation:** logo-surface-area only, or add a maintainer-time perk?~~ **Decided: logo-surface-area only. No maintainer-time perks.**
5. ~~**Designated donations — real examples:** do we have any completed pieces of designated-funded work to cite as worked examples on `/sponsor`, or do we ship without?~~ **Decided: no examples yet. Ship the mechanism honestly without fabricated examples; first real designated donation becomes the first cited example.**
6. ~~**Build `/growth` first:** yes? (I strongly recommend yes.)~~ **Decided: `/growth` is already live. Sponsorship page links to it or pulls from it at build time.**
7. ~~**Homepage logo strip:** include or keep logos on `/sponsors` only?~~ **Decided: include a small "Supported by" strip on the homepage. Builders only.**
8. ~~**Editorial line:** publish a single paragraph (proposed §8), or stay quieter on the criteria?~~ **Decided: publish the single paragraph in §8. No public list of categories.**
9. ~~**Launch gate:** ship public with empty sponsors page, or wait for the first signed sponsor?~~ **Decided: ship public, empty sponsor list at launch is fine. Framing is "new program, just launched."**

---

## 12. What this plan deliberately leaves out

- No mention of "Sovereign AI", "Sovereign Partner", "Trustless", "Not your model, not your mind". Banned per brand guide.
- No early-access perks for unshipped products. The original deck offered "NC Privacy API early access" — that product is not in the docs index, so it cannot be offered.
- No commitment to a fund-allocation split (e.g. "60% of sponsorship goes to bounties"). The Economics Charter says the share will be published as it's set — doing it here would jump the gun. Decide separately and publish in the charter.
- No mention of governance influence, voting rights, or contributor priority for sponsors. Sponsors fund the community fund; they don't direct it.
- No fabricated worked examples for designated donations. The mechanism is described honestly; the first real completed designated donation becomes the first cited example.
