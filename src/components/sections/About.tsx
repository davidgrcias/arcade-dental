"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { AboutContent } from "./about/AboutContent";
import { StatCard } from "./about/StatCard";

export function About() {
  const { languageReady } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!languageReady) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll<HTMLElement>(".gs-counter").forEach((element) => {
        const target = Number(element.dataset.count ?? "0");
        const suffix = element.dataset.suffix ?? "";
        gsap.fromTo(
          element,
          { innerText: "0" },
          {
            innerText: target,
            duration: 1.25,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate() {
              element.textContent = `${Math.round(Number(element.innerText))}${suffix}`;
            },
            scrollTrigger: {
              trigger: element,
              start: "top 94%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [languageReady]);

  return (
    <section id="about" ref={sectionRef} className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AboutContent />
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <StatCard key={stat.label.id} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
}

