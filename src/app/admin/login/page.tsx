import { ta } from "@/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoMark } from "@/components/layout/Logo";
import { isAdmin, isAdminConfigured } from "@/server/auth";
import { SiteProvider } from "@/components/SiteProvider";
import { getSettings, toPublicSettings } from "@/server/store";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const settings = await getSettings(); // sets the admin language
  const configured = isAdminConfigured();
  return (
    <SiteProvider settings={toPublicSettings(settings)}>
    <main className="bg-blueprint relative grid min-h-dvh place-items-center bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-4">
      <div aria-hidden="true" className="absolute top-0 right-0 size-96 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-lift sm:p-9 motion-safe:animate-fade-up">
        <div className="flex items-center gap-3">
          <LogoMark className="size-12" />
          <div>
            <p className="font-display text-lg font-bold text-navy-900">Shri Kanhaiya Traders</p>
            <p className="text-sm text-muted">{ta.panel}</p>
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-bold">{ta.login.title}</h1>
        <p className="mt-1 text-sm text-muted">{ta.login.subtitle}</p>
        <div className="mt-6">
          {configured ? (
            <LoginForm />
          ) : (
            <p role="alert" className="rounded-xl bg-gold-50 p-4 text-sm text-gold-900">{ta.login.notConfigured}</p>
          )}
        </div>
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-navy-600 hover:text-navy-900">
          {ta.login.back}
        </Link>
      </div>
    </main>
    </SiteProvider>
  );
}
