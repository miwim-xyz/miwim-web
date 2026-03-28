"use client";

import { motion } from "framer-motion";
import { Coins, Lock, TrendingUp, Vote, Flame } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const allocations = [
  {
    label: "Node rewards",
    pct: 40,
    note: "4-year emission, annual halving",
    color: "#2aa198",
  },
  {
    label: "Team & advisors",
    pct: 20,
    note: "2-year vest, 6-month cliff",
    color: "#268bd2",
  },
  {
    label: "Investors",
    pct: 15,
    note: "1-year vest, milestone unlock",
    color: "#d33682",
  },
  {
    label: "Ecosystem fund",
    pct: 15,
    note: "Multisig / DAO controlled",
    color: "#b58900",
  },
  {
    label: "Community",
    pct: 10,
    note: "Airdrop, referral, incentives",
    color: "#859900",
  },
];

const utilities = [
  { icon: Coins, label: "Pay", desc: "20% discount when paying with $MIWIM" },
  { icon: Lock, label: "Stake", desc: "Providers stake to guarantee SLA" },
  { icon: TrendingUp, label: "Earn", desc: "Bandwidth providers earn $MIWIM" },
  { icon: Vote, label: "Govern", desc: "Token holders vote on network params" },
  { icon: Flame, label: "Burn", desc: "10% of revenue buys back and burns" },
];

export default function Tokenomics() {
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
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-gold"
          >
            $MIWIM Token
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]"
          >
            Not a fundraising tool — the network&apos;s settlement layer
          </motion.h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — Allocation bars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-6 text-sm text-text-tertiary"
            >
              Total supply:{" "}
              <span className="font-semibold text-brand-gold">
                1,000,000,000 $MIWIM
              </span>
            </motion.p>
            <div className="space-y-4">
              {allocations.map((alloc, i) => (
                <motion.div key={alloc.label} variants={fadeUp} custom={i + 3}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      {alloc.pct}% {alloc.label}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {alloc.note}
                    </span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full"
                    style={{ background: "var(--color-bg-card-deep)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: alloc.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${alloc.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1 + 0.3,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Utility cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-3"
          >
            {utilities.map((util, i) => (
              <motion.div
                key={util.label}
                variants={fadeUp}
                custom={i + 2}
                className="flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--color-bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-active)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-bg-card-deep)" }}
                >
                  <util.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {util.label}
                  </p>
                  <p className="text-sm text-text-tertiary">{util.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/docs/whitepaper/tokenomics"
            className="text-sm font-medium text-brand-primary transition-colors hover:text-[#35b5ab]"
          >
            Read full tokenomics →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
