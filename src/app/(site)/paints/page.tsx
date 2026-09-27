import type { Metadata } from "next";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PaintGuide } from "@/components/sections/PaintGuide";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { t } from "@/i18n";
import { findBrand, findCategory } from "@/lib/catalog";
import { getContactInfo } from "@/lib/contact";
import { getContent, toPublicSettings, getSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return {
  title: t.nav.paints,
  description: t.paints.subtitle,
  alternates: { canonical: "/paints" },
};
}

const palette = ["#1F383F", "#4E8189", "#9CC2C5", "#A8C3A0", "#F3E3C3", "#F6B994", "#F09F72", "#E8A5A0", "#C9B8DD", "#D7E4EC", "#FBF6EF", "#E3D5C6"];

export default async function PaintsPage() {
  const content = await getContent();
  const { products, categories, brands } = content;
  const cats = categories.filter((c) => c.group === "paints");
  const featured = products.filter((p) => cats.some((c) => c.slug === p.category) && p.featured).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <div className="grid h-full grid-cols-3 gap-2 p-2">
            {palette.map((c, i) => (
              <span key={c} className="rounded-xl shadow-card motion-safe:animate-fade-up" style={{ background: c, animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="container-site relative py-12 md:py-20">
          <Breadcrumbs items={[{ label: t.nav.paints }]} />
          <div className="max-w-xl motion-safe:animate-fade-up">
            <p className="text-xs font-bold tracking-[0.14em] text-gold-700 uppercase">{t.paints.eyebrow}</p>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl xl:text-[3.25rem]">{t.paints.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.paints.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/products?group=paints" size="lg">
                {t.categories.viewAllPaints}
              </ButtonLink>
              <ButtonLink href="#guide-title" variant="outline" size="lg">
                {t.paints.guideEyebrow}
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 flex h-16 overflow-hidden rounded-2xl shadow-card lg:hidden">
            {palette.slice(0, 8).map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeader title={t.categories.paintsTab} subtitle={t.categories.subtitle} />
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

      <PaintGuide />
      <ContactCTA contact={getContactInfo(toPublicSettings(content.settings))} />
    </>
  );
}
