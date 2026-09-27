/**
 * Shared domain types. These mirror what a future database / admin
 * dashboard would store, so the UI can move from static files to an API
 * without changing component props.
 */

export type Locale = "en" | "hi";

/** Plain string (used for both languages) or per-language text. */
export type LocalizedText = string | { en: string; hi?: string };

export type CategoryGroup = "building" | "paints";

export interface Category {
  slug: string;
  group: CategoryGroup;
  name: LocalizedText;
  description: LocalizedText;
  /** Key of an icon in `components/ui/Icon.tsx` */
  icon: string;
  subcategories?: LocalizedText[];
}

export interface Product {
  id: string;
  /** URL segment: /products/[slug] */
  slug: string;
  name: LocalizedText;
  /** Category slug from `data/categories.ts` */
  category: string;
  subcategory?: LocalizedText;
  /** Brand id from `data/brands.ts`. Leave empty if not decided yet. */
  brand?: string;
  description: LocalizedText;
  /** Short facts shown on the detail page (sizes, grades, uses...) */
  highlights?: LocalizedText[];
  /** Typical unit customers ask in, e.g. "Bag (50 kg)" */
  unit?: LocalizedText;
  /** Path under /public, e.g. "/products/opc-cement.jpg". Optional — a styled illustration is shown otherwise. */
  image?: string;
  featured?: boolean;
  /** true = usually in our range; false = available on request */
  available: boolean;
  /** Extra words that should match in search (Hindi names, trade names...) */
  keywords?: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  /** Categories this brand is used for */
  categories?: string[];
  website?: string;
  /** Sample entry added during setup — shown with a "Sample" badge in admin until you confirm or replace it. */
  isSample?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  description?: LocalizedText;
  /** Path under /public, e.g. "/team/girish-kumar-agrawal.jpg" */
  photo?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  /** e.g. "Contractor", "Homeowner" */
  customerType?: LocalizedText;
  review: LocalizedText;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, e.g. "2026-10-02" */
  date: string;
  /** Sample reviews are only visible in the admin panel, never on the public site. */
  isSample?: boolean;
  /** Hide without deleting */
  hidden?: boolean;
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export type FestivalMotif =
  | "diya"
  | "rangoli"
  | "kites"
  | "splash"
  | "lotus"
  | "moon"
  | "feather"
  | "gear"
  | "rakhi"
  | "sun";

export interface Festival {
  slug: string;
  name: { en: string; hi: string };
  greeting: { en: string; hi: string };
  message: { en: string; hi: string };
  motif: FestivalMotif;
  theme: {
    /** gradient start / end */
    from: string;
    to: string;
    /** motif + ornament colour */
    accent: string;
    /** main text colour */
    text: string;
  };
  /** year -> ISO date (India). Add future years here. */
  dates: Record<string, string>;
}

/** Business settings — edited in Admin → Settings. */
export interface SiteSettings {
  /** Website language */
  language: Locale;
  /** 10-digit number without country code. Empty until set in admin. */
  phone: string;
  /** Empty = same as phone */
  whatsapp: string;
  /** More contact numbers shown next to the main one, e.g. family members */
  extraPhones: { name: string; number: string }[];
  countryCode: string;
  email: string;
  address: { street: string; city: string; state: string; pincode: string };
  /** "Get directions" link (Google Maps share link) */
  mapsUrl: string;
  /** Google Maps → Share → Embed a map → the src="..." URL */
  mapsEmbedUrl: string;
  businessHours: { en: string; hi: string };
  /** Optional custom text for the top announcement bar */
  announcement: { en: string; hi: string };
  /** Public website URL, used for SEO and share links. Empty = detected from the request. */
  siteUrl: string;
  social: { facebook: string; instagram: string; youtube: string; googleBusiness: string };
  festivals: {
    enabled: boolean;
    daysBefore: number;
    daysAfter: number;
    /** Festival slugs the owner switched off */
    disabled: string[];
  };
  /** Homepage showcase video */
  showcase: { enabled: boolean; videoUrl: string; posterUrl: string };
}

/** Everything editable from the admin panel. */
export interface SiteContent {
  version: 1;
  updatedAt: string;
  settings: SiteSettings;
  products: Product[];
  categories: Category[];
  brands: Brand[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

export type CollectionName = "products" | "categories" | "brands" | "team" | "testimonials" | "faqs";

/** Settings sent to the browser (nothing secret is stored in settings). */
export type PublicSettings = SiteSettings;
