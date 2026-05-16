import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careJourney } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { JourneyVisual } from "./journey/JourneyVisual";
import { JourneySteps } from "./journey/JourneySteps";

interface JourneyProps {
  activeJourney: number;
  setActiveJourney: (index: number) => void;
}

export function Journey({ activeJourney, setActiveJourney }: JourneyProps) {
  const { languageReady } = useLanguage();
  const journeyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!languageReady) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (journeyRef.current && window.innerWidth >= 1024) {
        const progress = journeyRef.current.querySelector<HTMLElement>(".journey-progress-bar");
        ScrollTrigger.create({
          trigger: journeyRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.6}`,
          pin: ".journey-pin",
          scrub: 0.35,
          onUpdate(self) {
            const index = Math.min(careJourney.length - 1, Math.floor(self.progress * careJourney.length));
            setActiveJourney(index);
            if (progress) {
              gsap.to(progress, { scaleX: self.progress, duration: 0.12, overwrite: true, ease: "none" });
            }
          },
        });

        gsap.to(".journey-image", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      } else {
        gsap.set(".journey-progress-bar", { scaleX: 1 });
      }
    }, journeyRef);

    return () => ctx.revert();
  }, [languageReady, setActiveJourney]);

  return (
    <section id="journey" ref={journeyRef} className="relative bg-surface-2">
      <div className="journey-pin min-h-screen overflow-hidden py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <JourneyVisual activeJourney={activeJourney} />
          <JourneySteps activeJourney={activeJourney} />
        </div>
      </div>
    </section>
  );
}
