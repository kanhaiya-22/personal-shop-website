"use client";

import { useRecent } from "./RecentProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { t } from "@/i18n";
import { type Catalog, findBrand, findCategory } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ catalog, excludeId }: { catalog: Catalog; excludeId?: string }) {
  const { recent, ready } = useRecent();
  if (!ready) return null;
  const items = recent
    .filter((id) => id !== excludeId)
    .map((id) => catalog.products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);
  if (!items.length) return null;
  return (
    <section aria-labelledby="recent-title" className="section border-t border-line pt-12 md:pt-16">
      <div className="container-site">
        <SectionHeader id="recent-title" title={t.product.recentlyViewed} className="mb-8" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} category={findCategory(catalog.categories, p.category)} brand={findBrand(catalog.brands, p.brand)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
