import type { Metadata } from "next";
import { CollectionPage } from "../CollectionPage";

export const metadata: Metadata = { title: "Reviews" };

export default function Page() {
  return <CollectionPage name="testimonials" />;
}
