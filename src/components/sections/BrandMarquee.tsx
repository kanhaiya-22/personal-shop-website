import Image from "next/image";
import type { Brand } from "@/types";
import { cn } from "@/lib/utils";

function Badge({ brand }: { brand: Brand }) {
  return (
    <div className="group/badge flex w-36 shrink-0 flex-col items-center gap-3 sm:w-40">
      <div className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-white to-surface shadow-card ring-1 ring-line transition-all duration-300 group-hover/badge:-translate-y-1 group-hover/badge:shadow-lift sm:size-32">
        <span aria-hidden="true" className="absolute inset-1.5 rounded-full border border-dashed border-navy-200/70 transition-transform duration-700 group-hover/badge:rotate-180" />
        {brand.logo ? (
          <div className="relative size-[70%]">
            <Image src={brand.logo} alt={`${brand.name} logo`} fill sizes="128px" className="object-contain" />
          </div>
        ) : (
          <span className="font-display text-xl font-bold text-navy-700">{brand.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <p className="text-center text-sm font-semibold text-navy-900">{brand.name}</p>
    </div>
  );
}

function Row({ brands, reverse, seconds }: { brands: Brand[]; reverse?: boolean; seconds: number }) {
  return (
    <div className="group relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "marquee-track flex w-max gap-6 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] sm:gap-10",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: `${seconds}s` }}
      >
        {/* Two copies: the track moves by half its width, so the loop is seamless. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-6 sm:gap-10" aria-hidden={copy === 1 ? true : undefined}>
            {brands.map((b) => (
              <Badge key={`${copy}-${b.id}`} brand={b} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Endlessly circulating brand logos (two rows, opposite directions). Static for reduced-motion users. */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;
  const withLogos = [...brands].sort((a, b) => Number(Boolean(b.logo)) - Number(Boolean(a.logo)));
  const half = Math.ceil(withLogos.length / 2);
  const rows = withLogos.length > 8 ? [withLogos.slice(0, half), withLogos.slice(half)] : [withLogos];
  return (
    <div className="grid gap-4">
      {rows.map((row, i) => (
        <Row key={i} brands={row} reverse={i === 1} seconds={Math.max(24, row.length * 4)} />
      ))}
    </div>
  );
}
