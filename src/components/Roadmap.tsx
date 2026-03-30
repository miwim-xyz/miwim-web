"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Roadmap() {
  const t = useTranslations("roadmap");

  const phases = [
    {
      quarter: t("q3Quarter"),
      title: t("q3Title"),
      isCurrent: true,
      items: t("q3Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q4Quarter"),
      title: t("q4Title"),
      isCurrent: false,
      items: t("q4Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q1Quarter"),
      title: t("q1Title"),
      isCurrent: false,
      items: t("q1Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q2Quarter"),
      title: t("q2Title"),
      isCurrent: false,
      items: t("q2Items").split(",").map((s) => s.trim()),
    },
  ];

  return (
    <section id="roadmap" className="px-6 py-20 lg:py-32">
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
          className="relative"
        >
          <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-text-tertiary/20 lg:block" />

          <div className="grid gap-6 lg:grid-cols-4">
            {phases.map((phase) => (
              <motion.div key={phase.quarter} variants={fadeUp} className="relative">
                <div className="mb-4 flex items-center gap-3 lg:flex-col lg:items-start">
                  <div
                    className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                      phase.isCurrent
                        ? "border-brand-primary bg-brand-primary"
                        : "border-text-tertiary/40 bg-bg-primary"
                    }`}
                    style={phase.isCurrent ? { boxShadow: "0 0 20px rgba(42,161,152,0.4)" } : undefined}
                  />
                  <p className={`text-xs font-semibold uppercase tracking-wider ${phase.isCurrent ? "text-brand-primary" : "text-text-tertiary"}`}>
                    {phase.quarter}
                  </p>
                </div>

                <div
                  className="rounded-xl border p-5"
                  style={{
                    background: "var(--color-bg-card)",
                    borderColor: phase.isCurrent ? "var(--border-active)" : "var(--border-subtle)",
                    boxShadow: phase.isCurrent ? "0 0 30px rgba(42,161,152,0.06)" : undefined,
                  }}
                >
                  <h3 className="mb-3 text-lg font-semibold text-text-primary">{phase.title}</h3>
                  <ul className="space-y-1.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: phase.isCurrent ? "#2aa198" : "#657b83" }}
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
