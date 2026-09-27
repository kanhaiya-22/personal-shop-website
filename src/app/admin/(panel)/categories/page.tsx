import type { Metadata } from "next";
import { CollectionPage } from "../CollectionPage";

export const metadata: Metadata = { title: "Categories" };

export default function Page() {
  return <CollectionPage name="categories" />;
}
