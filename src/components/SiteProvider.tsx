"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import { setLocale } from "@/i18n";
import { type ContactInfo, getContactInfo, whatsappLink } from "@/lib/contact";
import type { PublicSettings } from "@/types";

interface SiteContextValue {
  settings: PublicSettings;
  contact: ContactInfo;
  /** WhatsApp link with a pre-filled message */
  wa: (message?: string) => string;
  /** Owners shown on festival posters */
  owners: Owner[];
}

export interface Owner {
  name: string;
  photo?: string;
}

const SiteContext = createContext<SiteContextValue | null>(null);

/** Makes admin-managed business settings available to client components. */
export function SiteProvider({ settings, owners = [], children }: { settings: PublicSettings; owners?: Owner[]; children: ReactNode }) {
  // Must run before children render so their text uses the right language.
  setLocale(settings.language);
  const value = useMemo(() => {
    const contact = getContactInfo(settings);
    return { settings, contact, owners, wa: (message?: string) => whatsappLink(contact.whatsappNumber, message) };
  }, [settings, owners]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
