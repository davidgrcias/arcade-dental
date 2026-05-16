"use client";

import { useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  const { c, languageReady } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const filteredServices = useMemo(() => {
    if (serviceFilter === "all") return services;
    return services.filter((s) => s.category === serviceFilter);
  }, [serviceFilter]);

  useEffect(() => {
    if (!languageReady) return;

    const ctx = gsap.context(() => {
      const tiltCards = sectionRef.current?.querySelectorAll<HTMLElement>(".tilt-card");
      tiltCards?.forEach((card) => {
        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = ((y / rect.height) - 0.5) * -7;
          gsap.to(card, { rotateX, rotateY, transformPerspective: 800, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [languageReady]);

  return (
    <section id="services" ref={sectionRef} className="section-shell">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.servicesLabel} title={c.servicesTitle} body={c.servicesBody} />

        <ServiceMatcher 
          matcherId={matcherId}
          setMatcherId={setMatcherId}
          setSelectedService={setSelectedService}
        />

        <ServiceTabs 
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
        />

        <ServiceGrid services={filteredServices} />
      </div>
    </section>
  );
}

