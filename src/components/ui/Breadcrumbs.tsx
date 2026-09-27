import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { t } from "@/i18n";
import { getSiteUrl } from "@/server/site-url";
import { JsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  label: string;
  href?: string;
}

export async function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all: Crumb[] = [{ label: t.common.home, href: "/" }, ...items];
  const light = tone === "light";
  const siteUrl = await getSiteUrl();
  return (
    <>
      <nav aria-label={t.common.breadcrumb} className="mb-6">
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${light ? "text-navy-200" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className={`underline-offset-4 hover:underline ${light ? "hover:text-white" : "hover:text-navy-900"}`}>
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={`font-medium ${light ? "text-white" : "text-navy-900"}`}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
