"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { mainNav, secondaryNav } from "./nav-links";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  // Building materials and paints are part of the Products section.
  if (href === "/products" && (pathname === "/building-materials" || pathname === "/paints")) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function Navbar() {
  const pathname = usePathname();
  const { contact, wa } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgb(11_37_69/0.25)]" : "border-transparent",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-2 sm:gap-4">
        <Logo />

        <nav aria-label={t.nav.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav().map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-2.5 py-2 text-[0.94rem] font-medium whitespace-nowrap transition-colors",
                      active ? "text-navy-900" : "text-muted hover:text-navy-900",
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden md:block">
            <ButtonAnchor href={contact.phoneHref} variant="outline" size="sm" icon={<Phone className="size-4" aria-hidden="true" />}>
              {t.nav.callNow}
            </ButtonAnchor>
          </div>
          <div className="hidden sm:block">
            <ButtonAnchor href={wa()} external variant="whatsapp" size="sm" icon={<WhatsAppIcon className="size-4" />}>
              {t.nav.whatsapp}
            </ButtonAnchor>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-navy-900 transition hover:bg-navy-50 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.mainNav}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-white xl:hidden"
      >
        <div className="container-site flex min-h-full flex-col py-6 motion-safe:animate-fade-up">
          <nav aria-label={t.nav.mainNav}>
            <ul className="grid gap-1">
              {[...mainNav(), ...secondaryNav()].map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-lg font-semibold transition",
                        active ? "bg-gradient-to-br from-navy-50 to-white text-navy-900" : "text-ink hover:bg-surface",
                      )}
                    >
                      <span className={cn("grid size-10 place-items-center rounded-xl", active ? "bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700" : "bg-surface text-navy-600")}>
                        <l.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1">{l.label}</span>
                      {active && <span aria-hidden="true" className="size-2 rounded-full bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
            <ButtonAnchor href={contact.phoneHref} variant="primary" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
              {t.nav.callNow}
            </ButtonAnchor>
            <ButtonAnchor href={wa()} external variant="whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />}>
              {t.nav.whatsapp}
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </header>
  );
}
