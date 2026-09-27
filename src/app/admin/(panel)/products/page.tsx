import type { Metadata } from "next";
import { CollectionPage } from "../CollectionPage";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return <CollectionPage name="products" />;
}
