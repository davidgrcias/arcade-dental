"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteAssets, stats } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { AboutContent } from "./about/AboutContent";
import { StatCard } from "./about/StatCard";

export function About() {
  const { lang, languageReady } = useLanguage();
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
          <div className="gs-card relative min-h-[260px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/10 sm:col-span-2">
            <Image
              src={siteAssets.waitingLounge}
              alt={lang === "id" ? "Ruang tunggu asli Arcade Dental" : "Real Arcade Dental waiting lounge"}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/74 via-primary/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/12 bg-primary/58 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                {lang === "id" ? "Suasana klinik asli" : "Real clinic atmosphere"}
              </p>
              <p className="mt-1 font-display text-2xl text-white">
                {lang === "id" ? "Nyaman dari ruang tunggu sampai ruang tindakan." : "Comfort from lounge to treatment room."}
              </p>
            </div>
          </div>
          {stats.map((stat) => (
            <StatCard key={stat.label.id} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
}
