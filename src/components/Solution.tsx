"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Fingerprint } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Solution() {
  const t = useTranslations("solution");

  const products = [
    {
      badge: t("consumerBadge"),
      badgeColor: "#2aa198",
      icon: Zap,
      title: t("consumerTitle"),
      subtitle: t("consumerSubtitle"),
      description: t("consumerDesc"),
      features: [t("consumerFeat1"), t("consumerFeat2"), t("consumerFeat3"), t("consumerFeat4")],
      variant: slideLeft,
    },
    {
      badge: t("businessBadge"),
      badgeColor: "#d33682",
      icon: Fingerprint,
      title: t("businessTitle"),
      subtitle: t("businessSubtitle"),
      description: t("businessDesc"),
      features: [t("businessFeat1"), t("businessFeat2"), t("businessFeat3"), t("businessFeat4")],
      variant: slideRight,
    },
  ];

  return (
    <section id="solution" className="px-6 py-20 lg:py-32">
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
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={product.variant}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 lg:p-10"
              style={{ background: "var(--color-bg-card)", borderColor: "var(--border-subtle)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(42,161,152,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium"
                style={{ borderColor: product.badgeColor, color: product.badgeColor }}
              >
                {product.badge}
              </span>
              <product.icon className="mb-4 h-8 w-8" style={{ color: product.badgeColor }} />
              <h3 className="mb-1 text-2xl font-semibold">{product.title}</h3>
              <p className="mb-4 text-sm text-text-tertiary">{product.subtitle}</p>
              <p className="mb-6 leading-relaxed text-text-secondary">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: product.badgeColor }} />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text-tertiary"
        >
          {t("bottomNote")}
        </motion.p>
      </div>
    </section>
  );
}
