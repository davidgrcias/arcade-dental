import { useEffect } from "react";
import { testimonials } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./testimonials/TestimonialCard";

interface TestimonialsProps {
  testimonialIndex: number;
  setTestimonialIndex: (index: number) => void;
  pausedCarousel: boolean;
  setPausedCarousel: (paused: boolean) => void;
}

export function Testimonials({
  testimonialIndex,
  setTestimonialIndex,
  pausedCarousel,
  setPausedCarousel,
}: TestimonialsProps) {
  const { c } = useLanguage();

  useEffect(() => {
    if (pausedCarousel) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [pausedCarousel, setTestimonialIndex]);

  return (
    <section
      id="testimonials"
      className="bg-[linear-gradient(145deg,#e8f4f0,#f0ece6)] py-20 md:py-28"
      onMouseEnter={() => setPausedCarousel(true)}
      onMouseLeave={() => setPausedCarousel(false)}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.testimonialsLabel} title={c.testimonialsTitle} />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial} 
              isActive={testimonialIndex === index} 
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setTestimonialIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${testimonialIndex === index ? "w-10 bg-cta" : "w-2.5 bg-primary/20 hover:bg-primary/30"}`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="https://www.google.com/search?q=Arcade+Dental+Bintaro+reviews" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cta/20 bg-white/70 px-5 py-3 text-sm font-bold text-cta shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md">
            {c.googleReviews}
            <Icon name="chevron" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
