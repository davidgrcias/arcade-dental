"use client";

import Image from "next/image";
import { business } from "@/lib/content";

interface NavLogoProps {
  scrolled: boolean;
}

export function NavLogo({ scrolled }: NavLogoProps) {
  return (
    <a href="/" className="flex items-center gap-3">
      <span
        className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg border ${
          scrolled
            ? "border-primary/10 bg-white"
            : "border-white/20 bg-white/95 backdrop-blur"
        }`}
      >
        <Image
          src="/assets/logo.jpg"
          alt={business.name}
          fill
          sizes="44px"
          className="object-cover"
          priority
        />
      </span>
      <span>
        <span className={`block font-display text-xl leading-none ${scrolled ? "text-primary" : "text-white"}`}>
          {business.name}
        </span>
        <span
          className={`hidden text-[10px] font-bold uppercase tracking-[0.24em] md:block ${
            scrolled ? "text-secondary" : "text-white/58"
          }`}
        >
          Bintaro · Spesialis
        </span>
      </span>
    </a>
  );
}
