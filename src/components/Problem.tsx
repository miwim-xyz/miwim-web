"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldOff, ServerOff, ZapOff } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Problem() {
  const t = useTranslations("problem");

  const cards = [
    { icon: ShieldOff, title: t("trustTitle"), body: t("trustBody"), color: "#dc322f" },
    { icon: ServerOff, title: t("monopolyTitle"), body: t("monopolyBody"), color: "#cb4b16" },
    { icon: ZapOff, title: t("failureTitle"), body: t("failureBody"), color: "#d33682" },
  ];

  return (
    <section id="problem" className="section-alt px-6 py-24 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">
            {t("label")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight lg:text-[42px] lg:leading-[1.15]">
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
              variants={cardReveal}
              whileHover={{ y: -6 }}
              className="card-interactive rounded-2xl p-8"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${card.color}14` }}
              >
                <card.icon className="h-6 w-6" style={{ color: card.color }} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
              <p className="leading-relaxed text-text-secondary">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
