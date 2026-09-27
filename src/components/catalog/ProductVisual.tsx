import Image from "next/image";
import { CategoryIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { CategoryGroup } from "@/types";

const buildingTones = [
  "from-navy-600 to-navy-900",
  "from-navy-500 to-navy-800",
  "from-[#6f8f86] to-[#34504a]",
  "from-[#7d95a1] to-[#3d5560]",
];
const paintTones = [
  "from-gold-300 to-gold-500",
  "from-[#f3c9a8] to-[#dd8a68]",
  "from-[#b9d3c4] to-[#6f9f8c]",
  "from-[#efbcb6] to-[#cf7f7a]",
  "from-[#cfc2e4] to-[#8f7cb8]",
  "from-[#bcd6e3] to-[#6d9bb3]",
];

const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

/**
 * Product image, or — until a photo is uploaded — a clean branded illustration
 * based on the product's category, so the catalogue never shows broken images.
 */
export function ProductVisual({
  image,
  alt,
  icon,
  group,
  seed,
  label,
  sizes = "(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw",
  priority,
  className,
}: {
  image?: string;
  alt: string;
  icon: string;
  group: CategoryGroup;
  seed: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    );
  }
  const tones = group === "paints" ? paintTones : buildingTones;
  const tone = tones[hash(seed) % tones.length];
  return (
    <div role="img" aria-label={alt} className={cn("relative overflow-hidden bg-gradient-to-br", tone, className)}>
      {group === "building" ? (
        <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      ) : (
        <svg aria-hidden="true" className="absolute -right-6 -bottom-6 h-3/4 w-3/4 text-white/15" viewBox="0 0 100 100">
          <path d="M10 60c20-30 50-30 80-10v50H10z" fill="currentColor" />
          <path d="M0 80c25-20 60-20 100 0v20H0z" fill="currentColor" />
        </svg>
      )}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-20 place-items-center rounded-2xl bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:size-24">
          <CategoryIcon name={icon} className="size-10 sm:size-12" strokeWidth={1.5} />
        </div>
      </div>
      {label && (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/25 px-2 py-1 text-[0.68rem] font-semibold tracking-wide text-white/90 uppercase backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
