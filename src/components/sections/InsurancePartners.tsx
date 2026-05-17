"use client";

import { useMemo } from "react";
import { insurancePartners } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

/**
 * Marquee strip showcasing the clinic's insurance & corporate-health network
 * partners. Two rows scroll in opposite directions to feel alive without
 * looking like a single conveyor belt. Pure CSS animation — no JS per-frame
 * cost, pauses on hover for desktop browsing.
 */
export function InsurancePartners() {
  const { lang } = useLanguage();

  // Split into two rows so each marquee feels balanced and short enough that
  // a single duplicate is enough to make the loop seamless.
  const { rowA, rowB } = useMemo(() => {
    const half = Math.ceil(insurancePartners.length / 2);
    return {
      rowA: insurancePartners.slice(0, half),
      rowB: insurancePartners.slice(half),
    };
  }, []);

  const totalCount = insurancePartners.length;

  return (
    <section
      aria-labelledby="insurance-partners-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfaf7_0%,#f3eee2_100%)] py-16 md:py-20"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#1a2332_1px,transparent_0)] [background-size:24px_24px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/14 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-start gap-4 text-left sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.26em] text-cta">
              {lang === "id" ? "Jaringan Asuransi" : "Insurance Network"}
            </p>
            <h2
              id="insurance-partners-heading"
              className="mt-2 font-display text-3xl leading-tight text-primary sm:text-4xl md:text-5xl"
            >
              {lang === "id"
                ? `Terhubung dengan ${totalCount}+ rekanan asuransi & korporat.`
                : `Connected to ${totalCount}+ insurance & corporate health partners.`}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
              {lang === "id"
                ? "Dari Allianz dan Prudential sampai BPJS dan jaringan korporat lokal — tim admin akan bantu memverifikasi cakupan polis Anda sebelum kunjungan."
                : "From Allianz and Prudential to BPJS and local corporate networks — our admin team helps verify your coverage before the visit."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-gold">
              <Icon name="shield" className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl text-primary">{totalCount}+</p>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary/55">
                {lang === "id" ? "Rekanan aktif" : "Active partners"}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          {/* Side fades so chips dissolve cleanly at the edges instead of
              clipping abruptly. Width steps up slightly on larger screens. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fbfaf7] to-transparent sm:w-20 md:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f3eee2] to-transparent sm:w-20 md:w-28"
          />

          <PartnerMarquee items={rowA} direction="left" durationSec={50} />
          <div className="mt-4">
            <PartnerMarquee items={rowB} direction="right" durationSec={60} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface PartnerMarqueeProps {
  items: string[];
  /** "left" scrolls items right→left, "right" scrolls left→right. */
  direction: "left" | "right";
  /** Full loop duration. Slower = more readable, but feels less alive. */
  durationSec: number;
}

function PartnerMarquee({ items, direction, durationSec }: PartnerMarqueeProps) {
  // Duplicate the list so the loop can wrap seamlessly via translate(-50%).
  const doubled = [...items, ...items];
  const animationName =
    direction === "left" ? "marquee-shift-left" : "marquee-shift-right";

  return (
    <div className="group/marquee overflow-hidden">
      <ul
        className="marquee-track flex w-max items-center gap-3 sm:gap-4"
        style={{
          animationName,
          animationDuration: `${durationSec}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
        aria-hidden
      >
        {doubled.map((name, idx) => (
          <li key={`${name}-${idx}`} className="shrink-0">
            <span className="inline-flex min-h-[3rem] items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-primary/80 shadow-sm sm:min-h-[3.25rem] sm:px-5 sm:text-[15px]">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta/12 text-cta">
                <Icon name="shield" className="h-3 w-3" />
              </span>
              {name}
            </span>
          </li>
        ))}
      </ul>

      {/* Screen-reader friendly fallback: list every partner name once. */}
      <ul className="sr-only">
        {items.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
