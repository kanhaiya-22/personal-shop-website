import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { getSettings } from "@/server/store";
import { PageHero } from "@/components/ui/PageHero";
import { locale, shopName, t } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return { title: t.legal.termsTitle, alternates: { canonical: "/terms" } };
}

export default function TermsPage() {
  const en = [
    ["Product information", `Product details on this website are for general information. Specifications, pack sizes and brands may change — please confirm with ${shopName} before buying.`],
    ["Prices and availability", "Prices are not listed online because they change with the market. Prices and stock are confirmed only when we reply to your enquiry or issue a quotation."],
    ["Quotations", "Quotations are valid for the period mentioned in them. Orders are confirmed only after we agree on quantity, price, delivery and payment."],
    ["Advice", "Guidance on this website (such as the paint buying guide) is general. For structural or technical decisions, consult a qualified engineer and follow the manufacturer's instructions."],
    ["Brand names", "Brand names and logos belong to their respective owners and are shown only to indicate the products we deal in."],
  ];
  const hi = [
    ["प्रोडक्ट जानकारी", `वेबसाइट पर दी गई जानकारी सामान्य है। स्पेसिफ़िकेशन, पैक साइज़ और ब्रांड बदल सकते हैं — ख़रीदने से पहले ${shopName} से पुष्टि करें।`],
    ["दाम और उपलब्धता", "दाम बाज़ार के साथ बदलते हैं, इसलिए ऑनलाइन नहीं दिए गए। दाम और स्टॉक हमारे जवाब या कोटेशन में ही पक्के होते हैं।"],
    ["कोटेशन", "कोटेशन उसमें लिखी अवधि तक मान्य है। मात्रा, दाम, डिलीवरी और भुगतान तय होने के बाद ही ऑर्डर पक्का होता है।"],
    ["सलाह", "वेबसाइट पर दी गई सलाह (जैसे पेंट गाइड) सामान्य है। ढांचे या तकनीकी फ़ैसलों के लिए योग्य इंजीनियर से सलाह लें और निर्माता के निर्देश मानें।"],
    ["ब्रांड नाम", "ब्रांड नाम और लोगो उनके मालिकों के हैं और सिर्फ़ यह बताने के लिए दिखाए गए हैं कि हम कौन से प्रोडक्ट रखते हैं।"],
  ];
  return (
    <>
      <PageHero icon={FileText} tone="sky" title={t.legal.termsTitle} crumbs={[{ label: t.legal.termsTitle }]} />
      <section className="section">
        <div className="container-site max-w-3xl space-y-8">
          {(locale === "hi" ? hi : en).map(([h, p]) => (
            <div key={h}>
              <h2 className="text-xl font-bold">{h}</h2>
              <p className="mt-2 leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
