import { ta } from "@/i18n";
import { ImagePlus, LoaderCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

/** Uploads an image (or video) to /api/admin/upload and returns its public URL. */
export function ImageField({ value, onChange, label, kind = "image" }: { value?: string; onChange: (url: string | undefined) => void; label: string; kind?: "image" | "video" }) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || ta.image.failed);
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : ta.image.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-dashed border-line bg-surface">
          {value && kind === "video" ? (
            <video src={value} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
          ) : value ? (
            <Image src={value} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            <ImagePlus className="size-7 text-navy-300" aria-hidden="true" />
          )}
          {busy && (
            <span className="absolute inset-0 grid place-items-center bg-white/80">
              <LoaderCircle className="size-6 animate-spin text-navy-700" aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <label
            htmlFor={id}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 px-3.5 text-sm font-semibold text-white transition hover:brightness-110 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-gold-400"
          >
            <ImagePlus className="size-4" aria-hidden="true" />
            {value ? ta.image.replace : ta.image.upload} · {label}
            <input
              id={id}
              type="file"
              accept={kind === "video" ? "video/mp4,video/webm" : "image/jpeg,image/png,image/webp,image/avif,image/gif"}
              className="sr-only"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-line px-3.5 text-sm font-semibold text-navy-700 hover:border-red-300 hover:text-red-600"
            >
              <Trash className="size-4" aria-hidden="true" />
              {ta.image.remove}
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        {kind === "video" ? ta.image.hintVideo : ta.image.hintImage}
      </p>
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
