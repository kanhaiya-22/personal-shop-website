import { Blocks } from "lucide-react";
import type { Metadata } from "next";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { orbits } from "@/data/orbits";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { t } from "@/i18n";
import { findBrand, findCategory } from "@/lib/catalog";
import { getContactInfo } from "@/lib/contact";
import { getContent, toPublicSettings, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.building.title,
  description: t.building.subtitle,
  alternates: { canonical: "/building-materials" },
};
}

export default async function BuildingMaterialsPage() {
  const content = await getContent();
  const { products, categories, brands } = content;
  const cats = categories.filter((c) => c.group === "building");
  const featured = products.filter((p) => cats.some((c) => c.slug === p.category) && p.featured).slice(0, 4);

  return (
    <>
      <PageHero icon={Blocks} tone="sage" aside={<IconOrbit items={orbits.building()} />} eyebrow={t.building.eyebrow} title={t.building.title} subtitle={t.building.subtitle} crumbs={[{ label: t.building.title }]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products?group=building" variant="gold">
            {t.categories.viewAllBuilding}
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-site">
          <SectionHeader title={t.categories.title} subtitle={t.building.pageIntro} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cats.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 50}>
                <CategoryCard category={c} count={products.filter((p) => p.category === c.slug).length} image={products.find((p) => p.category === c.slug && p.image)?.image} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section bg-gradient-to-b from-surface via-white to-surface">
          <div className="container-site">
            <SectionHeader title={t.featured.title} subtitle={t.featured.subtitle} />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} category={findCategory(categories, p.category)} brand={findBrand(brands, p.brand)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCTA contact={getContactInfo(toPublicSettings(content.settings))} />
    </>
  );
}
