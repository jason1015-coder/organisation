import { ArrowRight, Github, Image, Palette, LayoutTemplate } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "@/components/layout-v2/Footer";
import { SectionReveal, StaggerContainer, StaggerItem, CardHover } from "@/components/ui/motion";

const assets = [
  {
    title: "GitHub GIFs",
    description:
      "Animated screen recordings of Nanocoder in action for your GitHub profiles and READMEs.",
    href: "/assets/github-gif",
    icon: Github,
  },
  {
    title: "Cover & Post Generator",
    description:
      "Generate branded cover banners and release post art. Customise dimensions, text, and a harmonised color theme, then export a PNG.",
    href: "/assets/cover-image",
    icon: LayoutTemplate,
  },
  {
    title: "Brand Assets",
    description:
      "Logos, icons, and branding materials for Nano Collective projects.",
    href: "/assets/brand",
    icon: Palette,
    comingSoon: true,
  },
  {
    title: "Screenshots",
    description:
      "High-quality screenshots of our tools for documentation and marketing.",
    href: "/assets/screenshots",
    icon: Image,
    comingSoon: true,
  },
];

export default function Assets() {
  return (
    <>
      <Head>
        <title>Assets | Nano Collective</title>
        <meta
          name="description"
          content="Download and use Nano Collective branding, screenshots, and animated assets."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Hero */}
        <SectionReveal>
          <section className="relative pt-12 pb-12 sm:pb-20 px-4 md:px-6 container mx-auto border-b border-foreground/20">
            <div className="space-y-4 sm:space-y-8 max-w-4xl">
              <div className="flex items-center gap-2 text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest border-b border-foreground/20 pb-2 max-w-[200px]">
                <span className="text-[#0000EE] dark:text-[#A1A1AA] font-bold">&gt;</span>
                Media
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-bold tracking-tight text-foreground break-words">
                Brand Assets
              </h1>
              
              <p className="text-xs sm:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-[800px]">
                Downloads, screenshots, and animations for your projects.
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* Main Content */}
        <SectionReveal>
          <main className="flex-1 container mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-24">
            {/* Asset Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-16">
              {assets.map((asset) => (
                <StaggerItem key={asset.href}>
                  <CardHover
                    className={`flex flex-col border border-foreground/20 bg-background transition-colors h-full ${
                      asset.comingSoon
                        ? "opacity-60"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-muted/30">
                          <asset.icon className="w-5 h-5 text-foreground" />
                        </div>
                        {asset.comingSoon && (
                          <span className="font-mono text-xs font-bold px-3 py-1 bg-muted text-muted-foreground uppercase tracking-widest border border-foreground/10">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight">
                        {asset.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {asset.description}
                      </p>
                    </div>

                    <div className="p-6 pt-0 mt-auto border-t border-foreground/10">
                      {asset.comingSoon ? (
                        <button disabled className="mt-4 w-full text-sm font-semibold py-3 border border-foreground/20 text-foreground/50 bg-muted/30 flex items-center justify-center cursor-not-allowed">
                          Pending
                        </button>
                      ) : (
                        <Link
                          href={asset.href}
                          className="mt-4 w-full text-sm font-semibold py-3 border border-foreground/20 bg-background hover:bg-foreground hover:text-background transition-colors flex items-center justify-center group"
                        >
                          View Assets
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </CardHover>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Usage Guidelines */}
            <div className="border border-foreground/20 bg-muted/5 p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight mb-4">Usage Guidelines</h2>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-3xl">
                Our assets are available under the{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0000EE] dark:text-[#A1A1AA] hover:underline font-semibold"
                >
                  CC BY 4.0 license
                </a>
                . When using our assets, please attribute Nano Collective and
                link back to our website. Feel free to modify colors to fit your
                theme!
              </p>
            </div>
          </main>
        </SectionReveal>
        
        <Footer />
      </div>
    </>
  );
}
