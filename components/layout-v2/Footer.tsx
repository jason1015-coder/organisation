import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-bold text-2xl tracking-tight flex items-center gap-2 text-black mb-4"
            >
              Nano Collective
            </Link>
            <p className="text-sm text-black/70 font-mono leading-relaxed">
              Open-source AI tools built for developers. Privacy-first,
              local-first.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-black mb-4 font-mono tracking-wide uppercase border-b border-black pb-2 inline-block">
              Products
            </h4>
            <ul className="space-y-3 font-mono text-sm text-black/70">
              <li>
                <Link
                  href="/nanocoder"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Nanocoder
                </Link>
              </li>
              <li>
                <Link
                  href="/nanotune"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Nanotune
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-black mb-4 font-mono tracking-wide uppercase border-b border-black pb-2 inline-block">
              Community
            </h4>
            <ul className="space-y-3 font-mono text-sm text-black/70">
              <li>
                <Link
                  href="/contributors"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Contributors
                </Link>
              </li>
              <li>
                <Link
                  href="/built-with"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Built With
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/ktPDV6rekE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nano-Collective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-black mb-4 font-mono tracking-wide uppercase border-b border-black pb-2 inline-block">
              Resources
            </h4>
            <ul className="space-y-3 font-mono text-sm text-black/70">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/growth"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Growth
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="hover:text-[#0000EE] transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#0000EE] opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">&gt;</span>
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-black/60 font-mono">
          <p>
            © {new Date().getFullYear()} Nano Collective. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-[#0000EE] transition-colors"
            >
              [ Privacy ]
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#0000EE] transition-colors"
            >
              [ Terms ]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
