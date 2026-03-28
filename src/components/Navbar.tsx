"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "var(--bg-glass)" : "transparent",
        borderColor: scrolled ? "var(--border-subtle)" : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wider text-text-primary">
          MIWIM
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Docs
          </Link>
          <Link
            href="/docs/whitepaper"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Whitepaper
          </Link>
          <a
            href="#waitlist"
            className="rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-semibold text-[#002b36] transition-all hover:-translate-y-0.5 hover:bg-[#35b5ab] hover:shadow-[0_4px_20px_rgba(42,161,152,0.3)]"
          >
            Join Waitlist →
          </a>
        </div>
      </div>
    </nav>
  );
}
