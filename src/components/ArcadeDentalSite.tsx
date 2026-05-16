"use client";

import { useArcadeDental } from "@/hooks/useArcadeDental";

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
import { Insurance } from "./sections/Insurance";
import { Location } from "./sections/Location";
import Contact from "./sections/Contact";
import { BookingCTA } from "./sections/BookingCTA";
import { Footer } from "./sections/Footer";
import Engagement from "./sections/Engagement";

export function ArcadeDentalSite() {
  const { state, actions, languageReady } = useArcadeDental();

  if (!languageReady) return null;

  return (
    <main className="min-h-screen bg-surface text-primary">
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
      <Gallery
        setGalleryIndex={actions.setGalleryIndex}
      />
      <Insurance />
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
      <BookingCTA />
      <Footer />
    </main>
  );
}

