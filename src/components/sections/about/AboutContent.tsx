"use client";

import { useLanguage } from "@/context/LanguageContext";

export function AboutContent() {
  const { c } = useLanguage();

  return (
    <div className="gs-reveal">
      <p className="eyebrow text-gold">{c.aboutLabel}</p>
      <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{c.aboutTitle}</h2>
      <p className="mt-6 text-lg leading-8 text-white/72">{c.aboutBody}</p>
    </div>
  );
}
