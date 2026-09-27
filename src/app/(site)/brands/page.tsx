import { Search, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { t } from "@/i18n";
import { getContactInfo, whatsappLink } from "@/lib/contact";
import { getContent, toPublicSettings, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.brands.title,
  description: t.brands.subtitle,
  alternates: { canonical: "/brands" },
};
}

export default async function BrandsPage() {
  const content = await getContent();
  const contact = getContactInfo(toPublicSettings(content.settings));
  return (
    <>
      <PageHero icon={BadgeCheck} tone="lilac" eyebrow={t.brands.eyebrow} title={t.brands.title} subtitle={t.brands.subtitle} crumbs={[{ label: t.nav.brands }]} />
      <section className="section">
        <div className="container-site">
          {content.brands.length > 0 ? (
            <BrandMarquee brands={content.brands} />
          ) : (
            <p className="rounded-2xl bg-surface p-8 text-center text-muted">{t.brands.emptyText}</p>
          )}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 text-center sm:flex-row sm:text-left">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-navy-700 shadow-card">
              <Search className="size-6" aria-hidden="true" />
            </span>
            <p className="flex-1 text-lg text-navy-900">{t.brands.emptyText}</p>
            <ButtonAnchor href={whatsappLink(contact.whatsappNumber, t.whatsappMsg.brand)} external={contact.hasWhatsapp} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
              {t.brands.askBrand}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
