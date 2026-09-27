import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { locale, shopName, t } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getContent, toPublicSettings, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return { title: t.legal.privacyTitle, alternates: { canonical: "/privacy" } };
}

export default async function PrivacyPage() {
  const content = await getContent();
  const contact = getContactInfo(toPublicSettings(content.settings));
  const reach = [contact.phoneDisplay, contact.email].filter(Boolean).join(" · ");
  const en = [
    ["What we collect", "This website has no forms and no customer accounts. We receive your details only when you choose to call, WhatsApp or email us."],
    ["How we use it", `We use your details only to reply to you, share prices and availability, and arrange your order. ${shopName} does not sell or rent your information.`],
    ["WhatsApp and phone", "If you contact us through WhatsApp or phone, those conversations are also subject to WhatsApp's and your telecom provider's own policies."],
    ["On your device", "The website remembers recently viewed products in your browser's local storage so they stay available on your next visit. You can clear them any time from your browser."],
    ["Maps", "The contact page shows a Google Maps embed, which may set Google cookies when it loads."],
    ["Contact", `To ask about or delete the information you've shared with us, contact us${reach ? `: ${reach}` : "."}`],
  ];
  const hi = [
    ["हम क्या जानकारी लेते हैं", "इस वेबसाइट पर कोई फ़ॉर्म या अकाउंट नहीं है। आपकी जानकारी हमें तभी मिलती है जब आप ख़ुद कॉल, व्हाट्सऐप या ईमेल करते हैं।"],
    ["हम इसका उपयोग कैसे करते हैं", `हम इसका उपयोग सिर्फ़ आपको जवाब देने, दाम और उपलब्धता बताने और ऑर्डर के लिए करते हैं। ${shopName} आपकी जानकारी किसी को बेचता या किराये पर नहीं देता।`],
    ["व्हाट्सऐप और फ़ोन", "व्हाट्सऐप या फ़ोन पर हुई बातचीत पर व्हाट्सऐप और आपकी टेलीकॉम कंपनी की नीतियाँ भी लागू होती हैं।"],
    ["आपके डिवाइस पर", "वेबसाइट हाल में देखे गए प्रोडक्ट आपके ब्राउज़र में याद रखती है। आप इन्हें कभी भी ब्राउज़र से हटा सकते हैं।"],
    ["मैप", "संपर्क पेज पर गूगल मैप्स दिखाया जाता है, जो लोड होने पर गूगल कुकीज़ सेट कर सकता है।"],
    ["संपर्क", `अपनी दी गई जानकारी के बारे में पूछने या हटवाने के लिए संपर्क करें${reach ? `: ${reach}` : "।"}`],
  ];
  return (
    <>
      <PageHero icon={ShieldCheck} tone="sky" title={t.legal.privacyTitle} crumbs={[{ label: t.legal.privacyTitle }]} />
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
