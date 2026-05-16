"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useArcadeDental } from "@/hooks/useArcadeDental";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

// Sections
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Journey } from "./sections/Journey";
import { WhyUs } from "./sections/WhyUs";
import { Technology } from "./sections/Technology";
import { Doctors } from "./sections/Doctors";
import { Testimonials } from "./sections/Testimonials";
import { Gallery } from "./sections/Gallery";
import { Location } from "./sections/Location";
import { Contact } from "./sections/Contact";
import BookingCTA from "./sections/BookingCTA";
import Footer from "./sections/Footer";
import Engagement from "./sections/Engagement";

export function ArcadeDentalSite() {
  const { state, actions, languageReady } = useArcadeDental();
  const { c } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!languageReady) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = mainRef.current;
    if (!root) return;

    if (reduceMotion) {
      gsap.set(root.querySelectorAll(".gs-word, .gs-sub, .hero-title-word, .hero-chip, .gs-reveal, .gs-card, .gs-counter"), {
        clearProps: "all",
        opacity: 1,
      });
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
      <Hero />
      <About />
      <Services
        serviceFilter={state.serviceFilter}
        setServiceFilter={actions.setServiceFilter}
        selectedService={state.selectedService}
        setSelectedService={actions.setSelectedService}
        matcherId={state.matcherId}
        setMatcherId={actions.setMatcherId}
      />
      <Journey
        activeJourney={state.activeJourney}
        setActiveJourney={actions.setActiveJourney}
      />
      <WhyUs />
      <Technology
        activeTech={state.activeTech}
        setActiveTech={actions.setActiveTech}
      />
      <Doctors />
      <Testimonials
        testimonialIndex={state.testimonialIndex}
        setTestimonialIndex={actions.setTestimonialIndex}
        pausedCarousel={state.pausedCarousel}
        setPausedCarousel={actions.setPausedCarousel}
      />
      <Engagement
        quizFear={state.quizFear}
        setQuizFear={actions.setQuizFear}
        badExperience={state.badExperience}
        setBadExperience={actions.setBadExperience}
        quizConcern={state.quizConcern}
        setQuizConcern={actions.setQuizConcern}
        quizResult={state.quizResultText}
        quizMessage={state.quizMessage}
        preview={state.preview}
        handlePreview={actions.handlePreview}
        smileConcern={state.smileConcern}
        setSmileConcern={actions.setSmileConcern}
        selectedSmileConcern={state.selectedSmileConcern}
        sliderValue={state.sliderValue}
        setSliderValue={actions.setSliderValue}
      />
      <Gallery />
      <Location />
      <Contact
        selectedService={state.selectedService}
        setSelectedService={actions.setSelectedService}
        patientName={state.patientName}
        setPatientName={actions.setPatientName}
        schedule={state.schedule}
        setSchedule={actions.setSchedule}
        smartMessage={state.smartMessage}
        handleSmartSubmit={actions.handleSmartSubmit}
      />
      <BookingCTA smartMessage={state.smartMessage} ctaRef={ctaRef} />
      <Footer />

      {/* Floating CTA */}
      <a 
        href={`https://wa.me/6281119213123?text=${encodeURIComponent(state.smartMessage)}`}
        className={`fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-cta px-5 font-bold text-white shadow-2xl shadow-cta/35 transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary`}
      >
        <Icon name="message" className="h-5 w-5" />
        <span className="hidden sm:inline">{c.book}</span>
      </a>
    </main>
  );
}
