"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const supplyItems = [
  { label: "VPS / Servers", color: "#268bd2" },
  { label: "Home Broadband", color: "#268bd2" },
  { label: "Mobile Hotspots", color: "#268bd2" },
];

const platformItems = [
  "Node Scheduler",
  "Smart Routing",
  "Token Economy",
  "Subscription API",
  "White-Label Gateway",
];

const demandItems = [
  { label: "Backbone\nC-end VPN", color: "#859900" },
  { label: "Edge\nB2B Resi", color: "#859900" },
  { label: "White-Label\nAPI (B2B)", color: "#859900" },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 lg:py-40">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary"
          >
            How It Works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            A three-sided marketplace for bandwidth
          </motion.h2>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col items-center gap-8"
        >
          {/* SUPPLY SIDE */}
          <motion.div variants={fadeUp} custom={2} className="w-full">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              Supply Side
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {supplyItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-4 text-center text-sm font-medium text-text-primary"
                  style={{
                    background: "var(--color-bg-card)",
                    borderColor: "rgba(38,139,210,0.3)",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow down */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-8 w-px bg-text-tertiary/30" />
            <svg width="12" height="8" viewBox="0 0 12 8" className="text-text-tertiary/50">
              <path d="M6 8L0 0h12z" fill="currentColor" />
            </svg>
          </motion.div>

          {/* PLATFORM */}
          <motion.div variants={fadeUp} custom={4} className="w-full">
            <div
              className="rounded-2xl border p-6 text-center lg:p-8"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--border-active)",
                boxShadow: "0 0 60px rgba(42,161,152,0.08)",
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                Miwim Platform
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {platformItems.map((item, i) => (
                  <span
                    key={item}
                    className="rounded-lg px-3 py-1.5 text-sm text-text-secondary"
                    style={{ background: "var(--color-bg-card-deep)" }}
                  >
                    {item}
                    {i < platformItems.length - 1 && (
                      <span className="ml-3 text-text-tertiary/30">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Arrow down */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-8 w-px bg-text-tertiary/30" />
            <svg width="12" height="8" viewBox="0 0 12 8" className="text-text-tertiary/50">
              <path d="M6 8L0 0h12z" fill="currentColor" />
            </svg>
          </motion.div>

          {/* DEMAND SIDE */}
          <motion.div variants={fadeUp} custom={6} className="w-full">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-success">
              Demand Side
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {demandItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-4 text-center text-sm font-medium whitespace-pre-line text-text-primary"
                  style={{
                    background: "var(--color-bg-card)",
                    borderColor: "rgba(133,153,0,0.3)",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
