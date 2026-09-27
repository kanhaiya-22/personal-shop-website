"use client";

import { useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { Icon3D } from "@/components/ui/Icon3D";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";

const nodes = [
  { key: "homeowners", icon: "house", x: 50, y: 8 },
  { key: "contractors", icon: "worker", x: 88, y: 30 },
  { key: "builders", icon: "bricks", x: 88, y: 72 },
  { key: "painters", icon: "palette", x: 50, y: 92 },
  { key: "architects", icon: "estimate", x: 12, y: 72 },
  { key: "engineers", icon: "quality", x: 12, y: 30 },
] as const;

type Key = (typeof nodes)[number]["key"];

/** Interactive "who we serve" network: hover/tap a group to see how the shop supports them. */
export function RelationsNetwork() {
  const [active, setActive] = useState<Key>("homeowners");
  const groups = t.about.network.groups;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
        {/* connection lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#C5DCDD" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
          {nodes.map((n) => {
            const on = n.key === active;
            return (
              <g key={n.key}>
                <line x1="50" y1="50" x2={n.x} y2={n.y} stroke={on ? "#F09F72" : "#C5DCDD"} strokeWidth={on ? 1.1 : 0.6} strokeLinecap="round" style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                {/* supplies flowing from the shop to the customer */}
                <circle r={on ? 1.6 : 1} fill={on ? "#F09F72" : "#9CC2C5"} className="skt-flow">
                  <animateMotion dur={on ? "1.6s" : "3.2s"} repeatCount="indefinite" path={`M50 50 L${n.x} ${n.y}`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* centre: the shop */}
        <div className="absolute top-1/2 left-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-white to-surface shadow-lift ring-4 ring-white">
          <LogoMark className="size-[62%]" />
          <span aria-hidden="true" className="absolute inset-0 rounded-full ring-2 ring-gold-300/60 motion-safe:animate-ping [animation-duration:2.6s]" />
        </div>

        {/* customer groups */}
        {nodes.map((n) => {
          const on = n.key === active;
          return (
            <button
              key={n.key}
              type="button"
              onMouseEnter={() => setActive(n.key)}
              onFocus={() => setActive(n.key)}
              onClick={() => setActive(n.key)}
              aria-pressed={on}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl p-1 transition-transform duration-300",
                on ? "z-10 scale-110" : "hover:scale-105",
              )}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-2xl bg-white shadow-card ring-2 transition-all duration-300 sm:size-16",
                  on ? "shadow-lift ring-gold-300" : "ring-line",
                )}
              >
                <Icon3D name={n.icon} size={36} />
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap transition-colors", on ? "bg-gradient-to-br from-gold-200 to-gold-400 text-navy-950" : "bg-white/90 text-navy-800 ring-1 ring-line")}>
                {groups[n.key].name}
              </span>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div aria-live="polite" className="rounded-3xl border border-line bg-gradient-to-br from-white to-surface p-6 shadow-card sm:p-8">
        <p className="text-xs font-bold tracking-[0.14em] text-gold-700 uppercase">{t.about.network.forLabel}</p>
        <h3 key={active} className="mt-2 text-2xl font-bold motion-safe:animate-fade-up">
          {groups[active].name}
        </h3>
        <p key={`${active}-t`} className="mt-3 leading-relaxed text-muted motion-safe:animate-fade-up">
          {groups[active].text}
        </p>
        <ul key={`${active}-l`} className="mt-5 flex flex-wrap gap-2 motion-safe:animate-fade-up">
          {groups[active].needs.map((need) => (
            <li key={need} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-navy-800 shadow-sm ring-1 ring-line">
              {need}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">{t.about.network.hint}</p>
      </div>
    </div>
  );
}
