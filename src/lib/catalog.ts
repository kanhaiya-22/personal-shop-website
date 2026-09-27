import { tx } from "@/i18n";
import type { Brand, Category, CategoryGroup, LocalizedText, Product } from "@/types";

/**
 * Catalogue helpers. They take the data as arguments so the same code runs
 * on the server (pages) and in the browser (instant search).
 */

export interface Catalog {
  products: Product[];
  categories: Category[];
  brands: Brand[];
}

export const findCategory = (categories: Category[], slug: string) => categories.find((c) => c.slug === slug);

export const findBrand = (brands: Brand[], id?: string) => (id ? brands.find((b) => b.id === id) : undefined);

export function relatedProducts({ products, categories }: Catalog, product: Product, limit = 4) {
  const group = findCategory(categories, product.category)?.group;
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const sameGroup = products.filter(
    (p) => p.id !== product.id && p.category !== product.category && findCategory(categories, p.category)?.group === group,
  );
  return [...same, ...sameGroup].slice(0, limit);
}

// ─── Search ────────────────────────────────────────────────

export const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}\p{M}\s]/gu, " ");

const bothLangs = (v: LocalizedText | undefined) =>
  v === undefined ? "" : typeof v === "string" ? v : `${v.en} ${v.hi ?? ""}`;

export type SortKey = "relevance" | "name" | "category";

export interface ProductQuery {
  q?: string;
  /** Building materials and paints are separate catalogues */
  group?: CategoryGroup;
  category?: string;
  availableOnly?: boolean;
  sort?: SortKey;
}

export const groupOf = (categories: Category[], product: Product) => findCategory(categories, product.category)?.group ?? "building";

/** Builds a reusable search function over a catalogue (index is computed once). */
export function createSearch({ products, categories, brands }: Catalog) {
  const index = new Map(
    products.map((p) => {
      const cat = findCategory(categories, p.category);
      const text = normalise(
        [
          bothLangs(p.name),
          bothLangs(p.subcategory),
          bothLangs(p.description),
          cat ? bothLangs(cat.name) : "",
          findBrand(brands, p.brand)?.name ?? "",
          ...(p.keywords ?? []),
        ].join(" "),
      );
      return [p.id, { text, name: normalise(bothLangs(p.name)), group: cat?.group ?? "building" }];
    }),
  );
  const order = (slug: string) => categories.findIndex((c) => c.slug === slug);

  return function search({ q = "", group, category, availableOnly, sort = "relevance" }: ProductQuery) {
    const words = normalise(q).split(/s+/).filter(Boolean);
    const scored = products
      .filter((p) => {
        const entry = index.get(p.id)!;
        if (group && entry.group !== group) return false;
        if (category && p.category !== category) return false;
        if (availableOnly && !p.available) return false;
        return true;
      })
      .map((p) => {
        const entry = index.get(p.id)!;
        let s = words.length ? 0 : 1;
        for (const w of words) {
          if (!entry.text.includes(w)) return { p, s: 0 };
          s += entry.name.includes(w) ? 3 : 1;
        }
        return { p, s };
      })
      .filter((r) => r.s > 0);

    scored.sort((a, b) => {
      if (sort === "name") return tx(a.p.name).localeCompare(tx(b.p.name));
      if (sort === "category") return order(a.p.category) - order(b.p.category);
      return b.s - a.s || Number(Boolean(b.p.featured)) - Number(Boolean(a.p.featured));
    });
    return scored.map((r) => r.p);
  };
}
