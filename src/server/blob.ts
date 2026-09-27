import "server-only";

import { get, put } from "@vercel/blob";
import { blobStoreId, blobToken } from "./env";

/**
 * Vercel Blob uploads. Authenticates with a read-write token, or with Vercel
 * OIDC plus a store id. Public stores serve files from their blob URL; private
 * stores are streamed through /uploads/<name>.
 */
const blobAuth = () => {
  const token = blobToken();
  if (token) return { token };
  const storeId = blobStoreId();
  return storeId ? { storeId } : null;
};

export const blobConfigured = () => blobAuth() !== null;

/** Stores an upload and returns the URL the site should use, or null when no Blob store is connected. */
export async function uploadToBlob(name: string, bytes: Buffer, contentType: string): Promise<string | null> {
  const auth = blobAuth();
  if (!auth) return null;
  const pathname = `uploads/${name}`;
  try {
    const blob = await put(pathname, bytes, { access: "public", contentType, cacheControlMaxAge: 31536000, ...auth });
    return blob.url;
  } catch {
    // Private stores reject public uploads.
    await put(pathname, bytes, { access: "private", contentType, ...auth });
    return `/${pathname}`;
  }
}

/** Streams a private upload, forwarding an HTTP Range header so videos can seek. */
export async function readPrivateUpload(name: string, range: string | null) {
  const auth = blobAuth();
  if (!auth) return null;
  const result = await get(`uploads/${name}`, { access: "private", ...auth, ...(range ? { headers: { range } } : {}) });
  return result?.stream ? result : null;
}
