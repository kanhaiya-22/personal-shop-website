"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ta } from "@/i18n";
import { cn } from "@/lib/utils";
import { saveSettings } from "@/server/actions/admin";
import type { SiteSettings } from "@/types";
import { ImageField } from "../ImageField";
import { adminInput } from "../ui";

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, help, wide, children, htmlFor }: { label: string; help?: ReactNode; wide?: boolean; children: ReactNode; htmlFor: string }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {help && <p className="mt-1.5 text-xs text-muted">{help}</p>}
    </div>
  );
}

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [s, setS] = useState<SiteSettings>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  const up = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setS((prev) => ({ ...prev, [key]: value }));
  const input = (id: string, value: string, onChange: (v: string) => void, extra: Record<string, unknown> = {}) => (
    <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(adminInput, "h-11")} {...extra} />
  );

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const res = await saveSettings(s);
    if (!res.ok) {
      setError(res.error);
      setStatus("idle");
      return;
    }
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={submit} className="grid gap-6 pb-24">
      <Section title={ta.settings.language} description={ta.settings.languageHelp}>
        <div className="grid grid-cols-2 gap-2 sm:col-span-2" role="radiogroup" aria-label={ta.settings.language}>
          {([
            { v: "en", label: "English", sub: "Shri Kanhaiya Traders" },
            { v: "hi", label: "हिंदी", sub: "श्री कन्हैया ट्रेडर्स" },
          ] as const).map((o) => (
            <label
              key={o.v}
              className={cn(
                "flex cursor-pointer flex-col rounded-xl border-2 p-4 transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-gold-400",
                s.language === o.v ? "border-navy-900 bg-gradient-to-br from-navy-50 to-white" : "border-line hover:border-navy-300",
              )}
            >
              <input type="radio" name="language" value={o.v} checked={s.language === o.v} onChange={() => up("language", o.v)} className="sr-only" />
              <span className="text-lg font-bold text-navy-900">{o.label}</span>
              <span className="text-sm text-muted">{o.sub}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title={ta.settings.contact} description={ta.settings.contactHelp}>
        <Field label={ta.settings.phone} htmlFor="phone">
          {input("phone", s.phone, (v) => up("phone", v), { type: "tel", inputMode: "tel", placeholder: "98XXXXXXXX" })}
        </Field>
        <Field label={ta.settings.whatsapp} htmlFor="whatsapp" help={ta.settings.whatsappHelp}>
          {input("whatsapp", s.whatsapp, (v) => up("whatsapp", v), { type: "tel", inputMode: "tel", placeholder: ta.settings.samePhone })}
        </Field>
        <Field label={ta.settings.email} htmlFor="email">
          {input("email", s.email, (v) => up("email", v), { type: "email", placeholder: "shop@example.com" })}
        </Field>
        <Field label={ta.settings.countryCode} htmlFor="cc" help={ta.settings.countryHelp}>
          {input("cc", s.countryCode, (v) => up("countryCode", v), { inputMode: "numeric" })}
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold text-navy-900">{ta.settings.extraPhones}</legend>
          <p className="mt-1 mb-3 text-xs text-muted">{ta.settings.extraPhonesHelp}</p>
          <div className="grid gap-2">
            {s.extraPhones.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <input
                  aria-label={ta.settings.extraName}
                  placeholder={ta.settings.extraName}
                  value={row.name}
                  onChange={(e) => up("extraPhones", s.extraPhones.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                  className={cn(adminInput, "h-11")}
                />
                <input
                  aria-label={ta.settings.extraNumber}
                  placeholder={ta.settings.extraNumber}
                  type="tel"
                  inputMode="tel"
                  value={row.number}
                  onChange={(e) => up("extraPhones", s.extraPhones.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))}
                  className={cn(adminInput, "h-11")}
                />
                <button
                  type="button"
                  onClick={() => up("extraPhones", s.extraPhones.filter((_, j) => j !== i))}
                  aria-label={ta.settings.removePhone}
                  title={ta.settings.removePhone}
                  className="grid size-11 place-items-center rounded-xl border-2 border-line text-navy-500 hover:border-red-300 hover:text-red-600"
                >
                  <Trash className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => up("extraPhones", [...s.extraPhones, { name: "", number: "" }])}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl border-2 border-dashed border-navy-200 px-3.5 text-sm font-semibold text-navy-700 hover:border-navy-500"
          >
            <Plus className="size-4" aria-hidden="true" />
            {ta.settings.addPhone}
          </button>
        </fieldset>
      </Section>

      <Section title={ta.settings.address}>
        <Field label={ta.settings.street} htmlFor="street" wide>
          {input("street", s.address.street, (v) => up("address", { ...s.address, street: v }))}
        </Field>
        <Field label={ta.settings.city} htmlFor="city">
          {input("city", s.address.city, (v) => up("address", { ...s.address, city: v }))}
        </Field>
        <Field label={ta.settings.state} htmlFor="state">
          {input("state", s.address.state, (v) => up("address", { ...s.address, state: v }))}
        </Field>
        <Field label={ta.settings.pincode} htmlFor="pin">
          {input("pin", s.address.pincode, (v) => up("address", { ...s.address, pincode: v }), { inputMode: "numeric", maxLength: 6 })}
        </Field>
        <Field label={ta.settings.mapsLink} htmlFor="maps" help={ta.settings.mapsLinkHelp} wide>
          {input("maps", s.mapsUrl, (v) => up("mapsUrl", v), { placeholder: "https://maps.app.goo.gl/…" })}
        </Field>
        <Field
          label={ta.settings.mapsEmbed}
          htmlFor="embed"
          help={ta.settings.mapsEmbedHelp}
          wide
        >
          <textarea id="embed" value={s.mapsEmbedUrl} onChange={(e) => up("mapsEmbedUrl", e.target.value)} rows={2} className={cn(adminInput, "py-2.5")} />
        </Field>
      </Section>

      <Section title={ta.settings.hours}>
        <Field label={ta.settings.english} htmlFor="hours-en" wide>
          {input("hours-en", s.businessHours.en, (v) => up("businessHours", { ...s.businessHours, en: v }), { placeholder: "Monday – Saturday: 9:00 AM – 8:00 PM" })}
        </Field>
        <Field label={ta.settings.hindi} htmlFor="hours-hi" wide>
          {input("hours-hi", s.businessHours.hi, (v) => up("businessHours", { ...s.businessHours, hi: v }), { lang: "hi" })}
        </Field>
      </Section>

      <Section title={ta.settings.announcement} description={ta.settings.announcementHelp}>
        <Field label={ta.settings.english} htmlFor="ann-en" wide>
          {input("ann-en", s.announcement.en, (v) => up("announcement", { ...s.announcement, en: v }), { maxLength: 160, placeholder: "Your Trusted Partner for Building Materials & Paints" })}
        </Field>
        <Field label={ta.settings.hindi} htmlFor="ann-hi" wide>
          {input("ann-hi", s.announcement.hi, (v) => up("announcement", { ...s.announcement, hi: v }), { maxLength: 160, lang: "hi" })}
        </Field>
      </Section>

      <Section title={ta.settings.festivals} description={ta.settings.festivalsHelp}>
        <label className="flex items-center gap-3 rounded-xl border-2 border-line p-3 text-sm font-medium sm:col-span-2">
          <input type="checkbox" checked={s.festivals.enabled} onChange={(e) => up("festivals", { ...s.festivals, enabled: e.target.checked })} className="size-5 accent-navy-900" />
          {ta.settings.festivalsOn}
        </label>
        <Field label={ta.settings.daysBefore} htmlFor="fb">
          {input("fb", String(s.festivals.daysBefore), (v) => up("festivals", { ...s.festivals, daysBefore: Number(v) || 0 }), { type: "number", min: 0, max: 30 })}
        </Field>
        <Field label={ta.settings.daysAfter} htmlFor="fa">
          {input("fa", String(s.festivals.daysAfter), (v) => up("festivals", { ...s.festivals, daysAfter: Number(v) || 0 }), { type: "number", min: 0, max: 30 })}
        </Field>
      </Section>

      <Section title={ta.settings.video} description={ta.settings.videoHelp}>
        <label className="flex items-center gap-3 rounded-xl border-2 border-line p-3 text-sm font-medium sm:col-span-2">
          <input type="checkbox" checked={s.showcase.enabled} onChange={(e) => up("showcase", { ...s.showcase, enabled: e.target.checked })} className="size-5 accent-navy-900" />
          {ta.settings.videoOn}
        </label>
        <div>
          <p className="mb-1.5 text-sm font-semibold text-navy-900">{ta.settings.videoFile}</p>
          <ImageField kind="video" label={ta.settings.videoFile} value={s.showcase.videoUrl || undefined} onChange={(url) => up("showcase", { ...s.showcase, videoUrl: url ?? "" })} />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-semibold text-navy-900">{ta.settings.cover}</p>
          <ImageField label={ta.settings.cover} value={s.showcase.posterUrl || undefined} onChange={(url) => up("showcase", { ...s.showcase, posterUrl: url ?? "" })} />
        </div>
      </Section>

      <Section title={ta.settings.social} description={ta.settings.socialHelp}>
        {(["facebook", "instagram", "youtube", "googleBusiness"] as const).map((k) => (
          <Field key={k} label={k === "googleBusiness" ? ta.settings.googleBusiness : k[0].toUpperCase() + k.slice(1)} htmlFor={`social-${k}`}>
            {input(`social-${k}`, s.social[k], (v) => up("social", { ...s.social, [k]: v }), { placeholder: "https://…" })}
          </Field>
        ))}
      </Section>

      <Section title={ta.settings.advanced}>
        <Field label={ta.settings.siteUrl} htmlFor="siteurl" help={ta.settings.siteUrlHelp} wide>
          {input("siteurl", s.siteUrl, (v) => up("siteUrl", v), { placeholder: "https://…" })}
        </Field>
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-3 sm:px-6 lg:px-10">
          {error && (
            <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-700">
              <CircleAlert className="size-4 shrink-0" aria-hidden="true" /> {error}
            </p>
          )}
          {status === "saved" && (
            <p role="status" className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <CircleCheck className="size-4" aria-hidden="true" /> {ta.settings.saved}
            </p>
          )}
          <button type="submit" disabled={status === "saving"} className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 px-6 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
            {status === "saving" && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
            {ta.settings.save}
          </button>
        </div>
      </div>
    </form>
  );
}
