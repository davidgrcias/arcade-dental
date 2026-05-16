"use client";

import { doctors } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoctorCard } from "./doctors/DoctorCard";

export function Doctors() {
  const { c } = useLanguage();

  return (
    <section id="doctors" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.doctorsLabel} title={c.doctorsTitle} body={c.doctorsBody} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={doctor.name}
              name={doctor.name}
              role={doctor.role}
              availability={doctor.availability}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

