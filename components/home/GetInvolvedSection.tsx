import { BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function GetInvolvedSection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">Get Involved</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            We welcome contributions in code, documentation, design, and
            marketing. Join our community and help build powerful,
            privacy-respecting AI tools that are open for all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
            <Button size="lg" className="group w-full" asChild>
              <a
                href="https://github.com/Nano-Collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Contribute on GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group w-full"
              asChild
            >
              <a
                href="https://discord.gg/ktPDV6rekE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Join Discord
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group w-full"
              asChild
            >
              <a
                href="https://docs.nanocollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Read the Docs
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group w-full"
              asChild
            >
              <Link href="/contributors">
                <Users className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View Contributors
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
