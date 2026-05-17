"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { careJourney } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { JourneyVisual } from "./journey/JourneyVisual";
import { JourneySteps } from "./journey/JourneySteps";

interface JourneyProps {
  activeJourney: number;
  setActiveJourney: (index: number) => void;
}

const AUTOPLAY_MS = 4500;

const accentDot = {
  cta: "bg-cta",
  gold: "bg-gold",
} as const;

const accentText = {
  cta: "text-cta",
  gold: "text-gold",
} as const;

const accentRing = {
  cta: "stroke-cta",
  gold: "stroke-gold",
} as const;

export function Journey({ activeJourney, setActiveJourney }: JourneyProps) {
  const { c, t, lang, languageReady } = useLanguage();
  const journeyRef = useRef<HTMLElement>(null);
  const lastJourneyRef = useRef<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tickProgress, setTickProgress] = useState(0);

  const total = careJourney.length;
  const step = careJourney[activeJourney];
  const accent = step.accent;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveJourney(next);
    },
    [setActiveJourney, total],
  );

  const handleNext = useCallback(() => goTo(activeJourney + 1), [activeJourney, goTo]);
  const handlePrev = useCallback(() => goTo(activeJourney - 1), [activeJourney, goTo]);
  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  // Autoplay tour with progress ring
  useEffect(() => {
    if (!isPlaying) {
      setTickProgress(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / AUTOPLAY_MS);
      setTickProgress(ratio);
      if (ratio >= 1) {
        goTo(activeJourney + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, activeJourney, goTo]);

  // Animate stage when step changes
  useEffect(() => {
    if (!languageReady) return;
    if (lastJourneyRef.current === activeJourney) return;
    lastJourneyRef.current = activeJourney;

    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const stage = journeyRef.current?.querySelector<HTMLElement>(".journey-stage-content");
    if (stage) {
      // Avoid blur filter — too expensive on mobile compositors. Fade + slide only.
      gsap.fromTo(
        stage,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true },
      );
    }

    const meta = journeyRef.current?.querySelectorAll<HTMLElement>(".journey-meta-item");
    if (meta && meta.length) {
      gsap.fromTo(
        meta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06, overwrite: true },
      );
    }
  }, [activeJourney, languageReady]);

  // Keyboard nav (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  const playLabel = lang === "id" ? "Mulai tour" : "Play tour";
  const pauseLabel = lang === "id" ? "Jeda tour" : "Pause tour";
  const prevLabel = lang === "id" ? "Sebelumnya" : "Previous";
  const nextLabel = lang === "id" ? "Berikutnya" : "Next";

  // Ring math
  const RING_SIZE = 28;
  const RING_R = 12;
  const RING_C = 2 * Math.PI * RING_R;

  return (
    <section id="journey" ref={journeyRef} className="relative overflow-hidden bg-surface-2 py-20 md:py-28">
      {/* Decorative backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-cta/8 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="gs-reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{c.journeyLabel}</p>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.journeyTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-secondary">{c.journeyBody}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={prevLabel}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary/12 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
            >
              <Icon name="chevron" className="h-4 w-4 rotate-180" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? pauseLabel : playLabel}
              className={`relative inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                isPlaying ? "bg-primary text-white" : "bg-white text-primary border border-primary/12"
              }`}
            >
              <span className="relative grid h-7 w-7 place-items-center">
                <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="absolute inset-0">
                  <circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_R}
                    className={isPlaying ? "stroke-white/25" : "stroke-primary/15"}
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_R}
                    className={`${accentRing[accent]} transition-[stroke-dashoffset] duration-100 ease-linear`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - tickProgress)}
                    transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
                  />
                </svg>
                {isPlaying ? (
                  <span aria-hidden className="flex h-3 gap-[3px]">
                    <span className="block w-[3px] rounded-full bg-current" />
                    <span className="block w-[3px] rounded-full bg-current" />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="ml-[2px] h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-current"
                  />
                )}
              </span>
              <span className="text-sm">{isPlaying ? pauseLabel : playLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={nextLabel}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary/12 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
            >
              <Icon name="chevron" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal stepper */}
        <nav aria-label={lang === "id" ? "Tahap perawatan" : "Care stages"} className="gs-reveal mt-10">
          <ol className="relative grid grid-cols-5 gap-2">
            {/* Connector track */}
            <span aria-hidden className="absolute left-[10%] right-[10%] top-5 h-0.5 rounded-full bg-primary/10" />
            <span
              aria-hidden
              className="absolute left-[10%] top-5 h-0.5 rounded-full bg-gradient-to-r from-cta to-gold transition-[width] duration-500 ease-out"
              style={{ width: `${(activeJourney / (total - 1)) * 80}%` }}
            />

            {careJourney.map((s, index) => {
              const isActive = activeJourney === index;
              const isDone = index < activeJourney;
              const isUpcoming = index > activeJourney;
              const dotAccent = accentDot[s.accent];
              const textAccent = accentText[s.accent];

              return (
                <li key={s.id} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      goTo(index);
                    }}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${t(s.eyebrow)}: ${t(s.title)}`}
                    className="group flex w-full flex-col items-center gap-2 text-center"
                  >
                    <span
                      className={`relative grid h-10 w-10 place-items-center rounded-full border-2 bg-surface-2 transition-all duration-300 ${
                        isActive
                          ? `border-transparent ${dotAccent} text-white scale-110 shadow-lg`
                          : isDone
                            ? "border-primary bg-primary text-white"
                            : "border-primary/20 bg-white text-primary/55 group-hover:border-gold/60"
                      }`}
                    >
                      {isDone ? (
                        <Icon name="check" className="h-4 w-4" />
                      ) : (
                        <span className="font-accent text-[11px] font-bold">{s.metric}</span>
                      )}
                      {isActive && (
                        <span aria-hidden className={`absolute inset-0 rounded-full ${dotAccent} animate-ping opacity-30`} />
                      )}
                    </span>
                    <span
                      className={`hidden text-[11px] font-bold uppercase tracking-[0.16em] sm:block ${
                        isActive ? textAccent : isUpcoming ? "text-primary/45" : "text-primary/70"
                      }`}
                    >
                      {t(s.eyebrow)}
                    </span>
                    <span
                      className={`hidden text-xs leading-snug md:block ${
                        isActive ? "text-primary" : "text-primary/55"
                      }`}
                    >
                      {t(s.title)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Stage */}
        <div className="gs-reveal mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <JourneyVisual activeJourney={activeJourney} />

          <div className="journey-stage-content flex flex-col gap-6">
            <div>
              <p className={`font-accent text-[11px] font-bold uppercase tracking-[0.26em] ${accentText[accent]}`}>
                {t(step.eyebrow)}
                <span className="mx-2 text-primary/30">·</span>
                <span className="text-primary/60">
                  {step.metric} / {String(total).padStart(2, "0")}
                </span>
              </p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-primary md:text-4xl">{t(step.title)}</h3>
              <p className="mt-4 text-base leading-7 text-secondary md:text-lg md:leading-8">{t(step.body)}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="journey-meta-item rounded-lg border border-primary/8 bg-white p-4 shadow-sm">
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                  {lang === "id" ? "Estimasi waktu" : "Estimated time"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Icon name="clock" className="h-4 w-4 text-primary/60" />
                  <span className="font-display text-lg text-primary">{t(step.duration)}</span>
                </div>
              </div>
              <div className="journey-meta-item rounded-lg border border-primary/8 bg-white p-4 shadow-sm">
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                  {lang === "id" ? "Fokus tahap" : "Focus"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Icon name={step.icon} className={`h-4 w-4 ${accentText[accent]}`} />
                  <span className="font-display text-lg text-primary">{t(step.eyebrow)}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Yang Anda dapatkan" : "What you get"}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {step.highlights.map((h) => (
                  <li
                    key={t(h)}
                    className="journey-meta-item flex items-start gap-2 rounded-lg border border-primary/8 bg-white px-3 py-2.5 text-sm text-primary/80 shadow-sm"
                  >
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentDot[accent]}`} />
                    <span>{t(h)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`journey-meta-item relative overflow-hidden rounded-lg border p-4 shadow-sm ${
                accent === "gold" ? "border-gold/30 bg-gold/8" : "border-cta/20 bg-cta/8"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                    accent === "gold" ? "bg-gold text-primary" : "bg-cta text-white"
                  }`}
                >
                  <Icon name="spark" className="h-4 w-4" />
                </div>
                <div>
                  <p className={`font-accent text-[10px] font-bold uppercase tracking-[0.22em] ${accentText[accent]}`}>
                    {lang === "id" ? "Catatan dari kami" : "A note from us"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-primary/85">{t(step.tip)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All-at-a-glance overview */}
        <div className="mt-14">
          <p className="eyebrow">{lang === "id" ? "Semua tahap" : "Every stage at a glance"}</p>
          <JourneySteps activeJourney={activeJourney} setActiveJourney={(i) => { setIsPlaying(false); setActiveJourney(i); }} />
        </div>
      </div>
    </section>
  );
}
