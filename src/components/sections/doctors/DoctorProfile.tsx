"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getInitials, buildWhatsAppUrl } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Doctor } from "@/lib/content";

interface DoctorProfileProps {
  doctor: Doctor | null;
  onClose: () => void;
}

const accentTokens = {
  cta: {
    avatarFrom: "from-cta/25",
    avatarTo: "to-highlight",
    chip: "bg-cta/12 text-cta",
    iconBg: "bg-cta text-white",
    quoteBg: "bg-cta/8 border-cta/25",
  },
  gold: {
    avatarFrom: "from-gold/35",
    avatarTo: "to-amber-50",
    chip: "bg-gold/15 text-amber-700",
    iconBg: "bg-gold text-primary",
    quoteBg: "bg-gold/10 border-gold/35",
  },
} as const;

export function DoctorProfile({ doctor, onClose }: DoctorProfileProps) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (!doctor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [doctor, onClose]);

  if (!doctor) return null;
  const tokens = accentTokens[doctor.accent];

  const bookingMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin konsultasi dengan ${doctor.name} (${t(doctor.role)}). Mohon info jadwal yang tersedia.`
      : `Hi Arcade Dental, I would like to book a consultation with ${doctor.name} (${t(doctor.role)}). Please share available schedules.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doctor.name}
      className="fixed inset-0 z-[80] grid place-items-center bg-primary/90 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative px-6 pb-5 pt-7 sm:px-8 sm:pt-9">
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === "id" ? "Tutup" : "Close"}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-primary/70 transition-colors hover:bg-primary hover:text-white"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>

          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div
              className={`relative grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br shadow-inner ${tokens.avatarFrom} ${tokens.avatarTo}`}
            >
              <span className="font-display text-3xl font-bold text-primary">{getInitials(doctor.name)}</span>
              <span
                className={`absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-full ring-4 ring-white ${tokens.iconBg}`}
              >
                <Icon name={doctor.icon} className="h-5 w-5" />
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-2xl leading-tight text-primary sm:text-3xl">{doctor.name}</h3>
              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${tokens.chip}`}>
                {t(doctor.role)}
              </span>
              <p className="mt-3 text-sm leading-6 text-secondary">{t(doctor.experience)}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-5 px-6 pb-6 sm:px-8 sm:pb-8">
          <div className={`relative rounded-xl border p-4 ${tokens.quoteBg}`}>
            <Icon name="spark" className="absolute right-3 top-3 h-4 w-4 text-primary/30" />
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
              {lang === "id" ? "Filosofi praktik" : "Practice philosophy"}
            </p>
            <p className="mt-2 font-display text-base leading-7 text-primary sm:text-lg">"{t(doctor.signature)}"</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Bidang keahlian" : "Areas of expertise"}
              </p>
              <ul className="mt-3 grid gap-2">
                {doctor.expertise.map((item) => (
                  <li key={t(item)} className="flex items-start gap-2 text-sm text-primary/80">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Pendidikan & sertifikasi" : "Education & certification"}
              </p>
              <ul className="mt-3 grid gap-2">
                {doctor.education.map((item) => (
                  <li key={t(item)} className="flex items-start gap-2 text-sm text-primary/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-primary/8 bg-surface-2/40 p-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="language" className="h-4 w-4 text-primary/60" />
              <span className="font-bold text-primary">{lang === "id" ? "Bahasa" : "Languages"}:</span>
              <span className="text-primary/75">{doctor.languages.join(" · ")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="calendar" className="h-4 w-4 text-primary/60" />
              <span className="font-bold text-primary">{lang === "id" ? "Jadwal" : "Schedule"}:</span>
              <span className="text-primary/75">{t(doctor.availability)}</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col-reverse gap-3 border-t border-primary/8 bg-surface-2/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/15 bg-white px-5 text-sm font-bold text-primary transition-colors hover:border-primary/30"
          >
            {lang === "id" ? "Tutup" : "Close"}
          </button>
          <a
            href={buildWhatsAppUrl(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cta px-5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all hover:-translate-y-0.5 hover:bg-primary"
          >
            <Icon name="message" className="h-4 w-4" />
            <span>
              {lang === "id" ? "Booking via WhatsApp" : "Book via WhatsApp"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
