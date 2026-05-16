import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { HeroVisuals } from "./hero/HeroVisuals";
import { HeroContent } from "./hero/HeroContent";

export function Hero() {
  const { languageReady } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!languageReady) return;

    const ctx = gsap.context(() => {
      const isAtTop = window.scrollY < 120;
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      if (isAtTop) {
        heroTl
          .fromTo(".hero-title-word", { opacity: 0, y: 46, rotateX: -16 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.08 })
          .fromTo(".gs-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.35")
          .fromTo(".hero-chip", { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 }, "-=0.35");
      } else {
        gsap.set(".hero-title-word, .gs-sub, .hero-chip", { opacity: 1, y: 0, rotateX: 0, scale: 1 });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [languageReady]);

  return (
    <section id="hero" ref={heroRef} className="relative isolate min-h-[92vh] overflow-hidden bg-primary pt-24 text-white">
      <HeroVisuals />
      <HeroContent />

      <div className="relative h-20 overflow-hidden">
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#1a2332" />
        </svg>
      </div>
    </section>
  );
}
