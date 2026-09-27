import { CircleHelp } from "lucide-react";
import type { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { orbits } from "@/data/orbits";
import { PageHero } from "@/components/ui/PageHero";
import { t } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getContent, toPublicSettings, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.faq.title,
  description: t.faq.subtitle,
  alternates: { canonical: "/faq" },
};
}

export default async function FaqPage() {
  const content = await getContent();
  return (
    <>
      <PageHero icon={CircleHelp} tone="sky" aside={<IconOrbit items={orbits.faq()} />} eyebrow={t.faq.eyebrow} title={t.faq.title} subtitle={t.faq.subtitle} crumbs={[{ label: t.nav.faq }]} />
      <section className="section">
        <div className="container-site max-w-3xl">
          <FAQAccordion items={content.faqs} />
        </div>
      </section>
      <ContactCTA contact={getContactInfo(toPublicSettings(content.settings))} />
    </>
  );
}
