import Head from "next/head";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Nano Collective</title>
        <meta
          name="description"
          content="Privacy policy for Nano Collective and its tools."
        />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Hero */}
        <section className="relative pt-12 pb-12 sm:pb-20 px-4 md:px-6 container mx-auto border-b border-foreground/20">
          <div className="space-y-4 sm:space-y-8 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest border-b border-foreground/20 pb-2 max-w-[200px]">
              <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">
                &gt;
              </span>
              Legal
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-foreground break-words">
              Privacy Policy
            </h1>

            <p className="text-xs sm:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-[800px]">
              Short version: this is a static website. We don&apos;t track you,
              we don&apos;t use analytics, and we don&apos;t store any personal
              data.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-24">
          <div className="prose prose-neutral dark:prose-invert max-w-3xl font-mono text-sm leading-relaxed">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Last updated: June 2026
            </p>

            <h2>What we collect</h2>
            <p>
              Nothing. This site is a set of static HTML, CSS, and JavaScript
              files. There is no account system, no database, no analytics, no
              advertising, and no tracking pixels. We do not collect, store, or
              sell personal information, and we never will.
            </p>

            <h2>Cookies</h2>
            <p>
              We don&apos;t set any cookies, so there is no cookie consent
              banner to click through. The only cookies you might receive are
              strictly-necessary ones set by our hosting provider, Cloudflare,
              to keep the site secure and online (for example, bot-protection
              tokens such as <code>__cf_bm</code>). These are exempt from
              consent requirements under GDPR / ePrivacy and are not used to
              track or profile you.
            </p>

            <h2>Hosting</h2>
            <p>
              The site is hosted on{" "}
              <a
                href="https://www.cloudflare.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare Pages
              </a>
              . Like any web host, Cloudflare automatically processes basic
              technical information needed to deliver the site and protect it
              from abuse, such as your IP address and request metadata. This is
              handled by Cloudflare under its own{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>
              . We do not have access to a database of this information.
            </p>

            <h2>Data shown on this site</h2>
            <p>
              Some pages display public statistics — GitHub stars, contributor
              counts, npm download numbers, and Discord member counts. This data
              is fetched from GitHub, npm, and Discord when the site is built,
              not when you visit. No information about you is sent to those
              services by loading our pages.
            </p>

            <h2>External links</h2>
            <p>
              Our tools and community live on third-party platforms such as{" "}
              <a
                href="https://github.com/Nano-Collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              , Discord, and npm. When you follow a link to one of these, you
              are subject to that platform&apos;s own privacy policy, which we
              don&apos;t control.
            </p>

            <h2>Changes</h2>
            <p>
              If we ever change how the site works in a way that affects this
              policy, we&apos;ll update this page.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Email us at{" "}
              <a href="mailto:hello@nanocollective.org">
                hello@nanocollective.org
              </a>
              , or reach out via our{" "}
              <a
                href="https://github.com/Nano-Collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub organization
              </a>{" "}
              or our community Discord.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
