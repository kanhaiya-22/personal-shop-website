import { locale, SHOP_NAME, t } from "@/i18n";
import type { PublicSettings } from "@/types";

/**
 * Derived contact details (links, display strings) from the admin settings.
 * Pure functions — safe on both server and client.
 */

const format10 = (d: string) => (d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : d);

export interface PhoneLine {
  name: string;
  display: string;
  href: string;
}

export interface ContactInfo {
  hasPhone: boolean;
  /** Main number first, then any extra numbers from Settings */
  phones: PhoneLine[];
  phoneDisplay: string;
  phoneHref: string;
  hasWhatsapp: boolean;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  fullAddress: string;
  directionsUrl: string;
  mapsEmbedUrl: string;
  hours: string;
}

export function getContactInfo(s: PublicSettings): ContactInfo {
  const cc = s.countryCode || "91";
  const wa = s.whatsapp || s.phone;
  const fullAddress = [s.address.street, s.address.city, s.address.state, s.address.pincode].filter(Boolean).join(", ");
  const directionsUrl =
    s.mapsUrl ||
    (fullAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SHOP_NAME.en}, ${fullAddress}`)}`
      : "");
  const line = (n: string, name: string): PhoneLine => ({ name, display: `+${cc} ${format10(n)}`, href: `tel:+${cc}${n}` });
  const phones = [...(s.phone ? [line(s.phone, "")] : []), ...(s.extraPhones ?? []).filter((x) => x.number).map((x) => line(x.number, x.name))];
  return {
    hasPhone: Boolean(s.phone),
    phones,
    phoneDisplay: s.phone ? `+${cc} ${format10(s.phone)}` : "",
    phoneHref: s.phone ? `tel:+${cc}${s.phone}` : "/contact",
    hasWhatsapp: Boolean(wa),
    whatsappNumber: wa ? `${cc}${wa}` : "",
    whatsappDisplay: wa ? `+${cc} ${format10(wa)}` : "",
    email: s.email,
    fullAddress,
    directionsUrl,
    mapsEmbedUrl: isSafeMapsEmbed(s.mapsEmbedUrl) ? s.mapsEmbedUrl : "",
    hours: (locale === "hi" ? s.businessHours.hi : "") || s.businessHours.en,
  };
}

/** Only Google Maps embeds may be framed. */
export function isSafeMapsEmbed(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && /(^|\.)google\.[a-z.]+$/.test(u.hostname) && u.pathname.startsWith("/maps");
  } catch {
    return false;
  }
}

/** WhatsApp click-to-chat link; falls back to the contact page when no number is set. */
export function whatsappLink(number: string, message: string = t.whatsappMsg.general) {
  if (!number) return "/contact";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
