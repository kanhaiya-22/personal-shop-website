import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small shared building blocks for admin screens. */

export function AdminHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6", className)}>{children}</div>;
}

export const adminInput =
  "w-full rounded-xl border-2 border-line bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-navy-300 focus:border-navy-900";
