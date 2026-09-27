/* SEED DATA — copied to storage on first start, then managed from the admin panel. */
import type { TeamMember } from "@/types";

/**
 * Family / team shown on the About page.
 * Add photos to /public/team/ and set `photo`, e.g. "/team/girish-kumar-agrawal.jpg".
 * `description` is optional — write it in your own words (English and Hindi).
 */
export const team: TeamMember[] = [
  {
    id: "girish-kumar-agrawal",
    name: "Girish Kumar Agrawal",
    role: { en: "Owner", hi: "मालिक" },
    description: {
      en: "Leads Shri Kanhaiya Traders and looks after customers personally.",
      hi: "श्री कन्हैया ट्रेडर्स का नेतृत्व करते हैं और ग्राहकों की व्यक्तिगत रूप से देखभाल करते हैं।",
    },
    photo: undefined,
  },
  {
    id: "deepak-mittal",
    name: "Deepak Mittal",
    role: { en: "Business Representative", hi: "व्यवसाय प्रतिनिधि" },
    description: {
      en: "Helps customers with product enquiries, availability and quotations.",
      hi: "प्रोडक्ट पूछताछ, उपलब्धता और कोटेशन में ग्राहकों की मदद करते हैं।",
    },
    photo: undefined,
  },
];
