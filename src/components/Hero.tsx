"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { motion } from "framer-motion";
import NetworkCanvas from "./NetworkCanvas";
import RotatingKeyword from "./RotatingKeyword";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const t = useTranslations("hero");

  const indicators = [
    { color: "#2aa198", label: t("indicatorDepin") },
    { color: "#b58900", label: t("indicatorToken") },
    { color: "#859900", label: t("indicatorApp") },
    { color: "#268bd2", label: t("indicatorApi") },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <NetworkCanvas />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        {/* Announcement pill */}
        <motion.div
          variants={fadeScale}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2"
          style={{
            borderColor: "var(--border-subtle)",
            background: "rgba(253, 246, 227, 0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full bg-brand-primary"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="text-[13px] font-medium tracking-wide text-text-secondary">
            {t("announcement")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[48px] lg:text-[64px]"
        >
          {t("headlinePre")}<RotatingKeyword />{t("headlinePost")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* Button row */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#waitlist"
            className="btn-primary rounded-xl px-10 py-4 text-base"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("ctaWaitlist")}
          </motion.a>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <NextLink href="/docs/whitepaper" className="btn-ghost rounded-xl px-10 py-4 text-base">
              {t("ctaWhitepaper")}
            </NextLink>
          </motion.div>
        </motion.div>

        {/* Indicators row */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {indicators.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}40` }}
              />
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-text-tertiary sm:text-[13px]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="relative h-12 w-px bg-text-tertiary/20">
          <span
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-primary/60"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
