import { ta, tx } from "@/i18n";
import type { CollectionName, LocalizedText } from "@/types";

/**
 * Describes every admin-editable collection. The same schema drives the
 * admin forms (client) and input sanitising (server), so they never drift.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "localized"
  | "localizedTextarea"
  | "localizedList"
  | "select"
  | "multiselect"
  | "checkbox"
  | "image"
  | "slug"
  | "date"
  | "tags"
  | "rating"
  | "icon";

/** Bilingual admin label */
export type L = { en: string; hi: string };

export interface FieldDef {
  key: string;
  label: L;
  type: FieldType;
  required?: boolean;
  /** For select / multiselect */
  options?: "categories" | "brands" | "groups" | { value: string; label: L }[];
  help?: L;
  placeholder?: L;
  /** Default for new items */
  initial?: unknown;
  /** Field occupies full width in the editor */
  wide?: boolean;
}

export interface CollectionDef {
  name: CollectionName;
  idPrefix: string;
  /** Field used to build the slug when empty */
  slugFrom?: string;
  fields: FieldDef[];
  /** Keys shown in the list: [title, subtitle] */
  titleKey: string;
  subtitleKey?: string;
  imageKey?: string;
}

export const iconOptions = [
  "cement", "steel", "bricks", "sand", "chemicals", "waterproofing", "adhesives", "tools", "tiles",
  "roofing", "plywood", "other", "interior", "exterior", "primer", "putty", "enamel", "wood", "metal", "texture", "thinner", "brush", "sealant",
].map((v) => ({ value: v, label: { en: v, hi: v } }));

export const collections: Record<CollectionName, CollectionDef> = {
  products: {
    name: "products",
    idPrefix: "p",
    slugFrom: "name",
    titleKey: "name",
    subtitleKey: "category",
    imageKey: "image",
    fields: [
      { key: "name", label: { en: "Product name", hi: "प्रोडक्ट का नाम" }, type: "localized", required: true, wide: true },
      { key: "category", label: { en: "Category", hi: "कैटेगरी" }, type: "select", options: "categories", required: true },
      { key: "brand", label: { en: "Brand", hi: "ब्रांड" }, type: "select", options: "brands", help: { en: "Optional. Leave empty to show 'ask for brands'.", hi: "वैकल्पिक। खाली छोड़ने पर 'ब्रांड पूछें' दिखेगा।" } },
      { key: "subcategory", label: { en: "Type / sub-category", hi: "प्रकार / उप-कैटेगरी" }, type: "localized", placeholder: { en: "e.g. OPC, Emulsion", hi: "जैसे OPC, इमल्शन" } },
      { key: "unit", label: { en: "Usually sold as", hi: "आमतौर पर बिक्री" }, type: "localized", placeholder: { en: "e.g. Bag (50 kg)", hi: "जैसे बोरी (50 किलो)" } },
      { key: "description", label: { en: "Description", hi: "विवरण" }, type: "localizedTextarea", required: true, wide: true },
      { key: "highlights", label: { en: "Key information (one per line)", hi: "मुख्य जानकारी (एक लाइन में एक)" }, type: "localizedList", wide: true },
      { key: "image", label: { en: "Photo", hi: "फ़ोटो" }, type: "image", wide: true },
      { key: "keywords", label: { en: "Search keywords", hi: "खोज शब्द" }, type: "tags", help: { en: "Comma separated — Hindi / local names help customers find it, e.g. sariya, सरिया", hi: "कॉमा से अलग करें — हिंदी / स्थानीय नाम ग्राहकों को ढूंढने में मदद करते हैं, जैसे sariya, सरिया" }, wide: true },
      { key: "slug", label: { en: "URL name", hi: "URL नाम" }, type: "slug", help: { en: "Auto-filled from the name. Appears in the link: /products/url-name", hi: "नाम से अपने आप भरता है। लिंक में दिखता है: /products/url-name" } },
      { key: "featured", label: { en: "Show on homepage (featured)", hi: "होमपेज पर दिखाएं (मुख्य)" }, type: "checkbox", initial: false },
      { key: "available", label: { en: "Usually in stock (unticked = 'available on request')", hi: "आमतौर पर स्टॉक में (टिक न हो तो 'मांग पर उपलब्ध')" }, type: "checkbox", initial: true },
    ],
  },
  categories: {
    name: "categories",
    idPrefix: "c",
    slugFrom: "name",
    titleKey: "name",
    subtitleKey: "group",
    fields: [
      { key: "name", label: { en: "Category name", hi: "कैटेगरी का नाम" }, type: "localized", required: true, wide: true },
      {
        key: "group",
        label: { en: "Section", hi: "सेक्शन" },
        type: "select",
        required: true,
        options: [
          { value: "building", label: { en: "Building Materials", hi: "बिल्डिंग मटेरियल" } },
          { value: "paints", label: { en: "Paints", hi: "पेंट्स" } },
        ],
        initial: "building",
      },
      { key: "icon", label: { en: "Icon", hi: "आइकन" }, type: "icon", initial: "other" },
      { key: "description", label: { en: "Short description", hi: "छोटा विवरण" }, type: "localizedTextarea", required: true, wide: true },
      { key: "slug", label: { en: "URL name", hi: "URL नाम" }, type: "slug", help: { en: "Used in links. Changing it may break old links to this category.", hi: "लिंक में इस्तेमाल होता है। बदलने से पुराने लिंक काम नहीं करेंगे।" } },
    ],
  },
  brands: {
    name: "brands",
    idPrefix: "b",
    titleKey: "name",
    imageKey: "logo",
    fields: [
      { key: "name", label: { en: "Brand name", hi: "ब्रांड का नाम" }, type: "text", required: true, wide: true },
      { key: "logo", label: { en: "Logo", hi: "लोगो" }, type: "image", wide: true, help: { en: "PNG with transparent background works best.", hi: "पारदर्शी बैकग्राउंड वाला PNG सबसे अच्छा रहता है।" } },
      { key: "categories", label: { en: "Used for", hi: "किसके लिए" }, type: "multiselect", options: "categories", wide: true },
      { key: "website", label: { en: "Website (optional)", hi: "वेबसाइट (वैकल्पिक)" }, type: "text", placeholder: { en: "https://…", hi: "https://…" }, wide: true },
      { key: "isSample", label: { en: "Sample entry (untick once confirmed)", hi: "सैंपल (पुष्टि होने पर टिक हटाएं)" }, type: "checkbox", initial: false },
    ],
  },
  team: {
    name: "team",
    idPrefix: "m",
    titleKey: "name",
    subtitleKey: "role",
    imageKey: "photo",
    fields: [
      { key: "name", label: { en: "Name", hi: "नाम" }, type: "text", required: true, wide: true },
      { key: "role", label: { en: "Role", hi: "भूमिका" }, type: "localized", required: true, wide: true },
      { key: "photo", label: { en: "Photo", hi: "फ़ोटो" }, type: "image", wide: true, help: { en: "Also used on the festival posters.", hi: "त्योहार पोस्टर पर भी इस्तेमाल होती है।" } },
      { key: "description", label: { en: "Short description", hi: "छोटा विवरण" }, type: "localizedTextarea", wide: true },
    ],
  },
  testimonials: {
    name: "testimonials",
    idPrefix: "t",
    titleKey: "customerName",
    subtitleKey: "customerType",
    fields: [
      { key: "customerName", label: { en: "Customer name", hi: "ग्राहक का नाम" }, type: "text", required: true },
      { key: "customerType", label: { en: "Customer type", hi: "ग्राहक का प्रकार" }, type: "localized", placeholder: { en: "e.g. Contractor", hi: "जैसे ठेकेदार" } },
      { key: "review", label: { en: "Review", hi: "समीक्षा" }, type: "localizedTextarea", required: true, wide: true },
      { key: "rating", label: { en: "Rating", hi: "रेटिंग" }, type: "rating", initial: 5 },
      { key: "date", label: { en: "Date", hi: "तारीख़" }, type: "date", required: true },
      { key: "hidden", label: { en: "Hide from website", hi: "वेबसाइट से छुपाएं" }, type: "checkbox", initial: false },
      { key: "isSample", label: { en: "Sample (never shown publicly)", hi: "सैंपल (वेबसाइट पर कभी नहीं दिखेगा)" }, type: "checkbox", initial: false },
    ],
  },
  faqs: {
    name: "faqs",
    idPrefix: "f",
    titleKey: "question",
    fields: [
      { key: "question", label: { en: "Question", hi: "सवाल" }, type: "localized", required: true, wide: true },
      { key: "answer", label: { en: "Answer", hi: "जवाब" }, type: "localizedTextarea", required: true, wide: true },
    ],
  },
};

