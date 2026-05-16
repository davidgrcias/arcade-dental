"use client";

import { whyUs } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhyUsCard } from "./whyus/WhyUsCard";

export function WhyUs() {
  const { c } = useLanguage();

  return (
    <section id="why-us" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(90deg,#1a2332_1px,transparent_1px),linear-gradient(#1a2332_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.whyLabel} title={c.whyTitle} />
        <div className="grid gap-5 lg:grid-cols-2">
          {whyUs.map((item, index) => (
            <WhyUsCard
              key={item.title.id}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

