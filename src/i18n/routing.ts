import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh", "ru", "fa", "vi", "tr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["fa", "ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ru: "Русский",
  fa: "فارسی",
  vi: "Tiếng Việt",
  tr: "Türkçe",
  ar: "العربية",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
