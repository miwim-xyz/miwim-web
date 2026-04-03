"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function CountUpStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("\u00A0"); // non-breaking space placeholder
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse: extract prefix, numeric part, suffix
    const match = value.match(/^([^0-9]*?)([\d,.]+)(.*)$/);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        if (!match) {
          setDisplayed(value);
          observer.disconnect();
          return;
        }

        const prefix = match[1];
        const numStr = match[2];
        const suffix = match[3];
        const hasComma = numStr.includes(",");
        const cleanNum = numStr.replace(/,/g, "");
        const target = parseFloat(cleanNum);
        const isDecimal = cleanNum.includes(".");
        const decimals = isDecimal ? (cleanNum.split(".")[1]?.length || 0) : 0;

        const duration = 2200;
        const start = performance.now();

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutExpo for dramatic ramp
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = eased * target;

          let formatted: string;
          if (decimals > 0) {
            formatted = current.toFixed(decimals);
          } else {
            const rounded = Math.floor(current);
            formatted = hasComma ? rounded.toLocaleString("en-US") : String(rounded);
          }

          setDisplayed(`${prefix}${formatted}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      variants={scaleUp}
      className="card-interactive rounded-2xl p-6 text-center lg:p-8"
    >
      <p
        className="mb-2 text-4xl font-extrabold tabular-nums lg:text-5xl"
        style={{
          background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-brand-primary) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayed}
      </p>
      <p className="text-sm font-medium text-text-tertiary">{label}</p>
    </motion.div>
  );
}

export default function KeyNumbers() {
  const t = useTranslations("keyNumbers");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  return (
    <section className="section-gradient px-6 py-24 lg:py-36">
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
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat) => (
            <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
