import { ArrowRight, BadgeCheck, Clapperboard, LayoutGrid, MessageCircle, Warehouse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FestivalBadge } from "@/components/festival/FestivalBadge";
import { whenLabel } from "@/components/festival/FestivalSpotlight";
import { Hero } from "@/components/home/Hero";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { t, tx } from "@/i18n";
import { getContactInfo } from "@/lib/contact";
import { getActiveFestival } from "@/lib/festivals";
import { mediaAvailable } from "@/server/media";
import { getContent, toPublicSettings } from "@/server/store";

/**
 * Homepage — intentionally short: hero → (festival) → two catalogues → video →
 * why us → brands → one call to action. Details live on their own pages.
 */
export default async function HomePage() {
  const content = await getContent();
  const { products, categories, brands } = content;
  const contact = getContactInfo(toPublicSettings(content.settings));
  const festival = getActiveFestival(content.settings.festivals);
  const { showcase } = content.settings;
  const showVideo = showcase.enabled && mediaAvailable(showcase.videoUrl);
  const poster = mediaAvailable(showcase.posterUrl) ? showcase.posterUrl : undefined;

  const catalogues = (["building", "paints"] as const).map((group) => {
    const cats = categories.filter((c) => c.group === group);
    return {
      group,
      title: group === "building" ? t.building.title : t.nav.paints,
      text: group === "building" ? t.building.subtitle : t.paints.subtitle,
      image: group === "building" ? "/images/sections/building.jpg" : "/images/sections/paints.jpg",
      href: group === "building" ? "/building-materials" : "/paints",
      cta: group === "building" ? t.categories.viewAllBuilding : t.categories.viewAllPaints,
      categories: cats,
      count: products.filter((p) => cats.some((c) => c.slug === p.category)).length,
    };
  });

  return (
    <>
      <Hero
        whatsappNumber={contact.whatsappNumber}
        phoneHref={contact.hasPhone ? contact.phoneHref : undefined}
        festival={festival ? <FestivalBadge festival={festival.festival} date={festival.date} when={whenLabel(festival.daysUntil)} /> : undefined}
      />

      {/* Two separate catalogues */}
      <section aria-labelledby="catalogues-title" className="section">
        <div className="container-site">
          <SectionHeader id="catalogues-title" align="center" icon={LayoutGrid} eyebrow={t.categories.eyebrow} title={t.categories.title} subtitle={t.categories.subtitle} />
          <div className="grid gap-6 lg:grid-cols-2">
            {catalogues.map((c, i) => (
              <Reveal key={c.group} delay={i * 120}>
                <Link
                  href={c.href}
                  className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-line transition-transform duration-500 hover:-translate-y-1"
                >
                  <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 bg-gradient-to-t ${c.group === "paints" ? "from-[#3b2230]/95 via-[#3b2230]/55" : "from-navy-950/95 via-navy-950/55"} to-transparent`}
                  />
                  <div className="p-6 text-white sm:p-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider uppercase ring-1 ring-white/25 backdrop-blur">
                      <Icon3D name={c.group === "paints" ? "palette" : "bricks"} size={20} />
                      {t.categories.items(c.count)}
                    </span>
                    <h3 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{c.title}</h3>
                    <p className="mt-3 max-w-lg text-white/85">{c.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.categories.slice(0, 6).map((cat) => (
                        <li key={cat.slug} className="inline-flex items-center gap-1.5 rounded-full bg-white/90 py-1 pr-3 pl-1 text-xs font-semibold text-navy-900">
                          <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-surface to-white">
                            <Icon3D name={cat.icon} size={16} />
                          </span>
                          {tx(cat.name)}
                        </li>
                      ))}
                      {c.categories.length > 6 && <li className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">+{c.categories.length - 6}</li>}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 px-5 py-3 font-semibold text-navy-950 shadow-card transition group-hover:brightness-105">
                      {c.cta}
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {showVideo && (
        <section aria-labelledby="showcase-title" className="container-site pb-10 md:pb-16">
          <Reveal>
            <VideoShowcase src={showcase.videoUrl} poster={poster} label={t.showcase.label} playLabel={t.showcase.play} pauseLabel={t.showcase.pause}>
              <div className="flex min-h-[26rem] flex-col justify-end p-6 sm:min-h-[32rem] sm:p-10 lg:p-14">
                <p className="inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-white uppercase ring-1 ring-white/30 backdrop-blur-md">
                  <Clapperboard className="size-4" aria-hidden="true" />
                  {t.showcase.eyebrow}
                </p>
                <h2 id="showcase-title" className="mt-4 max-w-2xl text-3xl leading-tight font-extrabold text-white sm:text-4xl xl:text-[2.75rem]">
                  {t.showcase.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{t.showcase.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2 pr-16 text-sm font-semibold text-white">
                  {[
                    { icon: LayoutGrid, text: t.showcase.stats.categories(categories.length) },
                    { icon: Warehouse, text: t.showcase.stats.oneRoof },
                    { icon: MessageCircle, text: t.showcase.stats.quick },
                  ].map((s) => (
                    <li key={s.text} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-2 ring-1 ring-white/25 backdrop-blur-md">
                      <s.icon className="size-4 text-gold-300" aria-hidden="true" />
                      {s.text}
                    </li>
                  ))}
                </ul>
              </div>
            </VideoShowcase>
          </Reveal>
        </section>
      )}

      <WhyChoose />

      {brands.length > 0 && (
        <section aria-labelledby="brands-title" className="section">
          <div className="container-site">
            <SectionHeader
              id="brands-title"
              icon={BadgeCheck}
              eyebrow={t.brands.eyebrow}
              title={t.brands.title}
              action={
                <ButtonLink href="/brands" variant="outline">
                  {t.brands.viewAll}
                </ButtonLink>
              }
            />
            <BrandMarquee brands={brands} />
          </div>
        </section>
      )}

      <ContactCTA contact={contact} />
    </>
  );
}
