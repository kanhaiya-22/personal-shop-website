"use client";

import { Check, CheckCheck, Clock, Copy, Mail, MapPin, Navigation, Phone, Send, Share2, Store, UserRound } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { useSite } from "@/components/SiteProvider";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Icon3D } from "@/components/ui/Icon3D";
import { shopName, t } from "@/i18n";
import { cn } from "@/lib/utils";

type Topic = "price" | "availability" | "delivery" | "visit";
const topicEmoji: Record<Topic, string> = { price: "💰", availability: "📦", delivery: "🚚", visit: "🏪" };

/** Interactive contact hub: one-tap actions, copy buttons and a WhatsApp message builder. */
export function ContactHub({ owner }: { owner?: string }) {
  const { contact, wa } = useSite();
  const c = t.contact;
  const [copied, setCopied] = useState("");
  const [topic, setTopic] = useState<Topic>("price");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked — nothing else to do
    }
    setCopied(key);
    setTimeout(() => setCopied(""), 1800);
  };

  const shareAddress = async () => {
    const text = `${shopName} — ${contact.fullAddress}${contact.directionsUrl ? `\n${contact.directionsUrl}` : ""}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: shopName, text });
        return;
      } catch {
        return;
      }
    }
    void copy("address", text);
  };

  const item = product.trim() || c.builder.anyProduct;
  const message = [
    c.builder.greeting,
    c.builder.lines[topic](item),
    qty.trim() ? `${c.builder.qtyLabel}: ${qty.trim()}` : "",
    c.builder.thanks,
  ]
    .filter(Boolean)
    .join("\n");

  const actions = [
    contact.hasPhone && { key: "call", icon: "phone", title: c.quick.call, sub: contact.phoneDisplay, href: contact.phoneHref, tone: "from-sky to-white" },
    contact.hasWhatsapp && { key: "wa", icon: "chat", title: c.quick.whatsapp, sub: c.quick.whatsappSub, href: wa(), external: true, tone: "from-[#e3f3e8] to-white" },
    contact.directionsUrl && { key: "dir", icon: "location", title: c.directions, sub: c.quick.directionsSub, href: contact.directionsUrl, external: true, tone: "from-blush to-white" },
    contact.email && { key: "mail", icon: "clock", title: c.quick.email, sub: contact.email, href: `mailto:${contact.email}`, tone: "from-lilac to-white", mailIcon: true },
  ].filter(Boolean) as { key: string; icon: string; title: string; sub: string; href: string; external?: boolean; tone: string; mailIcon?: boolean }[];

  const btn = "inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-xs font-semibold text-navy-800 transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-card";
  const copyBtn = (k: string, value: string) => (
    <button type="button" onClick={() => copy(k, value)} className={btn} aria-label={`${c.copy}: ${value}`}>
      {copied === k ? <Check className="size-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      {copied === k ? c.copied : c.copy}
    </button>
  );

  return (
    <div className="grid gap-10">
      {/* one-tap actions */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {actions.map((a) => (
          <li key={a.key}>
            <a
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "group flex h-full flex-col items-start gap-3 rounded-3xl bg-gradient-to-br p-4 shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-5",
                a.tone,
              )}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:size-14">
                {a.key === "call" ? (
                  <Phone className="size-6 text-navy-700" aria-hidden="true" />
                ) : a.key === "wa" ? (
                  <WhatsAppIcon className="size-7 text-whatsapp-dark" />
                ) : a.mailIcon ? (
                  <Mail className="size-6 text-[#6b5a91]" aria-hidden="true" />
                ) : (
                  <Icon3D name={a.icon} size={34} />
                )}
              </span>
              <span className="font-display text-base font-bold text-navy-900 sm:text-lg">{a.title}</span>
              <span className="w-full truncate text-xs text-muted sm:text-sm">{a.sub}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* details */}
        <div className="grid content-start gap-4">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-navy-50 to-white text-navy-700">
                <Store className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-bold text-navy-900">{shopName}</p>
                {owner && (
                  <p className="flex items-center gap-1 text-sm text-muted">
                    <UserRound className="size-3.5" aria-hidden="true" />
                    {c.owner}: {owner}
                  </p>
                )}
              </div>
            </div>
          </div>

          {contact.phones.length > 0 && (
            <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gold-700 uppercase">
                <Phone className="size-4" aria-hidden="true" />
                {contact.phones.length > 1 ? c.phones : c.phone}
              </p>
              <ul className="grid gap-3">
                {contact.phones.map((p, i) => (
                  <li key={p.href} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-gradient-to-br from-surface to-white p-3">
                    <div>
                      <a href={p.href} className="font-display text-lg font-bold text-navy-900 hover:text-navy-600">
                        {p.display}
                      </a>
                      {p.name && <p className="text-xs text-muted">{p.name}</p>}
                    </div>
                    <div className="flex gap-2">
                      <a href={p.href} className={cn(btn, "border-transparent bg-gradient-to-br from-navy-600 to-navy-900 text-white hover:border-transparent")}>
                        <Phone className="size-3.5" aria-hidden="true" />
                        {t.common.call}
                      </a>
                      {copyBtn(`phone-${i}`, p.display)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gold-700 uppercase">
              <MapPin className="size-4" aria-hidden="true" />
              {c.address}
            </p>
            <address className="leading-relaxed text-ink not-italic">{contact.fullAddress || <span className="text-muted">{c.addressSoon}</span>}</address>
            {contact.fullAddress && (
              <div className="mt-3 flex flex-wrap gap-2">
                {contact.directionsUrl && (
                  <a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className={cn(btn, "border-transparent bg-gradient-to-br from-gold-200 to-gold-400 text-navy-950 hover:border-transparent")}>
                    <Navigation className="size-3.5" aria-hidden="true" />
                    {c.directions}
                  </a>
                )}
                {copyBtn("address", contact.fullAddress)}
                <button type="button" onClick={shareAddress} className={btn}>
                  <Share2 className="size-3.5" aria-hidden="true" />
                  {c.share}
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gold-700 uppercase">
                <Clock className="size-4" aria-hidden="true" />
                {c.hours}
              </p>
              <p className="text-sm leading-relaxed text-ink">{contact.hours || c.hoursSoon}</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gold-700 uppercase">
                <Mail className="size-4" aria-hidden="true" />
                {c.email}
              </p>
              {contact.email ? (
                <>
                  <a href={`mailto:${contact.email}`} className="block truncate text-sm font-semibold text-navy-900 hover:text-navy-600" title={contact.email}>
                    {contact.email}
                  </a>
                  <div className="mt-3">
                    {copyBtn("email", contact.email)}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted">{c.notSet}</p>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp message builder — styled like a real chat */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line lg:sticky lg:top-28 lg:self-start">
          {/* chat header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#128c4a] to-[#1fa855] px-5 py-4 text-white">
            <span className="relative grid size-11 place-items-center rounded-full bg-white shadow-card">
              <LogoMark className="size-8" />
              <span className="absolute right-0 bottom-0 size-3 rounded-full bg-[#3ddc84] ring-2 ring-white" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display font-bold">{shopName}</p>
              <p className="text-xs text-white/85">{c.builder.online}</p>
            </div>
            <WhatsAppIcon className="size-6 text-white/90" />
          </div>

          {/* chat body */}
          <div className="bg-[#efeae2] bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:14px_14px] px-4 py-5 sm:px-5">
            <div className="mx-auto mb-4 w-max rounded-lg bg-white/80 px-3 py-1 text-[0.7rem] font-semibold text-navy-600 shadow-sm">{c.builder.title}</div>

            {/* shop greeting */}
            <div className="relative mb-4 max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
              {c.builder.subtitle}
              <span className="mt-1 block text-right text-[0.65rem] text-navy-400">{c.builder.now}</span>
            </div>

            {/* quick replies */}
            <p className="mb-2 text-xs font-semibold text-navy-600">{c.builder.topicLabel}</p>
            <div role="radiogroup" aria-label={c.builder.topicLabel} className="mb-4 flex flex-wrap gap-2">
              {(Object.keys(c.builder.topics) as Topic[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={topic === k}
                  onClick={() => setTopic(k)}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold shadow-sm transition-all duration-200",
                    topic === k ? "scale-105 bg-[#1fa855] text-white shadow-card" : "bg-white text-[#128c4a] ring-1 ring-[#1fa855]/30 hover:bg-[#e7f7ee]",
                  )}
                >
                  <span aria-hidden="true">{topicEmoji[k]}</span>
                  {c.builder.topics[k]}
                </button>
              ))}
            </div>

            {/* customer's message preview */}
            <p className="sr-only">{c.builder.preview}</p>
            <div aria-live="polite" className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-ink shadow-sm">
              <span key={message} className="block motion-safe:animate-fade-up">
                {message}
              </span>
              <span className="mt-1 flex items-center justify-end gap-1 text-[0.65rem] text-navy-500">
                {c.builder.now}
                <CheckCheck className="size-3.5 text-[#53bdeb]" aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* composer */}
          <div className="flex flex-col gap-2 border-t border-line bg-[#f0f2f5] p-3 sm:flex-row sm:items-center">
            <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-2">
              <label className="sr-only" htmlFor="wb-product">
                {c.builder.productLabel}
              </label>
              <input
                id="wb-product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder={c.builder.productLabel}
                className="h-11 min-w-0 rounded-full border border-transparent bg-white px-4 text-sm text-ink shadow-sm outline-none placeholder:text-navy-300 focus:border-[#1fa855]"
              />
              <label className="sr-only" htmlFor="wb-qty">
                {c.builder.qtyLabel}
              </label>
              <input
                id="wb-qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder={c.builder.qtyPlaceholder}
                className="h-11 min-w-0 rounded-full border border-transparent bg-white px-4 text-sm text-ink shadow-sm outline-none placeholder:text-navy-300 focus:border-[#1fa855]"
              />
            </div>
            <a
              href={wa(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#3ddc84] to-[#128c4a] px-5 text-sm font-semibold text-white shadow-card transition hover:brightness-110"
            >
              <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              {c.builder.send}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
