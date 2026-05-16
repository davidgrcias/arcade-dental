"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

export function InsuranceAction() {
  const { lang, c } = useLanguage();

  return (
    <div className="gs-reveal">
      <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.insuranceTitle}</h2>
      <a href="#contact" className="mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-primary px-7 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta hover:shadow-xl">
        <Icon name="shield" className="h-5 w-5" />
        {lang === "id" ? "Cek Asuransi Saya" : "Check My Insurance"}
      </a>
    </div>
  );
}
