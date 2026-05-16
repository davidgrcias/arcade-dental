"use client";

import Image from "next/image";
import { careJourney } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

interface JourneyVisualProps {
  activeJourney: number;
}

const accentBg = {
  cta: "bg-cta",
  gold: "bg-gold",
} as const;

const accentText = {
  cta: "text-cta",
  gold: "text-gold",
} as const;

const accentSoft = {
  cta: "bg-cta/12 text-cta",
  gold: "bg-gold/15 text-gold",
} as const;

export function JourneyVisual({ activeJourney }: JourneyVisualProps) {
  const { t, lang } = useLanguage();
  const step = careJourney[activeJourney];
  const total = careJourney.length;
  const accent = step.accent;

  const nowLabel = lang === "id" ? "Sedang berlangsung" : "Now in progress";

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/8 bg-white shadow-2xl shadow-primary/8">
      <div className="relative aspect-[5/4] w-full">
        {/* Image stack with crossfade */}
        {careJourney.map((s, index) => (
          <Image
            key={s.id}
            src={s.image}
            alt={t(s.imageAlt)}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={index === 0}
            className={`object-cover transition-all duration-700 ease-out ${
              activeJourney === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />

        {/* Top-left: Now badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
          <span className={`relative inline-flex h-2 w-2`}>
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${accentBg[accent]}`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${accentBg[accent]}`} />
          </span>
          <span className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{nowLabel}</span>
        </div>

        {/* Top-right: Step counter */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-primary/85 px-3 py-1.5 text-white shadow-sm backdrop-blur">
          <span className={`font-accent text-sm font-bold ${accent === "gold" ? "text-gold" : "text-white"}`}>
            {step.metric}
          </span>
          <span className="text-white/40">/</span>
          <span className="font-accent text-sm font-bold text-white/80">{String(total).padStart(2, "0")}</span>
        </div>

        {/* Bottom: floating chip card */}
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <div className="rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur sm:p-5">
            <div className="flex items-center gap-3">
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${accentSoft[accent]}`}>
                <Icon name={step.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-accent text-[10px] font-bold uppercase tracking-[0.22em] ${accentText[accent]}`}>
                  {t(step.eyebrow)}
                </p>
                <h4 className="truncate font-display text-lg leading-tight text-primary sm:text-xl">{t(step.title)}</h4>
              </div>
              <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-semibold text-primary/75 sm:flex">
                <Icon name="clock" className="h-3.5 w-3.5 text-primary/55" />
                <span>{t(step.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar inside card */}
      <div className="relative h-1 w-full bg-primary/8">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cta to-gold transition-all duration-500 ease-out"
          style={{ width: `${((activeJourney + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
