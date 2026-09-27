"use server";

import { ta } from "@/i18n";
import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { collections, sanitizeItem, slugify, displayText } from "@/lib/admin-schema";
import { isSafeMapsEmbed } from "@/lib/contact";
import {
  checkCredentials,
  clearFailedLogins,
  createSessionToken,
  isRateLimited,
  recordFailedLogin,
  requireAdmin,
  SESSION_COOKIE,
} from "@/server/auth";
import { getSettings, updateContent } from "@/server/store";
import type { CollectionName, SiteSettings } from "@/types";

type Result<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };

const refreshSite = () => revalidatePath("/", "layout");

// ─── Session ───────────────────────────────────────────────

export async function login(_prev: { error?: string } | undefined, formData: FormData): Promise<{ error?: string }> {
  await getSettings();
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (isRateLimited(ip)) return { error: ta.login.tooMany };

  const identifier = String(formData.get("identifier") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(identifier, password)) {
    recordFailedLogin(ip);
    await new Promise((r) => setTimeout(r, 600));
    return { error: ta.login.wrong };
  }
  clearFailedLogins(ip);
  const { token, expires } = createSessionToken();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ─── Collections ───────────────────────────────────────────

export async function saveItem(name: CollectionName, input: Record<string, unknown>): Promise<Result<Record<string, unknown>>> {
  await requireAdmin();
  await getSettings();
  const def = collections[name];
  if (!def) return { ok: false, error: ta.errors.unknown };
  const { item, error } = sanitizeItem(def, input);
  if (!item) return { ok: false, error: error ?? ta.errors.invalid };

  const existingId = typeof input.id === "string" ? input.id : "";
  let saved: Record<string, unknown> | undefined;
  let failure = "";

  await updateContent((draft) => {
    const list = draft[name] as unknown as Record<string, unknown>[];
    const index = existingId ? list.findIndex((x) => x.id === existingId || (name === "categories" && x.slug === existingId)) : -1;

    const hasSlug = def.fields.some((f) => f.type === "slug");
    if (hasSlug) {
      let slug = (item.slug as string) || slugify(displayText(item[def.slugFrom ?? "name"])) || `${def.idPrefix}-${randomBytes(3).toString("hex")}`;
      const taken = (s: string) => list.some((x, i) => i !== index && x.slug === s);
      if (taken(slug)) {
        let n = 2;
        while (taken(`${slug}-${n}`)) n++;
        slug = `${slug}-${n}`;
      }
      item.slug = slug;
    }

    if (name === "products" && !(draft.categories as { slug: string }[]).some((c) => c.slug === item.category)) {
      failure = ta.errors.category;
      return;
    }

    if (index >= 0) {
      const previous = list[index];
      const merged: Record<string, unknown> = { ...item, id: name === "categories" ? (item.slug as string) : existingId };
      // Categories: keep products linked when the URL name changes.
      if (name === "categories" && previous.slug !== merged.slug) {
        for (const p of draft.products) if (p.category === previous.slug) p.category = merged.slug as string;
      }
      if (name === "categories") merged.subcategories = previous.subcategories;
      list[index] = merged;
      saved = merged;
    } else {
      const id = name === "categories" ? (item.slug as string) : `${def.idPrefix}-${Date.now().toString(36)}${randomBytes(2).toString("hex")}`;
      const created = { ...item, id };
      list.unshift(created);
      saved = created;
    }
  });

  if (failure) return { ok: false, error: failure };
  refreshSite();
  return { ok: true, data: saved };
}

export async function deleteItem(name: CollectionName, id: string): Promise<Result> {
  await requireAdmin();
  await getSettings();
  let error = "";
  await updateContent((draft) => {
    const list = draft[name] as unknown as { id?: string; slug?: string }[];
    const index = list.findIndex((x) => x.id === id || (name === "categories" && x.slug === id));
    if (index < 0) return;
    if (name === "categories") {
      const slug = list[index].slug;
      const used = draft.products.filter((p) => p.category === slug).length;
      if (used) {
        error = ta.errors.categoryInUse(used);
        return;
      }
    }
    if (name === "brands") for (const p of draft.products) if (p.brand === id) delete p.brand;
    list.splice(index, 1);
  });
  if (error) return { ok: false, error };
  refreshSite();
  return { ok: true };
}

export async function moveItem(name: CollectionName, id: string, direction: -1 | 1): Promise<Result> {
  await requireAdmin();
  await updateContent((draft) => {
    const list = draft[name] as unknown as { id?: string; slug?: string }[];
    const i = list.findIndex((x) => x.id === id || x.slug === id);
    const j = i + direction;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
  });
  refreshSite();
  return { ok: true };
}

export async function deleteSamples(name: "brands" | "testimonials"): Promise<Result> {
  await requireAdmin();
  await updateContent((draft) => {
    if (name === "testimonials") {
      draft.testimonials = draft.testimonials.filter((x) => !x.isSample);
      return;
    }
    const removed = new Set(draft.brands.filter((x) => x.isSample).map((x) => x.id));
    draft.brands = draft.brands.filter((x) => !x.isSample);
    for (const p of draft.products) if (p.brand && removed.has(p.brand)) delete p.brand;
  });
  refreshSite();
  return { ok: true };
}

// ─── Settings ──────────────────────────────────────────────

const s = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const phone = (v: unknown) => s(v, 20).replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
const url = (v: unknown) => {
  const x = s(v, 1000);
  return /^https?:\/\//i.test(x) ? x : "";
};

/** Local file (/videos, /images, /uploads) or an https URL with the right extension. */
const media = (v: unknown, ext: RegExp) => {
  const x = s(v, 1000);
  if (!x) return "";
  const path = x.split("?")[0];
  if (!ext.test(path)) return "";
  return /^\/(videos|images|uploads)\/[\w./-]+$/.test(x) || /^https:\/\//i.test(x) ? x : "";
};

export async function saveSettings(input: SiteSettings): Promise<Result> {
  await requireAdmin();
  await getSettings();
  const p = phone(input.phone);
  const w = phone(input.whatsapp);
  if (p && p.length !== 10) return { ok: false, error: ta.settings.errors.phone };
  if (w && w.length !== 10) return { ok: false, error: ta.settings.errors.whatsapp };
  const extraPhones = (Array.isArray(input.extraPhones) ? input.extraPhones : [])
    .map((x) => ({ name: s(x?.name, 60), number: phone(x?.number) }))
    .filter((x) => x.number)
    .slice(0, 10);
  if (extraPhones.some((x) => x.number.length !== 10)) return { ok: false, error: ta.settings.errors.extraPhone };
  const email = s(input.email, 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: ta.settings.errors.email };
  const embed = s(input.mapsEmbedUrl, 2000).replace(/^.*src="([^"]+)".*$/s, "$1");
  if (embed && !isSafeMapsEmbed(embed)) return { ok: false, error: ta.settings.errors.maps };
  const days = (v: unknown, fallback: number) => {
    const n = Math.round(Number(v));
    return Number.isFinite(n) && n >= 0 && n <= 30 ? n : fallback;
  };

  await updateContent((draft) => {
    draft.settings = {
      language: input.language === "hi" ? "hi" : "en",
      phone: p,
      whatsapp: w === p ? "" : w,
      extraPhones,
      countryCode: phone(input.countryCode) || "91",
      email,
      address: {
        street: s(input.address?.street, 300),
        city: s(input.address?.city, 100),
        state: s(input.address?.state, 100),
        pincode: s(input.address?.pincode, 10).replace(/\D/g, ""),
      },
      mapsUrl: url(input.mapsUrl),
      mapsEmbedUrl: embed,
      businessHours: { en: s(input.businessHours?.en, 300), hi: s(input.businessHours?.hi, 300) },
      announcement: { en: s(input.announcement?.en, 160), hi: s(input.announcement?.hi, 160) },
      siteUrl: url(input.siteUrl).replace(/\/+$/, ""),
      social: {
        facebook: url(input.social?.facebook),
        instagram: url(input.social?.instagram),
        youtube: url(input.social?.youtube),
        googleBusiness: url(input.social?.googleBusiness),
      },
      festivals: {
        enabled: Boolean(input.festivals?.enabled),
        daysBefore: days(input.festivals?.daysBefore, 3),
        daysAfter: days(input.festivals?.daysAfter, 1),
        disabled: draft.settings.festivals.disabled,
      },
      showcase: {
        enabled: Boolean(input.showcase?.enabled),
        videoUrl: media(input.showcase?.videoUrl, /\.(mp4|webm)$/i),
        posterUrl: media(input.showcase?.posterUrl, /\.(jpe?g|png|webp|avif)$/i),
      },
    };
  });
  refreshSite();
  return { ok: true };
}

export async function setFestivalEnabled(slug: string, enabled: boolean): Promise<Result> {
  await requireAdmin();
  await updateContent((draft) => {
    const set = new Set(draft.settings.festivals.disabled);
    if (enabled) set.delete(slug);
    else set.add(slug);
    draft.settings.festivals.disabled = [...set];
  });
  refreshSite();
  return { ok: true };
}

