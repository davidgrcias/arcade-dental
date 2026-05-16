"use client";

import Image from "next/image";
import { business, siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppUrl } from "@/lib/utils";

interface BookingCTAProps {
  smartMessage: string;
  ctaRef: React.RefObject<HTMLElement | null>;
}

export default function BookingCTA({ smartMessage, ctaRef }: BookingCTAProps) {
  const { c } = useLanguage();

  return (
    <section ref={ctaRef} id="booking-cta" className="relative overflow-hidden bg-primary px-5 py-16 text-white md:px-8 md:py-24">
      <Image src={siteAssets.techTexture} alt="" fill sizes="100vw" className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-primary/82" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="gs-reveal">
          <p className="eyebrow text-gold">{business.hashtag}</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{c.finalTitle}</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">{c.finalBody}</p>
        </div>
        <div className="gs-reveal flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href={buildWhatsAppUrl(smartMessage)} className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-8 font-bold text-primary shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
            <Icon name="message" className="h-5 w-5" />
            WhatsApp
          </a>
          <a href="/#contact" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-8 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold">
            {c.formReservation}
          </a>
        </div>
      </div>
    </section>
  );
}
