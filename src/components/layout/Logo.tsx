import Link from "next/link";
import { locale, shopName, t } from "@/i18n";
import { cn } from "@/lib/utils";

/** "SKT" monogram: a roof line (building) over the initials, with a brush-stroke underline (paint). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="16" fill="#27444B" />
      <path d="M16 0h32a16 16 0 0 1 16 16v10C44 18 20 18 0 26V16A16 16 0 0 1 16 0Z" fill="#fff" opacity="0.07" />
      <path d="M22 19 32 11.5 42 19" fill="none" stroke="#F09F72" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 29.2c-.6-1.9-2.2-3.2-4.7-3.2-2.9 0-4.8 1.6-4.8 4 0 2.4 1.9 3.2 4.8 3.9 3 .7 5 1.6 5 4.1 0 2.5-2.1 4-5 4-2.7 0-4.5-1.2-5.3-3.2" />
        <path d="M27 26v16M36 26l-8 9M30.5 33.2 36.5 42" />
        <path d="M40.5 26h12M46.5 26v16" />
      </g>
      <path d="M14 50.5Q32 46.5 50 50.5" fill="none" stroke="#F09F72" strokeWidth="3" strokeLinecap="round" className="origin-center transition-transform duration-500 group-hover:scale-x-110" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const name = shopName;
  return (
    <Link href="/" className={cn("group flex min-w-0 items-center gap-2 min-[400px]:gap-2.5", className)} aria-label={`${name} — ${t.nav.home}`}>
      <LogoMark className="size-9 shrink-0 transition-transform duration-300 group-hover:-rotate-2 min-[400px]:size-10 sm:size-11" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[0.95rem] font-bold tracking-tight whitespace-nowrap min-[400px]:text-[1.05rem] sm:text-lg", tone === "light" ? "text-white" : "text-navy-900")}>
          {name}
        </span>
        <span className={cn("mt-1 text-[0.66rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase xl:hidden 2xl:block", tone === "light" ? "text-gold-300" : "text-gold-700")}>
          {locale === "hi" ? "बिल्डिंग मटेरियल • पेंट्स" : "Building Materials • Paints"}
        </span>
      </span>
    </Link>
  );
}
