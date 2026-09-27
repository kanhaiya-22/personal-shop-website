import "server-only";

import { headers } from "next/headers";
import { getSettings } from "./store";

/** Public base URL: Admin → Settings → Website URL, else detected from the request. */
export async function getSiteUrl() {
  const configured = (await getSettings()).siteUrl.trim().replace(/\/+$/, "");
  if (configured) return configured;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}
