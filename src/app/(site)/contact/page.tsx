import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { ChatIllustration } from "@/components/sections/ChatIllustration";
import { ContactHub } from "@/components/sections/ContactHub";
import { MapEmbed } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getContent, getSettings, toPublicSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return { title: t.nav.contact, description: t.contact.subtitle, alternates: { canonical: "/contact" } };
}

export default async function ContactPage() {
  const content = await getContent();
  const contact = getContactInfo(toPublicSettings(content.settings));
  return (
    <>
      <PageHero
        icon={MessageCircle}
        tone="sage"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        crumbs={[{ label: t.nav.contact }]}
        aside={<ChatIllustration className="w-56 lg:w-64" />}
      />
      <section className="section pt-10 md:pt-14">
        <div className="container-site grid gap-10">
          <ContactHub owner={content.team[0]?.name} />
          <Reveal>
            <div className="h-[22rem] sm:h-[26rem]">
              <MapEmbed contact={contact} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
