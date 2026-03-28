"use client";

import NetworkCanvas from "./NetworkCanvas";
import RotatingKeyword from "./RotatingKeyword";

const indicators = [
  { color: "#2aa198", label: "DePIN infrastructure" },
  { color: "#b58900", label: "$MIWIM token" },
  { color: "#859900", label: "Android app live" },
  { color: "#268bd2", label: "White-label API" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Interactive background */}
      <NetworkCanvas />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Announcement pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5" style={{ borderColor: "var(--border-subtle)" }}>
          <span
            className="h-2 w-2 rounded-full bg-brand-primary"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="text-[13px] tracking-wide text-text-secondary">
            Seed round open — $100K-$500K
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-[40px] font-bold leading-[1.05] tracking-[-0.03em] lg:text-[64px]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-brand-primary) 60%, var(--color-brand-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          The <RotatingKeyword /> proxy
          <br />
          network, owned by everyone.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-text-secondary">
          DePIN-powered proxy infrastructure with decentralized relay nodes,
          genuine residential IPs, and white-label APIs.
        </p>

        {/* Button row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="rounded-xl bg-brand-primary px-9 py-4 text-base font-semibold text-[#002b36] transition-all hover:-translate-y-0.5 hover:bg-[#35b5ab] hover:shadow-[0_4px_20px_rgba(42,161,152,0.3)]"
          >
            Join Waitlist
          </a>
          <a
            href="/docs/whitepaper"
            className="rounded-xl border px-9 py-4 text-base font-medium text-text-primary transition-all hover:bg-bg-card"
            style={{ borderColor: "var(--border-hover)" }}
          >
            Read Whitepaper →
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 lg:gap-10">
          {indicators.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[13px] uppercase tracking-[1px] text-text-tertiary">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-10 w-px bg-text-tertiary/30">
          <span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-text-tertiary/60"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
