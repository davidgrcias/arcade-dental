"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedText } from "@/lib/content";

interface WhyUsCardProps {
  title: LocalizedText;
  description: LocalizedText;
  index: number;
}

export function WhyUsCard({ title, description, index }: WhyUsCardProps) {
  const { t } = useLanguage();

  return (
    <article className="gs-card group grid gap-5 rounded-lg border border-primary/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/8 sm:grid-cols-[88px_1fr]">
      <div className="font-display text-6xl font-bold text-gold/50 transition-colors duration-300 group-hover:text-gold">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-display text-2xl text-primary">{t(title)}</h3>
        <p className="mt-2.5 leading-7 text-secondary">{t(description)}</p>
      </div>
    </article>
  );
}
