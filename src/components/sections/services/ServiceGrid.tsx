"use client";

import { Icon } from "@/components/ui/Icon";
import { type Service } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceGridProps {
  services: Service[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <article key={service.id} className="gs-card tilt-card reveal-card group min-h-[220px]">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-highlight text-cta transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:shadow-lg group-hover:shadow-cta/20">
            <Icon name={service.icon} className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl leading-snug text-primary">{t(service.title)}</h3>
          <p className="mt-2.5 text-sm leading-6 text-secondary">{t(service.description)}</p>
        </article>
      ))}
    </div>
  );
}
