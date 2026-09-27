import { Clock, Mail, MapPin, MapPinned, Navigation, Phone, Store, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { shopName, t } from "@/i18n";
import { type ContactInfo, whatsappLink } from "@/lib/contact";

function ContactCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-50 to-white text-navy-800">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wider text-gold-700 uppercase">{label}</p>
        <div className="mt-1 break-words text-ink">{children}</div>
      </div>
    </div>
  );
}

export function MapEmbed({ contact }: { contact: ContactInfo }) {
  // Explicit embed from admin, else an embed generated from the address.
  const src = contact.mapsEmbedUrl || (contact.fullAddress ? `https://www.google.com/maps?q=${encodeURIComponent(`${shopName}, ${contact.fullAddress}`)}&output=embed` : "");
  if (!src) {
    return (
      <div className="bg-dots grid h-full min-h-80 place-items-center rounded-3xl border-2 border-dashed border-navy-200 bg-surface p-8 text-center">
        <div>
          <MapPinned className="mx-auto size-12 text-navy-300" aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold text-navy-900">{t.contact.mapSoon}</p>
          <p className="mt-1 text-sm text-muted">{t.contact.mapSoonText}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full min-h-80 overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line">
      <iframe
        title={t.contact.mapTitle}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}

export function ContactSection({ contact, owner, headingLevel = "h2" }: { contact: ContactInfo; owner?: string; headingLevel?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="contact-title" className="section bg-white">
      <div className="container-site">
        <SectionHeader as={headingLevel} id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="grid content-start gap-4 sm:grid-cols-2">
            <ContactCard icon={<Store className="size-5" aria-hidden="true" />} label={t.contact.shop}>
              <span className="font-semibold">{shopName}</span>
            </ContactCard>
            {owner && (
              <ContactCard icon={<UserRound className="size-5" aria-hidden="true" />} label={t.contact.owner}>
                {owner}
              </ContactCard>
            )}
            <ContactCard icon={<Phone className="size-5" aria-hidden="true" />} label={contact.phones.length > 1 ? t.contact.phones : t.contact.phone}>
              {contact.phones.length ? (
                <ul className="grid gap-1">
                  {contact.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="font-semibold hover:text-navy-600">
                        {p.display}
                      </a>
                      {p.name && <span className="text-sm text-muted"> · {p.name}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-muted">{t.contact.notSet}</span>
              )}
            </ContactCard>
            <ContactCard icon={<WhatsAppIcon className="size-5" />} label={t.contact.whatsapp}>
              {contact.hasWhatsapp ? (
                <a href={whatsappLink(contact.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-navy-600">
                  {contact.whatsappDisplay}
                </a>
              ) : (
                <span className="text-muted">{t.contact.notSet}</span>
              )}
            </ContactCard>
            <ContactCard icon={<Mail className="size-5" aria-hidden="true" />} label={t.contact.email}>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="font-semibold break-all hover:text-navy-600">
                  {contact.email}
                </a>
              ) : (
                <span className="text-muted">{t.contact.notSet}</span>
              )}
            </ContactCard>
            <ContactCard icon={<Clock className="size-5" aria-hidden="true" />} label={t.contact.hours}>
              {contact.hours || <span className="text-muted">{t.contact.hoursSoon}</span>}
            </ContactCard>
            <div className="sm:col-span-2">
              <ContactCard icon={<MapPin className="size-5" aria-hidden="true" />} label={t.contact.address}>
                <address className="not-italic">{contact.fullAddress || <span className="text-muted">{t.contact.addressSoon}</span>}</address>
              </ContactCard>
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
              {contact.directionsUrl && (
                <ButtonAnchor href={contact.directionsUrl} external variant="primary" icon={<Navigation className="size-5" aria-hidden="true" />}>
                  {t.contact.directions}
                </ButtonAnchor>
              )}
              {contact.hasPhone && (
                <ButtonAnchor href={contact.phoneHref} variant="outline" icon={<Phone className="size-5" aria-hidden="true" />}>
                  {t.contact.callUs}
                </ButtonAnchor>
              )}
              <ButtonAnchor href={whatsappLink(contact.whatsappNumber)} external={contact.hasWhatsapp} variant="whatsapp" icon={<WhatsAppIcon className="size-5" />}>
                {t.nav.whatsapp}
              </ButtonAnchor>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MapEmbed contact={contact} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
