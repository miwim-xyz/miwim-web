"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldOff, ServerOff, ZapOff } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Problem() {
  const t = useTranslations("problem");

  const cards = [
    { icon: ShieldOff, title: t("trustTitle"), body: t("trustBody") },
    { icon: ServerOff, title: t("monopolyTitle"), body: t("monopolyBody") },
    { icon: ZapOff, title: t("failureTitle"), body: t("failureBody") },
  ];

  return (
    <section id="problem" className="px-6 py-20 lg:py-32">
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
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1"
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
