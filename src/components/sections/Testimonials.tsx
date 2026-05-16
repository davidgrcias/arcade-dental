"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { testimonials } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { getInitials } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./testimonials/TestimonialCard";
import { GoogleMark } from "./testimonials/GoogleMark";

interface TestimonialsProps {
  testimonialIndex: number;
  setTestimonialIndex: Dispatch<SetStateAction<number>>;
  pausedCarousel: boolean;
  setPausedCarousel: (paused: boolean) => void;
}

const AUTOPLAY_MS = 6000;

export function Testimonials({
  testimonialIndex,
  setTestimonialIndex,
  pausedCarousel,
  setPausedCarousel,
}: TestimonialsProps) {
  const { c, t, lang } = useLanguage();
  const total = testimonials.length;
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (idx: number) => {
      setTestimonialIndex(((idx % total) + total) % total);
    },
    [setTestimonialIndex, total],
  );

  const next = useCallback(() => {
    setTestimonialIndex((current) => (current + 1) % total);
  }, [setTestimonialIndex, total]);

  const prev = useCallback(() => {
    setTestimonialIndex((current) => (current - 1 + total) % total);
  }, [setTestimonialIndex, total]);

  // Autoplay with progress bar
  useEffect(() => {
    if (pausedCarousel) {
      setProgress(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(ratio);
      if (ratio >= 1) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pausedCarousel, testimonialIndex, next]);

  // Scroll active card into view in the rail
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(`[data-tcard="${testimonialIndex}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [testimonialIndex]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("testimonials");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const featured = testimonials[testimonialIndex];
  const featuredRating = featured.rating ?? 5;

  // Stats
  const ratingAvg = (
    testimonials.reduce((sum, item) => sum + (item.rating ?? 5), 0) / total
  ).toFixed(1);

  const stats = [
    {
      value: ratingAvg,
      suffix: "/5",
      label: lang === "id" ? "Rating Google" : "Google rating",
      icon: "star" as const,
    },
    {
      value: `${total}+`,
      suffix: "",
      label: lang === "id" ? "Ulasan terbaru" : "Recent reviews",
      icon: "heart" as const,
    },
    {
      value: "100%",
      suffix: "",
      label: lang === "id" ? "Verified Google" : "Verified Google",
      icon: "shield" as const,
    },
  ];

  // Touch swipe on hero
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[linear-gradient(145deg,#e8f4f0,#f0ece6)] py-20 md:py-28"
      onMouseEnter={() => setPausedCarousel(true)}
      onMouseLeave={() => setPausedCarousel(false)}
    >
      {/* Decorative quote watermark */}
      <span aria-hidden className="pointer-events-none absolute -left-16 top-12 hidden text-[18rem] font-display font-black leading-none text-primary/5 md:block">
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.testimonialsLabel} title={c.testimonialsTitle} />

        {/* Stats strip */}
        <div className="gs-reveal mx-auto -mt-4 mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-primary/8 bg-white/80 p-3 shadow-sm backdrop-blur sm:gap-4 sm:p-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 px-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-gold">
                <Icon name={stat.icon} className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="font-display text-xl leading-none text-primary">
                  {stat.value}
                  <span className="font-sans text-xs text-primary/55">{stat.suffix}</span>
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary/55">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero featured testimonial */}
        <article
          key={`hero-${testimonialIndex}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="gs-reveal relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-primary/8 bg-white p-7 shadow-2xl shadow-primary/8 sm:p-10"
        >
          {/* Soft branded glow */}
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-2xl" />
          <span aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-cta/10 blur-2xl" />

          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1.5 shadow-sm">
              <GoogleMark className="h-4 w-4" />
              <span className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/75">
                {lang === "id" ? "Verified Google review" : "Verified Google review"}
              </span>
            </span>

            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, star) => (
                <Icon
                  key={star}
                  name="star"
                  className={`h-4 w-4 ${star < featuredRating ? "fill-current" : "text-primary/15"}`}
                />
              ))}
              <span className="ml-2 font-display text-base font-bold text-primary">{featuredRating.toFixed(1)}</span>
            </div>
          </div>

          <Icon name="quote" className="relative mt-6 h-10 w-10 text-gold/45" />

          <blockquote className="relative mt-2">
            <p className="font-display text-2xl leading-snug text-primary sm:text-3xl sm:leading-snug">
              {t(featured.quote)}
            </p>
          </blockquote>

          <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-primary/8 pt-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-gold font-display text-base font-bold shadow-md">
                {getInitials(featured.name) || featured.name.charAt(0)}
              </span>
              <div>
                <p className="font-display text-lg leading-tight text-primary">{featured.name}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {lang === "id" ? "Pasien Arcade Dental" : "Arcade Dental patient"}
                </p>
              </div>
            </div>

            {featured.service && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cta/10 px-3 py-1.5 text-[11px] font-bold text-cta">
                <Icon name="spark" className="h-3.5 w-3.5" />
                {t(featured.service)}
              </span>
            )}
          </div>

          {/* Autoplay progress bar */}
          <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-primary/8">
            <div
              className="h-full bg-gradient-to-r from-cta to-gold"
              style={{
                width: `${progress * 100}%`,
                transition: pausedCarousel ? "none" : "width 100ms linear",
              }}
            />
          </div>
        </article>

        {/* Controls */}
        <div className="gs-reveal mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={lang === "id" ? "Sebelumnya" : "Previous"}
              className="grid h-10 w-10 place-items-center rounded-full border border-primary/12 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
            >
              <Icon name="chevron" className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={lang === "id" ? "Berikutnya" : "Next"}
              className="grid h-10 w-10 place-items-center rounded-full border border-primary/12 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
            >
              <Icon name="chevron" className="h-4 w-4" />
            </button>
            <span className="ml-2 font-accent text-[11px] font-bold tracking-[0.22em] text-primary/65">
              {String(testimonialIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-primary/30">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {testimonials.map((tst, idx) => (
              <button
                key={tst.name}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Show review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  testimonialIndex === idx ? "w-8 bg-cta" : "w-2 bg-primary/20 hover:bg-primary/35"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rail of all testimonials */}
        <div ref={railRef} className="no-scrollbar mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2">
          {testimonials.map((item, idx) => (
            <div key={item.name} data-tcard={idx} className="flex">
              <TestimonialCard
                testimonial={item}
                isActive={testimonialIndex === idx}
                onClick={() => goTo(idx)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=Arcade+Dental+Bintaro+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cta/20 bg-white px-5 py-3 text-sm font-bold text-cta shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta hover:text-white hover:shadow-md"
          >
            <GoogleMark className="h-4 w-4" />
            {c.googleReviews}
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
