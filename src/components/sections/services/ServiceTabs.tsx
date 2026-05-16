"use client";

import { serviceCategories, type ServiceCategory } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceTabsProps {
  serviceFilter: ServiceCategory;
  setServiceFilter: (filter: ServiceCategory) => void;
}

export function ServiceTabs({ serviceFilter, setServiceFilter }: ServiceTabsProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mb-10 flex max-w-3xl gap-2 overflow-x-auto rounded-full border border-primary/10 bg-white/80 p-2 shadow-sm backdrop-blur no-scrollbar" role="tablist">
      {serviceCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={serviceFilter === category.id}
          onClick={() => setServiceFilter(category.id)}
          className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-5 text-sm font-bold transition-all duration-200 ${
            serviceFilter === category.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-primary/65 hover:bg-surface-2 hover:text-primary"
          }`}
        >
          {t(category.label)}
        </button>
      ))}
    </div>
  );
}
