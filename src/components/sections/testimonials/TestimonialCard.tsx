"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { getInitials } from "@/lib/utils";
import type { Testimonial } from "@/lib/content";
import { GoogleMark } from "./GoogleMark";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
}

export function TestimonialCard({ testimonial, isActive, onClick }: TestimonialCardProps) {
  const { t, lang } = useLanguage();
  const rating = testimonial.rating ?? 5;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`group relative flex h-full w-72 shrink-0 snap-start flex-col rounded-xl border bg-white p-5 text-left shadow-sm transition-all duration-300 sm:w-80 ${
        isActive
          ? "-translate-y-1 border-gold ring-2 ring-gold/30 shadow-xl shadow-primary/10"
          : "border-primary/8 opacity-75 hover:-translate-y-0.5 hover:border-gold/50 hover:opacity-100 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold ${
              isActive ? "bg-cta text-white" : "bg-highlight text-cta"
            }`}
            aria-hidden
          >
            {getInitials(testimonial.name) || testimonial.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-primary">{testimonial.name}</p>
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary/55">
              {lang === "id" ? "Google review" : "Google review"}
            </p>
          </div>
        </div>
        <GoogleMark className="h-4 w-4" />
      </div>

      <div className="mt-3 flex items-center gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, star) => (
          <Icon
            key={star}
            name="star"
            className={`h-3.5 w-3.5 ${star < rating ? "fill-current" : "text-primary/15"}`}
          />
        ))}
      </div>

      <p className="mt-3 line-clamp-4 text-sm leading-6 text-primary/80">{t(testimonial.quote)}</p>

      {testimonial.service && (
        <span
          className={`mt-auto inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 pt-1.5 text-[11px] font-semibold ${
            isActive ? "bg-gold/15 text-amber-700" : "bg-surface-2 text-primary/65"
          }`}
        >
          <Icon name="spark" className="h-3 w-3" />
          {t(testimonial.service)}
        </span>
      )}
    </button>
  );
}
