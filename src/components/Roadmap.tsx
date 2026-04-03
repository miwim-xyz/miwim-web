"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Roadmap() {
  const t = useTranslations("roadmap");
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.15 });

  const phases: {
    quarter: string;
    title: string;
    status: "done" | "current" | "upcoming";
    items: string[];
  }[] = [
    {
      quarter: t("q3Quarter"),
      title: t("q3Title"),
      status: "current",
      items: t("q3Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q4Quarter"),
      title: t("q4Title"),
      status: "upcoming",
      items: t("q4Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q1Quarter"),
      title: t("q1Title"),
      status: "upcoming",
      items: t("q1Items").split(",").map((s) => s.trim()),
    },
    {
      quarter: t("q2Quarter"),
      title: t("q2Title"),
      status: "upcoming",
      items: t("q2Items").split(",").map((s) => s.trim()),
    },
  ];

  // Progress: how far along the timeline (0 = first dot, 1 = all done)
  const currentIndex = phases.findIndex((p) => p.status === "current");
  const progressPct = currentIndex >= 0 ? ((currentIndex + 0.5) / phases.length) * 100 : 0;

  return (
    <section id="roadmap" className="px-6 py-24 lg:py-36">
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

        <div ref={timelineRef} className="relative">
          {/* Desktop: horizontal timeline track */}
          <div className="absolute left-0 right-0 top-[32px] hidden h-1 overflow-hidden rounded-full lg:block"
            style={{ background: "var(--color-bg-card-deep)" }}
          >
            {/* Animated progress fill */}
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #2aa198, #268bd2)",
                boxShadow: "0 0 12px rgba(42,161,152,0.4)",
              }}
              initial={{ width: "0%" }}
              animate={isInView ? { width: `${progressPct}%` } : { width: "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {/* Mobile: vertical timeline track */}
          <div className="absolute left-[9px] top-0 bottom-0 w-1 overflow-hidden rounded-full lg:hidden"
            style={{ background: "var(--color-bg-card-deep)" }}
          >
            <motion.div
              className="w-full rounded-full"
              style={{
                background: "linear-gradient(180deg, #2aa198, #268bd2)",
              }}
              initial={{ height: "0%" }}
              animate={isInView ? { height: `${progressPct}%` } : { height: "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {phases.map((phase, i) => {
              const isDone = phase.status === "done";
              const isCurrent = phase.status === "current";
              const isActive = isDone || isCurrent;

              return (
                <motion.div
                  key={phase.quarter}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative"
                >
                  <div className="mb-5 flex items-center gap-3 lg:flex-col lg:items-start">
                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <motion.div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isDone
                            ? "border-2 border-brand-primary bg-brand-primary"
                            : isCurrent
                              ? "border-[2.5px] border-brand-primary bg-brand-primary"
                              : "border-[2.5px] border-text-tertiary/25 bg-bg-primary"
                        }`}
                        style={isCurrent ? { boxShadow: "0 0 20px rgba(42,161,152,0.5)" } : undefined}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.4 + i * 0.2,
                        }}
                      >
                        {isDone && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </motion.div>
                      {isCurrent && (
                        <span
                          className="absolute -inset-1 rounded-full border-2 border-brand-primary/25"
                          style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
                        />
                      )}
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-brand-primary" : "text-text-tertiary"}`}>
                      {phase.quarter}
                    </p>
                  </div>

                  <div
                    className="card-interactive rounded-xl p-6"
                    style={{
                      borderColor: isCurrent ? "var(--border-active)" : undefined,
                      boxShadow: isCurrent ? "0 4px 30px rgba(42,161,152,0.1)" : undefined,
                      opacity: !isActive ? 0.7 : undefined,
                    }}
                  >
                    <h3 className="mb-3 text-lg font-bold text-text-primary">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: isActive ? "#2aa198" : "#93a1a1" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
