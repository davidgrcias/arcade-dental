"use client";

import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { InsuranceBadge } from "./InsuranceBadge";

export function ContactInfo() {
  const { lang, c } = useLanguage();

  return (
    <div className="gs-reveal">
      <p className="eyebrow">{c.locationLabel}</p>
      <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.contactTitle}</h2>
      <p className="mt-5 text-lg leading-8 text-secondary">{c.contactBody}</p>

      <div className="mt-8 flex flex-col gap-3">
        {([
          { icon: "spark" as const, text: lang === "id" ? "Teknologi painless terkini" : "Latest painless technology" },
          { icon: "calendar" as const, text: business.hours[lang] },
        ] as const).map((item) => (
          <div key={item.text} className="flex items-center gap-3 text-sm text-secondary">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-highlight text-cta">
              <Icon name={item.icon} className="h-4 w-4" />
            </div>
            {item.text}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <InsuranceBadge />
      </div>
    </div>
  );
}
