"use client";

import Image from "next/image";
import { careJourney, siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface JourneyVisualProps {
  activeJourney: number;
}

export function JourneyVisual({ activeJourney }: JourneyVisualProps) {
  const { t, c } = useLanguage();

  return (
    <div className="gs-reveal">
      <p className="eyebrow">{c.journeyLabel}</p>
      <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.journeyTitle}</h2>
      <p className="mt-5 text-lg leading-8 text-secondary">{c.journeyBody}</p>
      <div className="mt-8 h-1 overflow-hidden rounded-full bg-primary/10">
        <div className="journey-progress-bar h-full origin-left scale-x-0 bg-gradient-to-r from-cta to-gold" />
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-primary/8 bg-white shadow-xl shadow-primary/8">
        <div className="journey-image relative aspect-[4/3]">
          <Image 
            src={siteAssets.careJourney} 
            alt="Arcade Dental consultation journey" 
            fill 
            sizes="(min-width: 1024px) 44vw, 100vw" 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/62 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta">{careJourney[activeJourney].metric}</p>
            <p className="font-display text-xl text-primary">{t(careJourney[activeJourney].title)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
