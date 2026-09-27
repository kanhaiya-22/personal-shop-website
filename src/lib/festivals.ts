import { festivals } from "@/data/festivals";
import type { Festival, SiteSettings } from "@/types";

export interface FestivalOccurrence {
  festival: Festival;
  /** ISO date, e.g. "2026-11-08" */
  date: string;
  /** Days from today (IST): 0 = today, negative = already passed */
  daysUntil: number;
}

type FestivalSettings = SiteSettings["festivals"];

const DAY_MS = 86_400_000;

/** Today's date in India as "YYYY-MM-DD", independent of the server's timezone. */
export function todayInIndia(now: Date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

const dayNumber = (iso: string) => Math.round(Date.parse(`${iso}T00:00:00Z`) / DAY_MS);

function occurrences(settings: FestivalSettings, now: Date): FestivalOccurrence[] {
  const today = dayNumber(todayInIndia(now));
  return festivals
    .filter((f) => !settings.disabled.includes(f.slug))
    .flatMap((festival) => Object.values(festival.dates).map((date) => ({ festival, date, daysUntil: dayNumber(date) - today })))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * The festival greeting that should be live now, or null. A festival is live
 * from `daysBefore` days before to `daysAfter` days after its date. When
 * windows overlap (Dhanteras → Diwali → Bhai Dooj) today's festival wins,
 * then the nearest upcoming one, then the most recent.
 */
export function getActiveFestival(settings: FestivalSettings, now: Date = new Date()): FestivalOccurrence | null {
  if (!settings.enabled) return null;
  const live = occurrences(settings, now).filter((o) => o.daysUntil <= settings.daysBefore && o.daysUntil >= -settings.daysAfter);
  if (!live.length) return null;
  const rank = (o: FestivalOccurrence) => (o.daysUntil === 0 ? -1 : o.daysUntil > 0 ? o.daysUntil : 1000 - o.daysUntil);
  return live.sort((a, b) => rank(a) - rank(b))[0];
}

export function getUpcomingFestivals(settings: FestivalSettings, limit = 6, now: Date = new Date()) {
  return occurrences(settings, now)
    .filter((o) => o.daysUntil > 0)
    .slice(0, limit);
}

/** Every festival with its next date (for the admin screen), including disabled ones. */
export function getFestivalSchedule(now: Date = new Date()) {
  return occurrences({ enabled: true, daysBefore: 0, daysAfter: 0, disabled: [] }, now)
    .filter((o) => o.daysUntil >= 0)
    .filter((o, i, all) => all.findIndex((x) => x.festival.slug === o.festival.slug) === i);
}

export const lastFestivalYear = () => Math.max(...festivals.flatMap((f) => Object.keys(f.dates).map(Number)));
