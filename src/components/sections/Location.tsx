"use client";

import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapFrame } from "./location/MapFrame";
import { LocationInfo } from "./location/LocationInfo";

export function Location() {
  const { c } = useLanguage();

  return (
    <section id="location" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.locationLabel} title={c.locationTitle} />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <MapFrame />
          <LocationInfo />
        </div>
      </div>
    </section>
  );
}

