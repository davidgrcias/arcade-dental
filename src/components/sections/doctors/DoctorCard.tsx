"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getInitials } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Doctor } from "@/lib/content";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  onOpen: (doctor: Doctor) => void;
}

const accentTokens = {
  cta: {
    avatarFrom: "from-cta/20",
    avatarTo: "to-highlight",
    avatarText: "text-primary",
    rolePill: "bg-cta/12 text-cta",
    iconBg: "bg-cta text-white",
    bar: "from-cta to-cta",
    soft: "bg-cta/8 text-cta",
  },
  gold: {
    avatarFrom: "from-gold/30",
    avatarTo: "to-amber-50",
    avatarText: "text-primary",
    rolePill: "bg-gold/15 text-amber-700",
    iconBg: "bg-gold text-primary",
    bar: "from-gold to-amber-500",
    soft: "bg-gold/12 text-amber-700",
  },
} as const;

const categoryLabel = {
  id: { specialist: "Spesialis", general: "Umum" },
  en: { specialist: "Specialist", general: "General" },
} as const;

export function DoctorCard({ doctor, index, onOpen }: DoctorCardProps) {
  const { t, lang } = useLanguage();
  const tokens = accentTokens[doctor.accent];
  const categoryText = categoryLabel[lang][doctor.category];

  const visibleExpertise = doctor.expertise.slice(0, 3);

  return (
    <article
      className="doctor-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-primary/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl"
    >
      {/* Top accent bar */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${tokens.bar}`}
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          {/* Avatar — real photo when available, gradient fallback otherwise */}
          {doctor.photo ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-inner ring-1 ring-primary/8">
              <Image
                src={doctor.photo}
                alt={doctor.name}
                fill
                sizes="80px"
                className="object-cover"
              />
              <span
                className={`absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full ring-4 ring-white ${tokens.iconBg}`}
              >
                <Icon name={doctor.icon} className="h-4 w-4" />
              </span>
            </div>
          ) : (
            <div
              className={`relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tokens.avatarFrom} ${tokens.avatarTo} shadow-inner`}
            >
              <span className={`font-display text-2xl font-bold ${tokens.avatarText}`}>
                {getInitials(doctor.name)}
              </span>
              <span
                className={`absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full ring-4 ring-white ${tokens.iconBg}`}
              >
                <Icon name={doctor.icon} className="h-4 w-4" />
              </span>
            </div>
          )}

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 font-accent text-[10px] font-bold uppercase tracking-[0.18em] ${tokens.soft}`}
          >
            #{String(index + 1).padStart(2, "0")} · {categoryText}
          </span>
        </div>

        <div className="mt-5">
          <h3 className="font-display text-xl leading-tight text-primary">{doctor.name}</h3>
          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${tokens.rolePill}`}>
            {t(doctor.role)}
          </span>
          <p className="mt-3 text-xs leading-5 text-secondary">{t(doctor.experience)}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {visibleExpertise.map((tag) => (
            <li
              key={t(tag)}
              className="rounded-full border border-primary/10 bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-primary/75"
            >
              {t(tag)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-primary/8 bg-surface-2/40 px-6 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary/70">
          <Icon name="language" className="h-3.5 w-3.5 text-primary/50" />
          <span>{doctor.languages.join(" · ")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            href={`/book?doctor=${doctor.id}`}
            onClick={(event) => event.stopPropagation()}
            aria-label={
              lang === "id"
                ? `Booking dengan ${doctor.name}`
                : `Book with ${doctor.name}`
            }
            className="inline-flex items-center gap-1 rounded-full bg-cta px-3 py-1.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary"
          >
            <Icon name="calendar" className="h-3 w-3" />
            <span>{lang === "id" ? "Booking" : "Book"}</span>
          </Link>
          <button
            type="button"
            onClick={() => onOpen(doctor)}
            className="inline-flex items-center gap-1 rounded-full border border-primary/12 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-all hover:border-gold/60"
          >
            <span>{lang === "id" ? "Profil" : "Profile"}</span>
            <Icon name="arrow" className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
