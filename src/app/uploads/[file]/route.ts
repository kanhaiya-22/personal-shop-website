import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { UPLOADS_DIR } from "@/server/store";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  mp4: "video/mp4",
  webm: "video/webm",
};

/**
 * Serves admin-uploaded files from storage/uploads. File names are random and
 * immutable, so they're cached for a year. Supports HTTP Range requests,
 * which browsers (especially Safari) need to play videos.
 */
export async function GET(req: Request, ctx: RouteContext<"/uploads/[file]">) {
  const { file } = await ctx.params;
  if (!/^[a-z0-9-]+\.(jpe?g|png|webp|avif|gif|mp4|webm)$/i.test(file)) return new Response("Not found", { status: 404 });
  const full = path.join(UPLOADS_DIR, file);
  let size: number;
  try {
    size = (await fs.stat(full)).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const ext = file.split(".").pop()!.toLowerCase();
  const headers: Record<string, string> = {
    "Content-Type": MIME[ext] ?? "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "Accept-Ranges": "bytes",
  };

  const range = req.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (range) {
    let start = range[1] ? Number(range[1]) : size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : size - 1;
    start = Math.max(0, start);
    end = Math.min(size - 1, end);
    if (start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    const stream = Readable.toWeb(createReadStream(full, { start, end })) as ReadableStream;
    return new Response(stream, {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
    });
  }
  const stream = Readable.toWeb(createReadStream(full)) as ReadableStream;
  return new Response(stream, { headers: { ...headers, "Content-Length": String(size) } });
}
