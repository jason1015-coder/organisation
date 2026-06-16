import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-semibold text-sm tracking-tight flex items-center gap-2 text-foreground mb-4"
            >
              <div className="w-5 h-5 bg-primary text-primary-foreground rounded-sm flex items-center justify-center font-mono text-[10px] font-bold">
                N
              </div>
              Nano Collective
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open-source AI tools built for developers. Privacy-first,
              local-first.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 font-mono tracking-wide">
              Products
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/nanocoder"
                  className="hover:text-foreground transition-colors"
                >
                  Nanocoder
                </Link>
              </li>
              <li>
                <Link
                  href="/nanotune"
                  className="hover:text-foreground transition-colors"
                >
                  Nanotune
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 font-mono tracking-wide">
              Community
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/contributors"
                  className="hover:text-foreground transition-colors"
                >
                  Contributors
                </Link>
              </li>
              <li>
                <Link
                  href="/built-with"
                  className="hover:text-foreground transition-colors"
                >
                  Built With
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/ktPDV6rekE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano-Collective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 font-mono tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/growth"
                  className="hover:text-foreground transition-colors"
                >
                  Growth
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="hover:text-foreground transition-colors"
                >
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>
            © {new Date().getFullYear()} Nano Collective. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
