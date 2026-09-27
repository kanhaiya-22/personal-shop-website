import type { Metadata } from "next";
import Link from "next/link";
import { getActiveFestival, getFestivalSchedule, lastFestivalYear } from "@/lib/festivals";
import { ta } from "@/i18n";
import { getSettings } from "@/server/store";
import { AdminHeader } from "../ui";
import { FestivalAdmin } from "./FestivalAdmin";

export const metadata: Metadata = { title: "Festivals" };

export default async function FestivalsAdminPage() {
  const settings = await getSettings();
  const schedule = getFestivalSchedule();
  const active = getActiveFestival(settings.festivals);
  const { enabled, daysBefore, daysAfter } = settings.festivals;
  return (
    <>
      <AdminHeader
        title={ta.festivals.title}
        description={ta.festivals.intro(daysBefore, daysAfter)}
      />
      {!enabled && (
        <p className="mb-5 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-900">
          {ta.festivals.off}{" "}
          <Link href="/admin/settings" className="font-semibold underline">
            {ta.festivals.turnOn}
          </Link>
          .
        </p>
      )}
      <FestivalAdmin schedule={schedule} disabled={settings.festivals.disabled} activeSlug={active?.festival.slug} />
      <p className="mt-6 text-xs text-muted">
        {ta.festivals.note(lastFestivalYear())}
      </p>
    </>
  );
}
