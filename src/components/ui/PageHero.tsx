import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const tones = {
  sage: "from-sage via-cream to-sky",
  blush: "from-blush via-cream to-gold-50",
  sky: "from-sky via-cream to-sage",
  lilac: "from-lilac via-cream to-blush",
};

/** Soft pastel page header used on inner pages. */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  crumbs,
  icon: Icon,
  tone = "sage",
  aside,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  icon?: LucideIcon;
  tone?: keyof typeof tones;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-br", tones[tone])}>
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden="true" className="absolute -top-24 -right-16 size-80 rounded-full bg-white/50 blur-3xl" />
      <div className="container-site relative grid items-center gap-8 py-10 md:grid-cols-[1fr_auto] md:py-14">
        <div>
          <Breadcrumbs items={crumbs} />
          <div className="max-w-3xl motion-safe:animate-fade-up">
            {eyebrow && (
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold tracking-[0.12em] text-gold-700 uppercase shadow-sm ring-1 ring-line">
                {Icon && <Icon className="size-3.5" aria-hidden="true" />}
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl xl:text-[2.75rem]">{title}</h1>
            {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
          </div>
          {children}
        </div>
        {aside && <div className="hidden md:block">{aside}</div>}
      </div>
    </section>
  );
}
