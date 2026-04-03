"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Server, Home, Smartphone, Globe, Cpu, Code2, ArrowDown } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const growDown = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const flowPulse = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: [0, 1, 1, 0],
    y: [-8, 0, 8, 16],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 },
  },
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const supplyItems = [
    { label: t("supplyVps"), icon: Server, color: "#268bd2" },
    { label: t("supplyHome"), icon: Home, color: "#268bd2" },
    { label: t("supplyMobile"), icon: Smartphone, color: "#268bd2" },
  ];

  const platformItems = t("platformItems").split(",").map((s) => s.trim());

  const demandItems = [
    { label: t("demandBackbone"), icon: Globe, color: "#859900" },
    { label: t("demandEdge"), icon: Cpu, color: "#859900" },
    { label: t("demandApi"), icon: Code2, color: "#859900" },
  ];

  return (
    <section className="section-alt px-6 py-24 lg:py-36">
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
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col items-center gap-4"
        >
          {/* Supply tier */}
          <motion.div variants={fadeUp} className="w-full">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(38,139,210,0.3))" }} />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
                {t("supply")}
              </p>
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(270deg, transparent, rgba(38,139,210,0.3))" }} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {supplyItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="card-interactive flex items-center gap-4 rounded-xl p-5"
                  style={{ borderColor: "rgba(38,139,210,0.2)" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(38,139,210,0.1)" }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated flow connector */}
          <motion.div variants={growDown} className="relative flex flex-col items-center" style={{ transformOrigin: "top" }}>
            <div className="h-12 w-px" style={{ background: "linear-gradient(180deg, rgba(38,139,210,0.4), rgba(42,161,152,0.6))" }} />
            {/* Flowing particle */}
            <motion.div
              variants={flowPulse}
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: "#2aa198", boxShadow: "0 0 8px rgba(42,161,152,0.6)" }}
            />
            <ArrowDown className="h-5 w-5 text-brand-primary/60" />
          </motion.div>

          {/* Platform tier */}
          <motion.div variants={scaleIn} className="w-full">
            <div
              className="relative overflow-hidden rounded-2xl border-2 p-8 text-center lg:p-10"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--border-active)",
                boxShadow: "0 0 80px rgba(42,161,152,0.08), 0 8px 32px rgba(42,161,152,0.06)",
              }}
            >
              {/* Subtle corner accents */}
              <div className="absolute left-0 top-0 h-16 w-16 rounded-br-full opacity-30" style={{ background: "radial-gradient(circle at top left, rgba(42,161,152,0.15), transparent)" }} />
              <div className="absolute bottom-0 right-0 h-16 w-16 rounded-tl-full opacity-30" style={{ background: "radial-gradient(circle at bottom right, rgba(42,161,152,0.15), transparent)" }} />

              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                {t("platform")}
              </p>
              <p className="mb-5 text-2xl font-extrabold tracking-tight text-text-primary">
                Miwim Network
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {platformItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-brand-primary/30 hover:text-text-primary"
                    style={{ background: "var(--color-bg-card-deep)", borderColor: "var(--border-subtle)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Animated flow connector */}
          <motion.div variants={growDown} className="relative flex flex-col items-center" style={{ transformOrigin: "top" }}>
            <div className="h-12 w-px" style={{ background: "linear-gradient(180deg, rgba(42,161,152,0.6), rgba(133,153,0,0.4))" }} />
            <motion.div
              variants={flowPulse}
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: "#859900", boxShadow: "0 0 8px rgba(133,153,0,0.6)" }}
            />
            <ArrowDown className="h-5 w-5 text-brand-success/60" />
          </motion.div>

          {/* Demand tier */}
          <motion.div variants={fadeUp} className="w-full">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(133,153,0,0.3))" }} />
              <p className="text-xs font-bold uppercase tracking-widest text-brand-success">
                {t("demand")}
              </p>
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(270deg, transparent, rgba(133,153,0,0.3))" }} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {demandItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="card-interactive flex items-center gap-4 rounded-xl p-5 whitespace-pre-line"
                  style={{ borderColor: "rgba(133,153,0,0.2)" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(133,153,0,0.1)" }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
