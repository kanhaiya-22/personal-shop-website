import { CalendarDays, PartyPopper } from "lucide-react";
import type { Metadata } from "next";
import { FestivalPoster } from "@/components/festival/FestivalPoster";
import { whenLabel } from "@/components/festival/FestivalSpotlight";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { orbits } from "@/data/orbits";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { dateLocale, locale, t } from "@/i18n";
import { getActiveFestival, getUpcomingFestivals } from "@/lib/festivals";
import { formatDate } from "@/lib/utils";
import { getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.festivals.title,
  description: t.festivals.subtitle,
  alternates: { canonical: "/festivals" },
};
}

export default async function FestivalsPage() {
  const settings = await getSettings();
  const active = getActiveFestival(settings.festivals);
  const upcoming = getUpcomingFestivals(settings.festivals, 6).filter((o) => o.festival.slug !== active?.festival.slug || o.date !== active?.date);

  return (
    <>
      <PageHero icon={PartyPopper} tone="blush" aside={<IconOrbit items={orbits.festivals()} />} eyebrow={t.festivals.eyebrow} title={t.festivals.title} subtitle={t.festivals.subtitle} crumbs={[{ label: t.nav.festivals }]} />

      <section className="section">
        <div className="container-site">
          {active ? (
            <div className="grid items-center gap-10 rounded-3xl bg-surface p-6 sm:p-10 md:grid-cols-[1fr_1.1fr]">
              <FestivalPoster festival={active.festival} date={active.date} className="mx-auto w-full max-w-md" />
              <div>
                <p className="text-sm font-bold tracking-[0.12em] text-gold-700 uppercase">
                  {whenLabel(active.daysUntil)} · {formatDate(active.date, dateLocale)}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{active.festival.greeting[locale]}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{active.festival.message[locale]}</p>
              </div>
            </div>
          ) : (
            <p className="rounded-2xl border-2 border-dashed border-navy-200 bg-surface p-8 text-center text-muted">{t.festivals.none}</p>
          )}
        </div>
      </section>

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-title" className="section bg-gradient-to-b from-surface via-white to-surface">
          <div className="container-site">
            <h2 id="upcoming-title" className="mb-8 flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <CalendarDays className="size-7 text-gold-600" aria-hidden="true" />
              {t.festivals.upcoming}
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((o, i) => (
                <Reveal as="li" key={`${o.festival.slug}-${o.date}`} delay={(i % 3) * 80}>
                  <article className="h-full rounded-3xl border border-line bg-white p-4 shadow-card">
                    <FestivalPoster festival={o.festival} date={o.date} actions={false} />
                    <div className="px-1 pt-4 pb-1">
                      <p className="text-xs font-bold tracking-wider text-gold-700 uppercase">
                        {whenLabel(o.daysUntil)} · {formatDate(o.date, dateLocale)}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{o.festival.name[locale]}</h3>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">{t.festivals.dateNote}</p>
          </div>
        </section>
      )}
    </>
  );
}
