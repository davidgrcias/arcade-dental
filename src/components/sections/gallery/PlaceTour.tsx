"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { placeTour } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

const AUTOPLAY_MS = 5000;

export function PlaceTour() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const lastActiveRef = useRef(-1);

  const total = placeTour.length;
  const stop = placeTour[active];

  const goTo = useCallback(
    (idx: number) => {
      setActive(((idx % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  // Autoplay with progress ring
  useEffect(() => {
    if (!isPlaying) {
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
        goTo(active + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, active, goTo]);

  // Animate caption + scroll active thumbnail into view
  useEffect(() => {
    if (lastActiveRef.current === active) return;
    lastActiveRef.current = active;

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && captionRef.current) {
      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 14, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", overwrite: true },
      );
    }

    const rail = railRef.current;
    if (rail) {
      const thumb = rail.querySelector<HTMLElement>(`[data-tour-thumb="${active}"]`);
      if (thumb) {
        const target = thumb.offsetLeft - (rail.clientWidth - thumb.clientWidth) / 2;
        rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      }
    }
  }, [active]);

  // Keyboard nav when section is in view
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const playLabel = lang === "id" ? "Mulai tur" : "Play tour";
  const pauseLabel = lang === "id" ? "Jeda tur" : "Pause tour";
  const stopLabel = lang === "id" ? "Stop" : "Stop";
  const ofLabel = lang === "id" ? "dari" : "of";
  const youAreHere = lang === "id" ? "Posisi sekarang" : "Current stop";

  // Ring math
  const RING_SIZE = 28;
  const RING_R = 12;
  const RING_C = 2 * Math.PI * RING_R;

  return (
    <div className="gs-reveal relative">
      {/* Stage */}
      <div
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative overflow-hidden rounded-2xl border border-primary/8 bg-primary shadow-2xl shadow-primary/15"
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
          {/* Image stack: only render active ± 1 neighbour to avoid 10× decode */}
          {placeTour.map((s, idx) => {
            const isPrev = idx === (active - 1 + placeTour.length) % placeTour.length;
            const isNext = idx === (active + 1) % placeTour.length;
            if (idx !== active && !isPrev && !isNext) return null;
            return (
              <Image
                key={s.id}
                src={s.src}
                alt={t(s.label)}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority={idx === 0}
                style={{ objectPosition: s.focus ?? "center center" }}
                className={`object-cover transition-opacity duration-700 ${
                  active === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}

          {/* Vignettes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />

          {/* Top: route status */}
          <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2 sm:inset-x-5 sm:top-5">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/95 px-2.5 py-1 shadow-md backdrop-blur sm:px-3 sm:py-1.5">
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-65" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cta sm:h-2.5 sm:w-2.5" />
              </span>
              <span className="font-accent text-[9px] font-bold uppercase tracking-[0.18em] text-primary sm:text-[10px] sm:tracking-[0.22em]">
                {youAreHere}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-primary/85 px-2.5 py-1 text-white shadow-md backdrop-blur sm:px-3 sm:py-1.5">
              <Icon name="map" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="font-accent text-[10px] font-bold tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-1 text-white/40">{ofLabel}</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Side prev/next — hidden on mobile (use swipe) */}
          <button
            type="button"
            onClick={prev}
            aria-label={lang === "id" ? "Stop sebelumnya" : "Previous stop"}
            className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur transition-colors hover:bg-white md:grid"
          >
            <Icon name="chevron" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={lang === "id" ? "Stop berikutnya" : "Next stop"}
            className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur transition-colors hover:bg-white md:grid"
          >
            <Icon name="chevron" className="h-4 w-4" />
          </button>
        </div>

        {/* Caption — sits below image on mobile, overlays at the bottom on desktop */}
        <div ref={captionRef} className="bg-white p-4 sm:absolute sm:inset-x-5 sm:bottom-5 sm:rounded-xl sm:bg-white/95 sm:p-5 sm:shadow-xl sm:backdrop-blur">
          <div className="flex flex-wrap items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cta/12 text-cta sm:h-11 sm:w-11">
              <Icon name={stop.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-cta">
                {t(stop.cue)}
              </p>
              <h3 className="mt-0.5 font-display text-lg leading-tight text-primary sm:text-2xl">
                {t(stop.label)}
              </h3>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-semibold text-primary/75 sm:flex">
              <Icon name="map" className="h-3.5 w-3.5 text-primary/55" />
              <span>{lang === "id" ? "Stop" : "Stop"} {String(active + 1).padStart(2, "0")}</span>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-primary/80 sm:text-[15px] sm:leading-7">{t(stop.caption)}</p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stop.highlights.map((h) => (
              <li
                key={t(h)}
                className="rounded-full border border-primary/10 bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-primary/75"
              >
                {t(h)}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress strip */}
        <div className="relative h-1 w-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cta to-gold transition-all duration-500 ease-out"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
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
            onClick={togglePlay}
            aria-label={isPlaying ? pauseLabel : playLabel}
            className={`relative inline-flex min-h-10 items-center gap-2 rounded-full px-4 font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              isPlaying ? "bg-primary text-white" : "border border-primary/12 bg-white text-primary"
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
                  className="stroke-gold transition-[stroke-dashoffset] duration-100 ease-linear"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C * (1 - progress)}
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
            onClick={next}
            aria-label={lang === "id" ? "Berikutnya" : "Next"}
            className="grid h-10 w-10 place-items-center rounded-full border border-primary/12 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
          >
            <Icon name="chevron" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-primary/65">
          <Icon name="scan" className="h-3.5 w-3.5 text-primary/45" />
          <span className="hidden sm:inline">
            {lang === "id" ? "Gunakan ←/→ atau geser untuk eksplor" : "Use ←/→ or swipe to explore"}
          </span>
          <span className="sm:hidden">{lang === "id" ? "Geser untuk eksplor" : "Swipe to explore"}</span>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="mt-5">
        <ol
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
        >
          {placeTour.map((s, idx) => {
            const isActive = active === idx;
            return (
              <li key={s.id} className="snap-start">
                <button
                  type="button"
                  data-tour-thumb={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    goTo(idx);
                  }}
                  aria-label={`Go to ${t(s.label)}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`group relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:h-24 sm:w-40 ${
                    isActive
                      ? "border-gold ring-2 ring-gold/40 shadow-lg"
                      : "border-primary/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={t(s.label)}
                    fill
                    sizes="160px"
                    style={{ objectPosition: s.focus ?? "center center" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 font-accent text-[10px] font-bold ${
                      isActive ? "bg-gold text-primary" : "bg-primary/80 text-white"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-white/95">
                    {t(s.label)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
