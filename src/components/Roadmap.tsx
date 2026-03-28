"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const phases = [
  {
    quarter: "Q3 2026",
    title: "Foundation",
    isCurrent: true,
    items: ["MVP launch", "10+ nodes", "100 beta users", "Seed round"],
  },
  {
    quarter: "Q4 2026",
    title: "Growth",
    isCurrent: false,
    items: [
      "iOS + Desktop",
      "White-label API",
      "50+ nodes",
      "1K users",
      "First B2B",
    ],
  },
  {
    quarter: "Q1 2027",
    title: "Token Launch",
    isCurrent: false,
    items: [
      "Testnet → Mainnet",
      "$MIWIM TGE",
      "Provider staking",
      "Bandwidth proof",
    ],
  },
  {
    quarter: "Q2 2027",
    title: "Scale",
    isCurrent: false,
    items: [
      "500+ global nodes",
      "10K+ users",
      "50+ B2B clients",
      "Marketplace",
    ],
  },
];

export default function Roadmap() {
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
            Roadmap
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            From MVP to global network
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Horizontal line (desktop) */}
          <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-text-tertiary/20 lg:block" />

          <div className="grid gap-6 lg:grid-cols-4">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.quarter}
                variants={fadeUp}
                custom={i + 2}
                className="relative"
              >
                {/* Dot */}
                <div className="mb-4 flex items-center gap-3 lg:flex-col lg:items-start">
                  <div
                    className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                      phase.isCurrent
                        ? "border-brand-primary bg-brand-primary"
                        : "border-text-tertiary/40 bg-bg-primary"
                    }`}
                    style={
                      phase.isCurrent
                        ? {
                            boxShadow: "0 0 20px rgba(42,161,152,0.4)",
                          }
                        : undefined
                    }
                  />
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        phase.isCurrent
                          ? "text-brand-primary"
                          : "text-text-tertiary"
                      }`}
                    >
                      {phase.quarter}
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="rounded-xl border p-5"
                  style={{
                    background: "var(--color-bg-card)",
                    borderColor: phase.isCurrent
                      ? "var(--border-active)"
                      : "var(--border-subtle)",
                    boxShadow: phase.isCurrent
                      ? "0 0 30px rgba(42,161,152,0.06)"
                      : undefined,
                  }}
                >
                  <h3 className="mb-3 text-lg font-semibold text-text-primary">
                    {phase.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{
                            backgroundColor: phase.isCurrent
                              ? "#2aa198"
                              : "#657b83",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
