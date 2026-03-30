import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { inter, jetbrainsMono, fontVariables } from "@/lib/fonts";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Miwim — Decentralized Proxy Infrastructure",
    template: "%s | Miwim",
  },
  description:
    "DePIN-powered proxy network with decentralized VPN, residential IPs, and white-label APIs. Governed by the $MIWIM token.",
  keywords: [
    "decentralized proxy",
    "DePIN VPN",
    "residential proxy DePIN",
    "decentralized VPN",
    "MIWIM token",
    "proxy infrastructure",
  ],
  metadataBase: new URL("https://miwim.io"),
  openGraph: {
    title: "Miwim — Decentralized Proxy Infrastructure",
    description: "The internet's proxy layer, owned by everyone.",
    url: "https://miwim.io",
    siteName: "Miwim",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@miwim_network",
    creator: "@miwim_network",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Miwim Network",
  url: "https://miwim.io",
  description:
    "Decentralized proxy infrastructure powered by DePIN. Consumer VPN, residential IP proxy, and white-label API.",
  sameAs: [],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
