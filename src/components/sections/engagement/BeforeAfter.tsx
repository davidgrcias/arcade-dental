"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface BeforeAfterProps {
  sliderValue: number;
  setSliderValue: (val: number) => void;
}

const MIN = 5;
const MAX = 95;

export function BeforeAfter({ sliderValue, setSliderValue }: BeforeAfterProps) {
  const { c, lang } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const clamp = (val: number) => Math.min(MAX, Math.max(MIN, val));

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const ratio = ((clientX - rect.left) / rect.width) * 100;
      setSliderValue(clamp(ratio));
    },
    [setSliderValue],
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Keyboard support
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== stage) return;
      if (e.key === "ArrowLeft") setSliderValue(clamp(sliderValue - 3));
      else if (e.key === "ArrowRight") setSliderValue(clamp(sliderValue + 3));
    };
    stage.addEventListener("keydown", onKey);
    return () => stage.removeEventListener("keydown", onKey);
  }, [sliderValue, setSliderValue]);

  const tipLabel = lang === "id" ? "Geser untuk bandingkan" : "Drag to compare";

  return (
    <article className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
      <p className="eyebrow text-gold">{c.beforeAfterLabel}</p>
      <h2 className="font-display text-3xl leading-tight">{c.beforeAfterTitle}</h2>

      <div
        ref={stageRef}
        role="slider"
        tabIndex={0}
        aria-label={c.beforeAfterLabel}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Math.round(sliderValue)}
        aria-valuetext={`${Math.round(sliderValue)}% ${c.after} / ${100 - Math.round(sliderValue)}% ${c.before}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative mt-6 aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-lg border border-white/12 outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
      >
        {/* Base layer: BEFORE (full image, sits underneath) */}
        <Image
          src={siteAssets.smileBefore}
          alt={`${c.before} - smile`}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="pointer-events-none object-cover"
          priority
        />

        {/* Top layer: AFTER (clipped from left, revealed by slider) */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        >
          <Image
            src={siteAssets.smileAfter}
            alt={`${c.after} - smile`}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex items-center"
          style={{ left: `calc(${sliderValue}% - 1px)` }}
        >
          <div className="h-full w-0.5 bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.85)]" />
          <div className="absolute -translate-x-1/2 grid h-10 w-10 place-items-center rounded-full bg-white shadow-xl ring-2 ring-white/40">
            <Icon name="arrow" className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-cta px-3 py-1 text-xs font-bold text-white shadow-md">
          {c.after}
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-primary/85 px-3 py-1 text-xs font-bold text-white shadow-md">
          {c.before}
        </span>

        {/* Drag hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
          <span className="rounded-full bg-black/40 px-3 py-1 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
            {tipLabel}
          </span>
        </div>
      </div>

      <label className="sr-only" htmlFor="before-after-slider">
        {c.beforeAfterLabel}
      </label>
      <input
        id="before-after-slider"
        type="range"
        min={MIN}
        max={MAX}
        value={sliderValue}
        onChange={(event) => setSliderValue(Number(event.target.value))}
        className="mt-5 w-full accent-gold"
      />
    </article>
  );
}
