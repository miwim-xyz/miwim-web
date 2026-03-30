import type { ReactNode } from "react";
import "./globals.css";

// Root layout is a passthrough — <html> and <body> are provided by
// src/app/[locale]/layout.tsx (for the main site) and
// src/app/docs/layout.tsx (for the docs site).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
