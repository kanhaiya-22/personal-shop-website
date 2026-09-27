import type { LocalizedText } from "@/types";

/** Educational paint buying guide shown on /paints. General guidance only. */
export const paintGuide: { id: string; icon: string; title: LocalizedText; points: LocalizedText[] }[] = [
  {
    id: "interior",
    icon: "interior",
    title: { en: "How to choose interior paint", hi: "इंटीरियर पेंट कैसे चुनें" },
    points: [
      { en: "Think about the room: kitchens and children's rooms benefit from washable finishes.", hi: "कमरे के हिसाब से सोचें: किचन और बच्चों के कमरे के लिए धुलने वाली फिनिश अच्छी रहती है।" },
      { en: "Emulsions generally give a better, longer-lasting finish than distemper; distemper is the economical choice.", hi: "इमल्शन आमतौर पर डिस्टेंपर से बेहतर और टिकाऊ फिनिश देता है; डिस्टेंपर किफ़ायती विकल्प है।" },
      { en: "Check shades in daylight and under your room lighting before deciding.", hi: "फ़ैसला करने से पहले रंग दिन की रोशनी और कमरे की लाइट दोनों में देखें।" },
    ],
  },
  {
    id: "exterior",
    icon: "exterior",
    title: { en: "How to choose exterior paint", hi: "एक्सटीरियर पेंट कैसे चुनें" },
    points: [
      { en: "Use paint made specifically for exteriors — outer walls face sun, rain and dust.", hi: "बाहरी दीवारों के लिए बना पेंट ही लगाएं — उन पर धूप, बारिश और धूल पड़ती है।" },
      { en: "Repair cracks and treat dampness before painting.", hi: "पेंट से पहले दरारें भरें और सीलन का इलाज करें।" },
      { en: "Avoid painting during rain or on a wet surface.", hi: "बारिश में या गीली सतह पर पेंट न करें।" },
    ],
  },
  {
    id: "primer",
    icon: "primer",
    title: { en: "Primer vs paint", hi: "प्राइमर और पेंट में अंतर" },
    points: [
      { en: "Primer prepares the surface so the paint sticks well and looks even.", hi: "प्राइमर सतह तैयार करता है ताकि पेंट अच्छे से चिपके और एक-सा दिखे।" },
      { en: "Use the right primer for the surface — wall, wood or metal each need a different type.", hi: "सतह के हिसाब से सही प्राइमर लगाएं — दीवार, लकड़ी और मेटल के लिए अलग प्राइमर होते हैं।" },
      { en: "Putty smooths the wall; primer is applied before the final coats.", hi: "पुट्टी दीवार चिकनी करती है; फ़ाइनल कोट से पहले प्राइमर लगाया जाता है।" },
    ],
  },
  {
    id: "finish",
    icon: "texture",
    title: { en: "Choosing finishes", hi: "फिनिश कैसे चुनें" },
    points: [
      { en: "Matt hides minor wall imperfections and gives a soft look.", hi: "मैट फिनिश दीवार की छोटी कमियां छुपाती है और सौम्य दिखती है।" },
      { en: "Satin / sheen finishes are easier to clean.", hi: "साटिन / शीन फिनिश साफ़ करना आसान होता है।" },
      { en: "Gloss is common for doors, windows and metal grills (enamel).", hi: "दरवाज़े, खिड़की और ग्रिल के लिए ग्लॉस (इनेमल) आम है।" },
    ],
  },
  {
    id: "estimate",
    icon: "estimate",
    title: { en: "Estimating paint requirements", hi: "कितना पेंट लगेगा — अनुमान" },
    points: [
      { en: "Measure wall area: (length + width) × 2 × height, minus doors and windows.", hi: "दीवार का क्षेत्रफल: (लंबाई + चौड़ाई) × 2 × ऊंचाई, दरवाज़े-खिड़की घटाकर।" },
      { en: "Check the coverage printed on the pack — it varies by product and surface.", hi: "पैक पर लिखा कवरेज देखें — यह प्रोडक्ट और सतह के हिसाब से बदलता है।" },
      { en: "Plan for the number of coats recommended. Share your measurements with us and we'll help estimate.", hi: "सुझाए गए कोट की संख्या के हिसाब से योजना बनाएं। हमें नाप बताएं, हम अनुमान लगाने में मदद करेंगे।" },
    ],
  },
  {
    id: "waterproofing",
    icon: "waterproofing",
    title: { en: "Waterproofing basics", hi: "वॉटरप्रूफिंग की बुनियादी बातें" },
    points: [
      { en: "Find the source of leakage first — roof, bathroom, plumbing or rising damp.", hi: "पहले रिसाव की वजह ढूंढें — छत, बाथरूम, प्लंबिंग या नीचे से आती सीलन।" },
      { en: "Surface preparation (cleaning, filling cracks) matters as much as the product.", hi: "सतह की तैयारी (सफ़ाई, दरार भरना) प्रोडक्ट जितनी ही ज़रूरी है।" },
      { en: "Follow the manufacturer's application method and curing time.", hi: "निर्माता का बताया तरीका और सूखने का समय ज़रूर मानें।" },
    ],
  },
];
