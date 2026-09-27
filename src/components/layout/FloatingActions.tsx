"use client";

import { ArrowUp, House, LayoutGrid, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Mobile: a bottom action bar (Home · Products · Call · WhatsApp).
 * Desktop: a floating WhatsApp button and a back-to-top button.
 */
export function FloatingActions() {
  const { contact, wa } = useSite();
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tab = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.7rem] font-semibold transition active:scale-95";

  return (
    <>
      {/* Mobile bottom bar */}
      <nav
        aria-label={t.nav.quickActions}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(11_37_69/0.25)] backdrop-blur lg:hidden"
      >
        <div className="mx-auto flex max-w-lg items-stretch px-2">
          <Link href="/" className={cn(tab, pathname === "/" ? "text-navy-900" : "text-muted")}>
            <House className="size-5" aria-hidden="true" />
            {t.nav.home}
          </Link>
          <Link href="/products" className={cn(tab, pathname.startsWith("/products") ? "text-navy-900" : "text-muted")}>
            <LayoutGrid className="size-5" aria-hidden="true" />
            {t.nav.products}
          </Link>
          <a href={contact.phoneHref} className={cn(tab, "text-navy-900")}>
            <span className="grid size-9 -mt-5 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-950 text-white shadow-lift ring-4 ring-white">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            {t.common.call}
          </a>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={cn(tab, "text-whatsapp-dark")}>
            <span className="grid size-9 -mt-5 place-items-center rounded-full bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark text-white shadow-lift ring-4 ring-white">
              <WhatsAppIcon className="size-5" />
            </span>
            {t.nav.whatsapp}
          </a>
        </div>
      </nav>

      {/* Desktop floating buttons */}
      <div className="fixed right-6 bottom-6 z-30 hidden flex-col items-end gap-3 lg:flex">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.common.backToTop}
          tabIndex={showTop ? 0 : -1}
          aria-hidden={!showTop}
          className={cn(
            "grid size-11 place-items-center rounded-full border border-line bg-white text-navy-900 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift",
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
        <a
          href={wa()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.whatsapp} ${t.common.newTab}`}
          className="group relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark text-white shadow-lift transition hover:scale-105 hover:brightness-110"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark opacity-40 motion-safe:animate-ping [animation-duration:2.5s]" />
          <WhatsAppIcon className="relative size-7" />
          <span className="pointer-events-none absolute right-full mr-3 rounded-lg bg-gradient-to-br from-navy-700 to-navy-950 px-3 py-1.5 text-sm font-medium whitespace-nowrap opacity-0 shadow-card transition group-hover:opacity-100">
            {t.hero.whatsapp}
          </span>
        </a>
      </div>
    </>
  );
}
