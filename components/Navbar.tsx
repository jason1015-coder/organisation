"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/pipeline", label: "Build" },
  { href: "/blog", label: "Blog" },
  { href: "https://docs.nanocollective.org", label: "Docs", external: true },
  { href: "/contributors", label: "Contributors" },
  { href: "/sponsor", label: "Sponsor" },
];

const socialLinks = [
  {
    href: "https://github.com/Nano-Collective",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://x.com/nano_collective",
    label: "X",
    icon: FaXTwitter,
  },
  {
    href: "https://discord.gg/ktPDV6rekE",
    label: "Discord",
    icon: FaDiscord,
  },
  {
    href: "https://www.linkedin.com/company/nano-collective/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground transition-colors hover:text-primary dark:hover:text-[#A1A1AA]"
        >
          <span className="text-lg">Nano Collective</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary dark:hover:text-[#A1A1AA]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary dark:hover:text-[#A1A1AA]",
                  router.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Social Links & Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-300 hover:border-border hover:bg-muted/50 hover:text-foreground hover:scale-105"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <div className="w-px h-4 bg-border mx-1" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-300 hover:border-border hover:bg-muted/50 hover:text-foreground active:scale-95"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-out",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container mx-auto px-4 md:px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                  router.pathname === link.href
                    ? "text-foreground bg-accent/50"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="flex items-center gap-3 px-3 py-2 border-t border-border/40 mt-2 pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-300 hover:border-border hover:bg-muted/50 hover:text-foreground hover:scale-105"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
