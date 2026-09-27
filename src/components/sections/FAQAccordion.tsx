import { Plus } from "lucide-react";
import { tx } from "@/i18n";
import type { FaqItem } from "@/types";
import { JsonLd } from "@/components/seo/JsonLd";

/** Native <details> accordion — keyboard and screen-reader friendly with no JavaScript. */
export function FAQAccordion({ items, withSchema = true }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="grid gap-3">
        {items.map((f, i) => (
          <details
            key={f.id}
            name="faq"
            open={i === 0}
            className="group rounded-2xl border border-line bg-white shadow-card transition-colors open:border-navy-200 [&[open]_.faq-icon]:rotate-45"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-left font-semibold text-navy-900 transition hover:bg-surface sm:p-6 sm:text-lg">
              {tx(f.question)}
              <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-50 to-white text-navy-800 transition-transform duration-300 group-open:from-gold-200 group-open:to-gold-400 group-open:text-navy-950">
                <Plus className="size-4" aria-hidden="true" />
              </span>
            </summary>
            <div className="px-5 pb-6 leading-relaxed text-muted motion-safe:group-open:animate-fade-up sm:px-6">{tx(f.answer)}</div>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: tx(f.question), acceptedAnswer: { "@type": "Answer", text: tx(f.answer) } })),
          }}
        />
      )}
    </>
  );
}
