import type { Metadata } from "next";
import { SiteProvider } from "@/components/SiteProvider";
import { requireAdmin } from "@/server/auth";
import { getContent, toPublicSettings } from "@/server/store";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin" }, robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const { settings, team } = await getContent();
  return (
    <SiteProvider settings={toPublicSettings(settings)} owners={team.slice(0, 2).map((m) => ({ name: m.name, photo: m.photo }))}>
      <div className="min-h-dvh bg-surface">
        <AdminNav />
        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
        </main>
      </div>
    </SiteProvider>
  );
}
