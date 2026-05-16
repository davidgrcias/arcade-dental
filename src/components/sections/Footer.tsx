"use client";

import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  const { lang, c } = useLanguage();

  return (
    <footer className="bg-[#0d1520] px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-gold"><Icon name="spark" className="h-5 w-5" /></span>
            <h2 className="font-display text-2xl">{business.name}</h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{business.tagline[lang]}</p>
          <p className="mt-5 font-accent text-[10px] font-bold uppercase tracking-[0.28em] text-gold">{business.hashtag}</p>
          <div className="mt-5 flex gap-3">
            <a href={business.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="instagram" className="h-5 w-5" /></a>
            <a href={business.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="facebook" className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{c.locationLabelFooter || c.locationLabel}</p>
          <p className="mt-4 text-sm leading-7 text-white/55">{business.address}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{lang === "id" ? "Kontak" : "Contact"}</p>
          <div className="mt-4 space-y-2.5 text-sm text-white/55">
            <p>{business.hours[lang]}</p>
            <a href={`tel:${business.phoneDisplay.replace(/\s|-/g, "")}`} className="block transition-colors hover:text-gold">{business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`} className="block transition-colors hover:text-gold">{business.email}</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center">
        <p>(c) 2026 Arcade Dental. All rights reserved.</p>
        <a href={business.website} target="_blank" rel="noreferrer" className="hover:text-white/60">{business.website.replace("https://", "")}</a>
      </div>
    </footer>
  );
}
