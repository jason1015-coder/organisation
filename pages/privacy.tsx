import Head from "next/head";
import { Footer } from "@/components/layout-v2/Footer";

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
              <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
              Legal
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-foreground break-words">
              Privacy Policy
            </h1>
            
            <p className="text-xs sm:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-[800px]">
              Placeholder for the official Nano Collective privacy policy.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-24">
          <div className="prose prose-neutral dark:prose-invert max-w-3xl font-mono text-sm leading-relaxed">
            <p>[ PRIVACY POLICY CONTENT COMING SOON ]</p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
