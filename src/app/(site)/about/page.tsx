import { ArrowRight, Clock, HandHeart, HeartHandshake, MapPin, MessagesSquare, Navigation, Warehouse } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { RelationsNetwork } from "@/components/sections/RelationsNetwork";
import { TeamMemberCard } from "@/components/sections/TeamMemberCard";
import { ButtonAnchor } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { orbits } from "@/data/orbits";
import { t, tx } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getContent, getSettings, toPublicSettings } from "@/server/store";

export async function generateMetadata(): Promise<Metadata> {
  await getSettings();
  return { title: t.nav.about, description: t.about.paragraphs[0], alternates: { canonical: "/about" } };
}

const valueIcons = [MessagesSquare, HandHeart, Warehouse];

export default async function AboutPage() {
  const content = await getContent();
  const contact = getContactInfo(toPublicSettings(content.settings));
  const { products, categories } = content;
  const ranges = (["building", "paints"] as const).map((group) => {
    const cats = categories.filter((c) => c.group === group);
    return {
      group,
      title: group === "building" ? t.building.title : t.nav.paints,
      href: group === "building" ? "/building-materials" : "/paints",
      image: group === "building" ? "/images/sections/building.jpg" : "/images/sections/paints.jpg",
      cats,
      count: products.filter((p) => cats.some((c) => c.slug === p.category)).length,
    };
  });

  return (
    <>
      <PageHero icon={HeartHandshake} tone="blush" aside={<IconOrbit items={orbits.about()} />} eyebrow={t.about.eyebrow} title={t.about.title} crumbs={[{ label: t.nav.about }]} />

      {/* story + values */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((p, i) => (
              <p key={i} className={i === t.about.paragraphs.length - 1 ? "border-l-4 border-gold-400 pl-5 font-semibold text-navy-900" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-xl font-bold">{t.about.valuesTitle}</h2>
            <ul className="mt-5 grid gap-4">
              {t.about.values.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <li key={v.title} className="group flex gap-4 rounded-2xl border border-line bg-gradient-to-br from-surface to-white p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-900 text-gold-300 transition-transform group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-navy-900">{v.title}</span>
                      <span className="text-sm text-muted">{v.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* who we serve — interactive network */}
      <section aria-labelledby="network-title" className="section bg-gradient-to-b from-cream to-white">
        <div className="container-site">
          <SectionHeader id="network-title" align="center" eyebrow={t.about.network.eyebrow} title={t.about.network.title} subtitle={t.about.network.subtitle} />
          <RelationsNetwork />
        </div>
      </section>

      {/* what we offer */}
      <section aria-labelledby="offer-title" className="section">
        <div className="container-site">
          <SectionHeader id="offer-title" eyebrow={t.about.offerEyebrow} title={t.about.offerTitle} subtitle={t.about.offerText} />
          <div className="grid gap-6 lg:grid-cols-2">
            {ranges.map((r, i) => (
              <Reveal key={r.group} delay={i * 120}>
                <Link href={r.href} className="group grid h-full overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-48 overflow-hidden">
                    <Image src={r.image} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold tracking-wider text-gold-700 uppercase">{t.categories.items(r.count)}</p>
                    <h3 className="mt-1 text-2xl font-bold">{r.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {r.cats.slice(0, 8).map((c) => (
                        <li key={c.slug} className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-surface to-white py-0.5 pr-2.5 pl-0.5 text-xs font-semibold text-navy-800 ring-1 ring-line">
                          <span className="grid size-5 place-items-center rounded-full bg-white">
                            <Icon3D name={c.icon} size={14} />
                          </span>
                          {tx(c.name)}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-700 group-hover:text-navy-950">
                      {r.group === "building" ? t.categories.viewAllBuilding : t.categories.viewAllPaints}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how we work */}
      <section aria-labelledby="steps-title" className="section bg-gradient-to-b from-surface via-white to-surface">
        <div className="container-site">
          <SectionHeader id="steps-title" align="center" eyebrow={t.about.stepsEyebrow} title={t.about.stepsTitle} />
          <ol className="relative grid gap-5 md:grid-cols-4">
            <span aria-hidden="true" className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 md:block" />
            {t.about.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="relative text-center">
                <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br from-navy-600 to-navy-900 font-display text-xl font-bold text-gold-300 shadow-lift ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* team */}
      <section aria-labelledby="team-title" className="section">
        <div className="container-site">
          <SectionHeader id="team-title" align="center" eyebrow={t.about.teamEyebrow} title={t.about.teamTitle} />
          <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {content.team.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 120}>
                <TeamMemberCard member={m} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* visit */}
      {(contact.fullAddress || contact.hours) && (
        <section className="container-site">
          <Reveal>
            <div className="grid items-center gap-6 rounded-3xl border border-line bg-gradient-to-br from-sage via-white to-sky p-6 shadow-card sm:p-8 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-2xl font-bold">{t.about.visitTitle}</h2>
                {contact.fullAddress && (
                  <p className="mt-3 flex items-start gap-2 text-ink">
                    <MapPin className="mt-1 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {contact.fullAddress}
                  </p>
                )}
                {contact.hours && (
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                    <Clock className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {contact.hours}
                  </p>
                )}
              </div>
              {contact.directionsUrl && (
                <ButtonAnchor href={contact.directionsUrl} external variant="primary" size="lg" icon={<Navigation className="size-5" aria-hidden="true" />}>
                  {t.contact.directions}
                </ButtonAnchor>
              )}
            </div>
          </Reveal>
        </section>
      )}

      <ContactCTA contact={contact} />
    </>
  );
}
