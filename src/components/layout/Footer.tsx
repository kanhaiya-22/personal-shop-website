import { Clock, LockKeyhole, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { shopName, t, tx } from "@/i18n";
import { getContactInfo, whatsappLink } from "@/lib/contact";
import type { Category, PublicSettings } from "@/types";
import { Logo } from "./Logo";
import { mainNav } from "./nav-links";

export function Footer({ settings, categories }: { settings: PublicSettings; categories: Category[] }) {
  const c = getContactInfo(settings);
  const popular = categories.filter((cat) => ["cement", "steel", "bricks-blocks", "sand-aggregates", "interior-paints", "exterior-paints", "waterproofing", "putty"].includes(cat.slug));
  const social = Object.entries(settings.social).filter(([, url]) => url);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-navy-100">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />
      <div className="container-site relative grid gap-12 pt-16 pb-28 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:pb-16">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">{t.footer.about}</p>
          <p className="mt-4 text-xs font-semibold tracking-wider text-gold-300 uppercase">{t.meta.tagline}</p>
          {social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-lg border border-white/15 px-3 text-xs font-semibold capitalize hover:border-gold-300 hover:text-white"
                  >
                    {name === "googleBusiness" ? "Google" : name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={t.footer.quickLinks}>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">{t.footer.quickLinks}</h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {[...mainNav(), { href: "/faq", label: t.nav.faq }, { href: "/festivals", label: t.nav.festivals }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.categories}>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">{t.footer.categories}</h2>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {popular.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/products?category=${cat.slug}`} className="transition hover:text-gold-300">
                  {tx(cat.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wider text-white uppercase">{t.footer.contact}</h2>
          <ul className="mt-5 grid gap-4 text-sm">
            {c.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="flex items-start gap-3 hover:text-gold-300">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
                  <span>
                    <span className="sr-only">{t.contact.phone}: </span>
                    {p.display}
                    {p.name && <span className="text-navy-300"> · {p.name}</span>}
                  </span>
                </a>
              </li>
            ))}
            {c.hasWhatsapp && (
              <li>
                <a href={whatsappLink(c.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold-300">
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold-300" />
                  <span>
                    <span className="sr-only">{t.contact.whatsapp}: </span>
                    {c.whatsappDisplay}
                  </span>
                </a>
              </li>
            )}
            {c.email && (
              <li>
                <a href={`mailto:${c.email}`} className="flex items-start gap-3 break-all hover:text-gold-300">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
                  <span>{c.email}</span>
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              <address className="not-italic">{c.fullAddress || t.contact.addressSoon}</address>
            </li>
            {c.hours && (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
                <span>{c.hours}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs text-navy-300 sm:flex-row lg:pb-6">
          <p>
            © {new Date().getFullYear()} {shopName}. {t.footer.rights}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-white">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <Link href="/admin/login" rel="nofollow" prefetch={false} className="inline-flex items-center gap-1.5 hover:text-white">
                <LockKeyhole className="size-3.5" aria-hidden="true" />
                {t.footer.admin}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
