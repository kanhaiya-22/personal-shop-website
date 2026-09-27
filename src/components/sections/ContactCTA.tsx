import { Phone } from "lucide-react";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/i18n";
import { type ContactInfo, whatsappLink } from "@/lib/contact";
import { ChatIllustration } from "./ChatIllustration";

/** Simple call-to-action band: WhatsApp or call the shop. */
export function ContactCTA({ contact }: { contact: ContactInfo }) {
  return (
    <section aria-labelledby="cta-title" className="container-site py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 p-8 text-white shadow-lift sm:p-12">
          <div aria-hidden="true" className="absolute -top-24 -right-24 size-80 rounded-full bg-gold-300/20 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-[#9cc2c5]/20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 id="cta-title" className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">
                {t.quoteSection.title}
              </h2>
              <p className="mt-3 max-w-xl text-lg text-navy-100">{t.cta.text}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonAnchor href={whatsappLink(contact.whatsappNumber)} external={contact.hasWhatsapp} variant="whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />}>
                  {t.hero.whatsapp}
                </ButtonAnchor>
                {contact.hasPhone && (
                  <ButtonAnchor href={contact.phoneHref} variant="gold" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
                    {contact.phoneDisplay}
                  </ButtonAnchor>
                )}
              </div>
            </div>
            <ChatIllustration className="mx-auto hidden w-56 md:block lg:w-64" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
