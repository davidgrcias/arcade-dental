"use client";

import { useHomeState } from "@/hooks/useArcadeDental";
import { PageShell } from "./PageShell";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Credentials } from "./sections/Credentials";
import { InsurancePartners } from "./sections/InsurancePartners";
import { WhyUs } from "./sections/WhyUs";
import { Testimonials } from "./sections/Testimonials";
import { Gallery } from "./sections/Gallery";
import { Location } from "./sections/Location";
import { Contact } from "./sections/Contact";

export function HomePage() {
  const { state, actions } = useHomeState();

  return (
    <PageShell smartMessage={state.smartMessage}>
      <Hero />
      <About />
      <Credentials />
      <InsurancePartners />
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
