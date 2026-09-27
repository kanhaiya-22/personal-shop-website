import { ArrowRight, CalendarHeart } from "lucide-react";
import Link from "next/link";
import { dateLocale, locale, t } from "@/i18n";
import type { FestivalOccurrence } from "@/lib/festivals";
import { formatDate } from "@/lib/utils";
import { FestivalPoster } from "./FestivalPoster";

export function whenLabel(daysUntil: number) {
  if (daysUntil === 0) return t.festivals.today;
  return daysUntil > 0 ? t.festivals.inDays(daysUntil) : t.festivals.daysAgo(-daysUntil);
}

/** Homepage section that appears automatically around a festival. */
export function FestivalSpotlight({ occurrence }: { occurrence: FestivalOccurrence }) {
  const { festival, date, daysUntil } = occurrence;
  return (
    <section aria-labelledby="festival-title" className="relative overflow-hidden py-16 md:py-20" style={{ background: `linear-gradient(135deg, ${festival.theme.from}, ${festival.theme.to})` }}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/25" />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
      <div className="container-site relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="text-white motion-safe:animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] uppercase ring-1 ring-white/25 backdrop-blur">
            <CalendarHeart className="size-4" aria-hidden="true" />
            {whenLabel(daysUntil)} · {formatDate(date, dateLocale)}
          </p>
          <h2 id="festival-title" className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl xl:text-[2.75rem]">
            {festival.greeting[locale]}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/90">{festival.message[locale]}</p>
          <p className="mt-6 font-semibold" style={{ color: festival.theme.accent }}>
            — {t.festivals.title}
          </p>
          <Link href="/festivals" className="mt-8 inline-flex items-center gap-2 font-semibold text-white underline-offset-4 hover:underline">
            {t.festivals.viewAll}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <FestivalPoster festival={festival} date={date} className="mx-auto w-full max-w-sm md:max-w-md" />
      </div>
    </section>
  );
}
