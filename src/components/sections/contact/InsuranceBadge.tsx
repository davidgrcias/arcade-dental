"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

export function InsuranceBadge() {
  const { c, lang } = useLanguage();

  const checkLabel = lang === "id" ? "Cek manfaat asuransi" : "Check my insurance";
  const partnerLabel = lang === "id" ? "Rekanan resmi" : "Official partner";
  const networkNote =
    lang === "id"
      ? "Terdaftar di jaringan BCA Life sebagai Klinik Utama Arcade Dental."
      : "Listed in the BCA Life network as Klinik Utama Arcade Dental.";

  return (
    <div className="gs-reveal relative overflow-hidden rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
      <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/40 blur-2xl" />

      <div className="relative flex flex-wrap items-start gap-4">
        {/* BCA Life mark */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-[#0b4ea2]/12 bg-gradient-to-br from-white to-blue-50/60 px-4 py-2.5 shadow-sm">
          <span className="font-display text-2xl font-black leading-none tracking-tight text-[#0b4ea2]">BCA</span>
          <span className="h-5 w-px bg-primary/15" />
          <span className="text-base font-bold leading-none text-[#2ca3dc]">Life</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-cta">
            {c.insuranceLabel}
            <span className="mx-1 text-primary/30">·</span>
            <span className="text-primary/55">{partnerLabel}</span>
          </p>
          <p className="mt-1.5 text-[13px] leading-5 text-primary/85">{networkNote}</p>
        </div>
      </div>

      <a
        href="#booking-cta"
        className="relative mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-cta"
      >
        <Icon name="shield" className="h-4 w-4" />
        <span>{checkLabel}</span>
      </a>
    </div>
  );
}
