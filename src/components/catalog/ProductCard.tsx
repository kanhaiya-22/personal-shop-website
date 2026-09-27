"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { t, tx } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Brand, Category, Product } from "@/types";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product, category, brand, priority }: { product: Product; category?: Category; brand?: Brand; priority?: boolean }) {
  const { wa, contact } = useSite();
  const name = tx(product.name);
  const href = `/products/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
      <ProductVisual
        image={product.image}
          alt={name}
          icon={category?.icon ?? "other"}
          group={category?.group ?? "building"}
          seed={product.id}
          priority={priority}
          className="aspect-[4/3]"
        />
      <span
        className={cn(
          "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold shadow-sm",
          product.available ? "bg-white/95 text-emerald-700" : "bg-white/95 text-gold-800",
        )}
      >
        <span aria-hidden="true" className={cn("mr-1.5 inline-block size-1.5 rounded-full align-middle", product.available ? "bg-emerald-500" : "bg-gold-500")} />
        {product.available ? t.product.available : t.product.onRequest}
      </span>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-gold-700 uppercase">
          {category && <span>{tx(category.name)}</span>}
          {brand && (
            <>
              <span aria-hidden="true" className="text-line">
                •
              </span>
              <span className="text-navy-500 normal-case">{brand.name}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-lg leading-snug font-semibold">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:text-navy-700 focus-visible:outline-none">
            {name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tx(product.description)}</p>

        <div className="relative z-10 mt-auto grid grid-cols-[1fr_auto] gap-2 pt-5">
          <a
            href={wa(t.whatsappMsg.price(name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark px-2.5 text-[0.82rem] font-semibold whitespace-nowrap text-white transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            {t.product.getLatestPrice}
          </a>
          {contact.hasPhone && (
            <a
              href={contact.phoneHref}
              aria-label={`${t.nav.callNow}: ${name}`}
              title={t.nav.callNow}
              className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-900 text-white transition hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
