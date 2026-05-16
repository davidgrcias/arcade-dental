"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { Navbar } from "./sections/Navbar";
import Footer from "./sections/Footer";
import BookingCTA from "./sections/BookingCTA";
import { useArcadeDental } from "@/hooks/useArcadeDental";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const { state } = useArcadeDental();
  const { c, languageReady } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!languageReady) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = mainRef.current;
    if (!root) return;

    if (reduceMotion) {
      gsap.set(
        root.querySelectorAll(
          ".gs-word, .gs-sub, .hero-title-word, .hero-chip, .gs-reveal, .gs-card, .gs-counter",
        ),
        { clearProps: "all", opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gs-reveal, .gs-card", {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.72,
            stagger: 0.07,
            ease: "power2.out",
          });
        },
      });
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [languageReady]);

  if (!languageReady) return null;

  return (
    <main ref={mainRef} className="min-h-screen bg-surface text-primary">
      <Navbar />
      {children}
      <BookingCTA smartMessage={state.smartMessage} ctaRef={ctaRef} />
      <Footer />

      {/* Floating WhatsApp CTA */}
      <a
        href={`https://wa.me/6281119213123?text=${encodeURIComponent(state.smartMessage)}`}
        className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-cta px-5 font-bold text-white shadow-2xl shadow-cta/35 transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary"
      >
        <Icon name="message" className="h-5 w-5" />
        <span className="hidden sm:inline">{c.book}</span>
      </a>
    </main>
  );
}
