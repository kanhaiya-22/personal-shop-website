"use client";

import { Download, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { dateLocale, locale, shopName, t } from "@/i18n";
import { cn, formatDate } from "@/lib/utils";
import type { Festival } from "@/types";
import { drawPoster, POSTER_H, POSTER_W } from "./drawPoster";

const cssFont = (variable: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return v ? `${v}, ${fallback}` : fallback;
};

/** Auto-generated festival greeting poster with download / share actions. */
export function FestivalPoster({ festival, date, actions = true, className }: { festival: Festival; date: string; actions?: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { contact, owners } = useSite();
  const [ready, setReady] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [origin, setOrigin] = useState("");
  const name = festival.name[locale];
  const greeting = festival.greeting[locale];

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const headingFont = cssFont("--font-heading", "sans-serif");
    const bodyFont = cssFont("--font-body", "sans-serif");
    const contactLine = [
      contact.hasPhone ? `☎ ${contact.phoneDisplay}` : "",
      contact.hasWhatsapp && contact.whatsappDisplay !== contact.phoneDisplay ? `WhatsApp ${contact.whatsappDisplay}` : "",
    ]
      .filter(Boolean)
      .join("   ·   ");

    const sample = `${greeting} ${festival.message[locale]} ${shopName}`;
    const loadImage = (src?: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    const ownerImages = Promise.all(owners.map((o) => loadImage(o.photo)));
    Promise.all([
      ownerImages,
      document.fonts.load(`700 80px ${headingFont}`, sample),
      document.fonts.load(`400 34px ${bodyFont}`, sample),
      document.fonts.load(`600 26px ${bodyFont}`, sample),
    ])
      .catch(() => undefined)
      .then((res) => {
        if (cancelled) return;
        const images = (Array.isArray(res) ? (res[0] as (HTMLImageElement | null)[]) : []) ?? [];
        drawPoster(canvas, festival, {
          shopName,
          wishesFrom: `${t.festivals.wishesFrom} · ${shopName}`,
          greeting,
          message: festival.message[locale],
          dateLabel: formatDate(date, dateLocale),
          tagline: locale === "hi" ? "बिल्डिंग मटेरियल • पेंट्स • वॉटरप्रूफिंग" : "Building Materials • Paints • Waterproofing",
          contactLine,
          owners: owners.map((o, i) => ({ name: o.name, image: images[i] ?? null })),
          headingFont,
          bodyFont,
        });
        setReady(true);
        setOrigin(window.location.origin);
        try {
          const probe = new File([""], "p.png", { type: "image/png" });
          setCanShareFiles(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
        } catch {
          setCanShareFiles(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [festival, date, greeting, contact, owners]);

  const fileName = `${festival.slug}-${date.slice(0, 4)}-shri-kanhaiya-traders.png`;

  const toBlob = () => new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve, "image/png") ?? resolve(null));

  async function download() {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  async function share() {
    const blob = await toBlob();
    if (!blob) return;
    try {
      await navigator.share({ files: [new File([blob], fileName, { type: "image/png" })], title: greeting, text: t.festivals.whatsappText(greeting) });
    } catch {
      // user cancelled
    }
  }

  const shareText = `${t.festivals.whatsappText(greeting)} ${origin}/festivals`;

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-700 to-navy-950 shadow-lift ring-1 ring-black/5" style={{ aspectRatio: `${POSTER_W} / ${POSTER_H}` }}>
        <canvas
          ref={canvasRef}
          width={POSTER_W}
          height={POSTER_H}
          role="img"
          aria-label={t.festivals.posterAlt(name)}
          className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
        />
        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-800 to-navy-950">
            <div className="flex flex-col items-center gap-3 text-sm text-navy-200">
              <span className="size-10 animate-spin rounded-full border-4 border-white/20 border-t-gold-400" aria-hidden="true" />
              {t.festivals.generating}
            </div>
          </div>
        )}
      </div>
      {actions && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={download} disabled={!ready} icon={<Download className="size-4" aria-hidden="true" />}>
            {t.festivals.download}
          </Button>
          {canShareFiles && (
            <Button size="sm" variant="outline" onClick={share} disabled={!ready} icon={<Share2 className="size-4" aria-hidden="true" />}>
              {t.festivals.share}
            </Button>
          )}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-[#3ddc84] to-whatsapp-dark px-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <WhatsAppIcon className="size-4" />
            {t.festivals.shareWhatsapp}
          </a>
        </div>
      )}
    </div>
  );
}
