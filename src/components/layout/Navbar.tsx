"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-text-primary transition-colors hover:text-accent-primary"
        >
          IP
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-text-secondary transition-colors hover:text-accent-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )
            }
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/30"
            aria-label="Open command palette"
          >
            <span className="font-mono">Cmd+K</span>
          </button>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
