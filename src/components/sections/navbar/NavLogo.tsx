"use client";

import { business } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

interface NavLogoProps {
  scrolled: boolean;
}

export function NavLogo({ scrolled }: NavLogoProps) {
  return (
    <a href="#hero" className="flex items-center gap-3">
      <span className={`grid h-11 w-11 place-items-center rounded-lg border ${scrolled ? "border-primary/10 bg-primary text-gold" : "border-white/20 bg-white/10 text-gold backdrop-blur"}`}>
        <Icon name="spark" className="h-5 w-5" />
      </span>
      <span>
        <span className={`block font-display text-xl leading-none ${scrolled ? "text-primary" : "text-white"}`}>{business.name}</span>
        <span className={`hidden text-[10px] font-bold uppercase tracking-[0.24em] md:block ${scrolled ? "text-secondary" : "text-white/58"}`}>
          Bintaro - Spesialis
        </span>
      </span>
    </a>
  );
}
