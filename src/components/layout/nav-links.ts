import { BadgeCheck, CircleHelp, House, LayoutGrid, PartyPopper, Phone, Users } from "lucide-react";
import { t } from "@/i18n";

/** Functions (not constants) so labels follow the current site language. */
export const mainNav = () => [
  { href: "/", label: t.nav.home, icon: House },
  { href: "/products", label: t.nav.products, icon: LayoutGrid },
  { href: "/about", label: t.nav.about, icon: Users },
  { href: "/brands", label: t.nav.brands, icon: BadgeCheck },
  { href: "/contact", label: t.nav.contact, icon: Phone },
];

export const secondaryNav = () => [
  { href: "/faq", label: t.nav.faq, icon: CircleHelp },
  { href: "/festivals", label: t.nav.festivals, icon: PartyPopper },
];
