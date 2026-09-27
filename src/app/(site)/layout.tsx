import { RecentProvider } from "@/components/catalog/RecentProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteProvider } from "@/components/SiteProvider";
import { shopName, t } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getSiteUrl } from "@/server/site-url";
import { getContent, toPublicSettings } from "@/server/store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const settings = toPublicSettings(content.settings);
  const contact = getContactInfo(settings);
  const siteUrl = await getSiteUrl();
  const { address } = settings;
  const sameAs = Object.values(settings.social).filter(Boolean);

  return (
    <SiteProvider settings={settings} owners={content.team.slice(0, 2).map((m) => ({ name: m.name, photo: m.photo }))}>
      <RecentProvider>
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-gradient-to-br from-navy-700 to-navy-950 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.nav.skipToContent}
        </a>
        <AnnouncementBar settings={content.settings} />
        <Navbar />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer settings={settings} categories={content.categories} />
        <FloatingActions />
      </RecentProvider>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": `${siteUrl}/#business`,
          name: shopName,
          alternateName: "Shri Kanhaiya Traders",
          description: t.meta.description,
          url: siteUrl,
          founder: content.team[0]?.name,
          ...(contact.hasPhone ? { telephone: contact.phoneDisplay.replace(/\s/g, "") } : {}),
          ...(contact.email ? { email: contact.email } : {}),
          ...(address.street || address.city
            ? {
                address: {
                  "@type": "PostalAddress",
                  streetAddress: address.street || undefined,
                  addressLocality: address.city || undefined,
                  addressRegion: address.state || undefined,
                  postalCode: address.pincode || undefined,
                  addressCountry: "IN",
                },
              }
            : {}),
          ...(contact.directionsUrl ? { hasMap: contact.directionsUrl } : {}),
          ...(sameAs.length ? { sameAs } : {}),
        }}
      />
    </SiteProvider>
  );
}
