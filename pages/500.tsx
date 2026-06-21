import Head from "next/head";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error | Nano Collective</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
          <div className="space-y-8 max-w-4xl w-full">
            <div className="inline-block border-2 border-[#ff0000]/40 px-4 py-2 bg-[#ff0000]/10 font-mono text-sm font-bold uppercase tracking-widest text-[#ff0000]">
              [ SERVER FAULT ]
            </div>

            <h1 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none font-bold tracking-tighter text-foreground">
              500
            </h1>

            <p className="text-xl sm:text-3xl font-mono text-foreground/70 uppercase tracking-widest">
              An unexpected anomaly occurred on our servers.
            </p>

            <div className="pt-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-6 bg-[#0000EE] dark:bg-foreground text-white dark:text-background font-mono font-bold uppercase tracking-widest text-sm sm:text-lg border-2 border-[#0000EE] dark:border-foreground hover:bg-[#0000EE]/90 dark:hover:bg-foreground/90 transition-colors"
              >
                &gt; RETURN_HOME
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
