import { BadgeCheck, Handshake, IndianRupee, Layers, MessageCircle, Sparkles, UserRoundCheck } from "lucide-react";
import { Icon3D } from "@/components/ui/Icon3D";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { icon3dKeys } from "@/data/icon-registry";
import { t } from "@/i18n";

const items = [
  { icon: Layers, key: "toolbox", tile: "bg-gradient-to-br from-sage to-white text-navy-700" },
  { icon: Handshake, key: "handshake", tile: "bg-gradient-to-br from-blush to-white text-gold-700" },
  { icon: BadgeCheck, key: "quality", tile: "bg-gradient-to-br from-sky to-white text-navy-700" },
  { icon: UserRoundCheck, key: "house", tile: "bg-gradient-to-br from-lilac to-white text-[#6b5a91]" },
  { icon: MessageCircle, key: "chat", tile: "bg-[#e3f3e8] text-whatsapp-dark" },
  { icon: IndianRupee, key: "money", tile: "bg-gradient-to-br from-gold-100 to-gold-50 text-gold-800" },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="section relative overflow-hidden bg-gradient-to-b from-cream to-white">
      <div aria-hidden="true" className="absolute -top-24 -left-24 size-96 rounded-full bg-sage/70 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 size-96 rounded-full bg-blush/70 blur-3xl" />
      <div className="container-site relative">
        <SectionHeader id="why-title" align="center" icon={Sparkles} eyebrow={t.why.eyebrow} title={t.why.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const { icon: Icon, key, tile } = items[i];
            return (
              <Reveal as="li" key={item.title} delay={i * 70}>
                <div className="group h-full rounded-3xl border border-white bg-white/80 p-6 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className={`grid size-14 place-items-center rounded-2xl ${tile} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    {icon3dKeys.has(key) ? <Icon3D name={key} size={40} /> : <Icon className="size-7" strokeWidth={1.8} aria-hidden="true" />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm">
          <span className="font-semibold text-gold-700">{t.audience.title}:</span>
          {t.audience.items.map((a) => (
            <span key={a} className="rounded-full bg-white px-3.5 py-1.5 font-medium text-navy-800 shadow-sm ring-1 ring-line">
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
