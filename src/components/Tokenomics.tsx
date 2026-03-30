"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Coins, Lock, TrendingUp, Vote, Flame } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Tokenomics() {
  const t = useTranslations("tokenomics");

  const allocations = [
    { labelKey: "nodeRewards", noteKey: "nodeRewardsNote", pct: 40, color: "#2aa198" },
    { labelKey: "team", noteKey: "teamNote", pct: 20, color: "#268bd2" },
    { labelKey: "investors", noteKey: "investorsNote", pct: 15, color: "#d33682" },
    { labelKey: "ecosystem", noteKey: "ecosystemNote", pct: 15, color: "#b58900" },
    { labelKey: "community", noteKey: "communityNote", pct: 10, color: "#859900" },
  ];

  const utilities = [
    { icon: Coins, labelKey: "payLabel", descKey: "payDesc" },
    { icon: Lock, labelKey: "stakeLabel", descKey: "stakeDesc" },
    { icon: TrendingUp, labelKey: "earnLabel", descKey: "earnDesc" },
    { icon: Vote, labelKey: "governLabel", descKey: "governDesc" },
    { icon: Flame, labelKey: "burnLabel", descKey: "burnDesc" },
  ];

  return (
    <section id="tokenomics" className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("label")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]">
            {t("title")}
          </motion.h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Allocation bars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="mb-6 text-sm text-text-tertiary">
              {t("totalSupply")}{" "}
              <span className="font-semibold text-brand-gold">{t("totalSupplyValue")}</span>
            </motion.p>
            <div className="space-y-4">
              {allocations.map((alloc, i) => (
                <motion.div key={alloc.labelKey} variants={slideRight}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      {alloc.pct}% {t(alloc.labelKey as any)}
                    </span>
                    <span className="text-xs text-text-tertiary">{t(alloc.noteKey as any)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full" style={{ background: "var(--color-bg-card-deep)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: alloc.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${alloc.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Utility cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="space-y-3"
          >
            {utilities.map((util) => (
              <motion.div
                key={util.labelKey}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--color-bg-card)", borderColor: "var(--border-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-active)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--color-bg-card-deep)" }}>
                  <util.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t(util.labelKey as any)}</p>
                  <p className="text-sm text-text-tertiary">{t(util.descKey as any)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/docs/whitepaper/tokenomics"
            className="text-sm font-medium text-brand-primary transition-opacity hover:opacity-80"
          >
            {t("readMore")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
