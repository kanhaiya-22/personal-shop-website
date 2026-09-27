import { Camera } from "lucide-react";
import Image from "next/image";
import { t, tx } from "@/i18n";
import type { TeamMember } from "@/types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/4.2] overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="bg-blueprint absolute inset-0 grid place-items-center">
            <div className="text-center">
              <span className="mx-auto grid size-28 place-items-center rounded-full bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 font-display text-4xl font-bold text-navy-950 ring-8 ring-white/10 transition-transform duration-500 group-hover:scale-105">
                {initials}
              </span>
              <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-navy-200">
                <Camera className="size-3.5" aria-hidden="true" />
                {t.about.photoSoon}
              </p>
            </div>
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />
      </div>
      <div className="p-6">
        <p className="text-xs font-bold tracking-[0.14em] text-gold-700 uppercase">{tx(member.role)}</p>
        <h3 className="mt-1.5 text-2xl font-bold">{member.name}</h3>
        {member.description && <p className="mt-3 leading-relaxed text-muted">{tx(member.description)}</p>}
      </div>
    </article>
  );
}
