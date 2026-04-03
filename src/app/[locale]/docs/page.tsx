"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Code, Users, ArrowRight, ExternalLink, FileText, Terminal, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function LocaleDocsPage() {
  const t = useTranslations("docsPage");

  const sections = [
    {
      icon: BookOpen,
      title: t("whitepaperTitle"),
      desc: t("whitepaperDesc"),
      href: "/docs/whitepaper",
      color: "#2aa198",
      items: ["Architecture", "Tokenomics", "Roadmap"],
    },
    {
      icon: Code,
      title: t("technicalTitle"),
      desc: t("technicalDesc"),
      href: "/docs/technical",
      color: "#268bd2",
      items: ["Node Roles", "Smart Routing", "API Reference"],
    },
    {
      icon: Users,
      title: t("communityTitle"),
      desc: t("communityDesc"),
      href: "/docs/community",
      color: "#859900",
      items: ["Getting Started", "Run a Node", "Links"],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-[960px]">
          {/* Language notice */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{
              background: "rgba(42,161,152,0.06)",
              borderColor: "rgba(42,161,152,0.25)",
            }}
          >
            <p className="text-sm text-text-secondary">{t("languageNotice")}</p>
            <NextLink
              href="/docs"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-primary transition-opacity hover:opacity-80"
            >
              {t("viewFullDocs")} <ExternalLink className="h-3.5 w-3.5" />
            </NextLink>
          </motion.div>

          {/* Page title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-primary">
              DOCS
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-4 text-4xl font-extrabold tracking-tight text-text-primary lg:text-5xl">
              {t("title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-xl text-lg leading-relaxed text-text-secondary">
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Section cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid gap-5 sm:grid-cols-3"
          >
            {sections.map((section) => (
              <motion.div key={section.href} variants={cardReveal}>
                <NextLink
                  href={section.href}
                  className="group card-interactive flex h-full flex-col rounded-2xl p-7"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: section.color + "14" }}
                  >
                    <section.icon className="h-6 w-6" style={{ color: section.color }} />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-text-primary">
                    {section.title}
                  </h2>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-text-tertiary">
                    {section.desc}
                  </p>

                  {/* Quick links preview */}
                  <div className="mb-5 space-y-1.5">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-text-tertiary">
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: section.color }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: section.color }}
                  >
                    {t("readMore")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </NextLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
