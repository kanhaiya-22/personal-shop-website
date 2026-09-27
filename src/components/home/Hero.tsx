import { ArrowRight, BadgeCheck, Blocks, Handshake, Phone, Store } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { t } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import { HeroScene } from "./HeroScene";

const trustIcons = [Blocks, Store, BadgeCheck, Handshake];

export function Hero({ whatsappNumber, phoneHref, festival }: { whatsappNumber: string; phoneHref?: string; festival?: ReactNode }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden="true" className="absolute -top-40 -right-40 size-[36rem] rounded-full bg-gradient-to-br from-blush to-white blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-gradient-to-br from-sage to-white blur-3xl" />

      <div className="container-site relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-16 xl:gap-14 xl:py-20 2xl:grid-cols-[1fr_1.05fr]">
        <div className="motion-safe:animate-fade-up">
          {festival}
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white/70 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.08em] sm:px-3.5 sm:text-xs sm:tracking-[0.12em] text-gold-800 uppercase shadow-sm backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-500" />
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-5 text-[2.1rem] leading-[1.12] font-extrabold sm:text-[2.75rem] lg:text-[clamp(2.6rem,3.3vw,3.75rem)]">
            {t.hero.titleStart}{" "}
            <span className="relative text-navy-700 sm:whitespace-nowrap">
              <span className="relative z-10">{t.hero.titleHighlight}</span>
              <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 z-0 h-3 w-full text-gold-400 sm:h-4">
                <path d="M2 14C60 4 150 2 298 10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="motion-safe:[stroke-dasharray:320] motion-safe:[stroke-dashoffset:320] motion-safe:animate-[draw_1.2s_0.5s_ease-out_forwards]" />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/products" size="lg" icon={<ArrowRight className="size-5" aria-hidden="true" />} className="flex-row-reverse">
              {t.hero.explore}
            </ButtonLink>
            <ButtonAnchor href={whatsappLink(whatsappNumber)} external={Boolean(whatsappNumber)} variant="whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />}>
              {t.hero.whatsapp}
            </ButtonAnchor>
            {phoneHref && (
              <ButtonAnchor href={phoneHref} variant="gold" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
                {t.nav.callNow}
              </ButtonAnchor>
            )}
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-navy-900/10 pt-6 sm:grid-cols-4 lg:grid-cols-2">
            {t.hero.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug font-semibold text-navy-900">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-card ring-1 ring-line">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <HeroScene />
      </div>
    </section>
  );
}
