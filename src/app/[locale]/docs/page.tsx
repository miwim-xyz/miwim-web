"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Code, Users, ArrowRight, ExternalLink } from "lucide-react";

export default function LocaleDocsPage() {
  const t = useTranslations("docsPage");

  const sections = [
    {
      icon: BookOpen,
      title: t("whitepaperTitle"),
      desc: t("whitepaperDesc"),
      href: "/docs/whitepaper",
      color: "#2aa198",
    },
    {
      icon: Code,
      title: t("technicalTitle"),
      desc: t("technicalDesc"),
      href: "/docs/technical",
      color: "#268bd2",
    },
    {
      icon: Users,
      title: t("communityTitle"),
      desc: t("communityDesc"),
      href: "/docs/community",
      color: "#859900",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-[900px]">
          {/* Language notice */}
          <div
            className="mb-10 flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{
              background: "rgba(42,161,152,0.06)",
              borderColor: "rgba(42,161,152,0.25)",
            }}
          >
            <p className="text-sm text-text-secondary">{t("languageNotice")}</p>
            <NextLink
              href="/docs"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-primary hover:opacity-80"
            >
              {t("viewFullDocs")} <ExternalLink className="h-3.5 w-3.5" />
            </NextLink>
          </div>

          {/* Page title */}
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-primary">
              DOCS
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary lg:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              {t("subtitle")}
            </p>
          </div>

          {/* Section cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {sections.map((section) => (
              <NextLink
                key={section.href}
                href={section.href}
                className="group flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--color-bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = section.color + "66";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${section.color}14`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: section.color + "18" }}
                >
                  <section.icon className="h-5 w-5" style={{ color: section.color }} />
                </div>
                <h2
                  className="mb-2 text-lg font-semibold text-text-primary"
                >
                  {section.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-tertiary">
                  {section.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-medium transition-opacity group-hover:opacity-80"
                  style={{ color: section.color }}
                >
                  {t("readMore")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </NextLink>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
