"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeAfterProps {
  sliderValue: number;
  setSliderValue: (val: number) => void;
}

export function BeforeAfter({ sliderValue, setSliderValue }: BeforeAfterProps) {
  const { c } = useLanguage();

  return (
    <article className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
      <p className="eyebrow text-gold">{c.beforeAfterLabel}</p>
      <h2 className="font-display text-3xl leading-tight">{c.beforeAfterTitle}</h2>
      <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-white/12">
        <Image src={siteAssets.smileTransform} alt={c.before} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-left" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
          <div className="relative h-full w-[720px] max-w-none">
            <Image src={siteAssets.smileTransform} alt={c.after} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-right" />
          </div>
        </div>
        <div className="absolute inset-y-0 z-10 flex items-center justify-center" style={{ left: `calc(${sliderValue}% - 1px)` }}>
          <div className="h-full w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          <div className="absolute grid h-9 w-9 place-items-center rounded-full bg-white shadow-xl">
            <Icon name="arrow" className="h-4 w-4 text-primary" />
          </div>
        </div>
        <span className="absolute left-3 top-3 z-10 rounded-full bg-cta/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.after}</span>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.before}</span>
      </div>
      <label className="sr-only" htmlFor="before-after-slider">{c.beforeAfterLabel}</label>
      <input id="before-after-slider" type="range" min="10" max="90" value={sliderValue} onChange={(event) => setSliderValue(Number(event.target.value))} className="mt-5 w-full accent-gold" />
    </article>
  );
}
