"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";
import RotatingKeyword from "./RotatingKeyword";

const indicators = [
  { color: "#2aa198", label: "DePIN infrastructure" },
  { color: "#b58900", label: "$MIWIM token" },
  { color: "#859900", label: "Android app live" },
  { color: "#268bd2", label: "White-label API" },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Interactive background */}
      <NetworkCanvas />

      {/* Foreground content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        {/* Announcement pill */}
        <motion.div
          variants={fadeScale}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <span
            className="h-2 w-2 rounded-full bg-brand-primary"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="text-[13px] tracking-wide text-text-secondary">
            Seed round open — $100K-$500K
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
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
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          DePIN-powered proxy infrastructure with decentralized relay nodes,
          genuine residential IPs, and white-label APIs.
        </motion.p>

        {/* Button row */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="btn-primary rounded-xl px-9 py-4 text-base"
          >
            Join Waitlist
          </a>
          <Link
            href="/docs/whitepaper"
            className="btn-ghost rounded-xl px-9 py-4 text-base"
          >
            Read Whitepaper →
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 lg:gap-10"
        >
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="relative h-10 w-px bg-text-tertiary/30">
          <span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-text-tertiary/60"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
