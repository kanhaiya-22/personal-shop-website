"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dateLocale, locale, t } from "@/i18n";
import { formatDate } from "@/lib/utils";
import type { Festival } from "@/types";
import { FestivalPoster } from "./FestivalPoster";

const KEY = "skt:festival-dismissed";

/** Compact festival greeting shown at the top of the homepage hero (dismissible for the visit). */
export function FestivalBadge({ festival, date, when }: { festival: Festival; date: string; when: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sessionStorage.getItem(KEY) === `${festival.slug}-${date}`) setHidden(true);
    } catch {
      // storage blocked — just show it
    }
  }, [festival.slug, date]);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(KEY, `${festival.slug}-${date}`);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="relative mb-6 flex max-w-xl items-center gap-3 rounded-2xl p-2 pr-10 text-white shadow-lift ring-1 ring-white/20 motion-safe:animate-fade-up"
      style={{ background: `linear-gradient(120deg, ${festival.theme.from}, ${festival.theme.to})` }}
    >
      <FestivalPoster festival={festival} date={date} actions={false} className="w-16 shrink-0 overflow-hidden rounded-xl sm:w-[4.5rem]" />
      <div className="min-w-0">
        <p className="text-[0.7rem] font-bold tracking-wider uppercase opacity-90">
          {when} · {formatDate(date, dateLocale)}
        </p>
        <p className="truncate font-display text-base font-bold sm:text-lg">{festival.greeting[locale]}</p>
        <Link href="/festivals" className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline" style={{ color: festival.theme.accent }}>
          {t.festivals.viewPoster}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.common.close}
        className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/15 text-white hover:bg-black/30"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
