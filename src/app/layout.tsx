import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
