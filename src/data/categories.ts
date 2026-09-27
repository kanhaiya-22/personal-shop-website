import type { Category, CategoryGroup, LocalizedText } from "@/types";

/**
 * SEED DATA — copied to storage on first start, then managed from Admin → Categories.
 *
 * Product categories. `slug` is used in URLs (/products?category=cement)
 * and by products in `products.ts`. `icon` is a key in `components/ui/Icon.tsx`.
 */
export const categories: Category[] = [
  // ─── Building materials ───────────────────────────────────
  {
    slug: "cement",
    group: "building",
    icon: "cement",
    name: { en: "Cement", hi: "सीमेंट" },
    description: { en: "OPC, PPC and PSC cement for every stage of construction.", hi: "निर्माण के हर चरण के लिए OPC, PPC और PSC सीमेंट।" },
    subcategories: ["OPC", "PPC", "PSC", { en: "White Cement", hi: "व्हाइट सीमेंट" }],
  },
  {
    slug: "steel",
    group: "building",
    icon: "steel",
    name: { en: "Steel & TMT Bars", hi: "सरिया और TMT बार" },
    description: { en: "TMT bars, binding wire and structural steel.", hi: "TMT सरिया, बाइंडिंग वायर और स्ट्रक्चरल स्टील।" },
    subcategories: [{ en: "TMT Bars", hi: "TMT सरिया" }, { en: "Binding Wire", hi: "बाइंडिंग वायर" }, { en: "Structural Steel", hi: "स्ट्रक्चरल स्टील" }],
  },
  {
    slug: "bricks-blocks",
    group: "building",
    icon: "bricks",
    name: { en: "Bricks & Blocks", hi: "ईंट और ब्लॉक" },
    description: { en: "Clay bricks, fly ash bricks, AAC and concrete blocks.", hi: "लाल ईंट, फ्लाई ऐश ईंट, AAC और कंक्रीट ब्लॉक।" },
    subcategories: [{ en: "Clay Bricks", hi: "लाल ईंट" }, { en: "Fly Ash Bricks", hi: "फ्लाई ऐश ईंट" }, { en: "AAC Blocks", hi: "AAC ब्लॉक" }, { en: "Concrete Blocks", hi: "कंक्रीट ब्लॉक" }],
  },
  {
    slug: "sand-aggregates",
    group: "building",
    icon: "sand",
    name: { en: "Sand & Aggregates", hi: "रेत और गिट्टी" },
    description: { en: "River sand, M-sand and stone aggregates (gitti) in various sizes.", hi: "नदी की रेत, M-सैंड और विभिन्न साइज़ की गिट्टी।" },
    subcategories: [{ en: "Sand", hi: "रेत" }, { en: "Aggregate", hi: "गिट्टी" }, { en: "Stone Dust", hi: "स्टोन डस्ट" }],
  },
  {
    slug: "construction-chemicals",
    group: "building",
    icon: "chemicals",
    name: { en: "Construction Chemicals", hi: "कंस्ट्रक्शन केमिकल" },
    description: { en: "Admixtures, bonding agents, curing compounds and repair products.", hi: "एडमिक्सचर, बॉन्डिंग एजेंट, क्योरिंग कंपाउंड और रिपेयर प्रोडक्ट्स।" },
  },
  {
    slug: "waterproofing",
    group: "building",
    icon: "waterproofing",
    name: { en: "Waterproofing Materials", hi: "वॉटरप्रूफिंग सामग्री" },
    description: { en: "Waterproofing compounds, membranes and coatings for roofs, walls and bathrooms.", hi: "छत, दीवार और बाथरूम के लिए वॉटरप्रूफिंग कंपाउंड, मेम्ब्रेन और कोटिंग।" },
  },
  {
    slug: "adhesives",
    group: "building",
    icon: "adhesives",
    name: { en: "Adhesives", hi: "एडहेसिव" },
    description: { en: "Tile adhesives, wood adhesives, grouts and fixing compounds.", hi: "टाइल एडहेसिव, लकड़ी का गोंद, ग्राउट और फिक्सिंग कंपाउंड।" },
  },
  {
    slug: "tools",
    group: "building",
    icon: "tools",
    name: { en: "Tools", hi: "औज़ार" },
    description: { en: "Hand tools, masonry tools, measuring tools and power-tool accessories.", hi: "हाथ के औज़ार, मिस्त्री के औज़ार, नापने के औज़ार और पावर टूल एक्सेसरीज़।" },
  },
  {
    slug: "tiles-flooring",
    group: "building",
    icon: "tiles",
    name: { en: "Tiles & Flooring", hi: "टाइल्स और फ़्लोरिंग" },
    description: { en: "Floor tiles, wall tiles and flooring accessories.", hi: "फ़र्श की टाइल्स, दीवार की टाइल्स और फ़्लोरिंग का सामान।" },
  },
  {
    slug: "roofing",
    group: "building",
    icon: "roofing",
    name: { en: "Roofing Materials", hi: "छत की सामग्री" },
    description: { en: "Roofing sheets, accessories and roof protection products.", hi: "छत की शीट, एक्सेसरीज़ और छत सुरक्षा प्रोडक्ट्स।" },
  },
  {
    slug: "plywood-boards",
    group: "building",
    icon: "plywood",
    name: { en: "Plywood & Boards", hi: "प्लाईवुड और बोर्ड" },
    description: { en: "Plywood, block boards, MDF, particle boards and laminates.", hi: "प्लाईवुड, ब्लॉक बोर्ड, MDF, पार्टिकल बोर्ड और लैमिनेट।" },
  },
  {
    slug: "other-materials",
    group: "building",
    icon: "other",
    name: { en: "Other Construction Materials", hi: "अन्य निर्माण सामग्री" },
    description: { en: "Don't see your item? We can likely help — just ask.", hi: "आपका सामान नहीं दिखा? हम शायद मदद कर सकें — बस पूछिए।" },
  },

  {
    slug: "stone-marble",
    group: "building",
    icon: "tiles",
    name: {"en":"Marble, Granite & Stone","hi":"मार्बल, ग्रेनाइट और पत्थर"},
    description: {"en":"Natural marble, granite and sandstone for floors, stairs, counters and elevation work.","hi":"फ़र्श, सीढ़ी, काउंटर और एलिवेशन के लिए प्राकृतिक मार्बल, ग्रेनाइट और लाल पत्थर।"},
  },
  {
    slug: "precast",
    group: "building",
    icon: "bricks",
    name: {"en":"Pavers & Precast","hi":"पेवर और प्रीकास्ट"},
    description: {"en":"Interlocking pavers, kerb stones and concrete cover blocks.","hi":"इंटरलॉकिंग पेवर, कर्ब स्टोन और कंक्रीट कवर ब्लॉक।"},
  },
  {
    slug: "gypsum-pop",
    group: "building",
    icon: "cement",
    name: {"en":"Gypsum & POP","hi":"जिप्सम और POP"},
    description: {"en":"Plaster of Paris, gypsum plaster and gypsum boards for smooth walls and false ceilings.","hi":"चिकनी दीवार और फ़ॉल्स सीलिंग के लिए प्लास्टर ऑफ़ पेरिस, जिप्सम प्लास्टर और जिप्सम बोर्ड।"},
  },
  {
    slug: "doors-windows",
    group: "building",
    icon: "plywood",
    name: {"en":"Doors & Windows","hi":"दरवाज़े और खिड़कियाँ"},
    description: {"en":"Flush doors, PVC bathroom doors and UPVC windows (fittings not included).","hi":"फ़्लश दरवाज़े, PVC बाथरूम दरवाज़े और UPVC खिड़कियाँ (फ़िटिंग शामिल नहीं)।"},
  },
  // ─── Paints ───────────────────────────────────────────────
  {
    slug: "interior-paints",
    group: "paints",
    icon: "interior",
    name: { en: "Interior Paints", hi: "इंटीरियर पेंट" },
    description: { en: "Emulsions and distempers for living rooms, bedrooms and ceilings.", hi: "कमरों और छत के लिए इमल्शन और डिस्टेंपर।" },
    subcategories: [{ en: "Emulsion", hi: "इमल्शन" }, { en: "Distemper", hi: "डिस्टेंपर" }, { en: "Ceiling Paint", hi: "सीलिंग पेंट" }],
  },
  {
    slug: "exterior-paints",
    group: "paints",
    icon: "exterior",
    name: { en: "Exterior Paints", hi: "एक्सटीरियर पेंट" },
    description: { en: "Weather-resistant paints for outer walls.", hi: "बाहरी दीवारों के लिए मौसम-रोधी पेंट।" },
  },
  {
    slug: "primers",
    group: "paints",
    icon: "primer",
    name: { en: "Primers", hi: "प्राइमर" },
    description: { en: "Wall, wood and metal primers for better adhesion and finish.", hi: "बेहतर पकड़ और फिनिश के लिए दीवार, लकड़ी और मेटल प्राइमर।" },
  },
  {
    slug: "putty",
    group: "paints",
    icon: "putty",
    name: { en: "Putty", hi: "पुट्टी" },
    description: { en: "Wall putty for a smooth, even surface before painting.", hi: "पेंट से पहले चिकनी सतह के लिए वॉल पुट्टी।" },
  },
  {
    slug: "enamels",
    group: "paints",
    icon: "enamel",
    name: { en: "Enamels", hi: "इनेमल" },
    description: { en: "Glossy and satin enamels for doors, windows, grills and more.", hi: "दरवाज़े, खिड़की, ग्रिल आदि के लिए ग्लॉसी और साटिन इनेमल।" },
  },
  {
    slug: "wood-coatings",
    group: "paints",
    icon: "wood",
    name: { en: "Wood Coatings & Finishes", hi: "वुड कोटिंग और फिनिश" },
    description: { en: "Polishes, PU, melamine, stains and varnishes for wood.", hi: "लकड़ी के लिए पॉलिश, PU, मेलामाइन, स्टेन और वार्निश।" },
  },
  {
    slug: "metal-paints",
    group: "paints",
    icon: "metal",
    name: { en: "Metal Paints", hi: "मेटल पेंट" },
    description: { en: "Anti-rust primers and paints for gates, grills and structures.", hi: "गेट, ग्रिल और स्ट्रक्चर के लिए जंगरोधी प्राइमर और पेंट।" },
  },
  {
    slug: "waterproof-paints",
    group: "paints",
    icon: "waterproofing",
    name: { en: "Waterproofing Paints", hi: "वॉटरप्रूफिंग पेंट" },
    description: { en: "Waterproof coatings for roofs, terraces and exterior walls.", hi: "छत, टैरेस और बाहरी दीवारों के लिए वॉटरप्रूफ कोटिंग।" },
  },
  {
    slug: "texture-paints",
    group: "paints",
    icon: "texture",
    name: { en: "Texture Paints", hi: "टेक्सचर पेंट" },
    description: { en: "Decorative textures and special-effect finishes.", hi: "सजावटी टेक्सचर और स्पेशल इफ़ेक्ट फिनिश।" },
  },
  {
    slug: "thinners",
    group: "paints",
    icon: "thinner",
    name: { en: "Thinners & Solvents", hi: "थिनर और सॉल्वेंट" },
    description: { en: "Thinners and solvents for enamels, wood finishes and cleaning.", hi: "इनेमल, वुड फिनिश और सफ़ाई के लिए थिनर और सॉल्वेंट।" },
  },
  {
    slug: "painting-tools",
    group: "paints",
    icon: "brush",
    name: { en: "Painting Tools & Accessories", hi: "पेंटिंग औज़ार और सामान" },
    description: { en: "Brushes, rollers, trays, masking tapes, sandpaper and scrapers.", hi: "ब्रश, रोलर, ट्रे, मास्किंग टेप, रेगमाल और स्क्रेपर।" },
    subcategories: [{ en: "Brushes", hi: "ब्रश" }, { en: "Rollers", hi: "रोलर" }, { en: "Tapes", hi: "टेप" }, { en: "Sandpaper", hi: "रेगमाल" }],
  },
  {
    slug: "sealants",
    group: "paints",
    icon: "sealant",
    name: { en: "Sealants & Fillers", hi: "सीलेंट और फ़िलर" },
    description: { en: "Silicone, acrylic and crack fillers for joints and gaps.", hi: "जोड़ और दरारों के लिए सिलिकॉन, एक्रेलिक और क्रैक फ़िलर।" },
  },
];

export const categoryGroups: Record<CategoryGroup, { name: LocalizedText; href: string }> = {
  building: { name: { en: "Building Materials", hi: "बिल्डिंग मटेरियल" }, href: "/building-materials" },
  paints: { name: { en: "Paints", hi: "पेंट्स" }, href: "/paints" },
};


