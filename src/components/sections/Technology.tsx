import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { TechShowcase } from "./technology/TechShowcase";
import { TechSelector } from "./technology/TechSelector";

interface TechnologyProps {
  activeTech: number;
  setActiveTech: (index: number) => void;
}

export function Technology({ activeTech, setActiveTech }: TechnologyProps) {
  const { c, languageReady } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!languageReady) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Diagnostic line animation
      gsap.to(".tech-diagnostic-line", {
        xPercent: 120,
        repeat: -1,
        duration: 3.6,
        ease: "power1.inOut",
        yoyo: true,
      });

      // Counters animation
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
    <section id="technology" ref={sectionRef} className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
      <Image src={siteAssets.techTexture} alt="" fill sizes="100vw" className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-primary/82" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.techLabel} title={c.techTitle} body={c.techBody} dark />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <TechShowcase />
          <TechSelector activeTech={activeTech} setActiveTech={setActiveTech} />
        </div>
      </div>
    </section>
  );
}
