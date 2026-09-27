import { House, LayoutGrid } from "lucide-react";
import { Character } from "@/components/ui/Character";
import { ButtonLink } from "@/components/ui/Button";
import { t } from "@/i18n";


export default function NotFound() {
  return (
    <section className="section relative overflow-hidden">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="container-site relative text-center">
        <p aria-hidden="true" className="font-display text-[7rem] leading-none font-extrabold text-navy-100 sm:text-[10rem]">
          4<span className="text-gold-400">0</span>4
        </p>
        <Character variant="helper" className="mx-auto -mt-10 w-40 motion-safe:animate-float-slow" />
        <h1 className="mt-8 text-3xl font-bold sm:text-4xl">{t.notFound.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted">{t.notFound.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" icon={<House className="size-5" aria-hidden="true" />}>
            {t.notFound.home}
          </ButtonLink>
          <ButtonLink href="/products" variant="outline" icon={<LayoutGrid className="size-5" aria-hidden="true" />}>
            {t.notFound.products}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
