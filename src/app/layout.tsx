import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Poppins } from "next/font/google";
import { htmlLang, locale, shopName, t } from "@/i18n";
import { getSiteUrl } from "@/server/site-url";
import { getSettings } from "@/server/store";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin", "devanagari"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const noto = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-noto", display: "swap", preload: false });

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s | ${shopName}` },
    description: t.meta.description,
    applicationName: shopName,
    keywords: ["building materials", "paints", "cement", "TMT bars", "construction materials", "Shri Kanhaiya Traders", "बिल्डिंग मटेरियल", "पेंट"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: shopName,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      url: "/",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#1F383F",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await getSettings(); // sets the site language before anything renders
  return (
    <html lang={htmlLang} className={`${poppins.variable} ${inter.variable} ${noto.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll animations only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
