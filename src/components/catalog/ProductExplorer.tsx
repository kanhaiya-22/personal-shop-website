"use client";

import { ArrowRight, Phone, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { buttonClass } from "@/components/ui/Button";
import { Character } from "@/components/ui/Character";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Icon3D } from "@/components/ui/Icon3D";
import { t, tx } from "@/i18n";
import { type Catalog, createSearch, findBrand, findCategory, type SortKey } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { CategoryGroup } from "@/types";
import { ProductCard } from "./ProductCard";

export interface ExplorerInitial {
  q?: string;
  group?: CategoryGroup;
  category?: string;
}

const groupMeta: Record<CategoryGroup, { icon: string; active: string; chip: string }> = {
  building: { icon: "bricks", active: "from-navy-600 to-navy-950 text-white", chip: "from-navy-600 to-navy-900 text-white" },
  paints: { icon: "palette", active: "from-gold-300 via-gold-400 to-[#e8a5a0] text-navy-950", chip: "from-gold-300 to-gold-500 text-navy-950" },
};

/**
 * Catalogue browser. Building materials and paints are kept as two separate
 * catalogues: the customer picks one, then narrows by that catalogue's categories.
 */
export function ProductExplorer({ catalog, initial, compact }: { catalog: Catalog; initial?: ExplorerInitial; compact?: boolean }) {
  const { wa, contact } = useSite();
  const search = useMemo(() => createSearch(catalog), [catalog]);

  const [q, setQ] = useState(initial?.q ?? "");
  const [group, setGroup] = useState<CategoryGroup>(initial?.group ?? "building");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [availableOnly, setAvailableOnly] = useState(false);
  const deferredQ = useDeferredValue(q);

  const groupCategories = catalog.categories.filter((c) => c.group === group);
  const results = useMemo(
    () => search({ q: deferredQ, group, category: category || undefined, sort, availableOnly }),
    [search, deferredQ, group, category, sort, availableOnly],
  );
  const otherGroup: CategoryGroup = group === "building" ? "paints" : "building";
  const counts = useMemo(
    () => ({
      building: search({ q: deferredQ, group: "building", availableOnly }).length,
      paints: search({ q: deferredQ, group: "paints", availableOnly }).length,
    }),
    [search, deferredQ, availableOnly],
  );
  const otherMatches = deferredQ.trim() ? counts[otherGroup] : 0;
  const limited = compact ? results.slice(0, 8) : results;

  const groupLabel = (g: CategoryGroup) => (g === "building" ? t.categories.buildingTab : t.categories.paintsTab);

  const switchGroup = (g: CategoryGroup) => {
    setGroup(g);
    setCategory("");
  };

  // Keep the URL shareable without re-rendering the page on the server.
  useEffect(() => {
    if (compact) return;
    const params = new URLSearchParams();
    params.set("group", group);
    if (category) params.set("category", category);
    if (q.trim()) params.set("q", q.trim());
    const id = setTimeout(() => window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`), 300);
    return () => clearTimeout(id);
  }, [q, group, category, compact]);

  const activeCategory = category ? findCategory(catalog.categories, category) : undefined;
  const chips = [
    { slug: "", icon: groupMeta[group].icon, label: t.search.allInGroup(groupLabel(group)) },
    ...groupCategories.map((c) => ({ slug: c.slug, icon: c.icon, label: tx(c.name) })),
  ];

  return (
    <div>
      {/* Catalogue switch */}
      <div role="group" aria-label={t.search.groupLabel} className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-gradient-to-br from-surface to-white p-1.5 ring-1 ring-line sm:mx-auto sm:max-w-xl">
        {(["building", "paints"] as const).map((g) => {
          const on = group === g;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={on}
              onClick={() => switchGroup(g)}
              className={cn(
                "flex h-14 min-w-0 items-center justify-center gap-2 rounded-xl px-2 text-sm font-bold transition-all duration-300 sm:text-base",
                on ? `bg-gradient-to-br shadow-card ${groupMeta[g].active}` : "text-navy-700 hover:bg-white",
              )}
            >
              <Icon3D name={groupMeta[g].icon} size={26} className="shrink-0" />
              <span className="line-clamp-2 text-left leading-tight sm:truncate">{groupLabel(g)}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-xs", on ? "bg-white/25" : "bg-navy-50 text-navy-600")}>{counts[g]}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor={compact ? "product-search-home" : "product-search"} className="sr-only">
          {t.search.label}
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-navy-400" aria-hidden="true" />
        <input
          id={compact ? "product-search-home" : "product-search"}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search.placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className="h-16 w-full rounded-2xl border-2 border-line bg-white pr-14 pl-14 text-base text-ink shadow-card transition outline-none placeholder:text-navy-300 focus:border-navy-700 focus:shadow-lift [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label={t.search.clear}
            className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-xl text-navy-500 hover:bg-navy-50 hover:text-navy-900"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </form>

      {/* Category chips for the chosen catalogue */}
      <div className="-mx-4 mt-5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label={t.search.filterLabel} className={cn("flex w-max gap-2", !compact && "sm:w-auto sm:flex-wrap")}>
          {chips.map((c) => {
            const on = category === c.slug;
            return (
              <button
                key={c.slug || "all"}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c.slug)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border-2 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap transition",
                  on ? `border-transparent bg-gradient-to-br shadow-card ${groupMeta[group].chip}` : "border-line bg-white text-navy-800 hover:border-navy-300",
                )}
              >
                <span className={cn("grid size-8 place-items-center rounded-full", on ? "bg-white/25" : "bg-gradient-to-br from-surface to-white")}>
                  <Icon3D name={c.icon} size={20} />
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      {!compact && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-gradient-to-br from-surface to-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="hidden size-4 text-navy-500 sm:block" aria-hidden="true" />
            <label className="sr-only" htmlFor="sort-select">
              {t.search.sortLabel}
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium text-ink outline-none focus:border-navy-700 sm:w-auto"
            >
              <option value="relevance">
                {t.search.sortLabel}: {t.search.sortRelevance}
              </option>
              <option value="name">
                {t.search.sortLabel}: {t.search.sortName}
              </option>
              <option value="category">
                {t.search.sortLabel}: {t.search.sortCategory}
              </option>
            </select>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2.5 px-1 text-sm font-medium text-ink">
            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="size-5 rounded accent-navy-700" />
            {t.search.availableOnly}
          </label>
        </div>
      )}

      <h2 className="sr-only">{t.search.found(results.length)}</h2>
      <div className="mt-6 mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-navy-800" aria-live="polite">
          {t.search.found(results.length)}
          <span className="font-normal text-muted"> · {activeCategory ? tx(activeCategory.name) : groupLabel(group)}</span>
        </p>
        {otherMatches > 0 && (
          <button
            type="button"
            onClick={() => switchGroup(otherGroup)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-100 to-gold-50 px-3 py-1.5 text-sm font-semibold text-gold-800 ring-1 ring-gold-200 hover:brightness-105"
          >
            {t.search.otherGroupMatches(otherMatches, groupLabel(otherGroup))} · {t.search.viewThere}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {limited.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {limited.map((p, i) => (
            <li key={p.id} className="motion-safe:animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <ProductCard product={p} category={findCategory(catalog.categories, p.category)} brand={findBrand(catalog.brands, p.brand)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-navy-200 bg-gradient-to-br from-surface to-white px-6 py-14 text-center">
          <Character variant="helper" className="mx-auto w-32" />
          <h3 className="mt-5 text-xl font-bold">{t.search.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-muted">{t.search.emptyText}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {contact.hasPhone && (
              <a href={contact.phoneHref} className={buttonClass("primary")}>
                <Phone className="size-5" aria-hidden="true" />
                {t.nav.callNow}
              </a>
            )}
            <a href={wa(q.trim() ? t.whatsappMsg.availability(q.trim()) : t.whatsappMsg.general)} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp")}>
              <WhatsAppIcon className="size-5" />
              {t.search.emptyWhatsapp}
            </a>
          </div>
        </div>
      )}

      {compact && results.length > limited.length && (
        <div className="mt-8 text-center">
          <Link href={`/products?group=${group}${q.trim() ? `&q=${encodeURIComponent(q.trim())}` : ""}`} className={buttonClass("outline")}>
            {t.featured.viewAll} ({results.length})
          </Link>
        </div>
      )}
    </div>
  );
}
