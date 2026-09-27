import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import { blobConfigured } from "./blob";
import { UPLOADS_DIR } from "./store";

/** True when a media URL can actually be served (local file present, or an https URL). */
export function mediaAvailable(url: string) {
  if (!url) return false;
  if (/^https:\/\//i.test(url)) return true;
  const clean = url.split("?")[0];
  if (clean.startsWith("/uploads/")) return blobConfigured() || existsSync(path.join(UPLOADS_DIR, path.basename(clean)));
  if (!/^\/(videos|images)\/[\w./-]+$/.test(clean) || clean.includes("..")) return false;
  return existsSync(path.join(/*turbopackIgnore: true*/ process.cwd(), "public", clean));
}
