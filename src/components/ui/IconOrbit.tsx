import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { Icon3D } from "./Icon3D";

export interface OrbitItem {
  icon: string;
  label: string;
  href?: string;
}

/**
 * Interactive orbit: 3D icons circle the SKT logo. Hover pauses the orbit and
 * lifts the icon (with its name); icons with `href` open that page.
 * Static for reduced-motion users (the rotation classes only run when motion is welcome).
 */
export function IconOrbit({ items, className }: { items: OrbitItem[]; className?: string }) {
  const n = items.length;
  return (
    <div className={cn("group/orbit relative aspect-square w-60 [--orbit-r:5.9rem] lg:w-64 lg:[--orbit-r:6.3rem]", className)}>
      {/* rings */}
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full border-2 border-dashed border-navy-200/80" />
      <div aria-hidden="true" className="absolute inset-[30%] rounded-full bg-gradient-to-br from-white to-surface shadow-lift ring-1 ring-line" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full bg-gold-200/30 motion-safe:animate-ping [animation-duration:3s]" />

      {/* centre logo */}
      <div className="absolute inset-[36%] grid place-items-center">
        <LogoMark className="size-full drop-shadow-md transition-transform duration-500 group-hover/orbit:scale-110 group-hover/orbit:-rotate-6" />
      </div>

      {/* orbiting icons */}
      <ul className="skt-orbit absolute inset-0 group-hover/orbit:[animation-play-state:paused]">
        {items.map((it, i) => {
          const angle = (360 / n) * i;
          const Inner = (
            <span className="skt-orbit-counter group/item relative grid size-12 place-items-center rounded-2xl bg-white shadow-card ring-1 ring-line transition-all duration-300 group-hover/orbit:[animation-play-state:paused] hover:z-10 hover:scale-125 hover:shadow-lift">
              <Icon3D name={it.icon} size={30} />
              <span className="pointer-events-none absolute top-full mt-1.5 rounded-md bg-navy-900 px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-white opacity-0 shadow-card transition-opacity group-hover/item:opacity-100 group-focus-visible/item:opacity-100">
                {it.label}
              </span>
            </span>
          );
          return (
            <li
              key={`${it.icon}-${i}`}
              className="absolute top-1/2 left-1/2 -mt-6 -ml-6"
              style={{ transform: `rotate(${angle}deg) translateX(calc(var(--orbit-r, 7.5rem) * 1)) rotate(-${angle}deg)` }}
            >
              {it.href ? (
                <Link href={it.href} aria-label={it.label} className="block rounded-2xl">
                  {Inner}
                </Link>
              ) : (
                <span role="img" aria-label={it.label}>
                  {Inner}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
