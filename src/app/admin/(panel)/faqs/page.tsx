import type { Metadata } from "next";
import { CollectionPage } from "../CollectionPage";

export const metadata: Metadata = { title: "FAQs" };

export default function Page() {
  return <CollectionPage name="faqs" />;
}
