"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const supplyItems = [
    { label: t("supplyVps"), color: "#268bd2" },
    { label: t("supplyHome"), color: "#268bd2" },
    { label: t("supplyMobile"), color: "#268bd2" },
  ];

  const platformItems = t("platformItems").split(",").map((s) => s.trim());

  const demandItems = [
    { label: t("demandBackbone"), color: "#859900" },
    { label: t("demandEdge"), color: "#859900" },
    { label: t("demandApi"), color: "#859900" },
  ];

  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">
            {t("label")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight lg:text-[40px] lg:leading-[1.2]">
            {t("title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp} className="w-full">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              {t("supply")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {supplyItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-4 text-center text-sm font-medium text-text-primary"
                  style={{ background: "var(--color-bg-card)", borderColor: "rgba(38,139,210,0.3)" }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-text-tertiary/30" />
            <svg width="12" height="8" viewBox="0 0 12 8" className="text-text-tertiary/50">
              <path d="M6 8L0 0h12z" fill="currentColor" />
            </svg>
          </motion.div>

          <motion.div variants={scaleIn} className="w-full">
            <div
              className="rounded-2xl border p-6 text-center lg:p-8"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--border-active)",
                boxShadow: "0 0 60px rgba(42,161,152,0.08)",
              }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {t("platform")}
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

          <motion.div variants={scaleIn} className="flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-text-tertiary/30" />
            <svg width="12" height="8" viewBox="0 0 12 8" className="text-text-tertiary/50">
              <path d="M6 8L0 0h12z" fill="currentColor" />
            </svg>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-success">
              {t("demand")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {demandItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border p-4 text-center text-sm font-medium whitespace-pre-line text-text-primary"
                  style={{ background: "var(--color-bg-card)", borderColor: "rgba(133,153,0,0.3)" }}
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
