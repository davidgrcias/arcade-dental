"use client";

import { useLanguage } from "@/context/LanguageContext";

export function InsuranceInfo() {
  const { c } = useLanguage();

  return (
    <div className="gs-reveal rounded-lg border border-primary/8 bg-white p-8 shadow-xl shadow-primary/8">
      <p className="eyebrow">{c.insuranceLabel}</p>
      <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-[#0b4ea2]/12 bg-gradient-to-br from-white to-blue-50/50 px-7 py-5 shadow-sm">
        <span className="font-display text-4xl font-black tracking-tight text-[#0b4ea2]">BCA</span>
        <div className="h-8 w-px bg-primary/10" />
        <span className="text-2xl font-bold text-[#2ca3dc]">Life</span>
      </div>
      <p className="mt-5 text-sm leading-6 text-secondary">{c.insuranceBody}</p>
    </div>
  );
}
