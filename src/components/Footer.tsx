import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Github, MessageCircle, Send } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("products"),
      links: [
        { label: t("backbone"), href: "#" },
        { label: t("edge"), href: "#" },
        { label: t("apiComing"), href: "#" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("whitepaper"), href: "/docs/whitepaper", internal: true },
        { label: t("technicalDocs"), href: "/docs/technical", internal: true },
        { label: t("blogComing"), href: "#" },
        { label: t("faqComing"), href: "#" },
      ],
    },
    {
      title: t("community"),
      links: [
        { label: t("twitter"), href: "#" },
        { label: t("telegram"), href: "#" },
        { label: t("discord"), href: "#" },
        { label: t("github"), href: "#" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacy"), href: "#" },
        { label: t("terms"), href: "#" },
      ],
    },
  ];

  const socials = [
    { icon: Send, href: "#", label: "Telegram" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="border-t px-6 py-16" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div>
            <p className="mb-2 text-xl font-bold tracking-wider text-text-primary">MIWIM</p>
            <p className="max-w-xs text-sm text-text-tertiary">{t("tagline")}</p>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-text-tertiary transition-colors hover:border-brand-primary hover:text-brand-primary"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-sm font-semibold text-text-primary">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"internal" in link && link.internal ? (
                        <Link href={link.href} className="text-sm text-text-tertiary transition-colors hover:text-text-secondary">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-sm text-text-tertiary transition-colors hover:text-text-secondary">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 text-center text-xs text-text-tertiary" style={{ borderColor: "var(--border-subtle)" }}>
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
