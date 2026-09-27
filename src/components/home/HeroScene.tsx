"use client";

import { MousePointerClick } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, useRef, useState } from "react";
import { Character } from "@/components/ui/Character";
import { Icon3D } from "@/components/ui/Icon3D";
import { locale, t } from "@/i18n";
import { cn } from "@/lib/utils";

const chips = [
  { icon: "cement", href: "/products?category=cement", label: { en: "Cement", hi: "सीमेंट" }, cls: "top-[6%] left-[2%]", tone: "bg-white text-navy-700", delay: "0s" },
  { icon: "palette", href: "/products?group=paints", label: { en: "Paints", hi: "पेंट" }, cls: "top-[2%] right-[6%]", tone: "bg-gradient-to-br from-gold-100 to-gold-50 text-gold-800", delay: "0.8s" },
  { icon: "steel", href: "/products?category=steel", label: { en: "TMT Steel", hi: "सरिया" }, cls: "top-[40%] -left-[2%]", tone: "bg-gradient-to-br from-sky to-white text-navy-700", delay: "1.6s" },
  { icon: "waterproofing", href: "/products?category=waterproofing", label: { en: "Waterproofing", hi: "वॉटरप्रूफिंग" }, cls: "top-[34%] -right-[1%]", tone: "bg-gradient-to-br from-sage to-white text-navy-700", delay: "0.4s" },
  { icon: "bricks", href: "/products?category=bricks-blocks", label: { en: "Bricks", hi: "ईंट" }, cls: "bottom-[30%] right-[26%] hidden sm:flex", tone: "bg-gradient-to-br from-lilac to-white text-navy-700", delay: "1.2s" },
];

const colours = [
  { hex: "#E4EFF3", name: { en: "Sky", hi: "आसमानी" } },
  { hex: "#F6D6C2", name: { en: "Peach", hi: "पीच" } },
  { hex: "#D5E6D0", name: { en: "Sage", hi: "सेज" } },
  { hex: "#F3E3B5", name: { en: "Sunshine", hi: "पीला" } },
  { hex: "#E9D3E3", name: { en: "Rose", hi: "गुलाबी" } },
  { hex: "#DAD4EE", name: { en: "Lavender", hi: "लैवेंडर" } },
];

/** Parallax layer: moves with the pointer by `depth` px (via CSS variables — no re-render). */
const layer = (depth: number): CSSProperties => ({
  transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
  transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
});

