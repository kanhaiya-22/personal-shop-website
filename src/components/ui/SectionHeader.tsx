import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  id?: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "left", tone = "dark", as = "h2", id, action, icon: Icon, className }: Props) {
  const Heading = as;
  const light = tone === "light";
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-12",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase",
              light ? "text-gold-300" : "text-gold-700",
            )}
          >
            {Icon ? (
              <span aria-hidden="true" className={cn("grid size-6 place-items-center rounded-lg", light ? "bg-white/15" : "bg-gradient-to-br from-gold-100 to-gold-50")}>
                <Icon className="size-3.5" />
              </span>
            ) : (
              <span aria-hidden="true" className={cn("h-0.5 w-6 rounded-full", light ? "bg-gold-300" : "bg-gold-500")} />
            )}
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className={cn(
            "font-display text-3xl leading-tight font-bold sm:text-4xl",
            as === "h1" && "xl:text-[2.75rem]",
            light && "text-white",
          )}
        >
          {title}
        </Heading>
        {subtitle && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-navy-100" : "text-muted")}>{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