export function displayText(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && "en" in v) return String((v as { en: string }).en ?? "");
  return "";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ─── Server-side sanitising ────────────────────────────────

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function localized(v: unknown, max = 2000): LocalizedText | undefined {
  if (typeof v === "string") return v.trim() ? { en: str(v, max) } : undefined;
  if (v && typeof v === "object") {
    const o = v as { en?: unknown; hi?: unknown };
    const en = str(o.en, max);
    const hi = str(o.hi, max);
    if (!en && !hi) return undefined;
    return hi ? { en: en || hi, hi } : { en };
  }
  return undefined;
}

const isSafeImagePath = (v: string) => /^\/uploads\/[a-z0-9-]+\.(jpe?g|png|webp|avif|gif|svg)$/i.test(v) || /^\/[a-z0-9/_-]+\.(jpe?g|png|webp|avif|gif|svg)$/i.test(v);

/** Returns a clean item or a human-readable error. */
export function sanitizeItem(def: CollectionDef, input: Record<string, unknown>): { item?: Record<string, unknown>; error?: string } {
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    const v = input[f.key];
    let value: unknown;
    switch (f.type) {
      case "text":
      case "select":
      case "icon":
        value = str(v, 300) || undefined;
        break;
      case "textarea":
        value = str(v) || undefined;
        break;
      case "slug":
        value = slugify(str(v, 120)) || undefined;
        break;
      case "localized":
        value = localized(v, 300);
        break;
      case "localizedTextarea":
        value = localized(v, 4000);
        break;
      case "localizedList":
        value = Array.isArray(v) ? v.map((x) => localized(x, 300)).filter(Boolean).slice(0, 20) : undefined;
        if (Array.isArray(value) && !value.length) value = undefined;
        break;
      case "multiselect":
      case "tags":
        value = Array.isArray(v) ? v.map((x) => str(x, 80)).filter(Boolean).slice(0, 40) : undefined;
        if (Array.isArray(value) && !value.length) value = undefined;
        break;
      case "checkbox":
        value = Boolean(v);
        break;
      case "rating": {
        const n = Math.round(Number(v));
        value = n >= 1 && n <= 5 ? n : 5;
        break;
      }
      case "date":
        value = /^\d{4}-\d{2}-\d{2}$/.test(str(v)) ? str(v) : undefined;
        break;
      case "image": {
        const s = str(v, 300);
        value = s && isSafeImagePath(s) ? s : undefined;
        break;
      }
    }
    if (f.required && (value === undefined || value === "")) return { error: ta.errors.required(tx(f.label)) };
    if (f.key === "website" && typeof value === "string" && !/^https?:\/\//.test(value)) value = undefined;
    if (value !== undefined) out[f.key] = value;
  }
  return { item: out };
}
