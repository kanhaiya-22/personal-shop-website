import type { Locale, LocalizedText } from "@/types";
import { adminEn, adminHi } from "./admin";
import { en } from "./en";
import { hi } from "./hi";

/**
 * Site language — set in Admin → Settings.
 *
 * These are ES-module *live bindings*: `setLocale()` reassigns them and every
 * importer sees the new value. The server calls it whenever site settings are
 * loaded (see server/store.ts); the browser calls it in <SiteProvider>.
 */
export let locale: Locale = "en";
export let t = en;
/** Admin-panel text — switches with the same language setting. */
export let ta = adminEn;
export let shopName = "Shri Kanhaiya Traders";
export let htmlLang = "en-IN";
export let dateLocale = "en-IN";

export const SHOP_NAME = { en: "Shri Kanhaiya Traders", hi: "श्री कन्हैया ट्रेडर्स" };

export function setLocale(next: Locale) {
  if (next === locale && t === (next === "hi" ? hi : en)) return;
  locale = next === "hi" ? "hi" : "en";
  t = locale === "hi" ? hi : en;
  ta = locale === "hi" ? adminHi : adminEn;
  shopName = SHOP_NAME[locale];
  htmlLang = locale === "hi" ? "hi-IN" : "en-IN";
  dateLocale = htmlLang;
}

/** Resolves data text (`"..."` or `{ en, hi }`) to the current language, falling back to English. */
export function tx(value: LocalizedText | undefined): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return (locale === "hi" && value.hi?.trim() ? value.hi : undefined) ?? value.en;
}
