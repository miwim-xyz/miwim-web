import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip docs, static assets, API routes, and Next.js internals
  matcher: ["/((?!docs|_next|icon\\.svg|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|api).*)"],
};
