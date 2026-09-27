import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/server/auth";
import { UPLOADS_DIR } from "@/server/store";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};
const MAX_IMAGE = 8 * 1024 * 1024;
const MAX_VIDEO = 60 * 1024 * 1024;

/** Admin image / video upload → storage/uploads/<random>.<ext>, served at /uploads/<file>. */
export async function POST(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Please upload a JPG, PNG, WebP, AVIF or GIF image, or an MP4 / WebM video." }, { status: 415 });
  const isVideo = file.type.startsWith("video/");
  if (file.size > (isVideo ? MAX_VIDEO : MAX_IMAGE)) return NextResponse.json({ error: isVideo ? "Video is too large (max 60 MB)." : "Image is too large (max 8 MB)." }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  // Verify magic bytes so a renamed file can't pretend to be an image.
  const sig = bytes.subarray(0, 12).toString("hex");
  const looksValid =
    sig.startsWith("ffd8ff") ||
    sig.startsWith("89504e47") ||
    sig.startsWith("47494638") ||
    (sig.startsWith("52494646") && bytes.subarray(8, 12).toString() === "WEBP") ||
    bytes.subarray(4, 12).toString().startsWith("ftypavi") ||
    (isVideo && (bytes.subarray(4, 8).toString() === "ftyp" || sig.startsWith("1a45dfa3")));
  if (!looksValid) return NextResponse.json({ error: "This file doesn't look like a valid image." }, { status: 415 });

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(UPLOADS_DIR, name), bytes);
  return NextResponse.json({ url: `/uploads/${name}` });
}
