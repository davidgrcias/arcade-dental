"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/content";

interface StatCardProps {
  label: TranslationKey;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  const { t } = useLanguage();
  const numeric = value.match(/^(\d+)(.*)$/);

  return (
    <div className="gs-card rounded-lg border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
      <div className="font-display text-5xl text-gold">
        {numeric ? (
          <span className="gs-counter" data-count={numeric[1]} data-suffix={numeric[2]}>
            0{numeric[2]}
          </span>
        ) : (
          value
        )}
      </div>
      <p className="mt-3 text-sm font-semibold text-white/70">{t(label)}</p>
    </div>
  );
}
