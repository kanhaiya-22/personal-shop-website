import "server-only";

import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { connection } from "next/server";
import { cache } from "react";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { faqs } from "@/data/faqs";
import { products } from "@/data/products";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { setLocale } from "@/i18n";
import type { PublicSettings, SiteContent, SiteSettings } from "@/types";

/**
 * File-based store. All admin-editable content lives in `storage/content.json`,
 * uploaded images and videos in `storage/uploads/`.
 *
 * The folder location can be changed with DATA_DIR. Back it up regularly.
 * To move to a database later, re-implement the exported functions here —
 * pages and admin screens only use these functions.
 */

export const DATA_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR || path.join(process.cwd(), "storage"));
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

const digits = (v?: string) => (v ?? "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

function defaultSettings(): SiteSettings {
  // Older installs configured contact details in .env — import them once if present.
  const env = process.env;
  const lang = (env.LANGUAGE ?? "").trim().toLowerCase();
  return {
    language: lang === "hindi" || lang === "hi" ? "hi" : "en",
    phone: digits(env.CONTACT_NUMBER),
    whatsapp: env.IS_WHATSAPP_SAME_CONTACT_NUMBER === "false" ? digits(env.WHATSAPP_NUMBER) : "",
    extraPhones: [],
    countryCode: digits(env.COUNTRY_CODE) || "91",
    email: (env.EMAIL ?? "").trim(),
    address: {
      street: (env.ADDRESS ?? "").trim(),
      city: (env.CITY ?? "").trim(),
      state: (env.STATE ?? "").trim(),
      pincode: (env.PINCODE ?? "").trim(),
    },
    mapsUrl: (env.MAPS_LINK ?? "").trim(),
    mapsEmbedUrl: (env.MAPS_EMBED_URL ?? "").trim(),
    businessHours: {
      en: (env.BUSINESS_HOURS ?? "").trim() || "Monday – Saturday: 9:00 AM – 8:00 PM · Sunday: 10:00 AM – 2:00 PM",
      hi: "सोमवार – शनिवार: सुबह 9:00 – रात 8:00 · रविवार: सुबह 10:00 – दोपहर 2:00",
    },
    announcement: { en: "", hi: "" },
    siteUrl: "",
    social: { facebook: "", instagram: "", youtube: "", googleBusiness: "" },
    festivals: { enabled: true, daysBefore: 3, daysAfter: 1, disabled: [] },
    showcase: { enabled: true, videoUrl: "/videos/showcase.mp4", posterUrl: "/videos/showcase-poster.jpg" },
  };
}

function seedContent(): SiteContent {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    settings: defaultSettings(),
    products: structuredClone(products),
    categories: structuredClone(categories),
    brands: structuredClone(brands),
    team: structuredClone(team),
    testimonials: structuredClone(testimonials),
    faqs: structuredClone(faqs),
  };
}

/** Fills in keys added in newer versions so old files keep working. */
function migrate(content: SiteContent): SiteContent {
  const defaults = defaultSettings();
  const s = content.settings ?? defaults;
  return {
    ...seedContent(),
    ...content,
    settings: {
      ...defaults,
      ...s,
      address: { ...defaults.address, ...s.address },
      businessHours: { ...defaults.businessHours, ...s.businessHours },
      announcement: { ...defaults.announcement, ...s.announcement },
      social: { ...defaults.social, ...s.social },
      festivals: { ...defaults.festivals, ...s.festivals },
      extraPhones: Array.isArray(s.extraPhones) ? s.extraPhones : [],
      showcase: { ...defaults.showcase, ...s.showcase },
    },
  };
}

// ─── low-level file helpers ────────────────────────────────

async function writeJsonAtomic(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

/** Serialises writes inside this process so concurrent saves never interleave. */
let queue: Promise<unknown> = Promise.resolve();
function serialise<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

// In-memory cache keyed by file modification time.
let contentCache: { mtimeMs: number; data: SiteContent } | null = null;

async function loadContent(): Promise<SiteContent> {
  let stat;
  try {
    stat = await fs.stat(CONTENT_FILE);
  } catch {
    const seeded = seedContent();
    await serialise(() => writeJsonAtomic(CONTENT_FILE, seeded));
    contentCache = null;
    return seeded;
  }
  if (contentCache && contentCache.mtimeMs === stat.mtimeMs) return contentCache.data;
  const raw = await readJson<SiteContent>(CONTENT_FILE);
  const data = migrate(raw ?? seedContent());
  contentCache = { mtimeMs: stat.mtimeMs, data };
  return data;
}

// ─── public API ────────────────────────────────────────────

/**
 * Site content for the current request. Calling `connection()` makes pages
 * render per request, so admin changes appear immediately without a rebuild.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  await connection();
  const content = await loadContent();
  setLocale(content.settings.language);
  return content;
});

export async function getSettings() {
  return (await getContent()).settings;
}

export function toPublicSettings(settings: SiteSettings): PublicSettings {
  return settings;
}

/** Applies `mutate` to a fresh copy of the content and saves it atomically. */
export function updateContent(mutate: (draft: SiteContent) => void | SiteContent): Promise<SiteContent> {
  return serialise(async () => {
    const current = migrate((await readJson<SiteContent>(CONTENT_FILE)) ?? seedContent());
    const draft = structuredClone(current);
    const result = mutate(draft) ?? draft;
    result.updatedAt = new Date().toISOString();
    await writeJsonAtomic(CONTENT_FILE, result);
    contentCache = null;
    setLocale(result.settings.language);
    return result;
  });
}

