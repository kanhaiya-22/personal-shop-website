import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/server/site-url";
import { getContent } from "@/server/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  const { products, categories, updatedAt } = await getContent();
  const lastModified = new Date(updatedAt);
  const pages = ["", "/products", "/building-materials", "/paints", "/brands", "/about", "/contact", "/faq", "/festivals", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, lastModified, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${base}/products?category=${c.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
