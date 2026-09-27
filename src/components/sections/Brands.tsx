import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { tx } from "@/i18n";
import type { Brand, Category } from "@/types";

export function BrandCard({ brand, categories }: { brand: Brand; categories: Category[] }) {
  const cats = (brand.categories ?? []).map((slug) => categories.find((c) => c.slug === slug)).filter(Boolean) as Category[];
  const initials = brand.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="group flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
      <div className="relative grid h-20 w-full place-items-center rounded-2xl bg-gradient-to-br from-white to-surface px-3 ring-1 ring-line">
        {brand.logo ? (
          <div className="relative h-14 w-full">
            <Image src={brand.logo} alt={`${brand.name} logo`} fill sizes="200px" className="object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
        ) : (
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 font-display text-lg font-bold tracking-wide text-gold-300 transition-transform duration-300 group-hover:scale-105">
            {initials}
          </span>
        )}
      </div>
      <p className="mt-3 font-semibold text-navy-900">{brand.name}</p>
      {cats.length > 0 && (
        <p className="mt-1 line-clamp-1 text-xs text-muted">
          {cats
            .slice(0, 2)
            .map((c) => tx(c.name))
            .join(" · ")}
        </p>
      )}
    </div>
  );
}

export function BrandsGrid({ brands, categories, limit }: { brands: Brand[]; categories: Category[]; limit?: number }) {
  const shown = limit ? brands.slice(0, limit) : brands;
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {shown.map((b, i) => (
        <Reveal as="li" key={b.id} delay={(i % 6) * 50}>
          {b.website ? (
            <Link href={b.website} target="_blank" rel="noopener noreferrer" className="block h-full">
              <BrandCard brand={b} categories={categories} />
            </Link>
          ) : (
            <BrandCard brand={b} categories={categories} />
          )}
        </Reveal>
      ))}
    </ul>
  );
}
