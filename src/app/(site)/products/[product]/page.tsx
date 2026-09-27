import { CircleCheck, Clock3, Info, MessageSquareQuote, PhoneCall, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/catalog/ProductActions";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductVisual } from "@/components/catalog/ProductVisual";
import { RecentlyViewed } from "@/components/catalog/RecentlyViewed";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { categoryGroups } from "@/data/categories";
import { shopName, t, tx } from "@/i18n";
import { findBrand, findCategory, relatedProducts } from "@/lib/catalog";
import { getContactInfo, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/server/site-url";
import { getContent, toPublicSettings } from "@/server/store";

export async function generateMetadata({ params }: PageProps<"/products/[product]">): Promise<Metadata> {
  const { product: slug } = await params;
  const { products } = await getContent();
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: t.notFound.title };
  const name = tx(product.name);
  return {
    title: name,
    description: tx(product.description).slice(0, 160),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${name} | ${shopName}`, description: tx(product.description), images: product.image ? [product.image] : undefined },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[product]">) {
  const { product: slug } = await params;
  const content = await getContent();
  const { products, categories, brands } = content;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const contact = getContactInfo(toPublicSettings(content.settings));
  const category = findCategory(categories, product.category);
  const brand = findBrand(brands, product.brand);
  const group = category ? categoryGroups[category.group] : undefined;
  const related = relatedProducts({ products, categories, brands }, product);
  const name = tx(product.name);
  const siteUrl = await getSiteUrl();

  const facts = [
    category && { icon: Tag, label: t.product.category, value: tx(category.name), href: `/products?category=${category.slug}` },
    product.subcategory && { icon: Info, label: t.product.subcategory, value: tx(product.subcategory) },
    { icon: CircleCheck, label: t.product.brand, value: brand?.name ?? t.product.brandAsk },
    product.unit && { icon: Clock3, label: t.product.unit, value: tx(product.unit) },
  ].filter(Boolean) as { icon: typeof Tag; label: string; value: string; href?: string }[];

  return (
    <>
      <div className="container-site pt-8">
        <Breadcrumbs
          items={[
            ...(group ? [{ label: tx(group.name), href: group.href }] : []),
            ...(category ? [{ label: tx(category.name), href: `/products?category=${category.slug}` }] : []),
            { label: name },
          ]}
        />
      </div>

      <section className="container-site grid gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductVisual
            image={product.image}
            alt={name}
            icon={category?.icon ?? "other"}
            group={category?.group ?? "building"}
            seed={product.id}
            label={category ? tx(category.name) : undefined}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="aspect-square rounded-3xl shadow-lift sm:aspect-[4/3.4]"
          />
        </div>

        <div className="motion-safe:animate-fade-up">
          <p className="text-sm font-bold tracking-[0.12em] text-gold-700 uppercase">{category ? tx(category.name) : t.nav.products}</p>
          <h1 className="mt-2 text-3xl leading-tight font-extrabold sm:text-4xl">{name}</h1>
          {brand && <p className="mt-2 text-lg font-medium text-navy-600">{brand.name}</p>}

          <p
            className={cn(
              "mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold",
              product.available ? "bg-emerald-50 text-emerald-800" : "bg-gold-50 text-gold-800",
            )}
          >
            <span aria-hidden="true" className={cn("size-2 rounded-full", product.available ? "bg-emerald-500" : "bg-gold-500")} />
            <span className="sr-only">{t.product.availability}: </span>
            {product.available ? t.product.available : t.product.onRequest}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted">{tx(product.description)}</p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                <f.icon className="mt-0.5 size-5 shrink-0 text-navy-500" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-bold tracking-wider text-muted uppercase">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold text-navy-900">
                    {f.href ? (
                      <Link href={f.href} className="underline-offset-4 hover:underline">
                        {f.value}
                      </Link>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold">{t.product.keyInfo}</h2>
              <ul className="mt-3 grid gap-2.5">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-ink">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {tx(h)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-navy-700 to-navy-950 p-5 text-white sm:p-6">
            <p className="flex items-start gap-2 text-sm text-navy-100">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
              {t.product.priceNote}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ButtonAnchor href={whatsappLink(contact.whatsappNumber, t.whatsappMsg.price(name))} external={contact.hasWhatsapp} variant="gold" size="lg" icon={<MessageSquareQuote className="size-5" aria-hidden="true" />}>
                {t.product.getLatestPrice}
              </ButtonAnchor>
              <ButtonAnchor href={whatsappLink(contact.whatsappNumber, t.whatsappMsg.product(name))} external={contact.hasWhatsapp} variant="whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />}>
                {t.product.enquireWhatsapp}
              </ButtonAnchor>
              {contact.hasPhone ? (
                <ButtonAnchor href={contact.phoneHref} variant="outlineLight" size="lg" icon={<PhoneCall className="size-5" aria-hidden="true" />}>
                  {t.nav.callNow}
                </ButtonAnchor>
              ) : (
                <ButtonAnchor href={whatsappLink(contact.whatsappNumber, t.whatsappMsg.availability(name))} external={contact.hasWhatsapp} variant="outlineLight" size="lg">
                  {t.product.checkAvailability}
                </ButtonAnchor>
              )}
            </div>
          </div>

          <div className="mt-6">
            <ProductActions productId={product.id} name={name} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section bg-gradient-to-b from-surface via-white to-surface">
          <div className="container-site">
            <h2 id="related-title" className="mb-8 text-2xl font-bold sm:text-3xl">
              {t.product.related}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} category={findCategory(categories, p.category)} brand={findBrand(brands, p.brand)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RecentlyViewed catalog={{ products, categories, brands }} excludeId={product.id} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description: tx(product.description),
          category: category ? tx(category.name) : undefined,
          sku: product.id,
          url: `${siteUrl}/products/${product.slug}`,
          ...(product.image ? { image: `${siteUrl}${product.image}` } : {}),
          ...(brand ? { brand: { "@type": "Brand", name: brand.name } } : {}),
          seller: { "@id": `${siteUrl}/#business` },
        }}
      />
    </>
  );
}
