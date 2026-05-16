"use client";

import { Icon } from "@/components/ui/Icon";
import { heroCopy, trustBadges, business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

export function HeroContent() {
  const { t, lang } = useLanguage();

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-center px-5 pb-16 pt-8 md:px-8 lg:pb-20 lg:pt-12">
      <div className="max-w-3xl" style={{ perspective: "900px" }}>
        <p className="gs-sub eyebrow text-gold">{t(heroCopy.eyebrow)}</p>
        <h1 className="mt-3 max-w-3xl font-display leading-[0.96] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.32)]">
          {t(heroCopy.title)
            .split(" ")
            .map((word, i) => (
              <span key={i} className="hero-title-word inline-block pr-[0.22em] text-5xl md:text-6xl lg:text-7xl">
                {word}
              </span>
            ))}
        </h1>
        <p className="gs-sub mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{t(heroCopy.description)}</p>
        <div className="gs-sub mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/#contact" className="magnetic-cta group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-7 text-base font-bold text-primary shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl">
            <Icon name="calendar" className="h-5 w-5" />
            {t(heroCopy.primaryCta)}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </a>
          <a href="/services" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-base font-bold text-white shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-white/16">
            {t(heroCopy.secondaryCta)}
          </a>
        </div>
        <div className="gs-sub mt-8 flex flex-wrap gap-2.5">
          {trustBadges.map((badge) => (
            <span key={badge.id} className="hero-chip inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/90 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {badge[lang]}
            </span>
          ))}
        </div>
        <p className="gs-sub mt-8 font-accent text-xs font-bold uppercase tracking-[0.32em] text-gold">{business.hashtag}</p>
      </div>
    </div>
  );
}
