"use client";

import { motion } from "framer-motion";
import { ShieldOff, ServerOff, ZapOff } from "lucide-react";

const cards = [
  {
    icon: ShieldOff,
    title: "Trust crisis",
    body: "Centralized VPN providers and proxy services shut down without warning — taking user funds and data with them.",
  },
  {
    icon: ServerOff,
    title: "IP monopoly",
    body: "Residential IP resources are controlled by a handful of companies. Prices are $8-15/GB. Access is restricted.",
  },
  {
    icon: ZapOff,
    title: "Single point of failure",
    body: "When one provider is blocked or seized, every user loses access simultaneously. No redundancy, no recourse.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Problem() {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary"
          >
            The Problem
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            The centralized proxy market is fundamentally broken
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(42,161,152,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <card.icon className="mb-5 h-8 w-8 text-brand-primary" />
              <h3 className="mb-3 text-2xl font-semibold">{card.title}</h3>
              <p className="leading-relaxed text-text-secondary">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
