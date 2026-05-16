"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { treatmentMatcher, siteAssets } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/utils";

interface ServiceMatcherProps {
  matcherId: string;
  setMatcherId: (id: string) => void;
  setSelectedService: (id: string) => void;
}

export function ServiceMatcher({
  matcherId,
  setMatcherId,
  setSelectedService,
}: ServiceMatcherProps) {
  const { t, c, lang } = useLanguage();

  const selectedMatcher = treatmentMatcher.find((item) => item.id === matcherId) ?? treatmentMatcher[0];
  
  const matcherMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin konsultasi untuk: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`
      : `Hello Arcade Dental, I would like to consult for: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`;

  function handleMatcherSelect(id: string, serviceId: string) {
    setMatcherId(id);
    setSelectedService(serviceId);
  }

  return (
    <div className="gs-reveal mb-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
      <div className="rounded-lg border border-primary/8 bg-white p-6 shadow-xl shadow-primary/8">
        <p className="eyebrow">{c.matcherLabel}</p>
        <h3 className="font-display text-3xl leading-tight text-primary">{c.matcherTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-secondary">{c.matcherBody}</p>
        <div className="mt-6 grid gap-2">
          {treatmentMatcher.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleMatcherSelect(option.id, option.serviceId)}
              className={`group flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 text-left text-sm font-bold transition-all ${
                matcherId === option.id
                  ? "border-cta bg-highlight text-primary shadow-sm"
                  : "border-primary/8 bg-white text-primary/66 hover:border-gold/70 hover:text-primary"
              }`}
            >
              {t(option.label)}
              <Icon name={matcherId === option.id ? "check" : "chevron"} className="h-4 w-4 text-cta" />
            </button>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-primary p-6 text-white shadow-2xl shadow-primary/16">
        <Image src={siteAssets.techTexture} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-primary/76" />
        <div className="relative grid h-full gap-5 md:grid-cols-[0.75fr_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
            <Image src={siteAssets.smileTransform} alt={c.beforeAfterTitle} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
          </div>
          <div>
            <p className="eyebrow text-gold">{t(selectedMatcher.label)}</p>
            <p className="text-lg leading-8 text-white/80">{t(selectedMatcher.result)}</p>
            <a href={buildWhatsAppUrl(matcherMessage)} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-white">
              <Icon name="message" className="h-5 w-5" />
              {c.matcherCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
