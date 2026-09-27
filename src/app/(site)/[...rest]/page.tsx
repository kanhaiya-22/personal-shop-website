import type { Metadata } from "next";
import { getSettings } from "@/server/store";
import { t } from "@/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return { title: t.notFound.title, robots: { index: false } };
}

/** Unknown URLs render the branded 404 inside the normal site layout. */
export default function CatchAll() {
  notFound();
}
