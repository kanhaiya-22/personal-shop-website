import { LayoutGrid } from "lucide-react";
import type { Metadata } from "next";
import { ProductExplorer } from "@/components/catalog/ProductExplorer";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { orbits } from "@/data/orbits";
import { PageHero } from "@/components/ui/PageHero";
import { t, tx } from "@/i18n";
import { findCategory } from "@/lib/catalog";
import { getContent, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.nav.products,
  description: t.categories.subtitle,
  alternates: { canonical: "/products" },
};
}

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const { products, categories, brands } = await getContent();

  const categorySlug = one(sp.category);
  const category = findCategory(categories, categorySlug);
  // ?group=building|paints (older links used ?filter=…)
  const groupParam = one(sp.group) || one(sp.filter);
  const group = category ? category.group : groupParam === "paints" ? "paints" : "building";

  return (
    <>
      <PageHero icon={LayoutGrid} tone="sky" aside={<IconOrbit items={orbits.products()} />}
        eyebrow={t.categories.eyebrow}
        title={category ? tx(category.name) : group === "paints" ? t.nav.paints : t.nav.building}
        subtitle={category ? tx(category.description) : t.categories.subtitle}
        crumbs={[{ label: t.nav.products, href: "/products" }, ...(category ? [{ label: group === "paints" ? t.nav.paints : t.nav.building, href: `/products?group=${group}` }, { label: tx(category.name) }] : [{ label: group === "paints" ? t.nav.paints : t.nav.building }])]}
      />
      <section className="section pt-10 md:pt-12">
        <div className="container-site">
          <ProductExplorer
            key={`${categorySlug}-${group}`}
            catalog={{ products, categories, brands }}
            initial={{ q: one(sp.q), category: category?.slug, group }}
          />
        </div>
      </section>
    </>
  );
}
