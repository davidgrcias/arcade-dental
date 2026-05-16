"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";
import type { Testimonial } from "@/lib/content";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  const { t } = useLanguage();

  return (
    <article
      className={`gs-card rounded-lg border bg-white p-7 shadow-sm transition-all duration-500 ${
        isActive ? "-translate-y-1 border-gold shadow-xl shadow-primary/10" : "border-primary/8"
      }`}
    >
      <div className="flex gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, star) => (
          <Icon key={star} name="star" className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 min-h-28 text-base leading-7 text-primary/75">
        <span className="text-gold/70">&ldquo;</span>
        {t(testimonial.quote)}
        <span className="text-gold/70">&rdquo;</span>
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-primary/6 pt-5">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-gold">
          <Icon name="heart" className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-primary">{testimonial.name}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Google Review</p>
        </div>
      </div>
    </article>
  );
}
