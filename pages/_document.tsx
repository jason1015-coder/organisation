import { Head, Html, Main, NextScript } from "next/document";

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* OpenGraph */}
        <meta property="og:site_name" content="Nano Collective" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />

        {/* Feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Nano Collective RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Nano Collective Atom Feed"
          href="/feed.atom"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nano Collective",
              url: "https://nanocollective.org",
              logo: "https://nanocollective.org/logo.png",
              description:
                "Open-source AI tools collective building privacy-first, privacy-respecting AI applications",
              sameAs: [
                "https://github.com/Nano-Collective",
                "https://discord.gg/ktPDV6rekE",
              ],
            }),
          }}
        />
      </Head>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
