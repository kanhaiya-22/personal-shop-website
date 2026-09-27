"use client";

import { ArrowDown, ArrowUp, CircleAlert, LoaderCircle, Pencil, Plus, Search, Star, Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryIcon } from "@/components/ui/Icon";
import { ta, tx } from "@/i18n";
import { collections, type FieldDef, iconOptions } from "@/lib/admin-schema";
import { cn } from "@/lib/utils";
import { deleteItem, deleteSamples, moveItem, saveItem } from "@/server/actions/admin";
import type { Brand, Category, CollectionName, LocalizedText } from "@/types";
import { ImageField } from "./ImageField";
import { adminInput } from "./ui";

type Item = Record<string, unknown> & { id?: string; slug?: string };
type Loc = { en?: string; hi?: string };

const keyOf = (item: Item) => (item.id ?? item.slug ?? "") as string;
const asLoc = (v: unknown): Loc => (typeof v === "string" ? { en: v } : ((v as Loc) ?? {}));
/** Text in the current admin language */
const show = (v: unknown) => (typeof v === "string" || (v && typeof v === "object") ? tx(v as LocalizedText) : "");

export function CollectionManager({ name, initialItems, categories, brands }: { name: CollectionName; initialItems: Item[]; categories: Category[]; brands: Brand[] }) {
  const def = collections[name];
  const meta = ta.collections[name];
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editing, setEditing] = useState<Item | null>(null);
  const [toast, setToast] = useState("");
  const [listError, setListError] = useState("");

  // Pick up fresh server data after router.refresh().
  const [prevInitial, setPrevInitial] = useState(initialItems);
  if (prevInitial !== initialItems) {
    setPrevInitial(initialItems);
    setItems(initialItems);
  }

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const optionLabel = (field: FieldDef, value: unknown) => {
    if (field.options === "categories") return show(categories.find((c) => c.slug === value)?.name);
    if (field.options === "brands") return brands.find((b) => b.id === value)?.name ?? "";
    if (Array.isArray(field.options)) {
      const o = field.options.find((x) => x.value === value);
      return o ? tx(o.label) : String(value ?? "");
    }
    return show(value);
  };
  const subtitleField = def.fields.find((f) => f.key === def.subtitleKey);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (categoryFilter && i.category !== categoryFilter) return false;
      if (!q) return true;
      return JSON.stringify(i).toLowerCase().includes(q);
    });
  }, [items, query, categoryFilter]);

  const hasSamples = (name === "brands" || name === "testimonials") && items.some((i) => i.isSample);

  async function remove(item: Item) {
    if (!window.confirm(ta.list.confirmDelete(show(item[def.titleKey])))) return;
    setListError("");
    const res = await deleteItem(name, keyOf(item));
    if (!res.ok) return setListError(res.error);
    setItems((list) => list.filter((i) => keyOf(i) !== keyOf(item)));
    flash(ta.list.deleted);
    router.refresh();
  }

  async function move(item: Item, dir: -1 | 1) {
    const idx = items.findIndex((i) => keyOf(i) === keyOf(item));
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    setItems(next);
    await moveItem(name, keyOf(item), dir);
  }

  const newItem = () => {
    const blank: Item = {};
    for (const f of def.fields) if (f.initial !== undefined) blank[f.key] = f.initial;
    if (def.fields.some((f) => f.type === "date")) blank.date = new Date().toISOString().slice(0, 10);
    if (name === "products" && categoryFilter) blank.category = categoryFilter;
    setEditing(blank);
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-navy-400" aria-hidden="true" />
          <label htmlFor="admin-search" className="sr-only">
            {ta.list.search(meta.title)}
          </label>
          <input id="admin-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ta.list.search(meta.title)} className={cn(adminInput, "h-11 pl-10")} />
        </div>
        {name === "products" && (
          <>
            <label htmlFor="admin-cat" className="sr-only">{ta.list.filterCategory}</label>
            <select id="admin-cat" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={cn(adminInput, "h-11 sm:w-56")}>
              <option value="">{ta.list.allCategories}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {show(c.name)}
                </option>
              ))}
            </select>
          </>
        )}
        <button type="button" onClick={newItem} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 px-4 text-sm font-semibold text-white hover:brightness-110">
          <Plus className="size-4" aria-hidden="true" />
          {ta.list.add(meta.singular)}
        </button>
      </div>

      {hasSamples && (
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-900 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {ta.list.samplesNote} {name === "testimonials" ? ta.list.samplesReviews : ta.list.samplesBrands}
          </p>
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm(ta.list.confirmDeleteSamples)) return;
              await deleteSamples(name as "brands" | "testimonials");
              setItems((l) => l.filter((i) => !i.isSample));
              flash(ta.list.samplesDeleted);
              router.refresh();
            }}
            className="shrink-0 rounded-lg border border-gold-300 bg-white px-3 py-1.5 font-semibold hover:bg-gold-100"
          >{ta.list.deleteSamples}</button>
        </div>
      )}

      {listError && (
        <p role="alert" className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          <CircleAlert className="size-4" aria-hidden="true" /> {listError}
        </p>
      )}

      <p className="mb-3 text-sm text-muted" aria-live="polite">
        {ta.list.count(filtered.length, items.length, meta.title)}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-line bg-white p-10 text-center text-sm text-muted">{ta.list.empty(meta.singular)}</div>
      ) : (
        <ul className="grid gap-2">
          {filtered.map((item) => {
            const img = def.imageKey ? (item[def.imageKey] as string | undefined) : undefined;
            const cat = name === "products" ? categories.find((c) => c.slug === item.category) : undefined;
            const reorderable = !query && !categoryFilter;
            return (
              <li key={keyOf(item)} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm transition hover:border-navy-200">
                <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-navy-50 to-white text-navy-700">
                  {img ? (
                    <Image src={img} alt="" fill sizes="48px" className="object-cover" />
                  ) : name === "categories" ? (
                    <CategoryIcon name={String(item.icon ?? "other")} className="size-5" />
                  ) : cat ? (
                    <CategoryIcon name={cat.icon} className="size-5" />
                  ) : (
                    <span className="font-bold">{show(item[def.titleKey]).charAt(0)}</span>
                  )}
                </div>
                <button type="button" onClick={() => setEditing(item)} className="min-w-0 flex-1 text-left">
                  <p className="flex flex-wrap items-center gap-1.5 font-semibold text-navy-900">
                    <span className="truncate">{show(item[def.titleKey]) || ta.list.untitled}</span>
                    {Boolean(item.isSample) && <span className="rounded-md bg-gradient-to-br from-gold-100 to-gold-50 px-1.5 py-0.5 text-[0.7rem] font-bold text-gold-900">{ta.list.sample}</span>}
                    {Boolean(item.featured) && <Star className="size-3.5 fill-gold-400 text-gold-400" aria-label={ta.list.featured} />}
                    {Boolean(item.hidden) && <span className="rounded-md bg-surface px-1.5 py-0.5 text-[0.7rem] font-bold text-navy-600">{ta.list.hidden}</span>}
                    {name === "products" && item.available === false && <span className="rounded-md bg-surface px-1.5 py-0.5 text-[0.7rem] font-bold text-navy-600">{ta.list.onRequest}</span>}
                  </p>
                  {subtitleField && <p className="truncate text-sm text-muted">{optionLabel(subtitleField, item[subtitleField.key])}</p>}
                </button>
                <div className="flex shrink-0 items-center gap-0.5">
                  {reorderable && (
                    <>
                      <button type="button" onClick={() => move(item, -1)} aria-label={ta.list.moveUp} className="hidden size-9 place-items-center rounded-lg text-navy-500 hover:bg-navy-50 sm:grid">
                        <ArrowUp className="size-4" aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => move(item, 1)} aria-label={ta.list.moveDown} className="hidden size-9 place-items-center rounded-lg text-navy-500 hover:bg-navy-50 sm:grid">
                        <ArrowDown className="size-4" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <button type="button" onClick={() => setEditing(item)} aria-label={ta.list.editItem(show(item[def.titleKey]))} className="grid size-9 place-items-center rounded-lg text-navy-700 hover:bg-navy-50">
                    <Pencil className="size-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => remove(item)} aria-label={ta.list.deleteItem(show(item[def.titleKey]))} className="grid size-9 place-items-center rounded-lg text-navy-400 hover:bg-red-50 hover:text-red-600">
                    <Trash className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <Editor
          name={name}
          item={editing}
          categories={categories}
          brands={brands}
          onClose={() => setEditing(null)}
          onSaved={(saved) => {
            setItems((list) => {
              const i = list.findIndex((x) => keyOf(x) === keyOf(editing) && keyOf(editing) !== "");
              if (i >= 0) {
                const next = [...list];
                next[i] = saved;
                return next;
              }
              return [saved, ...list];
            });
            setEditing(null);
            flash(ta.list.saved);
            router.refresh();
          }}
        />
      )}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lift transition-all",
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {toast}
      </div>
    </div>
  );
}

// ─── Editor ────────────────────────────────────────────────

function Editor({
  name,
  item,
  categories,
  brands,
  onClose,
  onSaved,
}: {
  name: CollectionName;
  item: Item;
  categories: Category[];
  brands: Brand[];
  onClose: () => void;
  onSaved: (item: Item) => void;
}) {
  const def = collections[name];
  const meta = ta.collections[name];
  const [values, setValues] = useState<Item>(() => structuredClone(item));
  const [tagText, setTagText] = useState<Record<string, string>>(() =>
    Object.fromEntries(def.fields.filter((f) => f.type === "tags").map((f) => [f.key, ((item[f.key] as string[]) ?? []).join(", ")])),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const isNew = !keyOf(item);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input,textarea,select")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const set = (key: string, v: unknown) => setValues((s) => ({ ...s, [key]: v }));
  const setLoc = (key: string, lang: "en" | "hi", v: string) => setValues((s) => ({ ...s, [key]: { ...asLoc(s[key]), [lang]: v } }));

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload: Item = { ...values, id: keyOf(item) || undefined };
    for (const [k, text] of Object.entries(tagText)) payload[k] = text.split(",").map((x) => x.trim()).filter(Boolean);
    const res = await saveItem(name, payload);
    setSaving(false);
    if (!res.ok) return setError(res.error);
    onSaved(res.data as Item);
  }

  const options = (f: FieldDef) =>
    f.options === "categories"
      ? categories.map((c) => ({ value: c.slug, label: `${show(c.name)} (${c.group === "paints" ? ta.list.paints : ta.list.building})` }))
      : f.options === "brands"
        ? brands.map((b) => ({ value: b.id, label: b.name + (b.isSample ? ` (${ta.list.sample})` : "") }))
        : Array.isArray(f.options)
          ? f.options
          : [];

  const renderField = (f: FieldDef) => {
    const id = `field-${f.key}`;
    const label = (
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {tx(f.label)}
        {f.required && <span className="text-red-600"> *</span>}
      </label>
    );
    const help = f.help && <p className="mt-1.5 text-xs text-muted">{tx(f.help)}</p>;
    const v = values[f.key];

    switch (f.type) {
      case "text":
      case "slug":
        return (
          <div>
            {label}
            <input
              id={id}
              value={(v as string) ?? ""}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.type === "slug" ? "auto" : f.placeholder ? tx(f.placeholder) : undefined}
              required={f.required}
              className={cn(adminInput, "h-11")}
            />
            {help}
          </div>
        );
      case "date":
        return (
          <div>
            {label}
            <input id={id} type="date" value={(v as string) ?? ""} onChange={(e) => set(f.key, e.target.value)} required={f.required} className={cn(adminInput, "h-11")} />
          </div>
        );
      case "localized":
      case "localizedTextarea": {
        const loc = asLoc(v);
        const Tag = f.type === "localized" ? "input" : "textarea";
        return (
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-navy-900">
              {tx(f.label)}
              {f.required && <span className="text-red-600"> *</span>}
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-en`} className="mb-1 block text-xs font-semibold text-muted">{ta.list.english}</label>
                <Tag
                  id={`${id}-en`}
                  value={loc.en ?? ""}
                  onChange={(e: { target: { value: string } }) => setLoc(f.key, "en", e.target.value)}
                  placeholder={f.placeholder ? tx(f.placeholder) : undefined}
                  required={f.required}
                  rows={4}
                  className={cn(adminInput, f.type === "localized" ? "h-11" : "py-2.5")}
                />
              </div>
              <div>
                <label htmlFor={`${id}-hi`} className="mb-1 block text-xs font-semibold text-muted">{ta.list.hindiOptional}</label>
                <Tag
                  id={`${id}-hi`}
                  lang="hi"
                  value={loc.hi ?? ""}
                  onChange={(e: { target: { value: string } }) => setLoc(f.key, "hi", e.target.value)}
                  rows={4}
                  className={cn(adminInput, f.type === "localized" ? "h-11" : "py-2.5")}
                />
              </div>
            </div>
            {help}
          </fieldset>
        );
      }
      case "localizedList": {
        const list = ((v as Loc[]) ?? []).map(asLoc);
        const text = (lang: "en" | "hi") => list.map((x) => x[lang] ?? "").join("\n");
        const update = (lang: "en" | "hi", raw: string) => {
          const lines = raw.split("\n");
          const other = lang === "en" ? "hi" : "en";
          const len = Math.max(lines.length, list.length);
          const next = Array.from({ length: len }, (_, i) => ({ ...list[i], [other]: list[i]?.[other] ?? "", [lang]: lines[i] ?? "" }));
          set(f.key, next.filter((x) => x.en || x.hi || true));
        };
        return (
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-navy-900">{tx(f.label)}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <textarea aria-label={`${tx(f.label)} — English`} value={text("en")} onChange={(e) => update("en", e.target.value)} rows={4} placeholder={ta.list.linesEn} className={cn(adminInput, "py-2.5")} />
              <textarea aria-label={`${tx(f.label)} — हिंदी`} lang="hi" value={text("hi")} onChange={(e) => update("hi", e.target.value)} rows={4} placeholder={ta.list.linesHi} className={cn(adminInput, "py-2.5")} />
            </div>
          </fieldset>
        );
      }
      case "tags":
        return (
          <div>
            {label}
            <input id={id} value={tagText[f.key] ?? ""} onChange={(e) => setTagText((s) => ({ ...s, [f.key]: e.target.value }))} className={cn(adminInput, "h-11")} />
            {help}
          </div>
        );
      case "select":
        return (
          <div>
            {label}
            <select id={id} value={(v as string) ?? ""} onChange={(e) => set(f.key, e.target.value || undefined)} required={f.required} className={cn(adminInput, "h-11")}>
              {!f.required && <option value="">{ta.list.none}</option>}
              {f.required && !v && <option value="">{ta.list.choose}</option>}
              {options(f).map((o) => (
                <option key={o.value} value={o.value}>
                  {typeof o.label === "string" ? o.label : tx(o.label)}
                </option>
              ))}
            </select>
            {help}
          </div>
        );
      case "multiselect": {
        const selected = new Set((v as string[]) ?? []);
        return (
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-navy-900">{tx(f.label)}</legend>
            <div className="grid max-h-48 grid-cols-1 gap-1 overflow-y-auto rounded-xl border-2 border-line p-2 sm:grid-cols-2">
              {options(f).map((o) => (
                <label key={o.value} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-surface">
                  <input
                    type="checkbox"
                    checked={selected.has(o.value)}
                    onChange={(e) => {
                      const next = new Set(selected);
                      if (e.target.checked) next.add(o.value);
                      else next.delete(o.value);
                      set(f.key, [...next]);
                    }}
                    className="size-4 accent-navy-900"
                  />
                  {typeof o.label === "string" ? o.label : tx(o.label)}
                </label>
              ))}
            </div>
          </fieldset>
        );
      }
      case "icon":
        return (
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-navy-900">{tx(f.label)}</legend>
            <div className="flex flex-wrap gap-1.5">
              {iconOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-label={o.value}
                  aria-pressed={v === o.value}
                  title={o.value}
                  onClick={() => set(f.key, o.value)}
                  className={cn("grid size-10 place-items-center rounded-lg border-2 transition", v === o.value ? "border-navy-900 bg-gradient-to-br from-navy-700 to-navy-950 text-gold-300" : "border-line text-navy-700 hover:border-navy-300")}
                >
                  <CategoryIcon name={o.value} className="size-5" />
                </button>
              ))}
            </div>
          </fieldset>
        );
      case "checkbox":
        return (
          <label className="flex items-start gap-3 rounded-xl border-2 border-line p-3 text-sm font-medium text-navy-900">
            <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.key, e.target.checked)} className="mt-0.5 size-5 accent-navy-900" />
            {tx(f.label)}
          </label>
        );
      case "rating":
        return (
          <div>
            {label}
            <select id={id} value={String(v ?? 5)} onChange={(e) => set(f.key, Number(e.target.value))} className={cn(adminInput, "h-11")}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)} ({n})
                </option>
              ))}
            </select>
          </div>
        );
      case "image":
        return (
          <div>
            <p className="mb-1.5 text-sm font-semibold text-navy-900">{tx(f.label)}</p>
            <ImageField value={v as string | undefined} onChange={(url) => set(f.key, url)} label={tx(f.label)} />
            {help}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <button type="button" aria-label={ta.list.close} onClick={onClose} className="absolute inset-0 bg-navy-950/50 backdrop-blur-[2px]" />
      <div ref={panelRef} className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white shadow-lift motion-safe:animate-fade-up">
        <form onSubmit={submit} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 id="editor-title" className="text-lg font-bold">
              {isNew ? ta.list.add(meta.singular) : ta.list.edit(meta.singular)}
            </h2>
            <button type="button" onClick={onClose} aria-label={ta.list.close} className="grid size-9 place-items-center rounded-lg hover:bg-surface">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {def.fields.map((f) => (
                <div key={f.key} className={f.wide || f.type.startsWith("localized") || f.type === "checkbox" ? "sm:col-span-2" : ""}>
                  {renderField(f)}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line bg-surface px-5 py-4">
            {error && (
              <p role="alert" className="mb-3 flex items-center gap-2 text-sm font-medium text-red-700">
                <CircleAlert className="size-4" aria-hidden="true" /> {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="h-11 rounded-xl border-2 border-line bg-white px-4 text-sm font-semibold text-navy-800 hover:border-navy-900">{ta.list.cancel}</button>
              <button type="submit" disabled={saving} className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 px-5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
                {saving && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                {saving ? ta.list.saving : ta.list.save}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
