"use client";

import { motion } from "framer-motion";
import { Zap, Fingerprint } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const products = [
  {
    badge: "For consumers",
    badgeColor: "#2aa198",
    icon: Zap,
    title: "Miwim Backbone",
    subtitle: "Decentralized VPN for everyday use",
    description:
      "Global network of datacenter relay nodes delivering low-latency, high-bandwidth proxy access. One-tap connect via our Android app. Monthly subscription starting at $8.",
    features: [
      "Low latency (~150ms CN→US)",
      "Singbox protocol support",
      "Auto-failover in <1 second",
      "Fast mode or private (multi-hop) mode",
    ],
    variant: slideLeft,
  },
  {
    badge: "For business",
    badgeColor: "#d33682",
    icon: Fingerprint,
    title: "Miwim Edge",
    subtitle: "Genuine residential IPs on demand",
    description:
      "Real home broadband IPs sourced ethically through DePIN incentives. Anti-detection grade purity for e-commerce, data collection, and account management.",
    features: [
      "Genuine residential IPs from real homes",
      "Forced multi-hop for maximum privacy",
      "IP pool rotation or dedicated binding",
      "Per-GB pricing starting at $1/GB",
    ],
    variant: slideRight,
  },
];

export default function Solution() {
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
            The Solution
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            Two products, one decentralized network
          </motion.h2>
        </motion.div>

        {/* Product cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={product.variant}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 lg:p-10"
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
              {/* Badge */}
              <span
                className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: product.badgeColor,
                  color: product.badgeColor,
                }}
              >
                {product.badge}
              </span>

              <product.icon
                className="mb-4 h-8 w-8"
                style={{ color: product.badgeColor }}
              />

              <h3 className="mb-1 text-2xl font-semibold">{product.title}</h3>
              <p className="mb-4 text-sm text-text-tertiary">
                {product.subtitle}
              </p>
              <p className="mb-6 leading-relaxed text-text-secondary">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: product.badgeColor }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text-tertiary"
        >
          Both product lines share the same decentralized supply network, the
          same app, and the same $MIWIM token economy. The split is in routing
          and pricing — not infrastructure.
        </motion.p>
      </div>
    </section>
  );
}
