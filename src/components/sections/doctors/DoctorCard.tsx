"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getInitials } from "@/lib/utils";
import { TranslationKey } from "@/lib/content";

interface DoctorCardProps {
  name: string;
  role: TranslationKey;
  availability: TranslationKey;
  index: number;
}

const doctorColors = [
  { bg: "from-emerald-100 to-teal-200", text: "text-teal-800" },
  { bg: "from-violet-100 to-purple-200", text: "text-purple-800" },
  { bg: "from-amber-100 to-yellow-200", text: "text-amber-800" },
  { bg: "from-sky-100 to-blue-200", text: "text-blue-800" },
  { bg: "from-rose-100 to-pink-200", text: "text-rose-800" },
  { bg: "from-lime-100 to-green-200", text: "text-green-800" },
  { bg: "from-orange-100 to-red-100", text: "text-orange-800" },
];

export function DoctorCard({ name, role, availability, index }: DoctorCardProps) {
  const { t } = useLanguage();
  const colorSet = doctorColors[index % doctorColors.length];

  return (
    <article className="gs-card doctor-card group rounded-lg border border-primary/8 bg-white p-6 shadow-sm">
      <div className={`mx-auto grid h-28 w-28 place-items-center rounded-lg bg-gradient-to-br ${colorSet.bg} shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
        <span className={`font-display text-3xl font-bold ${colorSet.text}`}>{getInitials(name)}</span>
      </div>
      <div className="mt-5 text-center">
        <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 font-display text-xl leading-snug text-primary">{name}</h3>
        <span className="mt-2 inline-block rounded-full bg-highlight px-3 py-1 text-xs font-bold text-cta">{t(role)}</span>
        <p className="mt-3 text-xs leading-5 text-secondary">{t(availability)}</p>
      </div>
    </article>
  );
}
