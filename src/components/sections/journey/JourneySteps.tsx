"use client";

import { careJourney } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";

interface JourneyStepsProps {
  activeJourney: number;
}

export function JourneySteps({ activeJourney }: JourneyStepsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-3">
      {careJourney.map((step, index) => (
        <article
          key={step.id}
          className={`journey-step gs-card grid gap-4 rounded-lg border p-5 transition-all duration-300 sm:grid-cols-[56px_1fr] ${
            activeJourney === index
              ? "border-gold bg-white shadow-xl shadow-primary/10"
              : "border-primary/8 bg-white/70 shadow-sm"
          }`}
        >
          <div className={`grid h-12 w-12 place-items-center rounded-lg ${activeJourney === index ? "bg-primary text-gold" : "bg-highlight text-cta"}`}>
            <Icon name={step.icon} className="h-5 w-5" />
          </div>
          <div>
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{t(step.eyebrow)}</p>
            <h3 className="mt-1 font-display text-2xl text-primary">{t(step.title)}</h3>
            <p className="mt-2 text-sm leading-6 text-secondary">{t(step.body)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
