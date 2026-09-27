/* SEED DATA — copied to storage on first start, then managed from the admin panel. */
import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    id: "what-building-materials",
    question: { en: "What building materials do you sell?", hi: "आप कौन से बिल्डिंग मटेरियल बेचते हैं?" },
    answer: {
      en: "We deal in a wide range of building materials including cement, steel & TMT bars, bricks and blocks, sand and aggregates, construction chemicals, waterproofing, adhesives, tiles, roofing, plywood, tools and more. Browse the Building Materials section, and contact us for availability of any specific item.",
      hi: "हम सीमेंट, सरिया, ईंट और ब्लॉक, रेत और गिट्टी, कंस्ट्रक्शन केमिकल, वॉटरप्रूफिंग, एडहेसिव, टाइल्स, छत की शीट, प्लाईवुड, औज़ार और बहुत कुछ रखते हैं। बिल्डिंग मटेरियल सेक्शन देखें और किसी भी सामान की उपलब्धता के लिए हमसे संपर्क करें।",
    },
  },
  {
    id: "do-you-sell-paints",
    question: { en: "Do you sell paints?", hi: "क्या आप पेंट बेचते हैं?" },
    answer: {
      en: "Yes. We deal in interior and exterior paints, primers, putty, enamels, wood and metal finishes, waterproofing coatings, thinners and painting tools like brushes, rollers and tapes.",
      hi: "हाँ। हम इंटीरियर और एक्सटीरियर पेंट, प्राइमर, पुट्टी, इनेमल, लकड़ी और मेटल फिनिश, वॉटरप्रूफिंग कोटिंग, थिनर और ब्रश, रोलर, टेप जैसे पेंटिंग औज़ार रखते हैं।",
    },
  },
  {
    id: "not-listed",
    question: { en: "Can I enquire about a product that isn't listed?", hi: "क्या मैं ऐसे प्रोडक्ट के बारे में पूछ सकता हूँ जो सूची में नहीं है?" },
    answer: {
      en: "Absolutely. Our online catalogue shows only part of what we deal in. Send us a WhatsApp message or call with the product name, size or brand and we'll check availability for you.",
      hi: "बिल्कुल। ऑनलाइन कैटलॉग में हमारी रेंज का सिर्फ़ एक हिस्सा है। प्रोडक्ट का नाम, साइज़ या ब्रांड लिखकर व्हाट्सऐप भेजें या कॉल करें — हम उपलब्धता देखकर बताएंगे।",
    },
  },
  {
    id: "latest-price",
    question: { en: "How can I get the latest price?", hi: "ताज़ा दाम कैसे पता करें?" },
    answer: {
      en: "Prices of materials like cement, steel and paints change often, so we don't list prices online. Call us or send a WhatsApp message — we'll share the current rate for your quantity.",
      hi: "सीमेंट, सरिया और पेंट जैसे सामान के दाम अक्सर बदलते हैं, इसलिए हम ऑनलाइन दाम नहीं लिखते। कॉल करें या व्हाट्सऐप करें — हम आपकी मात्रा के लिए मौजूदा रेट बताएंगे।",
    },
  },
  {
    id: "whatsapp-order",
    question: { en: "Can I order materials through WhatsApp?", hi: "क्या मैं व्हाट्सऐप से सामान मंगा सकता हूँ?" },
    answer: {
      en: "Yes, you can send your requirement on WhatsApp. We'll confirm availability, price and other details with you before the order is finalised.",
      hi: "हाँ, आप अपनी ज़रूरत व्हाट्सऐप पर भेज सकते हैं। ऑर्डर पक्का करने से पहले हम उपलब्धता, दाम और बाकी जानकारी आपसे कन्फ़र्म करेंगे।",
    },
  },
  {
    id: "quotations",
    question: { en: "Do you provide quotations?", hi: "क्या आप कोटेशन देते हैं?" },
    answer: {
      en: "Yes. Send your list of materials and quantities on WhatsApp (or tell us on a call), and we'll prepare a quotation for you.",
      hi: "हाँ। व्हाट्सऐप पर अपने सामान और मात्रा की सूची भेजें (या कॉल पर बताएं), हम आपके लिए कोटेशन तैयार करेंगे।",
    },
  },
  {
    id: "contractors",
    question: { en: "Do you sell to contractors and builders?", hi: "क्या आप ठेकेदारों और बिल्डरों को सामान देते हैं?" },
    answer: {
      en: "Yes. We serve homeowners as well as contractors, builders, painters and other professionals. Contact us to discuss your project requirements.",
      hi: "हाँ। हम घर मालिकों के साथ-साथ ठेकेदारों, बिल्डरों, पेंटरों और अन्य प्रोफेशनल्स को सेवा देते हैं। अपने प्रोजेक्ट की ज़रूरत के बारे में हमसे बात करें।",
    },
  },
  {
    id: "how-to-contact",
    question: { en: "How can I contact Shri Kanhaiya Traders?", hi: "श्री कन्हैया ट्रेडर्स से संपर्क कैसे करें?" },
    answer: {
      en: "You can call us, send a WhatsApp message or email us. All contact details and our location are on the Contact page.",
      hi: "आप हमें कॉल, व्हाट्सऐप या ईमेल कर सकते हैं। सारी जानकारी और हमारी लोकेशन संपर्क पेज पर है।",
    },
  },
  {
    id: "location",
    question: { en: "Where is the shop located?", hi: "दुकान कहाँ है?" },
    answer: {
      en: "Our address and map are on the Contact page. You can also call or WhatsApp us for directions.",
      hi: "हमारा पता और मैप संपर्क पेज पर है। रास्ते के लिए आप हमें कॉल या व्हाट्सऐप भी कर सकते हैं।",
    },
  },
];
