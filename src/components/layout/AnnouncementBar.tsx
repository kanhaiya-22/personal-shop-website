import { ArrowRight, PartyPopper } from "lucide-react";
import Link from "next/link";
import { locale, t } from "@/i18n";
import { getActiveFestival } from "@/lib/festivals";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { getContactInfo, whatsappLink } from "@/lib/contact";
import type { SiteSettings } from "@/types";

export function AnnouncementBar({ settings }: { settings: SiteSettings }) {
  const active = getActiveFestival(settings.festivals);
  const contact = getContactInfo(settings);
  const custom = (locale === "hi" ? settings.announcement.hi : "") || settings.announcement.en;
  return (
    <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-navy-50">
      <div className="container-site flex min-h-10 items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-[0.82rem] sm:justify-between">
        {active ? (
          <Link href="/festivals" className="group inline-flex items-center gap-2 font-medium text-gold-200 hover:text-gold-100">
            <PartyPopper className="size-4 shrink-0 motion-safe:animate-bounce" aria-hidden="true" />
            <span>{active.festival.greeting[locale]}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ) : (
          <p className="font-medium">{custom || t.announcement.text}</p>
        )}
        <a href={whatsappLink(contact.whatsappNumber)} {...(contact.hasWhatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hidden items-center gap-1.5 font-semibold text-gold-300 underline-offset-4 hover:underline sm:inline-flex">
          <WhatsAppIcon className="size-3.5" />
          {t.hero.whatsapp}
        </a>
      </div>
    </div>
  );
}
