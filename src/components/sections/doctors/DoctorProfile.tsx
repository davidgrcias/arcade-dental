"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
    glow: "bg-cta/12",
  },
  gold: {
    avatarFrom: "from-gold/35",
    avatarTo: "to-amber-50",
    chip: "bg-gold/15 text-amber-700",
    iconBg: "bg-gold text-primary",
    quoteBg: "bg-gold/10 border-gold/35",
    glow: "bg-gold/16",
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

  // Poster bakes in name + specialty already. Show it whole with object-contain on a
  // cream backdrop that matches the poster's printed background tone.
  const heroVisual = doctor.poster ?? doctor.photo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doctor.name}
      className="fixed inset-0 z-[80] grid place-items-center bg-primary/90 p-3 backdrop-blur-md sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-primary/10"
      >
        {/* Close button — floats on top of either column */}
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === "id" ? "Tutup" : "Close"}
          className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-primary shadow-lg ring-1 ring-primary/10 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>

        <div className="grid max-h-[95vh] grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:overflow-hidden">
          {/* Poster column */}
          <div className="relative bg-[linear-gradient(160deg,#f6f1e7_0%,#efe7d6_55%,#e8dec8_100%)] md:max-h-[95vh]">
            {/* Soft accent glow tied to the doctor's accent color */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -left-20 -top-24 h-60 w-60 rounded-full blur-3xl ${tokens.glow}`}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#1a2332_1px,transparent_0)] [background-size:22px_22px]"
            />

            <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-6 md:p-8">
              {heroVisual ? (
                <div className="relative aspect-square w-full max-w-[460px]">
                  <Image
                    src={heroVisual}
                    alt={`${doctor.name} - ${t(doctor.role)}`}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-contain drop-shadow-[0_18px_40px_rgba(26,35,50,0.18)]"
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`grid aspect-square w-full max-w-[460px] place-items-center rounded-2xl bg-gradient-to-br shadow-inner ${tokens.avatarFrom} ${tokens.avatarTo}`}
                >
                  <span className="font-display text-7xl font-bold text-primary/80">
                    {getInitials(doctor.name)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="flex flex-col gap-5 px-6 py-7 sm:px-8 md:max-h-[95vh] md:overflow-y-auto">
            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Tim dokter Arcade Dental" : "Arcade Dental doctor team"}
              </p>
              <h3 className="mt-1.5 font-display text-2xl leading-tight text-primary sm:text-[1.7rem]">
                {doctor.name}
              </h3>
              <span
                className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${tokens.chip}`}
              >
                <Icon name={doctor.icon} className="h-3.5 w-3.5" />
                {t(doctor.role)}
              </span>
              <p className="mt-3 text-sm leading-6 text-secondary">{t(doctor.experience)}</p>
            </div>

            <div className={`relative rounded-xl border p-4 ${tokens.quoteBg}`}>
              <Icon name="quote" className="absolute right-3 top-3 h-4 w-4 text-primary/25" />
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Filosofi praktik" : "Practice philosophy"}
              </p>
              <p className="mt-2 font-display text-base leading-7 text-primary">
                &ldquo;{t(doctor.signature)}&rdquo;
              </p>
            </div>

            <div>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Bidang keahlian" : "Areas of expertise"}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
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

            <div className="grid gap-2 rounded-xl border border-primary/8 bg-surface-2/40 p-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="language" className="h-4 w-4 text-primary/60" />
                <span className="font-bold text-primary">
                  {lang === "id" ? "Bahasa" : "Languages"}:
                </span>
                <span className="text-primary/75">{doctor.languages.join(" · ")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="calendar" className="h-4 w-4 text-primary/60" />
                <span className="font-bold text-primary">
                  {lang === "id" ? "Jadwal" : "Schedule"}:
                </span>
                <span className="text-primary/75">{t(doctor.availability)}</span>
              </div>
            </div>

            <div className="mt-auto flex flex-col-reverse gap-3 border-t border-primary/8 pt-4 sm:flex-row sm:items-center sm:justify-end">
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
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cta/35 bg-white px-5 text-sm font-bold text-cta transition-all hover:-translate-y-0.5 hover:border-cta hover:bg-cta/8"
              >
                <Icon name="message" className="h-4 w-4" />
                <span>{lang === "id" ? "Tanya via WhatsApp" : "Ask via WhatsApp"}</span>
              </a>
              <Link
                href={`/book?doctor=${doctor.id}`}
                onClick={onClose}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cta px-5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all hover:-translate-y-0.5 hover:bg-primary"
              >
                <Icon name="calendar" className="h-4 w-4" />
                <span>{lang === "id" ? "Booking jadwal" : "Book a slot"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
