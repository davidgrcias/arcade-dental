"use client";

import { Icon } from "@/components/ui/Icon";
import { serviceCategories, type Service } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceGridProps {
  services: Service[];
  selectedService: string;
  setSelectedService: (id: string) => void;
}

export function ServiceGrid({ services, selectedService, setSelectedService }: ServiceGridProps) {
  const { lang, t } = useLanguage();
  const selectedLabel = lang === "id" ? "Dipilih" : "Selected";
  const selectLabel = lang === "id" ? "Pilih layanan" : "Choose service";

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((service, index) => {
        const isSelected = service.id === selectedService;
        const category = serviceCategories.find((item) => item.id === service.category);

        return (
          <button
            key={service.id}
            type="button"
            aria-pressed={isSelected}
            aria-label={`${isSelected ? selectedLabel : selectLabel}: ${t(service.title)}`}
            onClick={() => setSelectedService(service.id)}
            className={`tilt-card group relative flex min-h-[272px] flex-col overflow-hidden rounded-lg border p-6 text-left shadow-[0_10px_30px_rgba(26,35,50,0.06)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cta/18 ${
              isSelected
                ? "border-cta bg-white shadow-[0_20px_55px_rgba(45,125,107,0.15)]"
                : "border-primary/10 bg-white/92 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-[0_22px_60px_rgba(26,35,50,0.10)]"
            }`}
          >
            <span className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r from-gold via-cta to-transparent transition-opacity duration-300 ${
              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`} />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-highlight/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative flex items-start justify-between gap-4">
              <span className={`grid h-14 w-14 place-items-center rounded-lg transition-all duration-300 ${
                isSelected
                  ? "bg-cta text-white shadow-lg shadow-cta/20"
                  : "bg-highlight text-cta group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/16"
              }`}>
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
                isSelected
                  ? "border-cta/20 bg-highlight text-cta"
                  : "border-primary/8 bg-white/70 text-primary/45"
              }`}>
                {isSelected ? selectedLabel : String(index + 1).padStart(2, "0")}
              </span>
            </span>

            <span className="relative mt-5 text-xs font-bold uppercase text-cta">
              {category ? t(category.label) : ""}
            </span>
            <h4 className="relative mt-2 break-words font-display text-2xl leading-tight text-primary">
              {t(service.title)}
            </h4>
            <p className="relative mt-3 text-sm leading-6 text-secondary">
              {t(service.description)}
            </p>

            <span className="relative mt-auto flex items-center justify-between gap-4 border-t border-primary/8 pt-5 text-sm font-bold text-primary">
              <span>{isSelected ? (lang === "id" ? "Masuk ke form reservasi" : "Added to booking form") : selectLabel}</span>
              <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                isSelected ? "bg-cta text-white" : "bg-surface-2 text-cta group-hover:bg-gold group-hover:text-primary"
              }`}>
                <Icon name={isSelected ? "check" : "arrow"} className="h-4 w-4" />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
