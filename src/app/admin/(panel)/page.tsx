import { ta } from "@/i18n";
import { ArrowRight, CalendarHeart, CircleCheck, CircleDashed, Clapperboard, Download, ExternalLink, Package, Settings, Tags, Users } from "lucide-react";
import Link from "next/link";
import { festivals } from "@/data/festivals";
import { locale } from "@/i18n";
import { getActiveFestival, getUpcomingFestivals, lastFestivalYear } from "@/lib/festivals";
import { getContent } from "@/server/store";
import { AdminHeader, Card } from "./ui";

export default async function AdminDashboard() {
  const content = await getContent();
  const { settings, products, categories, brands, team, testimonials } = content;
  const active = getActiveFestival(settings.festivals);
  const next = getUpcomingFestivals(settings.festivals, 1)[0];
  const currentYear = new Date().getFullYear();

  const checklist = [
    { done: Boolean(settings.phone), label: ta.dashboard.checks.phone, href: "/admin/settings" },
    { done: Boolean(settings.email), label: ta.dashboard.checks.email, href: "/admin/settings" },
    { done: Boolean(settings.address.street || settings.address.city), label: ta.dashboard.checks.address, href: "/admin/settings" },
    { done: Boolean(settings.mapsUrl || settings.mapsEmbedUrl), label: ta.dashboard.checks.maps, href: "/admin/settings" },
    { done: Boolean(settings.businessHours.en), label: ta.dashboard.checks.hours, href: "/admin/settings" },
    { done: Boolean(settings.siteUrl), label: ta.dashboard.checks.siteUrl, href: "/admin/settings" },
    { done: team.every((m) => m.photo), label: ta.dashboard.checks.teamPhotos, href: "/admin/team" },
    { done: !brands.some((b) => b.isSample), label: ta.dashboard.checks.brands, href: "/admin/brands" },
    { done: products.some((p) => p.image), label: ta.dashboard.checks.productPhotos, href: "/admin/products" },
    { done: testimonials.some((t) => !t.isSample && !t.hidden), label: ta.dashboard.checks.review, href: "/admin/reviews" },
  ];
  const doneCount = checklist.filter((c) => c.done).length;

  const stats = [
    { label: ta.dashboard.stats.products, value: products.length, icon: Package, href: "/admin/products" },
    { label: ta.dashboard.stats.categories, value: categories.length, icon: Tags, href: "/admin/categories" },
    { label: ta.dashboard.stats.brands, value: brands.length, icon: Tags, href: "/admin/brands" },
    { label: ta.dashboard.stats.team, value: content.team.length, icon: Users, href: "/admin/team" },
  ];

  return (
    <>
      <AdminHeader
        title={ta.dashboard.greeting}
        description={ta.dashboard.intro}
        actions={
          <a href="/api/admin/backup" download className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-line bg-white px-3.5 text-sm font-semibold text-navy-800 hover:border-navy-900">
            <Download className="size-4" aria-hidden="true" />
            {ta.dashboard.backup}
          </a>
        }
      />

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label}>
            <Link href={s.href} className="block rounded-2xl border border-line bg-gradient-to-br from-white to-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
              <s.icon className="size-5 text-navy-500" aria-hidden="true" />
              <p className="mt-3 font-display text-3xl font-bold text-navy-900">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <h2 className="text-lg font-bold">{ta.dashboard.quick}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/admin/products", label: ta.dashboard.quickLinks.products, icon: Package },
              { href: "/admin/settings", label: ta.dashboard.quickLinks.contact, icon: Settings },
              { href: "/admin/settings", label: ta.dashboard.quickLinks.video, icon: Clapperboard },
              { href: "/admin/festivals", label: ta.dashboard.quickLinks.festivals, icon: CalendarHeart },
              { href: "/admin/brands", label: ta.dashboard.quickLinks.brands, icon: Tags },
              { href: "/", label: ta.dashboard.quickLinks.site, icon: ExternalLink },
            ].map((q) => (
              <li key={q.label}>
                <Link href={q.href} className="flex items-center gap-3 rounded-xl border border-line bg-gradient-to-br from-white to-surface p-3 text-sm font-semibold text-navy-900 transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-card">
                  <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-navy-50 to-white text-navy-700">
                    <q.icon className="size-4" aria-hidden="true" />
                  </span>
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid content-start gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{ta.dashboard.checklist}</h2>
              <span className="text-sm font-semibold text-navy-600">
                {doneCount}/{checklist.length}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-emerald-500 transition-all" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
            </div>
            <ul className="mt-4 grid gap-1">
              {checklist.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-surface">
                    {c.done ? <CircleCheck className="size-4 text-emerald-600" aria-hidden="true" /> : <CircleDashed className="size-4 text-navy-300" aria-hidden="true" />}
                    <span className={c.done ? "text-muted line-through" : "font-medium text-navy-900"}>{c.label}</span>
                    <span className="sr-only">{c.done ? ta.dashboard.done : ta.dashboard.todo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <CalendarHeart className="size-5 text-gold-600" aria-hidden="true" /> {ta.dashboard.festivals}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {!settings.festivals.enabled
                ? ta.dashboard.festivalsOff
                : active
                  ? ta.dashboard.festivalNow(active.festival.name[locale])
                  : next
                    ? ta.dashboard.festivalNext(next.festival.name[locale], next.daysUntil)
                    : ta.dashboard.festivalNone}
            </p>
            {lastFestivalYear() <= currentYear + 1 && (
              <p className="mt-3 rounded-lg bg-gold-50 p-3 text-xs text-gold-900">
                {ta.dashboard.festivalDates(lastFestivalYear(), festivals.length)}
              </p>
            )}
            <Link href="/admin/festivals" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-600 hover:text-navy-900">
              {ta.dashboard.manageFestivals} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
