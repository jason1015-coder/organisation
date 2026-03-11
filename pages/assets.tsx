import { ArrowRight, Github, Image, Palette, Twitter } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const assets = [
  {
    title: "GitHub GIFs",
    description:
      "Animated screen recordings of Nanocoder in action for your GitHub profiles and READMEs.",
    href: "/assets/github-gif",
    icon: Github,
  },
  {
    title: "Cover Image",
    description:
      "Customizable cover image for X/Twitter or other platforms. Change dimensions and screenshot.",
    href: "/assets/cover-image",
    icon: Twitter,
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
        <title>Assets - Nano Collective</title>
        <meta
          name="description"
          content="Download and use Nano Collective branding, screenshots, and animated assets."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Assets</h1>
              <p className="text-xl text-muted-foreground">
                Branded assets, screenshots, and animations for Nano Collective
                projects.
              </p>
            </div>

            {/* Asset Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assets.map((asset) => (
                <Card
                  key={asset.href}
                  className={asset.comingSoon ? "opacity-70" : ""}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <asset.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>{asset.title}</CardTitle>
                      </div>
                      {asset.comingSoon && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <CardDescription>{asset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {asset.comingSoon ? (
                      <Button disabled variant="outline" className="w-full">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Button>
                    ) : (
                      <Button asChild className="w-full">
                        <Link href={asset.href}>
                          View Assets
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Usage Guidelines */}
            <div className="mt-12 p-6 rounded-xl border bg-card/50">
              <h2 className="text-lg font-semibold mb-2">Usage Guidelines</h2>
              <p className="text-muted-foreground text-sm">
                Our assets are available under the{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  CC BY 4.0 license
                </a>
                . When using our assets, please attribute Nano Collective and
                link back to our website. Feel free to modify colors to fit your
                theme!
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
