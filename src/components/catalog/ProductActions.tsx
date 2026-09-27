"use client";

import { ClipboardCopy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecent } from "./RecentProvider";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";

/** Share / copy actions on the product page; also records the view for "Recently viewed". */
export function ProductActions({ productId, name }: { productId: string; name: string }) {
  const { trackView } = useRecent();
  const [flash, setFlash] = useState("");

  useEffect(() => {
    trackView(productId);
  }, [productId, trackView]);

  const notify = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2000);
  };

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: t.whatsappMsg.product(name), url });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard?.writeText(url).catch(() => undefined);
    notify(t.product.linkCopied);
  }

  async function copyName() {
    await navigator.clipboard?.writeText(name).catch(() => undefined);
    notify(t.product.copied);
  }

  const btn = "inline-flex h-10 items-center gap-2 rounded-xl border-2 border-line px-3.5 text-sm font-semibold text-navy-800 transition hover:border-navy-900";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={share} className={btn}>
        <Share2 className="size-4" aria-hidden="true" />
        {t.product.share}
      </button>
      <button type="button" onClick={copyName} className={btn}>
        <ClipboardCopy className="size-4" aria-hidden="true" />
        {t.product.copyName}
      </button>
      <span role="status" aria-live="polite" className={cn("text-sm font-semibold text-emerald-700 transition-opacity", flash ? "opacity-100" : "opacity-0")}>
        {flash}
      </span>
    </div>
  );
}
