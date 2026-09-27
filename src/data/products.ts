import type { Product } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE — SAMPLE / SEED DATA
 *  Copied into storage/content.json on first start. After that, manage
 *  products from Admin → Products (this file is only the starting point).
 * ─────────────────────────────────────────────────────────────
 *  These are generic demo entries so the site has something to show.
 *  Replace / extend them with your real products.
 *
 *  To add a product copy one block and change:
 *    id / slug   unique, lowercase-with-dashes (slug is the URL)
 *    category    a slug from data/categories.ts
 *    brand       an id from data/brands.ts (optional)
 *    image       put a photo in /public/products/ and write "/products/<file>.jpg"
 *                (optional — a styled illustration is shown otherwise)
 *    featured    true = shown on the homepage
 *    available   true = usually in range, false = "available on request"
 *
 *  Never add prices here — customers are asked to enquire for current rates.
 */
export const products: Product[] = [
  // ─── Cement ───
  {
    id: "p-001",
    slug: "opc-53-grade-cement",
    image: "/images/products/opc-53-grade-cement.jpg",
    brand: "ultratech",
    name: { en: "OPC 53 Grade Cement", hi: "OPC 53 ग्रेड सीमेंट" },
    category: "cement",
    subcategory: "OPC",
    description: {
      en: "Ordinary Portland Cement of 53 grade, commonly used for RCC work, columns, beams and slabs where early strength is needed.",
      hi: "53 ग्रेड ऑर्डिनरी पोर्टलैंड सीमेंट, जो RCC काम, कॉलम, बीम और स्लैब में आमतौर पर इस्तेमाल होता है।",
    },
    highlights: [
      { en: "Common uses: RCC, slabs, columns, beams", hi: "उपयोग: RCC, स्लैब, कॉलम, बीम" },
      { en: "Other brands available on request", hi: "अन्य ब्रांड मांग पर उपलब्ध" },
    ],
    unit: { en: "Bag (50 kg)", hi: "बोरी (50 किलो)" },
    featured: true,
    available: true,
    keywords: ["cement", "सीमेंट", "opc", "53"],
  },
  {
    id: "p-002",
    slug: "ppc-cement",
    image: "/images/products/ppc-cement.jpg",
    brand: "acc",
    name: { en: "PPC Cement", hi: "PPC सीमेंट" },
    category: "cement",
    subcategory: "PPC",
    description: {
      en: "Portland Pozzolana Cement, widely used for plastering, masonry, flooring and general construction.",
      hi: "पोर्टलैंड पोज़ोलाना सीमेंट, जो प्लास्टर, चिनाई, फ़र्श और सामान्य निर्माण में बहुत इस्तेमाल होता है।",
    },
    highlights: [{ en: "Common uses: plaster, brickwork, flooring", hi: "उपयोग: प्लास्टर, ईंट की चिनाई, फ़र्श" }],
    unit: { en: "Bag (50 kg)", hi: "बोरी (50 किलो)" },
    featured: true,
    available: true,
    keywords: ["cement", "सीमेंट", "ppc"],
  },
  {
    id: "p-003",
    slug: "white-cement",
    image: "/images/products/white-cement.jpg",
    brand: "birla-white",
    name: { en: "White Cement", hi: "व्हाइट सीमेंट" },
    category: "cement",
    subcategory: { en: "White Cement", hi: "व्हाइट सीमेंट" },
    description: {
      en: "White cement for tile grouting, decorative work and as a base before putty.",
      hi: "टाइल जोड़ भरने, सजावटी काम और पुट्टी से पहले बेस के लिए व्हाइट सीमेंट।",
    },
    unit: { en: "Bag / pack", hi: "बोरी / पैक" },
    available: true,
    keywords: ["white cement", "सफ़ेद सीमेंट"],
  },

  // ─── Steel ───
  {
    id: "p-010",
    slug: "tmt-bars-fe-500d",
    image: "/images/products/tmt-bars-fe-500d.jpg",
    brand: "tata-tiscon",
    name: { en: "TMT Bars Fe 500D", hi: "TMT सरिया Fe 500D" },
    category: "steel",
    subcategory: { en: "TMT Bars", hi: "TMT सरिया" },
    description: {
      en: "Thermo-mechanically treated reinforcement bars in Fe 500D grade for residential and commercial construction.",
      hi: "आवासीय और व्यावसायिक निर्माण के लिए Fe 500D ग्रेड की TMT सरिया।",
    },
    highlights: [
      { en: "Sizes commonly asked: 8, 10, 12, 16, 20, 25 mm", hi: "आमतौर पर साइज़: 8, 10, 12, 16, 20, 25 mm" },
      { en: "Sold by weight — ask for today's rate", hi: "वज़न से बिक्री — आज का रेट पूछें" },
    ],
    unit: { en: "By weight (kg / quintal / tonne)", hi: "वज़न से (किलो / क्विंटल / टन)" },
    featured: true,
    available: true,
    keywords: ["sariya", "सरिया", "steel", "rod", "saria"],
  },
  {
    id: "p-011",
    slug: "binding-wire",
    image: "/images/products/binding-wire.jpg",
    name: { en: "Binding Wire", hi: "बाइंडिंग वायर" },
    category: "steel",
    subcategory: { en: "Binding Wire", hi: "बाइंडिंग वायर" },
    description: { en: "Annealed binding wire for tying reinforcement bars.", hi: "सरिया बांधने के लिए बाइंडिंग वायर।" },
    unit: { en: "Bundle / kg", hi: "बंडल / किलो" },
    available: true,
    keywords: ["tar", "तार"],
  },

  // ─── Bricks & blocks ───
  {
    id: "p-020",
    slug: "red-clay-bricks",
    image: "/images/products/red-clay-bricks.jpg",
    name: { en: "Red Clay Bricks", hi: "लाल ईंट" },
    category: "bricks-blocks",
    subcategory: { en: "Clay Bricks", hi: "लाल ईंट" },
    description: { en: "Traditional burnt clay bricks for walls and masonry work.", hi: "दीवार और चिनाई के लिए पारंपरिक पकी हुई लाल ईंट।" },
    unit: { en: "Per 1,000 bricks", hi: "प्रति 1,000 ईंट" },
    available: true,
    keywords: ["int", "eet", "ईंट", "brick"],
  },
  {
    id: "p-021",
    slug: "aac-blocks",
    image: "/images/products/aac-blocks.jpg",
    name: { en: "AAC Blocks", hi: "AAC ब्लॉक" },
    category: "bricks-blocks",
    subcategory: { en: "AAC Blocks", hi: "AAC ब्लॉक" },
    description: {
      en: "Autoclaved aerated concrete blocks — lightweight blocks for faster wall construction.",
      hi: "ऑटोक्लेव्ड एरेटेड कंक्रीट ब्लॉक — जल्दी दीवार बनाने के लिए हल्के ब्लॉक।",
    },
    highlights: [{ en: "Ask for available sizes and thickness", hi: "उपलब्ध साइज़ और मोटाई पूछें" }],
    unit: { en: "Per block / cubic metre", hi: "प्रति ब्लॉक / क्यूबिक मीटर" },
    featured: true,
    available: false,
    keywords: ["block", "ब्लॉक", "aac"],
  },
  {
    id: "p-022",
    slug: "fly-ash-bricks",
    image: "/images/products/fly-ash-bricks.jpg",
    name: { en: "Fly Ash Bricks", hi: "फ्लाई ऐश ईंट" },
    category: "bricks-blocks",
    subcategory: { en: "Fly Ash Bricks", hi: "फ्लाई ऐश ईंट" },
    description: { en: "Uniform-size bricks made from fly ash, used for walls and partitions.", hi: "फ्लाई ऐश से बनी एक-समान साइज़ की ईंट, दीवार और पार्टीशन के लिए।" },
    unit: { en: "Per 1,000 bricks", hi: "प्रति 1,000 ईंट" },
    available: false,
    keywords: ["ईंट", "brick"],
  },

  // ─── Sand & aggregates ───
  {
    id: "p-030",
    slug: "river-sand",
    image: "/images/products/river-sand.jpg",
    name: { en: "River Sand", hi: "नदी की रेत" },
    category: "sand-aggregates",
    subcategory: { en: "Sand", hi: "रेत" },
    description: { en: "Natural sand for concrete, plastering and masonry work.", hi: "कंक्रीट, प्लास्टर और चिनाई के लिए प्राकृतिक रेत।" },
    unit: { en: "Per trolley / truck / cubic ft", hi: "प्रति ट्रॉली / ट्रक / घन फ़ुट" },
    available: true,
    keywords: ["ret", "balu", "रेत", "बालू", "sand"],
  },
  {
    id: "p-031",
    slug: "stone-aggregate-20mm",
    image: "/images/products/stone-aggregate-20mm.jpg",
    name: { en: "Stone Aggregate (Gitti)", hi: "गिट्टी (स्टोन एग्रीगेट)" },
    category: "sand-aggregates",
    subcategory: { en: "Aggregate", hi: "गिट्टी" },
    description: { en: "Crushed stone aggregate for concrete — ask for 10 mm, 20 mm and other sizes.", hi: "कंक्रीट के लिए क्रश की हुई गिट्टी — 10 mm, 20 mm और अन्य साइज़ पूछें।" },
    unit: { en: "Per trolley / truck / cubic ft", hi: "प्रति ट्रॉली / ट्रक / घन फ़ुट" },
    available: true,
    keywords: ["gitti", "गिट्टी", "rodi", "aggregate"],
  },

  // ─── Chemicals / waterproofing / adhesives ───
  {
    id: "p-040",
    slug: "waterproofing-compound",
    image: "/images/products/waterproofing-compound.jpg",
    brand: "dr-fixit",
    name: { en: "Integral Waterproofing Compound", hi: "इंटीग्रल वॉटरप्रूफिंग कंपाउंड" },
    category: "waterproofing",
    description: {
      en: "Additive mixed with cement mortar or concrete to reduce water seepage. Follow the manufacturer's dosage.",
      hi: "सीमेंट मसाले या कंक्रीट में मिलाया जाने वाला एडिटिव, जो पानी का रिसाव कम करता है। निर्माता की मात्रा का पालन करें।",
    },
    unit: { en: "Litre / kg packs", hi: "लीटर / किलो पैक" },
    featured: true,
    available: true,
    keywords: ["waterproof", "seepage", "सीलन", "leakage"],
  },
  {
    id: "p-041",
    slug: "bonding-agent",
    image: "/images/products/bonding-agent.jpg",
    brand: "dr-fixit",
    name: { en: "SBR / Acrylic Bonding Agent", hi: "SBR / एक्रेलिक बॉन्डिंग एजेंट" },
    category: "construction-chemicals",
    description: { en: "Improves bonding between old and new concrete or plaster, and for repair work.", hi: "पुराने और नए कंक्रीट या प्लास्टर के बीच जुड़ाव और रिपेयर काम के लिए।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
  },
  {
    id: "p-042",
    slug: "tile-adhesive",
    image: "/images/products/tile-adhesive.jpg",
    name: { en: "Tile Adhesive", hi: "टाइल एडहेसिव" },
    category: "adhesives",
    description: { en: "Cement-based adhesive for fixing floor and wall tiles.", hi: "फ़र्श और दीवार की टाइल लगाने के लिए सीमेंट-आधारित एडहेसिव।" },
    unit: { en: "Bag (20 kg / as available)", hi: "बोरी (20 किलो / उपलब्धता अनुसार)" },
    available: true,
    keywords: ["tile", "टाइल", "chemical"],
  },
  {
    id: "p-043",
    slug: "tile-grout",
    image: "/images/products/tile-grout.jpg",
    name: { en: "Tile Grout", hi: "टाइल ग्राउट" },
    category: "adhesives",
    description: { en: "Grout for filling joints between tiles, in multiple colours.", hi: "टाइल्स के जोड़ भरने के लिए ग्राउट, कई रंगों में।" },
    unit: { en: "Packs", hi: "पैक" },
    available: true,
  },

  {
    id: "p-073",
    slug: "masonry-tools",
    image: "/images/products/masonry-tools.jpg",
    name: { en: "Masonry Tools", hi: "मिस्त्री के औज़ार" },
    category: "tools",
    description: { en: "Trowels, floats, spirit levels, plumb bobs, measuring tapes and more.", hi: "करनी, गुरमाला, स्पिरिट लेवल, साहुल, नापने का फ़ीता और बहुत कुछ।" },
    unit: { en: "Per piece", hi: "प्रति पीस" },
    featured: true,
    available: true,
    keywords: ["karni", "करनी", "tool", "level"],
  },

  // ─── Tiles, roofing, plywood ───
  {
    id: "p-080",
    slug: "vitrified-floor-tiles",
    image: "/images/products/vitrified-floor-tiles.jpg",
    name: { en: "Vitrified Floor Tiles", hi: "विट्रिफाइड फ़्लोर टाइल्स" },
    category: "tiles-flooring",
    description: { en: "Vitrified tiles for living areas — ask about sizes and finishes available.", hi: "घर के फ़र्श के लिए विट्रिफाइड टाइल्स — उपलब्ध साइज़ और फिनिश पूछें।" },
    unit: { en: "Per box / sq ft", hi: "प्रति बॉक्स / वर्ग फ़ुट" },
    available: false,
    keywords: ["tile", "टाइल"],
  },
  {
    id: "p-081",
    slug: "roofing-sheets",
    image: "/images/products/roofing-sheets.jpg",
    name: { en: "Roofing Sheets", hi: "छत की शीट" },
    category: "roofing",
    description: { en: "Metal and cement roofing sheets for sheds, garages and verandas.", hi: "शेड, गैराज और बरामदे के लिए मेटल और सीमेंट की छत शीट।" },
    unit: { en: "Per sheet", hi: "प्रति शीट" },
    available: false,
    keywords: ["tin", "टीन", "chadar"],
  },
  {
    id: "p-082",
    slug: "commercial-plywood",
    image: "/images/products/commercial-plywood.jpg",
    name: { en: "Plywood", hi: "प्लाईवुड" },
    category: "plywood-boards",
    description: { en: "Commercial and water-resistant plywood in common thicknesses.", hi: "सामान्य मोटाई में कमर्शियल और वॉटर-रेज़िस्टेंट प्लाईवुड।" },
    unit: { en: "Per sheet (8×4 ft)", hi: "प्रति शीट (8×4 फ़ुट)" },
    available: true,
    keywords: ["ply", "प्लाई"],
  },

  // ─── Paints ───
  {
    id: "p-100",
    slug: "interior-emulsion",
    image: "/images/products/interior-emulsion.jpg",
    brand: "asian-paints",
    name: { en: "Interior Emulsion Paint", hi: "इंटीरियर इमल्शन पेंट" },
    category: "interior-paints",
    subcategory: { en: "Emulsion", hi: "इमल्शन" },
    description: {
      en: "Water-based emulsion for interior walls and ceilings, available in a wide range of shades.",
      hi: "अंदर की दीवारों और छत के लिए पानी-आधारित इमल्शन, कई रंगों में।",
    },
    highlights: [
      { en: "Finishes: matt, satin, sheen (as per range)", hi: "फिनिश: मैट, साटिन, शीन (रेंज अनुसार)" },
      { en: "Pack sizes usually 1 L, 4 L, 10 L, 20 L", hi: "पैक आमतौर पर 1, 4, 10, 20 लीटर" },
    ],
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    featured: true,
    available: true,
    keywords: ["paint", "पेंट", "rang", "रंग", "emulsion"],
  },
  {
    id: "p-101",
    slug: "distemper",
    image: "/images/products/distemper.jpg",
    name: { en: "Acrylic Distemper", hi: "एक्रेलिक डिस्टेंपर" },
    category: "interior-paints",
    subcategory: { en: "Distemper", hi: "डिस्टेंपर" },
    description: { en: "An economical interior wall finish for rooms and rental properties.", hi: "कमरों और किराये के मकानों के लिए किफ़ायती इंटीरियर फिनिश।" },
    unit: { en: "Kg / litre packs", hi: "किलो / लीटर पैक" },
    available: true,
    keywords: ["paint", "पेंट", "distemper"],
  },
  {
    id: "p-102",
    slug: "exterior-emulsion",
    image: "/images/products/exterior-emulsion.jpg",
    brand: "berger",
    name: { en: "Exterior Emulsion Paint", hi: "एक्सटीरियर इमल्शन पेंट" },
    category: "exterior-paints",
    description: {
      en: "Paint designed for outer walls, exposed to sun and rain. Ask us which range suits your building.",
      hi: "धूप और बारिश में रहने वाली बाहरी दीवारों के लिए पेंट। आपकी बिल्डिंग के लिए कौन सी रेंज सही है, हमसे पूछें।",
    },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    featured: true,
    available: true,
    keywords: ["paint", "पेंट", "exterior", "outside"],
  },
  {
    id: "p-103",
    slug: "wall-primer",
    image: "/images/products/wall-primer.jpg",
    brand: "asian-paints",
    name: { en: "Wall Primer (Water-based)", hi: "वॉल प्राइमर (पानी-आधारित)" },
    category: "primers",
    description: { en: "Primer applied before emulsion for better adhesion and a uniform finish.", hi: "बेहतर पकड़ और एक-समान फिनिश के लिए इमल्शन से पहले लगाया जाने वाला प्राइमर।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
    keywords: ["primer", "प्राइमर"],
  },
  {
    id: "p-104",
    slug: "wall-putty",
    image: "/images/products/wall-putty.jpg",
    brand: "birla-white",
    name: { en: "Wall Putty", hi: "वॉल पुट्टी" },
    category: "putty",
    description: { en: "White cement-based putty to fill minor surface imperfections and create a smooth base.", hi: "सतह की छोटी कमियां भरने और चिकना बेस बनाने के लिए व्हाइट सीमेंट-आधारित पुट्टी।" },
    unit: { en: "Bag (as available)", hi: "बोरी (उपलब्धता अनुसार)" },
    featured: true,
    available: true,
    keywords: ["putty", "पुट्टी", "putti"],
  },
  {
    id: "p-105",
    slug: "synthetic-enamel",
    image: "/images/products/synthetic-enamel.jpg",
    brand: "nerolac",
    name: { en: "Synthetic Enamel Paint", hi: "सिंथेटिक इनेमल पेंट" },
    category: "enamels",
    description: { en: "Glossy enamel for wood and metal surfaces such as doors, windows and grills.", hi: "दरवाज़े, खिड़की और ग्रिल जैसी लकड़ी और मेटल सतहों के लिए ग्लॉसी इनेमल।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
    keywords: ["enamel", "इनेमल", "oil paint"],
  },
  {
    id: "p-106",
    slug: "pu-wood-finish",
    image: "/images/products/pu-wood-finish.jpg",
    name: { en: "PU Wood Finish", hi: "PU वुड फिनिश" },
    category: "wood-coatings",
    description: { en: "Polyurethane finish for furniture and woodwork. Ask about matt and glossy options.", hi: "फ़र्नीचर और लकड़ी के काम के लिए पॉलीयूरेथेन फिनिश। मैट और ग्लॉसी विकल्प पूछें।" },
    unit: { en: "Litre sets", hi: "लीटर सेट" },
    available: true,
    keywords: ["polish", "पॉलिश", "pu", "wood"],
  },
  {
    id: "p-107",
    slug: "wood-polish-varnish",
    image: "/images/products/wood-polish-varnish.jpg",
    name: { en: "Wood Polish & Varnish", hi: "वुड पॉलिश और वार्निश" },
    category: "wood-coatings",
    description: { en: "French polish, melamine and varnish for wooden surfaces.", hi: "लकड़ी की सतहों के लिए फ्रेंच पॉलिश, मेलामाइन और वार्निश।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
    keywords: ["polish", "पॉलिश", "melamine", "varnish"],
  },
  {
    id: "p-108",
    slug: "red-oxide-metal-primer",
    image: "/images/products/red-oxide-metal-primer.jpg",
    name: { en: "Red Oxide Metal Primer", hi: "रेड ऑक्साइड मेटल प्राइमर" },
    category: "metal-paints",
    description: { en: "Anti-corrosive primer for iron and steel before painting.", hi: "पेंट से पहले लोहे और स्टील के लिए जंगरोधी प्राइमर।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
    keywords: ["red oxide", "primer", "rust", "जंग"],
  },
  {
    id: "p-109",
    slug: "roof-waterproof-coating",
    image: "/images/products/roof-waterproof-coating.jpg",
    brand: "dr-fixit",
    name: { en: "Roof Waterproof Coating", hi: "छत की वॉटरप्रूफ कोटिंग" },
    category: "waterproof-paints",
    description: { en: "Elastomeric coating for roofs and terraces to help protect against water seepage.", hi: "छत और टैरेस पर पानी के रिसाव से बचाव के लिए इलास्टोमेरिक कोटिंग।" },
    unit: { en: "Litre / kg packs", hi: "लीटर / किलो पैक" },
    featured: true,
    available: true,
    keywords: ["waterproof", "chhat", "छत", "leak", "सीलन"],
  },
  {
    id: "p-110",
    slug: "texture-paint",
    image: "/images/products/texture-paint.jpg",
    name: { en: "Texture Paint", hi: "टेक्सचर पेंट" },
    category: "texture-paints",
    description: { en: "Decorative texture finishes for feature walls and exteriors.", hi: "फ़ीचर वॉल और बाहरी दीवारों के लिए सजावटी टेक्सचर फिनिश।" },
    unit: { en: "Kg packs", hi: "किलो पैक" },
    available: false,
    keywords: ["texture", "टेक्सचर", "design"],
  },
  {
    id: "p-111",
    slug: "general-purpose-thinner",
    image: "/images/products/general-purpose-thinner.jpg",
    name: { en: "General Purpose Thinner", hi: "जनरल पर्पस थिनर" },
    category: "thinners",
    description: { en: "Thinner for enamels and cleaning brushes. Use the thinner recommended by the paint manufacturer.", hi: "इनेमल और ब्रश साफ़ करने के लिए थिनर। पेंट निर्माता द्वारा सुझाया गया थिनर इस्तेमाल करें।" },
    unit: { en: "Litre packs", hi: "लीटर पैक" },
    available: true,
    keywords: ["thinner", "थिनर", "tarpin"],
  },
  {
    id: "p-112",
    slug: "paint-brushes",
    image: "/images/products/paint-brushes.jpg",
    name: { en: "Paint Brushes", hi: "पेंट ब्रश" },
    category: "painting-tools",
    subcategory: { en: "Brushes", hi: "ब्रश" },
    description: { en: "Flat and angled brushes in sizes from 1\" to 6\".", hi: "1\" से 6\" तक के फ़्लैट और एंगल्ड ब्रश।" },
    unit: { en: "Per piece", hi: "प्रति पीस" },
    available: true,
    keywords: ["brush", "ब्रश"],
  },
  {
    id: "p-113",
    slug: "paint-rollers",
    image: "/images/products/paint-rollers.jpg",
    name: { en: "Paint Rollers & Trays", hi: "पेंट रोलर और ट्रे" },
    category: "painting-tools",
    subcategory: { en: "Rollers", hi: "रोलर" },
    description: { en: "Rollers for smooth and textured walls, with trays and extension rods.", hi: "चिकनी और टेक्सचर दीवारों के लिए रोलर, ट्रे और एक्सटेंशन रॉड के साथ।" },
    unit: { en: "Per piece", hi: "प्रति पीस" },
    featured: true,
    available: true,
    keywords: ["roller", "रोलर"],
  },
  {
    id: "p-114",
    slug: "masking-tape",
    image: "/images/products/masking-tape.jpg",
    name: { en: "Masking Tape", hi: "मास्किंग टेप" },
    category: "painting-tools",
    subcategory: { en: "Tapes", hi: "टेप" },
    description: { en: "Masking tape for clean paint edges on walls, frames and trims.", hi: "दीवार, फ़्रेम और किनारों पर साफ़ पेंट लाइन के लिए मास्किंग टेप।" },
    unit: { en: "Per roll", hi: "प्रति रोल" },
    available: true,
    keywords: ["tape", "टेप"],
  },
  {
    id: "p-115",
    slug: "silicone-sealant",
    image: "/images/products/silicone-sealant.jpg",
    name: { en: "Silicone Sealant", hi: "सिलिकॉन सीलेंट" },
    category: "sealants",
    description: { en: "Silicone sealant for sealing joints around windows, sinks and bathroom fittings.", hi: "खिड़की, सिंक और बाथरूम फिटिंग के आसपास जोड़ सील करने के लिए सिलिकॉन सीलेंट।" },
    unit: { en: "Per cartridge", hi: "प्रति कार्ट्रिज" },
    available: true,
    keywords: ["silicone", "सिलिकॉन", "sealant"],
  },
  {
    id: "p-116",
    slug: "sandpaper",
    image: "/images/products/sandpaper.jpg",
    name: { en: "Sandpaper (Regmal)", hi: "रेगमाल (सैंडपेपर)" },
    category: "painting-tools",
    subcategory: { en: "Sandpaper", hi: "रेगमाल" },
    description: { en: "Sandpaper in various grits for surface preparation before painting.", hi: "पेंट से पहले सतह तैयार करने के लिए अलग-अलग ग्रिट का रेगमाल।" },
    unit: { en: "Per sheet", hi: "प्रति शीट" },
    available: true,
    keywords: ["regmal", "रेगमाल", "sand paper"],
  },
  // ─── More building materials ───
  {
    id: "p-200",
    slug: "opc-43-grade-cement",
    name: {
      en: "OPC 43 Grade Cement",
      hi: "OPC 43 ग्रेड सीमेंट"
    },
    category: "cement",
    subcategory: "OPC",
    description: {
      en: "Ordinary Portland Cement of 43 grade, suitable for general house construction, plastering, masonry and flooring.",
      hi: "43 ग्रेड ऑर्डिनरी पोर्टलैंड सीमेंट, जो आम मकान निर्माण, प्लास्टर, चिनाई और फ़र्श के काम के लिए उपयुक्त है।"
    },
    highlights: [
      {
        en: "Common uses: plaster, masonry, PCC, flooring",
        hi: "उपयोग: प्लास्टर, चिनाई, PCC, फ़र्श"
      }
    ],
    unit: {
      en: "Bag (50 kg)",
      hi: "बोरी (50 किलो)"
    },
    featured: false,
    available: true,
    keywords: [
      "cement",
      "सीमेंट",
      "opc 43",
      "43 grade"
    ],
    image: "/images/products/opc-43-grade-cement.jpg"
  },
  {
    id: "p-201",
    slug: "psc-slag-cement",
    name: {
      en: "PSC (Slag) Cement",
      hi: "PSC (स्लैग) सीमेंट"
    },
    category: "cement",
    subcategory: "PSC",
    description: {
      en: "Portland Slag Cement made with ground blast-furnace slag, used for foundations, mass concrete and general construction.",
      hi: "ब्लास्ट-फ़र्नेस स्लैग से बना पोर्टलैंड स्लैग सीमेंट, जो नींव, बड़े कंक्रीट काम और आम निर्माण में इस्तेमाल होता है।"
    },
    highlights: [
      {
        en: "Common uses: foundations, mass concrete",
        hi: "उपयोग: नींव, बड़े कंक्रीट काम"
      }
    ],
    unit: {
      en: "Bag (50 kg)",
      hi: "बोरी (50 किलो)"
    },
    featured: false,
    available: true,
    keywords: [
      "psc",
      "slag cement",
      "स्लैग सीमेंट",
      "सीमेंट"
    ],
    image: "/images/products/psc-slag-cement.jpg"
  },
  {
    id: "p-202",
    slug: "ready-mix-plaster",
    name: {
      en: "Ready-Mix Plaster",
      hi: "रेडी-मिक्स प्लास्टर"
    },
    category: "cement",
    subcategory: {
      en: "Ready Mix",
      hi: "रेडी मिक्स"
    },
    description: {
      en: "Factory-blended dry mix of cement, graded sand and additives; only water needs to be added at site for wall plastering.",
      hi: "सीमेंट, छनी रेत और एडिटिव का फ़ैक्ट्री में बना सूखा मिश्रण; दीवार प्लास्टर के लिए साइट पर सिर्फ़ पानी मिलाना होता है।"
    },
    unit: {
      en: "Bag (40 kg)",
      hi: "बोरी (40 किलो)"
    },
    featured: false,
    available: false,
    keywords: [
      "ready mix plaster",
      "readymix",
      "रेडीमिक्स",
      "प्लास्टर",
      "masala"
    ],
    image: "/images/products/ready-mix-plaster.jpg"
  },
  {
    id: "p-203",
    slug: "ms-angle-channel-flat",
    name: {
      en: "MS Angle, Channel & Flat",
      hi: "MS एंगल, चैनल और पत्ती"
    },
    category: "steel",
    subcategory: {
      en: "Structural Steel",
      hi: "स्ट्रक्चरल स्टील"
    },
    description: {
      en: "Mild steel angles, channels and flat bars used for gates, grills, sheds, frames and fabrication work.",
      hi: "माइल्ड स्टील एंगल, चैनल और पत्ती, जो गेट, ग्रिल, शेड, फ़्रेम और फ़ैब्रिकेशन के काम में लगती है।"
    },
    highlights: [
      {
        en: "Sold by weight; cut lengths on request",
        hi: "वज़न से बिक्री; मांग पर कटिंग"
      }
    ],
    unit: {
      en: "Per kg",
      hi: "प्रति किलो"
    },
    featured: false,
    available: true,
    keywords: [
      "angle",
      "एंगल",
      "channel",
      "चैनल",
      "patti",
      "पत्ती",
      "ms flat",
      "लोहा"
    ],
    image: "/images/products/ms-angle-channel-flat.jpg"
  },
  {
    id: "p-204",
    slug: "ms-pipes-hollow-sections",
    name: {
      en: "MS Pipes & Hollow Sections",
      hi: "MS पाइप और हॉलो सेक्शन"
    },
    category: "steel",
    subcategory: {
      en: "Structural Steel",
      hi: "स्ट्रक्चरल स्टील"
    },
    description: {
      en: "Mild steel round, square and rectangular hollow pipes for railings, gates, sheds and furniture frames.",
      hi: "रेलिंग, गेट, शेड और फ़र्नीचर फ़्रेम के लिए माइल्ड स्टील के गोल, चौकोर और आयताकार खोखले पाइप।"
    },
    highlights: [
      {
        en: "Round, square and rectangular sections",
        hi: "गोल, चौकोर और आयताकार सेक्शन"
      }
    ],
    unit: {
      en: "Per kg",
      hi: "प्रति किलो"
    },
    featured: false,
    available: true,
    keywords: [
      "ms pipe",
      "square pipe",
      "चौकोर पाइप",
      "hollow section",
      "लोहे का पाइप"
    ],
    image: "/images/products/ms-pipes-hollow-sections.jpg"
  },
  {
    id: "p-205",
    slug: "tmt-stirrups-rings",
    name: {
      en: "Ready-Made Stirrups (Rings)",
      hi: "रेडीमेड रिंग (स्टिरप)"
    },
    category: "steel",
    subcategory: "TMT",
    description: {
      en: "Pre-bent TMT stirrups used to tie main bars in columns and beams, saving cutting and bending time at site.",
      hi: "पहले से मोड़ी गई TMT रिंग, जो कॉलम और बीम में मुख्य सरिया बांधने में लगती है और साइट पर कटाई-मुड़ाई का समय बचाती है।"
    },
    highlights: [
      {
        en: "Common bar size: 8 mm",
        hi: "आम साइज़: 8 मिमी"
      }
    ],
    unit: {
      en: "Per kg",
      hi: "प्रति किलो"
    },
    featured: false,
    available: true,
    keywords: [
      "ring",
      "रिंग",
      "stirrup",
      "chhalla",
      "छल्ला",
      "सरिया"
    ],
    image: "/images/products/tmt-stirrups-rings.jpg"
  },
  {
    id: "p-206",
    slug: "welded-wire-mesh",
    name: {
      en: "Welded Wire Mesh",
      hi: "वेल्डेड वायर जाली"
    },
    category: "steel",
    subcategory: {
      en: "Mesh",
      hi: "जाली"
    },
    description: {
      en: "Steel wire mesh with welded joints, used for fencing, slab and floor reinforcement, and guards.",
      hi: "वेल्ड किए जोड़ों वाली स्टील तार की जाली, जो फ़ेंसिंग, स्लैब और फ़र्श मज़बूती और गार्ड के लिए इस्तेमाल होती है।"
    },
    unit: {
      en: "Per roll / sheet",
      hi: "प्रति रोल / शीट"
    },
    featured: false,
    available: true,
    keywords: [
      "jali",
      "जाली",
      "welded mesh",
      "wire mesh",
      "तार जाली"
    ],
    image: "/images/products/welded-wire-mesh.jpg"
  },
  {
    id: "p-207",
    slug: "chicken-wire-mesh",
    name: {
      en: "Chicken Wire Mesh (Plaster Mesh)",
      hi: "चिकन जाली (प्लास्टर जाली)"
    },
    category: "steel",
    subcategory: {
      en: "Mesh",
      hi: "जाली"
    },
    description: {
      en: "Light hexagonal GI wire mesh fixed over brick-concrete joints and wall chases before plastering to reduce cracks.",
      hi: "हल्की षट्कोणीय GI तार जाली, जो प्लास्टर से पहले ईंट-कंक्रीट के जोड़ और दीवार की खुदाई पर लगाई जाती है ताकि दरारें कम हों।"
    },
    unit: {
      en: "Per roll",
      hi: "प्रति रोल"
    },
    featured: false,
    available: true,
    keywords: [
      "chicken mesh",
      "चिकन जाली",
      "plaster jali",
      "मुर्गी जाली",
      "जाली"
    ],
    image: "/images/products/chicken-wire-mesh.jpg"
  },
  {
    id: "p-208",
    slug: "solid-concrete-blocks",
    name: {
      en: "Solid Concrete Blocks",
      hi: "सॉलिड कंक्रीट ब्लॉक"
    },
    category: "bricks-blocks",
    subcategory: {
      en: "Blocks",
      hi: "ब्लॉक"
    },
    description: {
      en: "Dense cement-concrete blocks for load-bearing and partition walls, boundary walls and compound walls.",
      hi: "भार उठाने वाली और पार्टीशन दीवार, बाउंड्री वॉल के लिए ठोस सीमेंट-कंक्रीट ब्लॉक।"
    },
    highlights: [
      {
        en: "Common sizes: 4, 6 and 8 inch thickness",
        hi: "आम मोटाई: 4, 6 और 8 इंच"
      }
    ],
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "concrete block",
      "सीमेंट ब्लॉक",
      "cement ki eent",
      "ब्लॉक",
      "solid block"
    ],
    image: "/images/products/solid-concrete-blocks.jpg"
  },
  {
    id: "p-209",
    slug: "hollow-concrete-blocks",
    name: {
      en: "Hollow Concrete Blocks",
      hi: "हॉलो कंक्रीट ब्लॉक"
    },
    category: "bricks-blocks",
    subcategory: {
      en: "Blocks",
      hi: "ब्लॉक"
    },
    description: {
      en: "Concrete blocks with hollow cores, lighter than solid blocks, used for boundary walls, sheds and partition walls.",
      hi: "खोखले हिस्से वाले कंक्रीट ब्लॉक, जो सॉलिड ब्लॉक से हल्के होते हैं और बाउंड्री वॉल, शेड और पार्टीशन में लगते हैं।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: false,
    keywords: [
      "hollow block",
      "हॉलो ब्लॉक",
      "khokhla block",
      "ब्लॉक"
    ],
    image: "/images/products/hollow-concrete-blocks.jpg"
  },
  {
    id: "p-210",
    slug: "badarpur-sand",
    name: {
      en: "Badarpur (Coarse) Sand",
      hi: "बदरपुर (मोटी रेत)"
    },
    category: "sand-aggregates",
    subcategory: {
      en: "Sand",
      hi: "रेत"
    },
    description: {
      en: "Coarse crushed-stone sand widely used in North India for concrete, RCC and masonry mortar.",
      hi: "मोटी पिसी पत्थर की रेत, जो उत्तर भारत में कंक्रीट, RCC और चिनाई के मसाले में खूब इस्तेमाल होती है।"
    },
    unit: {
      en: "Per cubic ft / trolley",
      hi: "प्रति घन फ़ुट / ट्रॉली"
    },
    featured: false,
    available: true,
    keywords: [
      "badarpur",
      "बदरपुर",
      "moti ret",
      "मोटी रेत",
      "bajri",
      "बजरी"
    ],
    image: "/images/products/badarpur-sand.jpg"
  },
  {
    id: "p-211",
    slug: "m-sand",
    name: {
      en: "M-Sand (Manufactured Sand)",
      hi: "M-सैंड (मैन्युफ़ैक्चर्ड रेत)"
    },
    category: "sand-aggregates",
    subcategory: {
      en: "Sand",
      hi: "रेत"
    },
    description: {
      en: "Sand produced by crushing hard stone and grading it, used as an alternative to river sand in concrete and plaster.",
      hi: "सख़्त पत्थर को पीसकर और छानकर बनी रेत, जो कंक्रीट और प्लास्टर में नदी की रेत के विकल्प के रूप में इस्तेमाल होती है।"
    },
    unit: {
      en: "Per cubic ft / trolley",
      hi: "प्रति घन फ़ुट / ट्रॉली"
    },
    featured: false,
    available: false,
    keywords: [
      "m sand",
      "msand",
      "एम सैंड",
      "crusher sand",
      "रेत"
    ],
    image: "/images/products/m-sand.jpg"
  },
  {
    id: "p-212",
    slug: "stone-dust",
    name: {
      en: "Stone Dust (Crusher Dust)",
      hi: "स्टोन डस्ट (पत्थर का चूरा)"
    },
    category: "sand-aggregates",
    subcategory: {
      en: "Aggregates",
      hi: "गिट्टी"
    },
    description: {
      en: "Fine powder and grit left from stone crushing, used for filling, levelling, bedding under pavers and in block making.",
      hi: "पत्थर पिसाई से निकला बारीक चूरा, जो भराई, लेवलिंग, पेवर के नीचे बिछाने और ब्लॉक बनाने में इस्तेमाल होता है।"
    },
    unit: {
      en: "Per cubic ft / trolley",
      hi: "प्रति घन फ़ुट / ट्रॉली"
    },
    featured: false,
    available: true,
    keywords: [
      "stone dust",
      "डस्ट",
      "crusher dust",
      "चूरा",
      "gitti dust"
    ],
    image: "/images/products/stone-dust.jpg"
  },
  {
    id: "p-213",
    slug: "stone-aggregate-10mm",
    name: {
      en: "Stone Aggregate 10 mm",
      hi: "गिट्टी 10 मिमी"
    },
    category: "sand-aggregates",
    subcategory: {
      en: "Aggregates",
      hi: "गिट्टी"
    },
    description: {
      en: "Small crushed-stone aggregate for thin slabs, lintels, precast work and mixing with 20 mm aggregate in RCC.",
      hi: "छोटी पिसी गिट्टी, जो पतले स्लैब, लिंटर, प्रीकास्ट काम और RCC में 20 मिमी गिट्टी के साथ मिलाने में लगती है।"
    },
    unit: {
      en: "Per cubic ft / trolley",
      hi: "प्रति घन फ़ुट / ट्रॉली"
    },
    featured: false,
    available: true,
    keywords: [
      "gitti",
      "गिट्टी",
      "10mm",
      "rodi",
      "रोड़ी",
      "chhoti gitti"
    ],
    image: "/images/products/stone-aggregate-10mm.jpg"
  },
  {
    id: "p-214",
    slug: "stone-aggregate-40mm",
    name: {
      en: "Stone Aggregate 40 mm",
      hi: "गिट्टी 40 मिमी"
    },
    category: "sand-aggregates",
    subcategory: {
      en: "Aggregates",
      hi: "गिट्टी"
    },
    description: {
      en: "Large crushed-stone aggregate used in PCC below foundations and floors, soling, and road base work.",
      hi: "बड़ी पिसी गिट्टी, जो नींव और फ़र्श के नीचे PCC, सोलिंग और सड़क के बेस में इस्तेमाल होती है।"
    },
    unit: {
      en: "Per cubic ft / trolley",
      hi: "प्रति घन फ़ुट / ट्रॉली"
    },
    featured: false,
    available: true,
    keywords: [
      "gitti",
      "गिट्टी",
      "40mm",
      "moti gitti",
      "मोटी गिट्टी",
      "rodi",
      "रोड़ी"
    ],
    image: "/images/products/stone-aggregate-40mm.jpg"
  },
  {
    id: "p-215",
    slug: "curing-compound",
    name: {
      en: "Concrete Curing Compound",
      hi: "कंक्रीट क्योरिंग कंपाउंड"
    },
    category: "construction-chemicals",
    description: {
      en: "Liquid sprayed or brushed on fresh concrete to form a film that holds moisture, useful where water curing is difficult.",
      hi: "ताज़ा कंक्रीट पर छिड़का या लगाया जाने वाला तरल, जो नमी रोकने वाली परत बनाता है; जहाँ पानी से तराई कठिन हो वहाँ उपयोगी।"
    },
    unit: {
      en: "Per can",
      hi: "प्रति डिब्बा"
    },
    featured: false,
    available: false,
    keywords: [
      "curing",
      "क्योरिंग",
      "tarai",
      "तराई",
      "curing compound"
    ],
    image: "/images/products/curing-compound.jpg"
  },
  {
    id: "p-216",
    slug: "concrete-plasticiser",
    name: {
      en: "Concrete Plasticiser (Admixture)",
      hi: "कंक्रीट प्लास्टिसाइज़र (एडमिक्सचर)"
    },
    category: "construction-chemicals",
    description: {
      en: "Water-reducing admixture that improves workability of concrete and mortar at a lower water-cement ratio. Follow the manufacturer's dosage.",
      hi: "पानी कम करने वाला एडमिक्सचर, जो कम पानी में कंक्रीट और मसाले को काम लायक बनाता है। निर्माता की बताई मात्रा ही डालें।"
    },
    unit: {
      en: "Per can",
      hi: "प्रति डिब्बा"
    },
    featured: false,
    available: true,
    keywords: [
      "plasticizer",
      "प्लास्टिसाइज़र",
      "admixture",
      "एडमिक्सचर",
      "superplasticiser"
    ],
    image: "/images/products/concrete-plasticiser.jpg"
  },
  {
    id: "p-217",
    slug: "bathroom-waterproof-coating",
    name: {
      en: "Cementitious Waterproof Coating",
      hi: "सीमेंट आधारित वॉटरप्रूफ़ कोटिंग"
    },
    category: "waterproofing",
    description: {
      en: "Two-part polymer-cement coating brushed on bathroom floors, walls, balconies and water tanks before tiling or plaster.",
      hi: "दो भाग वाली पॉलिमर-सीमेंट कोटिंग, जो टाइल या प्लास्टर से पहले बाथरूम के फ़र्श, दीवार, बालकनी और पानी की टंकी पर ब्रश से लगाई जाती है।"
    },
    highlights: [
      {
        en: "Common uses: bathrooms, balconies, tanks",
        hi: "उपयोग: बाथरूम, बालकनी, टंकी"
      }
    ],
    unit: {
      en: "Per kit",
      hi: "प्रति किट"
    },
    featured: false,
    available: true,
    keywords: [
      "bathroom waterproofing",
      "बाथरूम वॉटरप्रूफ़िंग",
      "2k coating",
      "सीपेज",
      "seelan",
      "सीलन"
    ],
    image: "/images/products/bathroom-waterproof-coating.jpg"
  },
  {
    id: "p-218",
    slug: "bitumen-compound",
    name: {
      en: "Bitumen (Tar) Compound",
      hi: "बिटुमिन (तारकोल / डामर)"
    },
    category: "waterproofing",
    description: {
      en: "Black bituminous material applied hot or as a cold compound to seal roof joints, foundation walls and damp-proof courses.",
      hi: "काला बिटुमिन पदार्थ, जो गरम करके या कोल्ड कंपाउंड के रूप में छत के जोड़, नींव की दीवार और DPC पर सीलन रोकने के लिए लगाया जाता है।"
    },
    unit: {
      en: "Per drum / kg",
      hi: "प्रति ड्रम / किलो"
    },
    featured: false,
    available: true,
    keywords: [
      "bitumen",
      "बिटुमिन",
      "tarcoal",
      "तारकोल",
      "damar",
      "डामर",
      "dpc"
    ],
    image: "/images/products/bitumen-compound.jpg"
  },
  {
    id: "p-219",
    slug: "block-jointing-mortar",
    name: {
      en: "Block Jointing Mortar",
      hi: "ब्लॉक जोड़ने का मसाला"
    },
    category: "adhesives",
    description: {
      en: "Ready polymer-modified mortar applied in thin joints to lay AAC and concrete blocks, replacing conventional sand-cement mortar.",
      hi: "तैयार पॉलिमर-मिश्रित मसाला, जो AAC और कंक्रीट ब्लॉक पतले जोड़ में चिनने के लिए पारंपरिक रेत-सीमेंट मसाले की जगह लगता है।"
    },
    highlights: [
      {
        en: "Used with AAC blocks",
        hi: "AAC ब्लॉक के साथ उपयोग"
      }
    ],
    unit: {
      en: "Bag (40 kg)",
      hi: "बोरी (40 किलो)"
    },
    featured: false,
    available: true,
    keywords: [
      "block adhesive",
      "ब्लॉक मसाला",
      "aac mortar",
      "jointing mortar"
    ],
    image: "/images/products/block-jointing-mortar.jpg"
  },
  {
    id: "p-220",
    slug: "phawda-shovel",
    name: {
      en: "Phawda (Spade) & Shovel",
      hi: "फावड़ा और बेलचा"
    },
    category: "tools",
    description: {
      en: "Steel spade and shovel for digging, mixing mortar and loading sand and aggregate.",
      hi: "खुदाई, मसाला मिलाने और रेत-गिट्टी भरने के लिए स्टील का फावड़ा और बेलचा।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "phawda",
      "फावड़ा",
      "shovel",
      "बेलचा",
      "belcha",
      "spade"
    ],
    image: "/images/products/phawda-shovel.jpg"
  },
  {
    id: "p-221",
    slug: "gainti-pickaxe",
    name: {
      en: "Gainti (Pickaxe)",
      hi: "गैंती"
    },
    category: "tools",
    description: {
      en: "Pickaxe for digging hard soil, foundations and breaking old floors or plaster.",
      hi: "सख़्त मिट्टी, नींव की खुदाई और पुराना फ़र्श या प्लास्टर तोड़ने के लिए गैंती।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "gainti",
      "गैंती",
      "pickaxe",
      "kudal",
      "कुदाल"
    ],
    image: "/images/products/gainti-pickaxe.jpg"
  },
  {
    id: "p-222",
    slug: "wheelbarrow",
    name: {
      en: "Wheelbarrow",
      hi: "हाथ ठेला (व्हीलबैरो)"
    },
    category: "tools",
    description: {
      en: "Single-wheel steel barrow for moving sand, aggregate, bricks and concrete around the site.",
      hi: "साइट पर रेत, गिट्टी, ईंट और कंक्रीट ढोने के लिए एक पहिये वाला स्टील ठेला।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: false,
    keywords: [
      "wheelbarrow",
      "ठेला",
      "hath gadi",
      "हाथ गाड़ी",
      "trolley"
    ],
    image: "/images/products/wheelbarrow.jpg"
  },
  {
    id: "p-223",
    slug: "mortar-tray",
    name: {
      en: "Mortar Mixing Tray (Parat)",
      hi: "मसाला परात"
    },
    category: "tools",
    description: {
      en: "Large shallow steel tray used at site to mix and hold small batches of cement mortar, plaster or tile adhesive.",
      hi: "बड़ी उथली लोहे की परात, जिसमें साइट पर थोड़ी मात्रा में सीमेंट मसाला, प्लास्टर या टाइल एडहेसिव मिलाया और रखा जाता है।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "parat",
      "परात",
      "masala tray",
      "mortar tray",
      "तगाड़ी"
    ],
    image: "/images/products/mortar-tray.jpg"
  },
  {
    id: "p-224",
    slug: "ceramic-wall-tiles",
    name: {
      en: "Ceramic Wall Tiles",
      hi: "सिरेमिक वॉल टाइल"
    },
    category: "tiles-flooring",
    subcategory: {
      en: "Wall Tiles",
      hi: "वॉल टाइल"
    },
    description: {
      en: "Glazed ceramic tiles for bathroom and kitchen walls, available in plain, highlighter and matching concept designs.",
      hi: "बाथरूम और किचन की दीवार के लिए ग्लेज़्ड सिरेमिक टाइल, सादे, हाइलाइटर और मैचिंग कॉन्सेप्ट डिज़ाइन में।"
    },
    highlights: [
      {
        en: "Common size: 12 x 18 inch",
        hi: "आम साइज़: 12 x 18 इंच"
      }
    ],
    unit: {
      en: "Per box",
      hi: "प्रति डिब्बा"
    },
    featured: false,
    available: true,
    keywords: [
      "wall tile",
      "दीवार टाइल",
      "bathroom tiles",
      "kitchen tiles",
      "टाइल"
    ],
    image: "/images/products/ceramic-wall-tiles.jpg"
  },
  {
    id: "p-225",
    slug: "parking-tiles",
    name: {
      en: "Parking Tiles",
      hi: "पार्किंग टाइल"
    },
    category: "tiles-flooring",
    subcategory: {
      en: "Outdoor Tiles",
      hi: "आउटडोर टाइल"
    },
    description: {
      en: "Thick heavy-duty tiles with textured surfaces for car parking, driveways, porches and outdoor areas.",
      hi: "कार पार्किंग, ड्राइववे, पोर्च और बाहरी जगहों के लिए खुरदरी सतह वाली मोटी मज़बूत टाइल।"
    },
    unit: {
      en: "Per box",
      hi: "प्रति डिब्बा"
    },
    featured: false,
    available: true,
    keywords: [
      "parking tile",
      "पार्किंग टाइल",
      "outdoor tiles",
      "heavy tiles"
    ],
    image: "/images/products/parking-tiles.jpg"
  },
  {
    id: "p-226",
    slug: "anti-skid-tiles",
    name: {
      en: "Anti-Skid Floor Tiles",
      hi: "एंटी-स्किड टाइल"
    },
    category: "tiles-flooring",
    subcategory: {
      en: "Floor Tiles",
      hi: "फ़्लोर टाइल"
    },
    description: {
      en: "Matt-textured floor tiles that reduce slipping, suited to bathrooms, balconies, ramps and stairs.",
      hi: "फिसलन कम करने वाली मैट सतह की फ़र्श टाइल, बाथरूम, बालकनी, रैंप और सीढ़ियों के लिए।"
    },
    unit: {
      en: "Per box",
      hi: "प्रति डिब्बा"
    },
    featured: false,
    available: true,
    keywords: [
      "anti skid",
      "एंटी स्किड",
      "matt tiles",
      "bathroom floor tiles",
      "न फिसलने वाली टाइल"
    ],
    image: "/images/products/anti-skid-tiles.jpg"
  },
  {
    id: "p-227",
    slug: "tile-spacers",
    name: {
      en: "Tile Spacers & Levelling Clips",
      hi: "टाइल स्पेसर और लेवलिंग क्लिप"
    },
    category: "tiles-flooring",
    subcategory: {
      en: "Accessories",
      hi: "एक्सेसरीज़"
    },
    description: {
      en: "Plastic spacers and levelling clips that keep uniform joint gaps and an even surface while laying tiles.",
      hi: "प्लास्टिक स्पेसर और लेवलिंग क्लिप, जो टाइल लगाते समय जोड़ बराबर और सतह समतल रखते हैं।"
    },
    highlights: [
      {
        en: "Common gaps: 2, 3, 5 mm",
        hi: "आम गैप: 2, 3, 5 मिमी"
      }
    ],
    unit: {
      en: "Per packet",
      hi: "प्रति पैकेट"
    },
    featured: false,
    available: true,
    keywords: [
      "spacer",
      "स्पेसर",
      "tile clip",
      "levelling",
      "टाइल क्लिप"
    ],
    image: "/images/products/tile-spacers.jpg"
  },
  {
    id: "p-228",
    slug: "marble",
    name: {
      en: "Marble",
      hi: "मार्बल (संगमरमर)"
    },
    category: "stone-marble",
    description: {
      en: "Natural marble slabs and tiles for floors, stairs, temples and wall cladding, in white and coloured varieties.",
      hi: "फ़र्श, सीढ़ी, मंदिर और दीवार के लिए प्राकृतिक मार्बल स्लैब और टाइल, सफ़ेद और रंगीन किस्मों में।"
    },
    highlights: [
      {
        en: "Slabs and cut-to-size tiles",
        hi: "स्लैब और साइज़ में कटी टाइल"
      }
    ],
    unit: {
      en: "Per sq ft",
      hi: "प्रति वर्ग फ़ुट"
    },
    featured: false,
    available: false,
    keywords: [
      "marble",
      "मार्बल",
      "sangmarmar",
      "संगमरमर",
      "makrana"
    ],
    image: "/images/products/marble.jpg"
  },
  {
    id: "p-229",
    slug: "granite",
    name: {
      en: "Granite",
      hi: "ग्रेनाइट"
    },
    category: "stone-marble",
    description: {
      en: "Hard natural granite slabs for kitchen counters, stairs, door frames and flooring, in polished finish.",
      hi: "किचन काउंटर, सीढ़ी, चौखट और फ़र्श के लिए पॉलिश फ़िनिश में सख़्त प्राकृतिक ग्रेनाइट स्लैब।"
    },
    highlights: [
      {
        en: "Common uses: kitchen top, stairs, sills",
        hi: "उपयोग: किचन टॉप, सीढ़ी, खिड़की की पट्टी"
      }
    ],
    unit: {
      en: "Per sq ft",
      hi: "प्रति वर्ग फ़ुट"
    },
    featured: false,
    available: false,
    keywords: [
      "granite",
      "ग्रेनाइट",
      "kitchen slab",
      "किचन स्लैब",
      "patthar"
    ],
    image: "/images/products/granite.jpg"
  },
  {
    id: "p-230",
    slug: "red-sandstone",
    name: {
      en: "Red Sandstone (Lal Patthar)",
      hi: "लाल पत्थर (सैंडस्टोन)"
    },
    category: "stone-marble",
    description: {
      en: "Natural red and pink sandstone slabs for flooring, stairs, boundary walls, jaali and elevation work.",
      hi: "फ़र्श, सीढ़ी, बाउंड्री, जाली और एलिवेशन के काम के लिए प्राकृतिक लाल और गुलाबी सैंडस्टोन।"
    },
    unit: {
      en: "Per sq ft",
      hi: "प्रति वर्ग फ़ुट"
    },
    featured: false,
    available: true,
    keywords: [
      "lal patthar",
      "लाल पत्थर",
      "sandstone",
      "dholpur stone",
      "धौलपुर पत्थर",
      "bansi paharpur"
    ],
    image: "/images/products/red-sandstone.jpg"
  },
  {
    id: "p-231",
    slug: "interlocking-pavers",
    name: {
      en: "Interlocking Paver Blocks",
      hi: "इंटरलॉकिंग पेवर ब्लॉक"
    },
    category: "precast",
    description: {
      en: "Precast concrete paver blocks that lock together, used for driveways, courtyards, footpaths and parking areas.",
      hi: "आपस में फँसने वाले प्रीकास्ट कंक्रीट पेवर ब्लॉक, जो ड्राइववे, आँगन, फ़ुटपाथ और पार्किंग में बिछते हैं।"
    },
    highlights: [
      {
        en: "Common thickness: 60 and 80 mm",
        hi: "आम मोटाई: 60 और 80 मिमी"
      }
    ],
    unit: {
      en: "Per sq ft",
      hi: "प्रति वर्ग फ़ुट"
    },
    featured: false,
    available: true,
    keywords: [
      "paver",
      "पेवर",
      "interlocking",
      "इंटरलॉकिंग",
      "tiles bahar ki",
      "zigzag"
    ],
    image: "/images/products/interlocking-pavers.jpg"
  },
  {
    id: "p-232",
    slug: "kerb-stones",
    name: {
      en: "Kerb Stones",
      hi: "कर्ब स्टोन"
    },
    category: "precast",
    description: {
      en: "Precast concrete edge blocks placed along paver areas, roads and garden beds to hold the edges.",
      hi: "पेवर, सड़क और बगीचे के किनारे लगने वाले प्रीकास्ट कंक्रीट ब्लॉक, जो किनारा थामे रखते हैं।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: false,
    keywords: [
      "kerb",
      "कर्ब",
      "curb stone",
      "kinara patthar"
    ],
    image: "/images/products/kerb-stones.jpg"
  },
  {
    id: "p-233",
    slug: "concrete-cover-blocks",
    name: {
      en: "Concrete Cover Blocks",
      hi: "कंक्रीट कवर ब्लॉक"
    },
    category: "precast",
    description: {
      en: "Small concrete spacers placed under and beside reinforcement bars to keep the required concrete cover in slabs, beams and columns.",
      hi: "सरिया के नीचे और बगल में रखे जाने वाले छोटे कंक्रीट स्पेसर, जो स्लैब, बीम और कॉलम में ज़रूरी कवर बनाए रखते हैं।"
    },
    highlights: [
      {
        en: "Common cover: 20, 25, 40 mm",
        hi: "आम कवर: 20, 25, 40 मिमी"
      }
    ],
    unit: {
      en: "Per packet / piece",
      hi: "प्रति पैकेट / पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "cover block",
      "कवर ब्लॉक",
      "gutka",
      "गुटका",
      "spacer"
    ],
    image: "/images/products/concrete-cover-blocks.jpg"
  },
  {
    id: "p-234",
    slug: "polycarbonate-sheets",
    name: {
      en: "Polycarbonate Sheets",
      hi: "पॉलीकार्बोनेट शीट"
    },
    category: "roofing",
    description: {
      en: "Translucent polycarbonate sheets for skylights, verandas, balcony covers and car-parking sheds.",
      hi: "रोशनदान, बरामदे, बालकनी कवर और कार पार्किंग शेड के लिए पारदर्शी पॉलीकार्बोनेट शीट।"
    },
    unit: {
      en: "Per sheet",
      hi: "प्रति शीट"
    },
    featured: false,
    available: false,
    keywords: [
      "polycarbonate",
      "पॉलीकार्बोनेट",
      "transparent sheet",
      "पारदर्शी शीट",
      "fiber sheet"
    ],
    image: "/images/products/polycarbonate-sheets.jpg"
  },
  {
    id: "p-235",
    slug: "turbo-ventilator",
    name: {
      en: "Turbo Ventilator",
      hi: "टर्बो वेंटिलेटर"
    },
    category: "roofing",
    description: {
      en: "Wind-driven roof ventilator that pulls hot air out of sheds, godowns and factory roofs without electricity.",
      hi: "हवा से घूमने वाला छत वेंटिलेटर, जो बिना बिजली के शेड, गोदाम और फ़ैक्ट्री से गर्म हवा बाहर निकालता है।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: false,
    keywords: [
      "turbo",
      "टर्बो",
      "air ventilator",
      "roof fan",
      "एग्ज़ॉस्ट"
    ],
    image: "/images/products/turbo-ventilator.jpg"
  },
  {
    id: "p-236",
    slug: "block-board",
    name: {
      en: "Block Board",
      hi: "ब्लॉक बोर्ड"
    },
    category: "plywood-boards",
    description: {
      en: "Board with a core of wooden strips between veneers, used for doors, long shelves, beds and wardrobes.",
      hi: "विनियर के बीच लकड़ी की पट्टियों वाला बोर्ड, जो दरवाज़े, लंबे शेल्फ़, बेड और अलमारी में लगता है।"
    },
    highlights: [
      {
        en: "Common thickness: 19 and 25 mm",
        hi: "आम मोटाई: 19 और 25 मिमी"
      }
    ],
    unit: {
      en: "Per sheet (8 x 4 ft)",
      hi: "प्रति शीट (8 x 4 फ़ुट)"
    },
    featured: false,
    available: true,
    keywords: [
      "block board",
      "ब्लॉक बोर्ड",
      "board",
      "बोर्ड"
    ],
    image: "/images/products/block-board.jpg"
  },
  {
    id: "p-237",
    slug: "mdf-board",
    name: {
      en: "MDF Board",
      hi: "MDF बोर्ड"
    },
    category: "plywood-boards",
    description: {
      en: "Medium-density fibreboard with a smooth surface, used for interior furniture, panelling and cabinet shutters.",
      hi: "चिकनी सतह वाला मीडियम-डेंसिटी फ़ाइबरबोर्ड, जो अंदर के फ़र्नीचर, पैनलिंग और कैबिनेट शटर में लगता है।"
    },
    unit: {
      en: "Per sheet (8 x 4 ft)",
      hi: "प्रति शीट (8 x 4 फ़ुट)"
    },
    featured: false,
    available: false,
    keywords: [
      "mdf",
      "एमडीएफ",
      "hdhmr",
      "fibre board",
      "बोर्ड"
    ],
    image: "/images/products/mdf-board.jpg"
  },
  {
    id: "p-238",
    slug: "decorative-laminates",
    name: {
      en: "Decorative Laminates (Sunmica)",
      hi: "डेकोरेटिव लैमिनेट (सनमाइका)"
    },
    category: "plywood-boards",
    description: {
      en: "Thin decorative sheets pasted on plywood and boards to give furniture a finished, wipeable surface.",
      hi: "प्लाईवुड और बोर्ड पर चिपकाई जाने वाली पतली सजावटी शीट, जो फ़र्नीचर को तैयार और पोंछने लायक सतह देती है।"
    },
    highlights: [
      {
        en: "Common thickness: 0.8 and 1 mm",
        hi: "आम मोटाई: 0.8 और 1 मिमी"
      }
    ],
    unit: {
      en: "Per sheet (8 x 4 ft)",
      hi: "प्रति शीट (8 x 4 फ़ुट)"
    },
    featured: false,
    available: true,
    keywords: [
      "sunmica",
      "सनमाइका",
      "laminate",
      "लैमिनेट",
      "formica"
    ],
    image: "/images/products/decorative-laminates.jpg"
  },
  {
    id: "p-239",
    slug: "flush-doors",
    name: {
      en: "Flush Doors",
      hi: "फ़्लश दरवाज़े"
    },
    category: "doors-windows",
    description: {
      en: "Flat-faced wooden doors with a solid core, used as room and main doors; can be laminated, polished or painted.",
      hi: "ठोस कोर वाले सपाट लकड़ी के दरवाज़े, जो कमरे और मुख्य दरवाज़े में लगते हैं; इन पर लैमिनेट, पॉलिश या पेंट हो सकता है।"
    },
    highlights: [
      {
        en: "Common thickness: 30 and 32 mm",
        hi: "आम मोटाई: 30 और 32 मिमी"
      }
    ],
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: false,
    keywords: [
      "flush door",
      "फ़्लश डोर",
      "darwaza",
      "दरवाज़ा",
      "gate"
    ],
    image: "/images/products/flush-doors.jpg"
  },
  {
    id: "p-240",
    slug: "pvc-doors",
    name: {
      en: "PVC Bathroom Doors",
      hi: "PVC बाथरूम दरवाज़े"
    },
    category: "doors-windows",
    description: {
      en: "Water-resistant PVC doors and frames suited to bathrooms, toilets and utility areas.",
      hi: "पानी से ख़राब न होने वाले PVC दरवाज़े और चौखट, जो बाथरूम, शौचालय और यूटिलिटी में लगते हैं।"
    },
    unit: {
      en: "Per piece",
      hi: "प्रति पीस"
    },
    featured: false,
    available: true,
    keywords: [
      "pvc door",
      "पीवीसी दरवाज़ा",
      "bathroom door",
      "बाथरूम गेट",
      "plastic door"
    ],
    image: "/images/products/pvc-doors.jpg"
  },
  {
    id: "p-241",
    slug: "upvc-windows",
    name: {
      en: "UPVC Windows",
      hi: "UPVC खिड़कियाँ"
    },
    category: "doors-windows",
    description: {
      en: "Made-to-measure UPVC sliding and casement windows with glass, prepared to the opening size.",
      hi: "खिड़की की नाप के हिसाब से बनी कांच वाली UPVC स्लाइडिंग और खुलने वाली खिड़कियाँ।"
    },
    highlights: [
      {
        en: "Made to site measurement",
        hi: "साइट की नाप से तैयार"
      }
    ],
    unit: {
      en: "Per sq ft",
      hi: "प्रति वर्ग फ़ुट"
    },
    featured: false,
    available: false,
    keywords: [
      "upvc window",
      "यूपीवीसी खिड़की",
      "sliding window",
      "khidki",
      "खिड़की"
    ],
    image: "/images/products/upvc-windows.jpg"
  },
  {
    id: "p-242",
    slug: "plaster-of-paris",
    name: {
      en: "Plaster of Paris (POP)",
      hi: "प्लास्टर ऑफ़ पेरिस (POP)"
    },
    category: "gypsum-pop",
    description: {
      en: "Quick-setting white gypsum powder used for smooth wall finishing, cornices, false-ceiling joints and repair work.",
      hi: "जल्दी जमने वाला सफ़ेद जिप्सम पाउडर, जो चिकनी दीवार, कॉर्निस, फ़ॉल्स-सीलिंग जोड़ और मरम्मत में लगता है।"
    },
    unit: {
      en: "Bag (20/25 kg)",
      hi: "बोरी (20/25 किलो)"
    },
    featured: false,
    available: true,
    keywords: [
      "pop",
      "पीओपी",
      "plaster of paris",
      "प्लास्टर",
      "chuna"
    ],
    image: "/images/products/plaster-of-paris.jpg"
  },
  {
    id: "p-243",
    slug: "gypsum-plaster",
    name: {
      en: "Gypsum Plaster",
      hi: "जिप्सम प्लास्टर"
    },
    category: "gypsum-pop",
    description: {
      en: "Ready gypsum-based plaster applied directly on brick or block walls for a smooth interior finish without separate sand-cement plaster.",
      hi: "तैयार जिप्सम प्लास्टर, जो ईंट या ब्लॉक की दीवार पर सीधा लगाकर अंदर की चिकनी फ़िनिश देता है, अलग सीमेंट प्लास्टर की ज़रूरत नहीं।"
    },
    highlights: [
      {
        en: "For interior walls only",
        hi: "सिर्फ़ अंदर की दीवारों के लिए"
      }
    ],
    unit: {
      en: "Bag (25 kg)",
      hi: "बोरी (25 किलो)"
    },
    featured: false,
    available: true,
    keywords: [
      "gypsum",
      "जिप्सम",
      "gypsum plaster",
      "जिप्सम प्लास्टर"
    ],
    image: "/images/products/gypsum-plaster.jpg"
  },
  {
    id: "p-244",
    slug: "gypsum-board",
    name: {
      en: "Gypsum Board (False Ceiling)",
      hi: "जिप्सम बोर्ड (फ़ॉल्स सीलिंग)"
    },
    category: "gypsum-pop",
    description: {
      en: "Gypsum boards fixed on a GI framework to make false ceilings and dry partition walls.",
      hi: "GI फ़्रेम पर लगाए जाने वाले जिप्सम बोर्ड, जिनसे फ़ॉल्स सीलिंग और ड्राई पार्टीशन बनते हैं।"
    },
    highlights: [
      {
        en: "Common size: 6 x 4 ft",
        hi: "आम साइज़: 6 x 4 फ़ुट"
      }
    ],
    unit: {
      en: "Per board",
      hi: "प्रति बोर्ड"
    },
    featured: false,
    available: false,
    keywords: [
      "gypsum board",
      "जिप्सम बोर्ड",
      "false ceiling",
      "फ़ॉल्स सीलिंग",
      "drywall"
    ],
    image: "/images/products/gypsum-board.jpg"
  },
];
