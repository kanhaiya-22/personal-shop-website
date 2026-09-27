/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Reads JSON from localStorage; returns `fallback` when unavailable (private mode, SSR, bad data). */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked — the feature simply won't persist
  }
}

export const isValidIndianMobile = (value: string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""));

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(`${iso}T12:00:00+05:30`),
  );
}
