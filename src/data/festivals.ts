import type { Festival } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  HINDU FESTIVAL CALENDAR — drives the automatic greeting posters
 * ─────────────────────────────────────────────────────────────
 *  Dates follow Drik Panchang (New Delhi), cross-checked with other
 *  panchangs. A poster appears automatically FESTIVAL_DAYS_BEFORE days
 *  before and stays FESTIVAL_DAYS_AFTER days after each date (see .env).
 *
 *  Before the last listed year ends, add the next year's dates, e.g.
 *    dates: { ..., "2029": "2029-11-05" }
 *  Festivals without a date for the current year are simply skipped.
 */
export const festivals: Festival[] = [
  {
    slug: "makar-sankranti",
    name: { en: "Makar Sankranti", hi: "मकर संक्रांति" },
    greeting: { en: "Happy Makar Sankranti", hi: "मकर संक्रांति की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May the rising sun bring warmth, prosperity and new beginnings to your home.",
      hi: "उगता सूरज आपके घर में गर्माहट, समृद्धि और नई शुरुआत लाए।",
    },
    motif: "kites",
    theme: { from: "#0E4C92", to: "#F59E0B", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-01-14", "2027": "2027-01-15", "2028": "2028-01-15" },
  },
  {
    slug: "vasant-panchami",
    name: { en: "Vasant Panchami", hi: "बसंत पंचमी" },
    greeting: { en: "Happy Vasant Panchami", hi: "बसंत पंचमी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Maa Saraswati bless you with wisdom, and spring fill your life with colour.",
      hi: "माँ सरस्वती आपको ज्ञान का आशीर्वाद दें और बसंत आपके जीवन को रंगों से भर दे।",
    },
    motif: "lotus",
    theme: { from: "#FACC15", to: "#EA580C", accent: "#FFFFFF", text: "#3B1D00" },
    dates: { "2026": "2026-01-23", "2027": "2027-02-11", "2028": "2028-01-31" },
  },
  {
    slug: "maha-shivratri",
    name: { en: "Maha Shivratri", hi: "महाशिवरात्रि" },
    greeting: { en: "Happy Maha Shivratri", hi: "महाशिवरात्रि की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May the blessings of Lord Shiva bring strength, peace and happiness to your family.",
      hi: "भगवान शिव का आशीर्वाद आपके परिवार में शक्ति, शांति और ख़ुशियाँ लाए।",
    },
    motif: "moon",
    theme: { from: "#0B1B3F", to: "#3B2A7A", accent: "#C7D2FE", text: "#FFFFFF" },
    dates: { "2026": "2026-02-15", "2027": "2027-03-06", "2028": "2028-02-23" },
  },
  {
    slug: "holi",
    name: { en: "Holi", hi: "होली" },
    greeting: { en: "Happy Holi", hi: "होली की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May the festival of colours fill your home with joy, love and bright new beginnings.",
      hi: "रंगों का यह त्योहार आपके घर को ख़ुशी, प्यार और नई उमंग से भर दे।",
    },
    motif: "splash",
    theme: { from: "#7C3AED", to: "#DB2777", accent: "#FDE047", text: "#FFFFFF" },
    dates: { "2026": "2026-03-04", "2027": "2027-03-22", "2028": "2028-03-11" },
  },
  {
    slug: "chaitra-navratri",
    name: { en: "Chaitra Navratri & Hindu New Year", hi: "चैत्र नवरात्रि एवं हिंदू नववर्ष" },
    greeting: { en: "Happy Hindu New Year & Navratri", hi: "हिंदू नववर्ष एवं नवरात्रि की शुभकामनाएँ" },
    message: {
      en: "May the new year and the blessings of Maa Durga bring health, success and prosperity.",
      hi: "नया वर्ष और माँ दुर्गा का आशीर्वाद आपको स्वास्थ्य, सफलता और समृद्धि दे।",
    },
    motif: "rangoli",
    theme: { from: "#B91C1C", to: "#F97316", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-03-19", "2027": "2027-04-07", "2028": "2028-03-27" },
  },
  {
    slug: "ram-navami",
    name: { en: "Ram Navami", hi: "राम नवमी" },
    greeting: { en: "Happy Ram Navami", hi: "राम नवमी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Lord Ram bless your family with righteousness, courage and happiness.",
      hi: "प्रभु श्रीराम आपके परिवार को धर्म, साहस और ख़ुशियों का आशीर्वाद दें।",
    },
    motif: "sun",
    theme: { from: "#C2410C", to: "#FBBF24", accent: "#FFF7ED", text: "#FFFFFF" },
    dates: { "2026": "2026-03-26", "2027": "2027-04-15", "2028": "2028-04-03" },
  },
  {
    slug: "hanuman-jayanti",
    name: { en: "Hanuman Jayanti", hi: "हनुमान जयंती" },
    greeting: { en: "Happy Hanuman Jayanti", hi: "हनुमान जयंती की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Bajrangbali bless you with strength, devotion and success in every task.",
      hi: "बजरंगबली आपको शक्ति, भक्ति और हर काम में सफलता का आशीर्वाद दें।",
    },
    motif: "sun",
    theme: { from: "#9A3412", to: "#EA580C", accent: "#FED7AA", text: "#FFFFFF" },
    dates: { "2026": "2026-04-02", "2027": "2027-04-20", "2028": "2028-04-09" },
  },
  {
    slug: "akshaya-tritiya",
    name: { en: "Akshaya Tritiya", hi: "अक्षय तृतीया" },
    greeting: { en: "Happy Akshaya Tritiya", hi: "अक्षय तृतीया की हार्दिक शुभकामनाएँ" },
    message: {
      en: "An auspicious day for new beginnings — may your home and work flourish always.",
      hi: "नई शुरुआत का शुभ दिन — आपका घर और काम सदा फलता-फूलता रहे।",
    },
    motif: "lotus",
    theme: { from: "#1F383F", to: "#B45309", accent: "#FCD34D", text: "#FFFFFF" },
    dates: { "2026": "2026-04-19", "2027": "2027-05-09", "2028": "2028-04-27" },
  },
  {
    slug: "guru-purnima",
    name: { en: "Guru Purnima", hi: "गुरु पूर्णिमा" },
    greeting: { en: "Happy Guru Purnima", hi: "गुरु पूर्णिमा की हार्दिक शुभकामनाएँ" },
    message: {
      en: "With gratitude to every teacher and guide who shows us the right path.",
      hi: "हर उस गुरु को नमन, जो हमें सही राह दिखाते हैं।",
    },
    motif: "moon",
    theme: { from: "#1E3A8A", to: "#6D28D9", accent: "#FEF3C7", text: "#FFFFFF" },
    dates: { "2026": "2026-07-29", "2027": "2027-07-18", "2028": "2028-07-06" },
  },
  {
    slug: "raksha-bandhan",
    name: { en: "Raksha Bandhan", hi: "रक्षा बंधन" },
    greeting: { en: "Happy Raksha Bandhan", hi: "रक्षा बंधन की हार्दिक शुभकामनाएँ" },
    message: {
      en: "Celebrating the beautiful bond of love and protection between brothers and sisters.",
      hi: "भाई-बहन के प्यार और रक्षा के इस पवित्र बंधन की शुभकामनाएँ।",
    },
    motif: "rakhi",
    theme: { from: "#BE185D", to: "#F59E0B", accent: "#FEF08A", text: "#FFFFFF" },
    dates: { "2026": "2026-08-28", "2027": "2027-08-17", "2028": "2028-08-05" },
  },
  {
    slug: "janmashtami",
    name: { en: "Krishna Janmashtami", hi: "श्री कृष्ण जन्माष्टमी" },
    greeting: { en: "Happy Janmashtami", hi: "जन्माष्टमी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Shri Krishna fill your home with love, joy and prosperity.",
      hi: "श्री कृष्ण आपके घर को प्रेम, आनंद और समृद्धि से भर दें।",
    },
    motif: "feather",
    theme: { from: "#0B3B6F", to: "#0F766E", accent: "#FCD34D", text: "#FFFFFF" },
    dates: { "2026": "2026-09-04", "2027": "2027-08-25", "2028": "2028-08-13" },
  },
  {
    slug: "ganesh-chaturthi",
    name: { en: "Ganesh Chaturthi", hi: "गणेश चतुर्थी" },
    greeting: { en: "Happy Ganesh Chaturthi", hi: "गणेश चतुर्थी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Lord Ganesha remove every obstacle and bless all your new beginnings.",
      hi: "विघ्नहर्ता श्री गणेश आपकी हर बाधा दूर करें और हर नई शुरुआत को सफल बनाएं।",
    },
    motif: "lotus",
    theme: { from: "#C2410C", to: "#DC2626", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-09-14", "2027": "2027-09-04", "2028": "2028-08-23" },
  },
  {
    slug: "vishwakarma-puja",
    name: { en: "Vishwakarma Puja", hi: "विश्वकर्मा पूजा" },
    greeting: { en: "Happy Vishwakarma Puja", hi: "विश्वकर्मा पूजा की हार्दिक शुभकामनाएँ" },
    message: {
      en: "Saluting every craftsman, mason, engineer and builder — may your tools and work always prosper.",
      hi: "हर कारीगर, मिस्त्री, इंजीनियर और निर्माता को नमन — आपके औज़ार और काम सदा फलें-फूलें।",
    },
    motif: "gear",
    theme: { from: "#1F383F", to: "#1D4ED8", accent: "#F6B994", text: "#FFFFFF" },
    dates: { "2026": "2026-09-17", "2027": "2027-09-17", "2028": "2028-09-16" },
  },
  {
    slug: "sharad-navratri",
    name: { en: "Navratri", hi: "शारदीय नवरात्रि" },
    greeting: { en: "Happy Navratri", hi: "शारदीय नवरात्रि की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Maa Durga's nine forms bless your family with strength, health and happiness.",
      hi: "माँ दुर्गा के नौ रूप आपके परिवार को शक्ति, स्वास्थ्य और ख़ुशियों का आशीर्वाद दें।",
    },
    motif: "rangoli",
    theme: { from: "#991B1B", to: "#DB2777", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-10-11", "2027": "2027-09-30", "2028": "2028-09-19" },
  },
  {
    slug: "dussehra",
    name: { en: "Dussehra", hi: "दशहरा" },
    greeting: { en: "Happy Dussehra", hi: "विजयादशमी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May the victory of good over evil inspire strength and success in your life.",
      hi: "बुराई पर अच्छाई की यह जीत आपके जीवन में शक्ति और सफलता लाए।",
    },
    motif: "sun",
    theme: { from: "#7C2D12", to: "#EA580C", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-10-20", "2027": "2027-10-09", "2028": "2028-09-27" },
  },
  {
    slug: "karwa-chauth",
    name: { en: "Karwa Chauth", hi: "करवा चौथ" },
    greeting: { en: "Happy Karwa Chauth", hi: "करवा चौथ की हार्दिक शुभकामनाएँ" },
    message: {
      en: "Wishing love, togetherness and a lifetime of happiness to every couple.",
      hi: "हर जोड़े को प्यार, साथ और जीवन भर की ख़ुशियों की शुभकामनाएँ।",
    },
    motif: "moon",
    theme: { from: "#4C0519", to: "#9F1239", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-10-29", "2027": "2027-10-18", "2028": "2028-10-07" },
  },
  {
    slug: "dhanteras",
    name: { en: "Dhanteras", hi: "धनतेरस" },
    greeting: { en: "Happy Dhanteras", hi: "धनतेरस की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Maa Lakshmi and Lord Dhanvantari bless you with wealth and good health.",
      hi: "माँ लक्ष्मी और भगवान धन्वंतरि आपको धन और अच्छे स्वास्थ्य का आशीर्वाद दें।",
    },
    motif: "diya",
    theme: { from: "#422006", to: "#A16207", accent: "#FDE047", text: "#FFFFFF" },
    dates: { "2026": "2026-11-06", "2027": "2027-10-27", "2028": "2028-10-15" },
  },
  {
    slug: "diwali",
    name: { en: "Diwali", hi: "दीपावली" },
    greeting: { en: "Happy Diwali", hi: "दीपावली की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May the festival of lights brighten your home with happiness, prosperity and success.",
      hi: "दीपों का यह पर्व आपके घर को ख़ुशियों, समृद्धि और सफलता से रोशन करे।",
    },
    motif: "diya",
    theme: { from: "#0B1B3F", to: "#4C1D95", accent: "#F6B994", text: "#FFFFFF" },
    dates: { "2026": "2026-11-08", "2027": "2027-10-29", "2028": "2028-10-17" },
  },
  {
    slug: "govardhan-puja",
    name: { en: "Govardhan Puja", hi: "गोवर्धन पूजा" },
    greeting: { en: "Happy Govardhan Puja", hi: "गोवर्धन पूजा की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Shri Krishna protect and bless your family, just as He protected Gokul.",
      hi: "जैसे श्री कृष्ण ने गोकुल की रक्षा की, वैसे ही आपके परिवार की रक्षा करें।",
    },
    motif: "feather",
    theme: { from: "#14532D", to: "#0E7490", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-11-10", "2027": "2027-10-30", "2028": "2028-10-18" },
  },
  {
    slug: "bhai-dooj",
    name: { en: "Bhai Dooj", hi: "भाई दूज" },
    greeting: { en: "Happy Bhai Dooj", hi: "भाई दूज की हार्दिक शुभकामनाएँ" },
    message: {
      en: "Celebrating the special bond between brothers and sisters.",
      hi: "भाई-बहन के इस ख़ास रिश्ते की शुभकामनाएँ।",
    },
    motif: "rakhi",
    theme: { from: "#9D174D", to: "#C2410C", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-11-11", "2027": "2027-10-31", "2028": "2028-10-19" },
  },
  {
    slug: "chhath-puja",
    name: { en: "Chhath Puja", hi: "छठ पूजा" },
    greeting: { en: "Happy Chhath Puja", hi: "छठ पूजा की हार्दिक शुभकामनाएँ" },
    message: {
      en: "May Chhathi Maiya and Surya Dev bless your family with health and prosperity.",
      hi: "छठी मैया और सूर्य देव आपके परिवार को स्वास्थ्य और समृद्धि का आशीर्वाद दें।",
    },
    motif: "sun",
    theme: { from: "#7C2D12", to: "#F59E0B", accent: "#FFEDD5", text: "#FFFFFF" },
    dates: { "2026": "2026-11-15", "2027": "2027-11-04", "2028": "2028-10-23" },
  },
  {
    slug: "dev-uthani-ekadashi",
    name: { en: "Dev Uthani Ekadashi", hi: "देवउठनी एकादशी" },
    greeting: { en: "Happy Dev Uthani Ekadashi", hi: "देवउठनी एकादशी की हार्दिक शुभकामनाएँ" },
    message: {
      en: "The start of the auspicious season for new homes and new work — may all your plans succeed.",
      hi: "नए घर और नए कामों के शुभ समय की शुरुआत — आपकी हर योजना सफल हो।",
    },
    motif: "lotus",
    theme: { from: "#1F383F", to: "#0F766E", accent: "#FDE68A", text: "#FFFFFF" },
    dates: { "2026": "2026-11-20", "2027": "2027-11-10", "2028": "2028-10-28" },
  },
];
