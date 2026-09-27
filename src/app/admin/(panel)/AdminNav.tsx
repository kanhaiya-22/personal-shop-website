"use client";

import { ta } from "@/i18n";
import {
  Blocks,
  CalendarHeart,
  CircleHelp,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Star,
  Tags,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { logout } from "@/server/actions/admin";

const links = () => [
  { href: "/admin", label: ta.nav.dashboard, icon: LayoutDashboard },
  { href: "/admin/products", label: ta.nav.products, icon: Package },
  { href: "/admin/categories", label: ta.nav.categories, icon: Blocks },
  { href: "/admin/brands", label: ta.nav.brands, icon: Tags },
  { href: "/admin/team", label: ta.nav.team, icon: Users },
  { href: "/admin/reviews", label: ta.nav.reviews, icon: Star },
  { href: "/admin/faqs", label: ta.nav.faqs, icon: CircleHelp },
  { href: "/admin/festivals", label: ta.nav.festivals, icon: CalendarHeart },
  { href: "/admin/settings", label: ta.nav.settings, icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const nav = (
    <nav aria-label={ta.nav.admin} className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <LogoMark className="size-10" />
        <div className="leading-tight">
          <p className="font-display font-bold text-white">Shri Kanhaiya Traders</p>
          <p className="text-xs text-navy-300">{ta.panel}</p>
        </div>
      </div>
      <ul className="grid gap-1 px-3">
        {links().map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-white text-navy-900 shadow-sm" : "text-navy-100 hover:bg-white/10 hover:text-white",
                )}
              >
                <l.icon className="size-4.5" aria-hidden="true" />
                <span className="flex-1">{l.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto grid gap-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 hover:bg-white/10">
          <ExternalLink className="size-4.5" aria-hidden="true" />
          {ta.nav.viewSite}
        </a>
        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 hover:bg-white/10">
            <LogOut className="size-4.5" aria-hidden="true" />
            {ta.nav.signOut}
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="bg-blueprint fixed inset-y-0 left-0 z-30 hidden w-64 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 lg:block">{nav}</aside>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <LogoMark className="size-8" />
          <span className="font-display font-bold text-navy-900">{ta.nav.admin}</span>
        </div>
        <button type="button" onClick={() => setOpen(true)} aria-label={ta.nav.openMenu} aria-expanded={open} className="relative grid size-10 place-items-center rounded-lg hover:bg-navy-50">
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={ta.nav.menu}>
          <button type="button" aria-label={ta.nav.closeMenu} className="absolute inset-0 bg-navy-950/60" onClick={() => setOpen(false)} />
          <div className="bg-blueprint absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 shadow-lift motion-safe:animate-fade-up">
            <button type="button" onClick={() => setOpen(false)} aria-label={ta.nav.closeMenu} className="absolute top-4 right-3 grid size-9 place-items-center rounded-lg text-white hover:bg-white/10">
              <X className="size-5" aria-hidden="true" />
            </button>
            {nav}
          </div>
        </div>
      )}
    </>
  );
}
