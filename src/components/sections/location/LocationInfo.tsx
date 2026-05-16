"use client";

import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

export function LocationInfo() {
  const { lang } = useLanguage();

  return (
    <div className="grid content-start gap-4">
      <div className="gs-card rounded-lg border border-primary/8 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-highlight text-cta">
            <Icon name="map" className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl text-primary">Arcade Dental</h3>
        </div>
        <p className="mt-4 leading-7 text-secondary">{business.address}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={`tel:${business.phoneDisplay.replace(/\s|-/g, "")}`} className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
          <Icon name="phone" className="h-6 w-6 text-cta" />
          <p className="mt-4 text-sm font-bold text-primary">{business.phoneDisplay}</p>
          <p className="text-xs text-secondary">Telp / WA</p>
        </a>
        <a href={business.instagram} target="_blank" rel="noreferrer" className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
          <Icon name="instagram" className="h-6 w-6 text-cta" />
          <p className="mt-4 text-sm font-bold text-primary">@arcade_dental</p>
          <p className="text-xs text-secondary">Instagram</p>
        </a>
      </div>
      <div className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm">
        <Icon name="clock" className="h-6 w-6 text-cta" />
        <p className="mt-4 text-sm font-bold text-primary">{business.hours[lang]}</p>
        <p className="text-xs text-secondary">{lang === "id" ? "Jam operasional" : "Operating hours"}</p>
      </div>
    </div>
  );
}
