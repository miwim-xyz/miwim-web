"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  const navLinks = [
    { label: t("problem"), href: "#problem" },
    { label: t("solution"), href: "#solution" },
    { label: t("tokenomics"), href: "#tokenomics" },
    { label: t("roadmap"), href: "#roadmap" },
    { label: t("docs"), href: "/docs", internal: true },
    // whitepaper is English-only docs — use plain href to avoid locale prefix
    { label: t("whitepaper"), href: "/docs/whitepaper", internal: false },
  ];

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b backdrop-blur-2xl shadow-sm" : "border-b border-transparent"
        }`}
        style={{
          background: scrolled ? "var(--bg-glass)" : "transparent",
          borderColor: scrolled ? "var(--border-subtle)" : "transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wider text-text-primary">
            MIWIM
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Language switcher */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm text-text-secondary transition-colors hover:border-brand-primary hover:text-text-primary"
                style={{ borderColor: "var(--border-subtle)" }}
                aria-label="Switch language"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="font-medium">{localeNames[locale]}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-xl border py-1 shadow-lg"
                    style={{
                      background: "var(--color-bg-card)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-bg-card-deep ${
                          l === locale ? "font-semibold text-brand-primary" : "text-text-secondary"
                        }`}
                      >
                        {localeNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#waitlist" className="btn-primary rounded-xl px-6 py-2.5 text-sm">
              {t("joinWaitlist")}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-text-secondary"
                style={{ borderColor: "var(--border-subtle)" }}
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-xl border py-1 shadow-lg"
                    style={{
                      background: "var(--color-bg-card)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-bg-card-deep ${
                          l === locale ? "font-semibold text-brand-primary" : "text-text-secondary"
                        }`}
                      >
                        {localeNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 top-0 h-full w-72 border-l p-6 pt-20"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--border-subtle)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.internal ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <a
                  href="#waitlist"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-4 rounded-xl px-6 py-3 text-center text-sm"
                >
                  {t("joinWaitlist")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
