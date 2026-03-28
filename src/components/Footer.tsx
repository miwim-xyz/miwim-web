import { Github, MessageCircle, Send } from "lucide-react";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Backbone", href: "#" },
      { label: "Edge", href: "#" },
      { label: "API (coming)", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Whitepaper", href: "/docs/whitepaper" },
      { label: "Technical Docs", href: "/docs/technical" },
      { label: "Blog (coming)", href: "#" },
      { label: "FAQ (coming)", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Twitter / X", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const socials = [
  { icon: Send, href: "#", label: "Telegram" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t px-6 py-16" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1200px]">
        {/* Top row */}
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div>
            <p className="mb-2 text-xl font-bold tracking-wider text-text-primary">
              MIWIM
            </p>
            <p className="max-w-xs text-sm text-text-tertiary">
              Decentralized proxy infrastructure
            </p>
            {/* Social icons */}
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

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-sm font-semibold text-text-primary">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 text-center text-xs text-text-tertiary"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          © 2026 Miwim Network. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
