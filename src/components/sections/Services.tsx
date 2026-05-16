"use client";

import { useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  services, 
  type ServiceCategory 
} from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

// Sub-components
import { ServiceMatcher } from "./services/ServiceMatcher";
import { ServiceTabs } from "./services/ServiceTabs";
import { ServiceGrid } from "./services/ServiceGrid";

interface ServicesProps {
  serviceFilter: ServiceCategory;
  setServiceFilter: (filter: ServiceCategory) => void;
  selectedService: string;
  setSelectedService: (id: string) => void;
  matcherId: string;
  setMatcherId: (id: string) => void;
}

export function Services({
  serviceFilter,
  setServiceFilter,
  selectedService,
  setSelectedService,
  matcherId,
  setMatcherId,
}: ServicesProps) {
  const { c, lang, languageReady } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const filteredServices = useMemo(() => {
    if (serviceFilter === "all") return services;
    return services.filter((s) => s.category === serviceFilter);
  }, [serviceFilter]);

  const serviceStats = useMemo(
    () => [
      {
        value: `${services.length}`,
        label: lang === "id" ? "layanan klinis" : "clinical services",
      },
      {
        value: "4",
        label: lang === "id" ? "kategori perawatan" : "care categories",
      },
      {
        value: "1:1",
        label: lang === "id" ? "jalur konsultasi" : "consultation path",
      },
    ],
    [lang]
  );

  useEffect(() => {
    if (!languageReady) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tiltCards = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>(".tilt-card") ?? []);
    const cleanupTilt = tiltCards.map((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * 5;
        const rotateX = (y / rect.height - 0.5) * -5;
        gsap.to(card, { rotateX, rotateY, transformPerspective: 900, duration: 0.35, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanupTilt.forEach((cleanup) => cleanup());
      gsap.killTweensOf(tiltCards);
    };
  }, [languageReady, serviceFilter, filteredServices.length]);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden bg-[#fbfaf7] py-20 md:py-28">
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(90deg,#1a2332_1px,transparent_1px),linear-gradient(#1a2332_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="gs-reveal max-w-2xl">
            <p className="eyebrow">{c.servicesLabel}</p>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">
              {c.servicesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary">{c.servicesBody}</p>
          </div>
          <div className="gs-reveal grid gap-3 sm:grid-cols-3">
            {serviceStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-primary/10 bg-white/78 p-4 shadow-sm backdrop-blur">
                <p className="font-display text-3xl leading-none text-primary">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <ServiceMatcher 
          matcherId={matcherId}
          setMatcherId={setMatcherId}
          setSelectedService={setSelectedService}
        />

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase text-cta">
              {lang === "id" ? "Pilih perawatan" : "Choose treatment"}
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-primary">
              {lang === "id" ? "Layanan yang siap dikonsultasikan" : "Services ready to consult"}
            </h3>
          </div>
          <ServiceTabs 
            serviceFilter={serviceFilter}
            setServiceFilter={setServiceFilter}
          />
        </div>

        <ServiceGrid
          services={filteredServices}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        {/* Price disclaimer — calibrates expectation without making each card noisy */}
        <p className="mt-6 flex items-start gap-2 rounded-lg border border-dashed border-primary/15 bg-white/70 p-4 text-xs leading-5 text-secondary">
          <span aria-hidden className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
          {c.priceDisclaimer}
        </p>
      </div>
    </section>
  );
}