/**
 * Interactive hero: a house half-built in brick, half being painted.
 * - Move the mouse: layers shift for a 3D parallax feel
 * - Tap a swatch (or the wall): the painter rolls on that colour
 * - Floating chips link to their product categories
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [colour, setColour] = useState(0);
  const [coat, setCoat] = useState(0);

  const paint = (i: number) => {
    setColour(i);
    setCoat((c) => c + 1);
  };

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };

  const wall = colours[colour].hex;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none 2xl:max-w-[38rem]">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="relative aspect-[1/0.95] w-full">
        {/* soft backdrop */}
        <div aria-hidden="true" className="absolute inset-[6%]" style={layer(-6)}>
          <div className="h-full w-full rounded-[42%_58%_55%_45%/50%_45%_55%_50%] bg-gradient-to-br from-sage via-cream to-blush motion-safe:animate-float-slow" />
        </div>
        <div aria-hidden="true" className="skt-spin absolute inset-[16%] rounded-full border-2 border-dashed border-navy-200/70" />

        {/* house — click the wall to repaint */}
        <div className="absolute inset-x-[16%] top-[16%] w-[68%]" style={layer(10)}>
          <svg viewBox="0 0 320 260" className="w-full drop-shadow-[0_18px_30px_rgba(19,36,41,0.15)]" aria-hidden="true">
            <path d="M18 112 160 18l142 94Z" fill="#4E8189" />
            <path d="M160 18 302 112h-24L160 36 42 112H18Z" fill="#30535B" />
            <rect x="214" y="40" width="22" height="40" rx="3" fill="#9CC2C5" />
            {[0, 1.3, 2.6].map((d) => (
              <circle key={d} className="skt-smoke" cx="225" cy="30" r="7" fill="#FFFFFF" opacity="0" style={{ animationDelay: `${d}s` }} />
            ))}
            <rect x="42" y="106" width="118" height="140" fill="#E9C9AE" />
            {Array.from({ length: 9 }).map((_, row) =>
              Array.from({ length: 5 }).map((__, col) => (
                <rect key={`${row}-${col}`} x={42 + col * 25 - (row % 2 ? 12 : 0)} y={108 + row * 15.5} width="23" height="13" rx="2" fill="#E0AF8C" />
              )),
            )}
            <rect x="160" y="106" width="118" height="140" fill="#EADBC8" />
            {[
              [176, 128],
              [214, 206],
              [250, 150],
              [236, 226],
              [190, 196],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#D9C4AB" />
            ))}
            {/* fresh coat — re-mounting (key) replays the roll-on animation */}
            <g key={coat} className={coat ? "skt-coat" : "skt-reveal"}>
              <rect x="160" y="106" width="118" height="140" fill={wall} />
              <path d="M160 106h118v12c-10 0-10 10-20 10s-10-8-20-8-10 12-20 12-10-10-20-10-10 8-18 8-10-6-20-6Z" fill="#FFFFFF" opacity="0.35" />
              {[
                [182, 124, 0],
                [262, 200, 0.8],
                [228, 120, 1.6],
              ].map(([x, y, d]) => (
                <path key={x} className="skt-twinkle" d={`M${x} ${y - 7}q1 6 7 7q-6 1-7 7q-1-6-7-7q6-1 7-7Z`} fill="#FFFFFF" style={{ animationDelay: `${d}s` }} />
              ))}
            </g>
            <path d="M156 106v140" stroke="#F6B994" strokeWidth="8" strokeLinecap="round" />
            <rect x="190" y="136" width="56" height="44" rx="6" fill="#FBF6EF" stroke="#30535B" strokeWidth="4" />
            <path d="M218 136v44M190 158h56" stroke="#30535B" strokeWidth="3" />
            <rect x="72" y="170" width="46" height="76" rx="6" fill="#30535B" />
            <circle cx="108" cy="210" r="3.5" fill="#F09F72" />
            <rect x="20" y="244" width="280" height="8" rx="4" fill="#A8C3A0" />
          </svg>
          <button
            type="button"
            onClick={() => paint((colour + 1) % colours.length)}
            aria-label={t.hero.repaint}
            title={t.hero.repaint}
            className="absolute top-[40.8%] left-[50%] h-[53.8%] w-[36.9%] cursor-pointer rounded-sm"
          />
        </div>

        {/* characters */}
        <div aria-hidden="true" className="absolute bottom-[3%] left-[2%] w-[30%]" style={layer(18)}>
          <Character variant="builder" animated className="w-full motion-safe:animate-fade-up" />
        </div>
        <div aria-hidden="true" className="absolute right-[0%] bottom-[3%] w-[32%]" style={layer(18)}>
          <Character variant="painter" animated className="w-full motion-safe:animate-fade-up [animation-delay:150ms]" />
        </div>

        {/* floating chips — links to categories */}
        {chips.map((c) => (
          <div key={c.label.en} className={`absolute ${c.cls}`} style={layer(26)}>
            <Link
              href={c.href}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-card ring-1 ring-line transition-transform duration-300 hover:scale-110 hover:shadow-lift motion-safe:animate-float sm:text-sm ${c.tone}`}
              style={{ animationDelay: c.delay }}
            >
              <Icon3D name={c.icon} size={22} />
              {c.label[locale]}
            </Link>
          </div>
        ))}
      </div>

      {/* try-a-colour palette */}
      <div className="relative z-10 mx-auto -mt-2 flex w-max max-w-full flex-col items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 shadow-lift ring-1 ring-line backdrop-blur">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
          <MousePointerClick className="size-4 text-gold-600" aria-hidden="true" />
          {t.hero.tryColour}
        </p>
        <div role="radiogroup" aria-label={t.hero.tryColour} className="flex gap-2">
          {colours.map((c, i) => (
            <button
              key={c.hex}
              type="button"
              role="radio"
              aria-checked={colour === i}
              aria-label={c.name[locale]}
              title={c.name[locale]}
              onClick={() => paint(i)}
              className={cn(
                "size-8 rounded-full shadow-sm ring-2 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110",
                colour === i ? "scale-110 ring-navy-700 ring-offset-2" : "ring-white",
              )}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
