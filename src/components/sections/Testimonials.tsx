import { Quote, Star } from "lucide-react";
import { ChatIllustration } from "@/components/sections/ChatIllustration";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dateLocale, t, tx } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import type { Testimonial } from "@/types";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
      <Quote className="size-8 text-gold-400" aria-hidden="true" />
      <div className="mt-3 flex gap-0.5" role="img" aria-label={t.testimonials.rating(item.rating)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`size-4 ${i < item.rating ? "fill-gold-400 text-gold-400" : "text-line"}`} aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 leading-relaxed text-ink">{tx(item.review)}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-950 font-bold text-gold-300">{item.customerName.charAt(0)}</span>
        <span>
          <span className="block font-semibold text-navy-900">{item.customerName}</span>
          <span className="text-xs text-muted">
            {item.customerType ? `${tx(item.customerType)} · ` : ""}
            <time dateTime={item.date}>{new Date(item.date).toLocaleDateString(dateLocale, { month: "short", year: "numeric" })}</time>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Only genuine, visible reviews are shown. Sample reviews never reach the public site. */
export function Testimonials({ items, whatsappNumber }: { items: Testimonial[]; whatsappNumber: string }) {
  const genuine = items.filter((i) => !i.isSample && !i.hidden);
  return (
    <section aria-labelledby="reviews-title" className="section bg-gradient-to-b from-surface via-white to-surface">
      <div className="container-site">
        <SectionHeader id="reviews-title" align="center" icon={Star} eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        {genuine.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {genuine.slice(0, 6).map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 80}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-navy-200 bg-white px-6 py-12 text-center">
            <ChatIllustration className="mx-auto w-40" />
            <h3 className="mt-5 text-xl font-bold">{t.testimonials.emptyTitle}</h3>
            <p className="mx-auto mt-2 max-w-md text-muted">{t.testimonials.emptyText}</p>
            <ButtonAnchor href={whatsappLink(whatsappNumber, t.testimonials.feedbackMessage)} external={Boolean(whatsappNumber)} variant="whatsapp" className="mt-6" icon={<WhatsAppIcon className="size-5" />}>
              {t.testimonials.emptyCta}
            </ButtonAnchor>
          </Reveal>
        )}
      </div>
    </section>
  );
}
