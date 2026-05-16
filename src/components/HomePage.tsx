"use client";

import { useArcadeDental } from "@/hooks/useArcadeDental";
import { PageShell } from "./PageShell";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { WhyUs } from "./sections/WhyUs";
import { Testimonials } from "./sections/Testimonials";
import { Gallery } from "./sections/Gallery";
import { Location } from "./sections/Location";
import { Contact } from "./sections/Contact";

export function HomePage() {
  const { state, actions } = useArcadeDental();

  return (
    <PageShell>
      <Hero />
      <About />
      <WhyUs />
      <Testimonials
        testimonialIndex={state.testimonialIndex}
        setTestimonialIndex={actions.setTestimonialIndex}
        pausedCarousel={state.pausedCarousel}
        setPausedCarousel={actions.setPausedCarousel}
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
    </PageShell>
  );
}
