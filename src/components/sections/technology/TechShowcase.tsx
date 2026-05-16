"use client";

import Image from "next/image";
import { techMetrics, siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

export function TechShowcase() {
  const { t } = useLanguage();

  return (
    <div className="gs-reveal relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20">
      <Image 
        src={siteAssets.techLab} 
        alt="Arcade Dental technology lab" 
        fill 
        sizes="(min-width: 1024px) 52vw, 100vw" 
        className="object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/22 to-transparent" />
      <div className="tech-diagnostic-line absolute bottom-0 top-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(200,169,110,0.24),transparent)]" />
      <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
        {techMetrics.map((metric) => {
          const numeric = metric.value.match(/^(\d+)(.*)$/);
          return (
            <div key={metric.label.id} className="rounded-lg border border-white/12 bg-primary/62 p-4 backdrop-blur">
              <p className="font-display text-4xl text-gold">
                {numeric ? (
                  <span className="gs-counter" data-count={numeric[1]} data-suffix={numeric[2]}>
                    0{numeric[2]}
                  </span>
                ) : (
                  metric.value
                )}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/58">{t(metric.label)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
