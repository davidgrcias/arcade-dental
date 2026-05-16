"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { services, type Service, business } from "@/lib/content";
import {
  estimateTotal,
  formatRupiah,
  getPriceUnit,
  maxQuantity,
  unitLabel,
  unitShort,
  type EstimatorEntry,
} from "@/lib/estimator";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Filter = "all" | "general" | "specialist" | "aesthetic" | "kids";

const filterDefs: { id: Filter; label: { id: string; en: string } }[] = [
  { id: "all", label: { id: "Semua", en: "All" } },
  { id: "general", label: { id: "Umum", en: "General" } },
  { id: "specialist", label: { id: "Spesialis", en: "Specialist" } },
  { id: "aesthetic", label: { id: "Estetika", en: "Aesthetic" } },
  { id: "kids", label: { id: "Anak", en: "Kids" } },
];

export function CostEstimator() {
  const { t, lang, c } = useLanguage();
  const [entries, setEntries] = useState<EstimatorEntry[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const totalRef = useRef<HTMLSpanElement>(null);
  const lastTotalRef = useRef(0);

  const visibleServices = useMemo(() => {
    return services.filter((s) => filter === "all" || s.category === filter);
  }, [filter]);

  const total = estimateTotal(entries);

  // Animate total whenever it changes — feels more "live"
  useEffect(() => {
    const node = totalRef.current;
    if (!node) {
      lastTotalRef.current = total;
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      node.textContent = formatRupiah(total, lang);
      lastTotalRef.current = total;
      return;
    }
    const obj = { value: lastTotalRef.current };
    gsap.to(obj, {
      value: total,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        node.textContent = formatRupiah(Math.round(obj.value), lang);
      },
      onComplete: () => {
        node.textContent = formatRupiah(total, lang);
      },
    });
    lastTotalRef.current = total;
  }, [total, lang]);

  function getEntry(id: string): EstimatorEntry | undefined {
    return entries.find((e) => e.serviceId === id);
  }

  function add(service: Service) {
    if (!service.priceFrom) return;
    const unit = getPriceUnit(service.id);
    const cap = maxQuantity[unit];
    setEntries((prev) => {
      const existing = prev.find((e) => e.serviceId === service.id);
      if (!existing) return [...prev, { serviceId: service.id, quantity: 1 }];
      if (existing.quantity >= cap) return prev;
      return prev.map((e) =>
        e.serviceId === service.id ? { ...e, quantity: e.quantity + 1 } : e,
      );
    });
  }

  function decrement(serviceId: string) {
    setEntries((prev) =>
      prev
        .map((e) => (e.serviceId === serviceId ? { ...e, quantity: e.quantity - 1 } : e))
        .filter((e) => e.quantity > 0),
    );
  }

  function remove(serviceId: string) {
    setEntries((prev) => prev.filter((e) => e.serviceId !== serviceId));
  }

  function clear() {
    setEntries([]);
  }

  function buildWaMessage(): string {
    const lines: string[] = [];
    lines.push(
      lang === "id"
        ? `Halo ${business.name}, saya ingin konsultasi untuk perawatan berikut:`
        : `Hi ${business.name}, I would like to consult about the following treatment plan:`,
    );
    for (const entry of entries) {
      const service = services.find((s) => s.id === entry.serviceId);
      if (!service) continue;
      const unit = getPriceUnit(service.id);
      lines.push(
        `- ${t(service.title)} (${entry.quantity} ${t(unitShort[unit])}) ~ ${formatRupiah(
          (service.priceFrom ?? 0) * entry.quantity,
          lang,
        )}`,
      );
    }
    lines.push("");
    lines.push(
      lang === "id"
        ? `Estimasi total: ${formatRupiah(total, lang)}`
        : `Estimated total: ${formatRupiah(total, lang)}`,
    );
    lines.push("");
    lines.push(
      lang === "id"
        ? "Mohon info konfirmasi dan jadwal yang tersedia. Terima kasih."
        : "Please confirm and share available schedules. Thank you.",
    );
    return lines.join("\n");
  }

  const itemCount = entries.reduce((sum, e) => sum + e.quantity, 0);

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-heading"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#fbfaf7_0%,#f3eee2_100%)] py-20 md:py-24"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_1px_1px,#1a2332_1px,transparent_0)] [background-size:24px_24px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cta/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={c.estimatorLabel}
          title={c.estimatorTitle}
          body={c.estimatorBody}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* Picker */}
          <div className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-xl text-primary">
                {lang === "id" ? "Pilih perawatan" : "Pick your treatments"}
              </p>
              <span className="rounded-full bg-cta/10 px-3 py-1 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-cta">
                {visibleServices.filter((s) => s.priceFrom).length} {lang === "id" ? "tersedia" : "available"}
              </span>
            </div>

            <div role="tablist" className="mt-4 flex flex-wrap gap-2">
              {filterDefs.map((def) => {
                const isActive = filter === def.id;
                return (
                  <button
                    key={def.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(def.id)}
                    className={`min-h-9 rounded-full border px-3.5 text-xs font-bold transition-all ${
                      isActive
                        ? "border-primary bg-primary text-white shadow-md"
                        : "border-primary/12 bg-white text-primary hover:border-gold/60"
                    }`}
                  >
                    {def.label[lang]}
                  </button>
                );
              })}
            </div>

            <ul className="mt-5 grid max-h-[480px] gap-2 overflow-y-auto pr-1">
              {visibleServices.map((service) => {
                const entry = getEntry(service.id);
                const unit = getPriceUnit(service.id);
                const cap = maxQuantity[unit];
                const disabled = !service.priceFrom;
                return (
                  <li
                    key={service.id}
                    className={`group relative flex items-center gap-4 rounded-xl border bg-white px-4 py-3 transition-all ${
                      entry
                        ? "border-cta/30 ring-2 ring-cta/15"
                        : "border-primary/8 hover:border-gold/55"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${
                        entry ? "bg-cta text-white" : "bg-highlight text-cta"
                      }`}
                    >
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <p className="truncate font-display text-base text-primary">
                          {t(service.title)}
                        </p>
                        <span className="font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary/45">
                          {t(unitLabel[unit])}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-secondary">
                        {service.priceFrom
                          ? `${c.priceFromLabel} ${formatRupiah(service.priceFrom, lang)}`
                          : c.priceConsultLabel}
                      </p>
                    </div>

                    {entry ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => decrement(service.id)}
                          aria-label={lang === "id" ? "Kurangi" : "Decrease"}
                          className="grid h-8 w-8 place-items-center rounded-full border border-primary/15 bg-white text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          <span aria-hidden>−</span>
                        </button>
                        <span className="min-w-[1.5rem] text-center font-display text-base text-primary">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => add(service)}
                          aria-label={lang === "id" ? "Tambah" : "Increase"}
                          disabled={entry.quantity >= cap}
                          className="grid h-8 w-8 place-items-center rounded-full bg-cta text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <span aria-hidden>+</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => add(service)}
                        disabled={disabled}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-cta disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Icon name="check" className="h-3 w-3" />
                        {lang === "id" ? "Tambah" : "Add"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary text-white shadow-2xl shadow-primary/15">
              <div className="relative px-5 py-5 sm:px-6">
                <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  {lang === "id" ? "Ringkasan estimasi" : "Estimate summary"}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span ref={totalRef} className="font-display text-3xl leading-none text-white sm:text-4xl">
                    {formatRupiah(total, lang)}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    {itemCount} {lang === "id" ? "item" : "items"}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  {lang === "id"
                    ? "Estimasi awal berdasarkan harga starting layanan. Dokter akan menyesuaikan setelah pemeriksaan."
                    : "Initial estimate from each service's starting price. The doctor adjusts after examination."}
                </p>
              </div>

              <div className="bg-white px-5 py-5 text-primary sm:px-6">
                {entries.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-primary/15 bg-surface-2/50 px-4 py-6 text-center text-sm text-primary/55">
                    {lang === "id"
                      ? "Pilih perawatan di sebelah kiri untuk mulai menghitung estimasi."
                      : "Pick a treatment on the left to start estimating."}
                  </p>
                ) : (
                  <ul className="grid gap-2">
                    {entries.map((entry) => {
                      const service = services.find((s) => s.id === entry.serviceId);
                      if (!service) return null;
                      const unit = getPriceUnit(service.id);
                      const subtotal = (service.priceFrom ?? 0) * entry.quantity;
                      return (
                        <li
                          key={entry.serviceId}
                          className="flex items-center gap-3 rounded-xl border border-primary/8 bg-surface-2/50 px-3 py-2.5"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cta text-white">
                            <Icon name={service.icon} className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-primary">{t(service.title)}</p>
                            <p className="text-xs text-secondary">
                              {entry.quantity} × {formatRupiah(service.priceFrom ?? 0, lang)} ·{" "}
                              {t(unitShort[unit])}
                            </p>
                          </div>
                          <span className="font-display text-base text-primary">
                            {formatRupiah(subtotal, lang)}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(entry.serviceId)}
                            aria-label={lang === "id" ? "Hapus" : "Remove"}
                            className="grid h-7 w-7 place-items-center rounded-full bg-primary/8 text-primary/55 transition-colors hover:bg-primary hover:text-white"
                          >
                            <span aria-hidden className="text-sm leading-none">
                              ×
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={buildWhatsAppUrl(buildWaMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={entries.length === 0}
                    onClick={(e) => {
                      if (entries.length === 0) e.preventDefault();
                    }}
                    className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold shadow-lg transition-all ${
                      entries.length === 0
                        ? "cursor-not-allowed bg-primary/15 text-primary/45 shadow-none"
                        : "bg-cta text-white shadow-cta/25 hover:-translate-y-0.5 hover:bg-primary"
                    }`}
                  >
                    <Icon name="message" className="h-4 w-4" />
                    {lang === "id" ? "Kirim ke WhatsApp" : "Send to WhatsApp"}
                  </a>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 font-bold text-cta transition-colors hover:text-primary"
                    >
                      <Icon name="calendar" className="h-3.5 w-3.5" />
                      {lang === "id" ? "Booking jadwal" : "Book a slot"}
                    </Link>
                    {entries.length > 0 && (
                      <button
                        type="button"
                        onClick={clear}
                        className="inline-flex items-center gap-1.5 text-primary/55 transition-colors hover:text-primary"
                      >
                        <Icon name="check" className="h-3.5 w-3.5 rotate-45" />
                        {lang === "id" ? "Reset" : "Clear"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
