import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "gold" | "outline" | "outlineLight" | "whatsapp" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 select-none disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-br from-navy-700 to-navy-950 text-white shadow-sm hover:brightness-110 hover:shadow-lift hover:-translate-y-0.5",
  gold: "bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-navy-950 shadow-sm hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5",
  outline: "border-2 border-navy-900/15 bg-gradient-to-br from-white to-navy-50/60 text-navy-900 hover:border-navy-700",
  outlineLight: "border-2 border-white/30 text-white hover:border-white hover:bg-white/10",
  whatsapp: "bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark text-white shadow-sm hover:brightness-110 hover:shadow-lift hover:-translate-y-0.5",
  ghost: "text-navy-800 hover:bg-navy-50",
  light: "bg-gradient-to-br from-white to-gold-50 text-navy-900 shadow-sm hover:brightness-105 hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-13 px-6 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Internal link styled as a button. */
export function ButtonLink({
  href,
  variant,
  size,
  icon,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

/** External link (tel:, wa.me, maps) styled as a button. */
export function ButtonAnchor({
  variant,
  size,
  icon,
  className,
  children,
  external,
  ...rest
}: CommonProps & Omit<ComponentProps<"a">, "className" | "children"> & { external?: boolean }) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}

export function Button({ variant, size, icon, className, children, ...rest }: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
