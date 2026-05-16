"use client";

import { technologies } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";

interface TechSelectorProps {
  activeTech: number;
  setActiveTech: (index: number) => void;
}

export function TechSelector({ activeTech, setActiveTech }: TechSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-3">
      {technologies.map((technology, index) => (
        <button
          key={technology.title}
          type="button"
          onMouseEnter={() => setActiveTech(index)}
          onFocus={() => setActiveTech(index)}
          className={`gs-card group grid gap-4 rounded-lg border p-5 text-left transition-all sm:grid-cols-[56px_1fr] ${
            activeTech === index 
              ? "border-gold bg-white text-primary shadow-xl shadow-gold/10" 
              : "border-white/10 bg-white/[0.06] text-white hover:border-gold/40 hover:bg-white/[0.10]"
          }`}
        >
          <div className={`grid h-12 w-12 place-items-center rounded-lg ${activeTech === index ? "bg-primary text-gold" : "bg-gold text-primary"}`}>
            <Icon name={technology.icon} className="h-5 w-5" />
          </div>
          <div>
            <h3 className={`font-display text-2xl ${activeTech === index ? "text-primary" : "text-white"}`}>{technology.title}</h3>
            <p className={`mt-2 text-sm leading-6 ${activeTech === index ? "text-primary/68" : "text-white/62"}`}>{t(technology.benefit)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
