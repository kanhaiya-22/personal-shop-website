import type { Festival, FestivalMotif } from "@/types";

/**
 * Draws a 1080×1350 (4:5, ideal for WhatsApp / Instagram) festival greeting
 * poster onto a canvas. Everything is vector-drawn — no image assets needed —
 * so a poster is generated automatically for any festival in the calendar.
 */

export const POSTER_W = 1080;
export const POSTER_H = 1350;

export interface PosterText {
  shopName: string;
  wishesFrom: string;
  greeting: string;
  message: string;
  dateLabel: string;
  tagline: string;
  contactLine: string;
  /** Owners shown as round portraits in the footer band (photo optional → initials) */
  owners: { name: string; image?: HTMLImageElement | null }[];
  headingFont: string;
  bodyFont: string;
}

type Ctx = CanvasRenderingContext2D;

function rng(seedText: string) {
  let a = [...seedText].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 2166136261);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const n = Number.parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrap(ctx: Ctx, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,.;:!?—-]+$/, "")}…`;
    return kept;
  }
  return lines;
}

/** Fits a single heading into maxWidth by shrinking, then wrapping to 2 lines. */
function fitHeading(ctx: Ctx, text: string, font: string, maxWidth: number, start: number, min: number) {
  for (let size = start; size >= min; size -= 2) {
    ctx.font = `700 ${size}px ${font}`;
    if (ctx.measureText(text).width <= maxWidth) return { size, lines: [text] };
  }
  ctx.font = `700 ${start - 8}px ${font}`;
  return { size: start - 8, lines: wrap(ctx, text, maxWidth, 2) };
}

function star(ctx: Ctx, x: number, y: number, r: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
  ctx.restore();
}

function glow(ctx: Ctx, x: number, y: number, r: number, color: string, alpha = 0.55) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, hexToRgba(color, alpha));
  g.addColorStop(1, hexToRgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

// ─── Motifs ────────────────────────────────────────────────

function diya(ctx: Ctx, x: number, y: number, s: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  glow(ctx, 0, -70, 220, "#FDE047", 0.45);
  // flame
  ctx.save();
  ctx.shadowColor = "#FDE047";
  ctx.shadowBlur = 50;
  const fg = ctx.createRadialGradient(0, -55, 4, 0, -60, 80);
  fg.addColorStop(0, "#FFFFFF");
  fg.addColorStop(0.35, "#FEF08A");
  fg.addColorStop(1, "#F97316");
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.bezierCurveTo(-40, -42, -26, -100, 0, -150);
  ctx.bezierCurveTo(26, -100, 40, -42, 0, -12);
  ctx.fill();
  ctx.restore();
  // bowl
  const bg = ctx.createLinearGradient(0, -10, 0, 90);
  bg.addColorStop(0, "#F59E0B");
  bg.addColorStop(1, "#9A3412");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.moveTo(-125, 0);
  ctx.bezierCurveTo(-110, 80, 110, 80, 125, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#FCD34D";
  ctx.beginPath();
  ctx.ellipse(0, 0, 125, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#B45309";
  ctx.beginPath();
  ctx.ellipse(0, 2, 100, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // decorative dots on bowl
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(i * 26, 38 - Math.abs(i) * 3, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function motifDiya(ctx: Ctx, cx: number, cy: number, f: Festival, rand: () => number) {
  for (let i = 0; i < 26; i++) star(ctx, 160 + rand() * 760, 180 + rand() * 440, 4 + rand() * 9, hexToRgba(f.theme.accent, 0.4 + rand() * 0.5));
  diya(ctx, cx - 250, cy + 130, 0.62);
  diya(ctx, cx + 250, cy + 130, 0.62);
  diya(ctx, cx, cy + 90, 1.05);
}

function motifRangoli(ctx: Ctx, cx: number, cy: number, f: Festival) {
  const palette = [f.theme.accent, "#FFFFFF", "#FB923C", "#F472B6", "#FDE047"];
  glow(ctx, cx, cy, 300, f.theme.accent, 0.3);
  ctx.save();
  ctx.translate(cx, cy);
  for (let ring = 4; ring >= 0; ring--) {
    const n = 8 + ring * 4;
    const dist = 30 + ring * 44;
    for (let i = 0; i < n; i++) {
      ctx.save();
      ctx.rotate((i / n) * Math.PI * 2 + (ring % 2 ? Math.PI / n : 0));
      ctx.fillStyle = hexToRgba(palette[ring % palette.length], ring === 0 ? 1 : 0.85);
      ctx.beginPath();
      ctx.ellipse(0, -dist - 16, 11 + ring * 2.6, 26 + ring * 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.fillStyle = f.theme.accent;
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.setLineDash([2, 14]);
  ctx.lineCap = "round";
  ctx.strokeStyle = hexToRgba("#FFFFFF", 0.8);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 262, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function motifKites(ctx: Ctx, cx: number, cy: number, f: Festival) {
  glow(ctx, cx + 230, cy - 150, 260, "#FDE68A", 0.6);
  ctx.fillStyle = "#FDE68A";
  ctx.beginPath();
  ctx.arc(cx + 230, cy - 150, 80, 0, Math.PI * 2);
  ctx.fill();
  const kite = (x: number, y: number, s: number, rot: number, c1: string, c2: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(s, s);
    ctx.fillStyle = c1;
    ctx.beginPath();
    ctx.moveTo(0, -110);
    ctx.lineTo(85, 0);
    ctx.lineTo(0, 130);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = c2;
    ctx.beginPath();
    ctx.moveTo(0, -110);
    ctx.lineTo(-85, 0);
    ctx.lineTo(0, 130);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-85, 0);
    ctx.lineTo(85, 0);
    ctx.moveTo(0, -110);
    ctx.lineTo(0, 130);
    ctx.stroke();
    // tail
    ctx.strokeStyle = c1;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.bezierCurveTo(-30, 180, 30, 220, 0, 270);
    ctx.stroke();
    ctx.fillStyle = c2;
    for (const ty of [175, 225]) {
      ctx.beginPath();
      ctx.moveTo(0, ty);
      ctx.lineTo(-16, ty - 10);
      ctx.lineTo(-16, ty + 10);
      ctx.closePath();
      ctx.moveTo(0, ty);
      ctx.lineTo(16, ty - 10);
      ctx.lineTo(16, ty + 10);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };
  // strings
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2;
  for (const [x, y] of [
    [cx - 180, cy - 30],
    [cx + 40, cy + 20],
    [cx + 250, cy + 110],
  ]) {
    ctx.beginPath();
    ctx.moveTo(x, y + 60);
    ctx.quadraticCurveTo(x - 120, y + 240, cx - 60, cy + 330);
    ctx.stroke();
  }
  kite(cx - 180, cy - 80, 0.95, -0.25, "#F43F5E", "#FB923C");
  kite(cx + 40, cy - 20, 0.7, 0.2, f.theme.accent, "#22C55E");
  kite(cx + 250, cy + 60, 0.55, 0.35, "#3B82F6", "#A855F7");
}

function motifSplash(ctx: Ctx, cx: number, cy: number, _f: Festival, rand: () => number) {
  const colors = ["#F43F5E", "#FACC15", "#22C55E", "#3B82F6", "#A855F7", "#F97316", "#EC4899", "#06B6D4"];
  ctx.save();
  for (let i = 0; i < 46; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.pow(rand(), 0.7) * 300;
    const r = 18 + rand() * 90;
    const c = colors[i % colors.length];
    ctx.globalAlpha = 0.45 + rand() * 0.35;
    ctx.shadowColor = c;
    ctx.shadowBlur = 30;
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d * 1.3, cy + Math.sin(a) * d * 0.8, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  // pichkari-style droplets
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(cx - 380 + rand() * 760, cy - 300 + rand() * 600, 3 + rand() * 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function petal(ctx: Ctx, len: number, width: number) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-width, -len * 0.35, -width * 0.6, -len * 0.85, 0, -len);
  ctx.bezierCurveTo(width * 0.6, -len * 0.85, width, -len * 0.35, 0, 0);
  ctx.closePath();
}

function motifLotus(ctx: Ctx, cx: number, cy: number, f: Festival) {
  glow(ctx, cx, cy - 20, 320, f.theme.accent, 0.45);
  const base = cy + 150;
  ctx.save();
  ctx.translate(cx, base);
  const layers = [
    { n: 9, spread: 1.55, len: 250, w: 70, from: "#FBCFE8", to: "#EC4899" },
    { n: 7, spread: 1.1, len: 220, w: 72, from: "#FFFFFF", to: "#F472B6" },
    { n: 5, spread: 0.6, len: 190, w: 70, from: "#FFFFFF", to: "#FBCFE8" },
  ];
  for (const l of layers) {
    for (let i = 0; i < l.n; i++) {
      const a = -l.spread / 2 + (l.spread * i) / (l.n - 1);
      ctx.save();
      ctx.rotate(a);
      const g = ctx.createLinearGradient(0, 0, 0, -l.len);
      g.addColorStop(0, l.to);
      g.addColorStop(1, l.from);
      ctx.fillStyle = g;
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 2;
      petal(ctx, l.len, l.w);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.fillStyle = f.theme.accent;
  ctx.beginPath();
  ctx.ellipse(0, -12, 60, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx - 300 + i * 40, base + 40 + i * 26);
    ctx.quadraticCurveTo(cx, base + 10 + i * 26, cx + 300 - i * 40, base + 40 + i * 26);
    ctx.stroke();
  }
}

function motifMoon(ctx: Ctx, cx: number, cy: number, f: Festival, rand: () => number) {
  for (let i = 0; i < 60; i++) star(ctx, 120 + rand() * 840, 150 + rand() * 500, 2 + rand() * 7, `rgba(255,255,255,${0.35 + rand() * 0.6})`);
  glow(ctx, cx, cy, 320, f.theme.accent, 0.5);
  const g = ctx.createRadialGradient(cx - 50, cy - 50, 20, cx, cy, 180);
  g.addColorStop(0, "#FFFFFF");
  g.addColorStop(1, f.theme.accent);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  for (const [dx, dy, r] of [
    [-50, -30, 30],
    [40, 40, 22],
    [60, -60, 14],
    [-20, 70, 18],
  ]) {
    ctx.beginPath();
    ctx.arc(cx + dx, cy + dy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function motifFeather(ctx: Ctx, cx: number, cy: number, f: Festival) {
  glow(ctx, cx, cy, 320, "#34D399", 0.3);
  ctx.save();
  ctx.translate(cx + 40, cy + 40);
  ctx.rotate(-0.35);
  // barbs
  ctx.strokeStyle = "rgba(52,211,153,0.75)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 46; i++) {
    const y = 250 - i * 11;
    const w = 40 + Math.sin((i / 46) * Math.PI) * 150;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(-w * 0.6, y - 30, -w, y - 60);
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(w * 0.6, y - 30, w, y - 60);
    ctx.stroke();
  }
  // stem
  ctx.strokeStyle = "#FDE68A";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 330);
  ctx.quadraticCurveTo(-10, 60, 0, -230);
  ctx.stroke();
  // eye
  const eye = [
    { rx: 105, ry: 145, c: "#10B981" },
    { rx: 84, ry: 118, c: f.theme.accent },
    { rx: 66, ry: 94, c: "#0D9488" },
    { rx: 46, ry: 66, c: "#1E3A8A" },
  ];
  for (const e of eye) {
    ctx.fillStyle = e.c;
    ctx.beginPath();
    ctx.ellipse(0, -110, e.rx, e.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#0B1B3F";
  ctx.beginPath();
  ctx.ellipse(0, -95, 26, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // flute
  ctx.save();
  ctx.translate(cx - 20, cy + 210);
  ctx.rotate(-0.18);
  const fl = ctx.createLinearGradient(0, -14, 0, 14);
  fl.addColorStop(0, "#FCD34D");
  fl.addColorStop(1, "#B45309");
  ctx.fillStyle = fl;
  roundRect(ctx, -330, -14, 660, 28, 14);
  ctx.fill();
  ctx.fillStyle = "#7C2D12";
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(-120 + i * 48, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#DC2626";
  ctx.fillRect(-250, -16, 16, 32);
  ctx.fillRect(210, -16, 16, 32);
  ctx.restore();
}

function gearPath(ctx: Ctx, x: number, y: number, r: number, teeth: number) {
  ctx.beginPath();
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 ? r : r * 1.16;
    const a2 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    ctx.lineTo(x + Math.cos(a2) * rr, y + Math.sin(a2) * rr);
  }
  ctx.closePath();
}

function motifGear(ctx: Ctx, cx: number, cy: number, f: Festival, rand: () => number) {
  glow(ctx, cx, cy, 320, f.theme.accent, 0.35);
  for (let i = 0; i < 20; i++) star(ctx, 150 + rand() * 780, 200 + rand() * 440, 3 + rand() * 7, hexToRgba(f.theme.accent, 0.6));
  const g1 = ctx.createLinearGradient(cx - 200, cy - 200, cx + 100, cy + 200);
  g1.addColorStop(0, "#FDE68A");
  g1.addColorStop(1, f.theme.accent);
  ctx.fillStyle = g1;
  gearPath(ctx, cx - 60, cy + 10, 170, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(31,56,63,0.9)";
  ctx.beginPath();
  ctx.arc(cx - 60, cy + 10, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  gearPath(ctx, cx + 170, cy - 130, 80, 10);
  ctx.fill();
  ctx.fillStyle = "rgba(31,56,63,0.9)";
  ctx.beginPath();
  ctx.arc(cx + 170, cy - 130, 30, 0, Math.PI * 2);
  ctx.fill();
  // spanner across the big gear
  ctx.save();
  ctx.translate(cx - 60, cy + 10);
  ctx.rotate(-0.8);
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, -22, -40, 44, 280, 18);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 250, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(31,56,63,0.9)";
  ctx.fillRect(-16, 250, 32, 60);
  ctx.restore();
}

function motifRakhi(ctx: Ctx, cx: number, cy: number, f: Festival) {
  glow(ctx, cx, cy, 320, f.theme.accent, 0.4);
  // thread
  for (const [color, off] of [
    ["#DC2626", -6],
    [f.theme.accent, 6],
  ] as const) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(90, cy + 40 + off);
    ctx.bezierCurveTo(cx - 200, cy - 60 + off, cx + 200, cy + 140 + off, 990, cy + off);
    ctx.stroke();
  }
  // beads
  ctx.fillStyle = "#FDE047";
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const x = 160 + t * 760;
    if (Math.abs(x - cx) < 200) continue;
    ctx.beginPath();
    ctx.arc(x, cy + 30 - Math.sin(t * Math.PI) * 20, 12, 0, Math.PI * 2);
    ctx.fill();
  }
  // rosette
  ctx.save();
  ctx.translate(cx, cy + 20);
  const rings = [
    { n: 16, d: 150, rx: 32, ry: 60, c: "#F43F5E" },
    { n: 12, d: 110, rx: 30, ry: 50, c: f.theme.accent },
    { n: 10, d: 72, rx: 26, ry: 40, c: "#FFFFFF" },
  ];
  for (const r of rings) {
    for (let i = 0; i < r.n; i++) {
      ctx.save();
      ctx.rotate((i / r.n) * Math.PI * 2);
      ctx.fillStyle = r.c;
      ctx.beginPath();
      ctx.ellipse(0, -r.d + r.ry * 0.5, r.rx, r.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  const stone = ctx.createRadialGradient(-15, -15, 5, 0, 0, 60);
  stone.addColorStop(0, "#FFFFFF");
  stone.addColorStop(0.3, "#FCA5A5");
  stone.addColorStop(1, "#B91C1C");
  ctx.fillStyle = stone;
  ctx.beginPath();
  ctx.arc(0, 0, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function motifSun(ctx: Ctx, cx: number, cy: number, f: Festival) {
  glow(ctx, cx, cy, 360, f.theme.accent, 0.55);
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 24; i++) {
    ctx.save();
    ctx.rotate((i / 24) * Math.PI * 2);
    ctx.fillStyle = hexToRgba(i % 2 ? "#FFFFFF" : f.theme.accent, i % 2 ? 0.55 : 0.9);
    ctx.beginPath();
    ctx.moveTo(-18, -170);
    ctx.lineTo(0, i % 2 ? -250 : -290);
    ctx.lineTo(18, -170);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  const g = ctx.createRadialGradient(-40, -40, 20, 0, 0, 165);
  g.addColorStop(0, "#FFFFFF");
  g.addColorStop(0.4, "#FDE68A");
  g.addColorStop(1, "#F59E0B");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 118, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

const motifs: Record<FestivalMotif, (ctx: Ctx, cx: number, cy: number, f: Festival, rand: () => number) => void> = {
  diya: motifDiya,
  rangoli: motifRangoli,
  kites: motifKites,
  splash: motifSplash,
  lotus: motifLotus,
  moon: motifMoon,
  feather: motifFeather,
  gear: motifGear,
  rakhi: motifRakhi,
  sun: motifSun,
};

// ─── Poster ────────────────────────────────────────────────

export function drawPoster(canvas: HTMLCanvasElement, festival: Festival, text: PosterText) {
  canvas.width = POSTER_W;
  canvas.height = POSTER_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { theme } = festival;
  const rand = rng(festival.slug);
  const W = POSTER_W;
  const H = POSTER_H;

  // Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, theme.from);
  bg.addColorStop(1, theme.to);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const vignette = ctx.createRadialGradient(W / 2, 520, 100, W / 2, 620, 900);
  vignette.addColorStop(0, "rgba(255,255,255,0.14)");
  vignette.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // Faint mandala watermark corners
  ctx.save();
  ctx.strokeStyle = hexToRgba(theme.accent, 0.14);
  ctx.lineWidth = 2;
  for (const [x, y] of [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ]) {
    for (let r = 60; r <= 260; r += 40) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Motif
  motifs[festival.motif](ctx, W / 2, 470, festival, rand);

  // Frame
  ctx.strokeStyle = hexToRgba(theme.accent, 0.95);
  ctx.lineWidth = 4;
  roundRect(ctx, 36, 36, W - 72, H - 72, 30);
  ctx.stroke();
  ctx.strokeStyle = hexToRgba(theme.accent, 0.45);
  ctx.lineWidth = 1.5;
  roundRect(ctx, 52, 52, W - 104, H - 104, 22);
  ctx.stroke();
  for (const [x, y] of [
    [36, H / 2],
    [W - 36, H / 2],
    [W / 2, 36],
  ]) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = theme.accent;
    ctx.fillRect(-9, -9, 18, 18);
    ctx.restore();
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Header ribbon
  ctx.font = `600 26px ${text.bodyFont}`;
  const header = text.wishesFrom;
  const hw = ctx.measureText(header).width + 70;
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, W / 2 - hw / 2, 92, hw, 56, 28);
  ctx.fill();
  ctx.fillStyle = theme.accent;
  ctx.fillText(header, W / 2, 130);

  // Greeting
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = theme.text;
  const heading = fitHeading(ctx, text.greeting, text.headingFont, 900, 84, 60);
  ctx.font = `700 ${heading.size}px ${text.headingFont}`;
  let y = 820 - (heading.lines.length - 1) * heading.size * 0.62;
  for (const line of heading.lines) {
    ctx.fillText(line, W / 2, y);
    y += heading.size * 1.22;
  }
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Ornamental divider
  y -= heading.size * 0.5;
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 170, y);
  ctx.lineTo(W / 2 - 24, y);
  ctx.moveTo(W / 2 + 24, y);
  ctx.lineTo(W / 2 + 170, y);
  ctx.stroke();
  ctx.save();
  ctx.translate(W / 2, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(-9, -9, 18, 18);
  ctx.restore();
  y += 62;

  // Message
  ctx.font = `400 34px ${text.bodyFont}`;
  ctx.fillStyle = hexToRgba(theme.text === "#FFFFFF" ? "#FFFFFF" : theme.text, 0.92);
  for (const line of wrap(ctx, text.message, 820, 3)) {
    ctx.fillText(line, W / 2, y);
    y += 50;
  }

  // Date
  if (text.dateLabel) {
    ctx.font = `600 26px ${text.bodyFont}`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(text.dateLabel, W / 2, Math.min(y + 18, 1068));
  }

  // Footer band
  const bandY = 1100;
  const bandH = 182;
  ctx.fillStyle = "rgba(19,36,41,0.9)";
  roundRect(ctx, 72, bandY, W - 144, bandH, 24);
  ctx.fill();
  ctx.strokeStyle = hexToRgba("#F09F72", 0.8);
  ctx.lineWidth = 2;
  roundRect(ctx, 72, bandY, W - 144, bandH, 24);
  ctx.stroke();

  // SKT monogram
  const lx = 112;
  const ly = bandY + (bandH - 90) / 2;
  ctx.fillStyle = "#27444B";
  roundRect(ctx, lx, ly, 90, 90, 22);
  ctx.fill();
  ctx.save();
  ctx.translate(lx, ly);
  ctx.scale(90 / 64, 90 / 64);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#F09F72";
  ctx.lineWidth = 3.6;
  ctx.stroke(new Path2D("M22 19 32 11.5 42 19"));
  ctx.lineWidth = 3;
  ctx.stroke(new Path2D("M14 50.5Q32 46.5 50 50.5"));
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3.6;
  ctx.stroke(new Path2D("M21 29.2c-.6-1.9-2.2-3.2-4.7-3.2-2.9 0-4.8 1.6-4.8 4 0 2.4 1.9 3.2 4.8 3.9 3 .7 5 1.6 5 4.1 0 2.5-2.1 4-5 4-2.7 0-4.5-1.2-5.3-3.2M27 26v16M36 26l-8 9M30.5 33.2 36.5 42M40.5 26h12M46.5 26v16"));
  ctx.restore();

  const hasOwners = text.owners.length > 0;
  const textMax = hasOwners ? 440 : 740;
  const fitFont = (str: string, weight: number, size: number, min: number, family: string) => {
    for (let px = size; px >= min; px--) {
      ctx.font = `${weight} ${px}px ${family}`;
      if (ctx.measureText(str).width <= textMax) return;
    }
  };
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#FFFFFF";
  fitFont(text.shopName, 700, 38, 26, text.headingFont);
  ctx.fillText(text.shopName, 230, bandY + 70);
  ctx.fillStyle = "#F6B994";
  fitFont(text.tagline, 500, 21, 15, text.bodyFont);
  ctx.fillText(text.tagline, 230, bandY + 106);
  if (text.contactLine) {
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    fitFont(text.contactLine, 500, 22, 15, text.bodyFont);
    ctx.fillText(text.contactLine, 230, bandY + 142);
  }

  // divider between the text column and the portraits
  if (hasOwners) {
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(706, bandY + 28);
    ctx.lineTo(706, bandY + bandH - 28);
    ctx.stroke();
  }

  // Owner portraits (right side of the band)
  const owners = text.owners.slice(0, 2);
  const R = 44;
  owners.forEach((o, i) => {
    const slot = 130;
    const cx = 918 - (owners.length - 1 - i) * slot;
    const cy = bandY + 70;
    // gold ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R + 5, 0, Math.PI * 2);
    const ring = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    ring.addColorStop(0, "#FDE68A");
    ring.addColorStop(1, "#F09F72");
    ctx.fillStyle = ring;
    ctx.fill();
    // photo or initials
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (o.image && o.image.naturalWidth > 0) {
      const { naturalWidth: w, naturalHeight: h } = o.image;
      const scale = Math.max((R * 2) / w, (R * 2) / h);
      const dw = w * scale;
      const dh = h * scale;
      ctx.drawImage(o.image, cx - dw / 2, cy - dh / 2 - (dh - R * 2) * 0.15, dw, dh);
    } else {
      const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      g.addColorStop(0, "#4E8189");
      g.addColorStop(1, "#1F383F");
      ctx.fillStyle = g;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.fillStyle = "#FBCD4E";
      ctx.font = `700 36px ${text.headingFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const initials = o.name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
      ctx.fillText(initials, cx, cy + 2);
    }
    ctx.restore();
    // name
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#FFFFFF";
    const label = o.name.split(/\s+/).slice(0, 2).join(" ");
    for (let px = 17; px >= 12; px--) {
      ctx.font = `600 ${px}px ${text.bodyFont}`;
      if (ctx.measureText(label).width <= 120) break;
    }
    ctx.fillText(label, cx, bandY + 146);
    ctx.restore();
  });
}
