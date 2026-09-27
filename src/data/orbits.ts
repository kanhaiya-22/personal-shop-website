import { locale } from "@/i18n";
import type { OrbitItem } from "@/components/ui/IconOrbit";

type Def = { icon: string; en: string; hi: string; href?: string };
const make = (defs: Def[]): OrbitItem[] => defs.map((d) => ({ icon: d.icon, label: locale === "hi" ? d.hi : d.en, href: d.href }));

/** Icon sets for the interactive orbit on page headers. */
export const orbits = {
  building: () =>
    make([
      { icon: "cement", en: "Cement", hi: "सीमेंट", href: "/products?category=cement" },
      { icon: "steel", en: "TMT Steel", hi: "सरिया", href: "/products?category=steel" },
      { icon: "bricks", en: "Bricks & Blocks", hi: "ईंट और ब्लॉक", href: "/products?category=bricks-blocks" },
      { icon: "sand", en: "Sand & Aggregates", hi: "रेत और गिट्टी", href: "/products?category=sand-aggregates" },
      { icon: "tiles", en: "Tiles & Flooring", hi: "टाइल्स", href: "/products?category=tiles-flooring" },
      { icon: "waterproofing", en: "Waterproofing", hi: "वॉटरप्रूफिंग", href: "/products?category=waterproofing" },
      { icon: "roofing", en: "Roofing", hi: "छत की शीट", href: "/products?category=roofing" },
      { icon: "plywood", en: "Plywood & Boards", hi: "प्लाईवुड", href: "/products?category=plywood-boards" },
    ]),
  products: () =>
    make([
      { icon: "cement", en: "Cement", hi: "सीमेंट", href: "/products?category=cement" },
      { icon: "palette", en: "Paints", hi: "पेंट्स", href: "/products?group=paints" },
      { icon: "steel", en: "TMT Steel", hi: "सरिया", href: "/products?category=steel" },
      { icon: "bucket", en: "Putty", hi: "पुट्टी", href: "/products?category=putty" },
      { icon: "bricks", en: "Bricks & Blocks", hi: "ईंट और ब्लॉक", href: "/products?category=bricks-blocks" },
      { icon: "brush", en: "Painting Tools", hi: "पेंटिंग औज़ार", href: "/products?category=painting-tools" },
      { icon: "tiles", en: "Tiles & Flooring", hi: "टाइल्स", href: "/products?category=tiles-flooring" },
      { icon: "waterproofing", en: "Waterproofing", hi: "वॉटरप्रूफिंग", href: "/products?category=waterproofing" },
    ]),
  about: () =>
    make([
      { icon: "handshake", en: "Trusted dealing", hi: "भरोसेमंद व्यापार" },
      { icon: "house", en: "Family-run shop", hi: "पारिवारिक दुकान" },
      { icon: "quality", en: "Quality products", hi: "क्वालिटी प्रोडक्ट्स" },
      { icon: "worker", en: "For builders & contractors", hi: "बिल्डर और ठेकेदारों के लिए" },
      { icon: "palette", en: "Paints", hi: "पेंट्स", href: "/paints" },
      { icon: "bricks", en: "Building materials", hi: "बिल्डिंग मटेरियल", href: "/building-materials" },
      { icon: "chat", en: "WhatsApp us", hi: "व्हाट्सऐप करें", href: "/contact" },
      { icon: "star", en: "Personal service", hi: "व्यक्तिगत सेवा" },
    ]),
  faq: () =>
    make([
      { icon: "search", en: "Find a product", hi: "प्रोडक्ट खोजें", href: "/products" },
      { icon: "chat", en: "Ask on WhatsApp", hi: "व्हाट्सऐप पर पूछें", href: "/contact" },
      { icon: "phone", en: "Call us", hi: "कॉल करें", href: "/contact" },
      { icon: "money", en: "Today's price", hi: "आज का दाम", href: "/contact" },
      { icon: "location", en: "Shop location", hi: "दुकान की लोकेशन", href: "/contact" },
      { icon: "clock", en: "Shop timings", hi: "दुकान का समय", href: "/contact" },
      { icon: "truck", en: "Delivery", hi: "डिलीवरी", href: "/contact" },
      { icon: "quality", en: "Quality products", hi: "क्वालिटी प्रोडक्ट्स" },
    ]),
  festivals: () =>
    make([
      { icon: "diya", en: "Diwali", hi: "दीपावली" },
      { icon: "party", en: "Celebrations", hi: "उत्सव" },
      { icon: "palette", en: "Holi colours", hi: "होली के रंग" },
      { icon: "star", en: "Blessings", hi: "आशीर्वाद" },
      { icon: "house", en: "New home", hi: "नया घर" },
      { icon: "handshake", en: "Warm wishes", hi: "शुभकामनाएँ" },
      { icon: "texture", en: "Festive shine", hi: "रौनक" },
      { icon: "bucket", en: "Festive painting", hi: "त्योहार की पुताई", href: "/paints" },
    ]),
};
