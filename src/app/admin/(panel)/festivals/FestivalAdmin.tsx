"use client";

import { Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FestivalPoster } from "@/components/festival/FestivalPoster";
import { dateLocale, locale, ta } from "@/i18n";
import type { FestivalOccurrence } from "@/lib/festivals";
import { cn } from "@/lib/utils";
import { setFestivalEnabled } from "@/server/actions/admin";

export function FestivalAdmin({ schedule, disabled, activeSlug }: { schedule: FestivalOccurrence[]; disabled: string[]; activeSlug?: string }) {
  const router = useRouter();
  const [off, setOff] = useState(new Set(disabled));
  const [preview, setPreview] = useState<FestivalOccurrence | null>(null);

  async function toggle(slug: string, enabled: boolean) {
    setOff((s) => {
      const next = new Set(s);
      if (enabled) next.delete(slug);
      else next.add(slug);
      return next;
    });
    await setFestivalEnabled(slug, enabled);
    router.refresh();
  }

  return (
    <>
      <ul className="grid gap-2">
        {schedule.map((o) => {
          const enabled = !off.has(o.festival.slug);
          return (
            <li key={o.festival.slug} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3 pr-4 shadow-sm">
              <span className="size-12 shrink-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${o.festival.theme.from}, ${o.festival.theme.to})` }} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-semibold text-navy-900">
                  {o.festival.name[locale]}
                  <span className="text-sm font-normal text-muted" lang="hi">
                    {o.festival.name[locale === "hi" ? "en" : "hi"]}
                  </span>
                  {activeSlug === o.festival.slug && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">{ta.festivals.live}</span>}
                </p>
                <p className="text-sm text-muted">
                  {new Date(`${o.date}T12:00:00`).toLocaleDateString(dateLocale, { weekday: "short", day: "numeric", month: "long", year: "numeric" })} ·{" "}
                  {o.daysUntil === 0 ? ta.festivals.today : ta.festivals.inDays(o.daysUntil)}
                </p>
              </div>
              <button type="button" onClick={() => setPreview(o)} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-navy-700 hover:bg-navy-50">
                <Eye className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{ta.festivals.preview}</span>
              </button>
              <label className="relative inline-flex cursor-pointer items-center">
                <span className="sr-only">{ta.festivals.show(o.festival.name[locale])}</span>
                <input type="checkbox" className="peer sr-only" checked={enabled} onChange={(e) => toggle(o.festival.slug, e.target.checked)} />
                <span className={cn("h-7 w-12 rounded-full transition peer-focus-visible:outline-3 peer-focus-visible:outline-gold-400", enabled ? "bg-emerald-500" : "bg-navy-200")} />
                <span className={cn("absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform", enabled && "translate-x-5")} />
              </label>
            </li>
          );
        })}
      </ul>

      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={ta.festivals.previewOf(preview.festival.name[locale])}>
          <button type="button" aria-label={ta.festivals.closePreview} className="absolute inset-0 bg-navy-950/70" onClick={() => setPreview(null)} />
          <div className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white p-4 shadow-lift">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-bold">{preview.festival.name[locale]}</p>
              <button type="button" onClick={() => setPreview(null)} aria-label={ta.festivals.closePreview} className="grid size-9 place-items-center rounded-lg hover:bg-surface">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <FestivalPoster festival={preview.festival} date={preview.date} />
          </div>
        </div>
      )}
    </>
  );
}
