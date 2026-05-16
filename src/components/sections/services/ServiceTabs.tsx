"use client";

import { serviceCategories, services, type ServiceCategory } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceTabsProps {
  serviceFilter: ServiceCategory;
  setServiceFilter: (filter: ServiceCategory) => void;
}

export function ServiceTabs({ serviceFilter, setServiceFilter }: ServiceTabsProps) {
  const { t } = useLanguage();

  return (
    <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-primary/10 bg-white/86 p-1.5 shadow-[0_12px_38px_rgba(26,35,50,0.08)] backdrop-blur no-scrollbar" role="tablist" aria-label="Service categories">
      {serviceCategories.map((category) => {
        const count = category.id === "all"
          ? services.length
          : services.filter((service) => service.category === category.id).length;
        const isActive = serviceFilter === category.id;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setServiceFilter(category.id)}
            className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-bold transition-all duration-200 sm:px-5 ${
              isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-primary/64 hover:bg-surface-2 hover:text-primary"
            }`}
          >
            <span>{t(category.label)}</span>
            <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] ${
              isActive ? "bg-white/14 text-gold" : "bg-primary/6 text-primary/55"
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
