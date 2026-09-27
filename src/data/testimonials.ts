/* SEED DATA — copied to storage on first start, then managed from Admin → Reviews. */
import type { Testimonial } from "@/types";

/**
 * Sample reviews (isSample: true) show how reviews look in the admin panel.
 * They are NEVER shown on the public site. Add genuine customer reviews
 * (with the customer's permission) from Admin → Reviews; the public site
 * shows a friendly "reviews coming soon" state until then.
 */
export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    customerName: "Sample: Ramesh Sharma",
    customerType: { en: "Contractor", hi: "ठेकेदार" },
    review: {
      en: "Got cement, TMT bars and bricks for a site from one place. Prices were shared quickly on WhatsApp.",
      hi: "एक ही जगह से साइट के लिए सीमेंट, सरिया और ईंट मिल गईं। दाम व्हाट्सऐप पर जल्दी बता दिए।",
    },
    rating: 5,
    date: "2026-08-12",
    isSample: true,
  },
  {
    id: "sample-2",
    customerName: "Sample: Sunita Verma",
    customerType: { en: "Homeowner", hi: "घर मालिक" },
    review: {
      en: "Helped us choose the right exterior paint and primer for our house. Very patient and helpful.",
      hi: "हमारे घर के लिए सही एक्सटीरियर पेंट और प्राइमर चुनने में मदद की। बहुत धैर्य से समझाया।",
    },
    rating: 5,
    date: "2026-07-03",
    isSample: true,
  },
];
