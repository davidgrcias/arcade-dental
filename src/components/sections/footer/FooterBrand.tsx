"use client";

import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

export function FooterBrand() {
  const { lang } = useLanguage();

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-gold">
          <Icon name="spark" className="h-5 w-5" />
        </span>
        <h2 className="font-display text-2xl">{business.name}</h2>
      </div>
      <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{business.tagline[lang]}</p>
      <p className="mt-5 font-accent text-[10px] font-bold uppercase tracking-[0.28em] text-gold">{business.hashtag}</p>
      <div className="mt-5 flex gap-3">
        <a href={business.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold">
          <Icon name="instagram" className="h-5 w-5" />
        </a>
        <a href={business.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold">
          <Icon name="facebook" className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
