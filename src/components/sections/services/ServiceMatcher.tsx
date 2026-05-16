"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { treatmentMatcher, siteAssets, services } from "@/lib/content";
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
  const selectedService = services.find((service) => service.id === selectedMatcher.serviceId) ?? services[0];
  
  const matcherMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin konsultasi untuk: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`
      : `Hello Arcade Dental, I would like to consult for: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`;

  function handleMatcherSelect(id: string, serviceId: string) {
    setMatcherId(id);
    setSelectedService(serviceId);
  }

  return (
    <div id="treatment-matcher" className="gs-reveal mb-14 scroll-mt-32 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
      <div className="rounded-lg border border-primary/10 bg-white/92 p-5 shadow-[0_18px_55px_rgba(26,35,50,0.08)] backdrop-blur md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{c.matcherLabel}</p>
            <h3 className="font-display text-3xl leading-tight text-primary">{c.matcherTitle}</h3>
          </div>
          <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-bold text-primary">
            {lang === "id" ? "2 menit" : "2 min"}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-secondary">{c.matcherBody}</p>
        <div className="mt-6 grid gap-2.5">
          {treatmentMatcher.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleMatcherSelect(option.id, option.serviceId)}
              className={`group flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 text-left text-sm font-bold transition-all duration-200 ${
                matcherId === option.id
                  ? "border-cta bg-highlight text-primary shadow-md shadow-cta/10"
                  : "border-primary/10 bg-white text-primary/66 hover:-translate-y-0.5 hover:border-gold/70 hover:text-primary hover:shadow-sm"
              }`}
            >
              <span>{t(option.label)}</span>
              <span className={`grid h-7 w-7 place-items-center rounded-full ${
                matcherId === option.id ? "bg-cta text-white" : "bg-surface-2 text-cta"
              }`}>
                <Icon name={matcherId === option.id ? "check" : "chevron"} className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-primary p-5 text-white shadow-[0_26px_75px_rgba(26,35,50,0.18)] md:p-7">
        <Image src={siteAssets.techTexture} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-primary/78" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative grid h-full gap-5 md:grid-cols-[0.76fr_1fr] md:items-center">
          <div className="relative min-h-[250px] overflow-hidden rounded-lg border border-white/12 md:aspect-[4/5]">
            {treatmentMatcher.map((option) => (
              <Image
                key={option.id}
                src={option.image}
                alt={t(option.label)}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className={`object-cover transition-all duration-700 ease-out ${
                  matcherId === option.id ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/86 to-transparent p-4">
              <p className="text-xs font-bold text-gold">{lang === "id" ? "Fokus layanan" : "Care focus"}</p>
              <p className="mt-1 text-sm font-bold text-white">{t(selectedService.title)}</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-gold">{t(selectedMatcher.label)}</p>
            <h4 className="font-display text-3xl leading-tight text-white">
              {lang === "id" ? "Jalur konsultasi yang lebih terarah." : "A clearer consultation path."}
            </h4>
            <p className="mt-4 text-base leading-7 text-white/78">{t(selectedMatcher.result)}</p>
            <div className="mt-5 grid gap-4 border-y border-white/12 py-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-white/55">{lang === "id" ? "Langkah awal" : "First step"}</p>
                <p className="mt-1 text-sm font-bold text-white">{lang === "id" ? "Konsultasi dokter" : "Doctor consult"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/55">{lang === "id" ? "Pesan siap" : "Message ready"}</p>
                <p className="mt-1 text-sm font-bold text-white">WhatsApp</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={buildWhatsAppUrl(matcherMessage)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-white">
                <Icon name="message" className="h-5 w-5" />
                {c.matcherCta}
              </a>
              <a href="/#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-primary">
                <Icon name="calendar" className="h-5 w-5" />
                {lang === "id" ? "Isi form" : "Fill form"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
