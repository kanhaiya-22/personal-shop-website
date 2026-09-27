import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icon3D } from "@/components/ui/Icon3D";
import { t, tx } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export function CategoryCard({ category, count, image }: { category: Category; count?: number; image?: string }) {
  const paints = category.group === "paints";
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift"
    >
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          <Image src={image} alt="" fill sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
        </div>
      )}
      <div className={cn("relative flex flex-1 flex-col p-5", image && "pt-9")}>
        <span
          className={cn(
            "grid size-14 shrink-0 place-items-center rounded-2xl ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
            paints ? "bg-gradient-to-br from-blush to-white text-gold-700" : "bg-gradient-to-br from-sky to-white text-navy-700",
            image && "absolute -top-7 left-5 shadow-card",
          )}
        >
          <Icon3D name={category.icon} size={40} />
        </span>
        <ArrowUpRight
          className={cn("absolute right-5 size-5 text-navy-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy-900", image ? "top-4" : "top-6")}
          aria-hidden="true"
        />
        <h3 className={cn("text-base leading-snug font-semibold sm:text-lg", !image && "mt-4")}>{tx(category.name)}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{tx(category.description)}</p>
        {count !== undefined && count > 0 && <p className="mt-auto pt-3 text-xs font-semibold text-navy-500">{t.categories.items(count)}</p>}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
          paints ? "bg-gradient-to-r from-gold-300 via-gold-400 to-[#e8a5a0]" : "bg-gradient-to-r from-navy-400 to-gold-300",
        )}
      />
    </Link>
  );
}
