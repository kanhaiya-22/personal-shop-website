import { Check, Palette } from "lucide-react";
import { CategoryIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { paintGuide } from "@/data/paint-guide";
import { t, tx } from "@/i18n";

export function PaintGuide() {
  return (
    <section aria-labelledby="guide-title" className="section bg-cream">
      <div className="container-site">
        <SectionHeader id="guide-title" eyebrow={t.paints.guideEyebrow} title={t.paints.guideTitle} subtitle={t.paints.guideSubtitle} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paintGuide.map((g, i) => (
            <Reveal as="li" key={g.id} delay={(i % 3) * 80}>
              <article className="h-full rounded-2xl border border-gold-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-navy-950">
                    <CategoryIcon name={g.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{tx(g.title)}</h3>
                </div>
                <ul className="mt-4 grid gap-3">
                  {g.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      {tx(p)}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 flex items-start gap-3 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-950 p-5 text-sm text-navy-50 sm:items-center">
          <Palette className="size-5 shrink-0 text-gold-300" aria-hidden="true" />
          {t.paints.colourNote}
        </p>
      </div>
    </section>
  );
}
