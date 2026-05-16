"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { doctors, type Doctor, type DoctorCategory } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { DoctorCard } from "./doctors/DoctorCard";
import { DoctorProfile } from "./doctors/DoctorProfile";

type Filter = "all" | DoctorCategory;

const filterDefs: { id: Filter; label: { id: string; en: string } }[] = [
  { id: "all", label: { id: "Semua dokter", en: "All doctors" } },
  { id: "specialist", label: { id: "Spesialis", en: "Specialist" } },
  { id: "general", label: { id: "Dokter umum", en: "General" } },
];

export function Doctors() {
  const { c, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Doctor | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const specialistCount = doctors.filter((d) => d.category === "specialist").length;
    const generalCount = doctors.filter((d) => d.category === "general").length;
    const langs = new Set<string>();
    doctors.forEach((d) => d.languages.forEach((l) => langs.add(l)));
    return [
      {
        value: String(doctors.length),
        label: lang === "id" ? "Dokter di tim" : "Doctors on team",
        icon: "heart" as const,
      },
      {
        value: String(specialistCount),
        label: lang === "id" ? "Spesialis ahli" : "Senior specialists",
        icon: "shield" as const,
      },
      {
        value: String(generalCount),
        label: lang === "id" ? "Dokter umum" : "General dentists",
        icon: "spark" as const,
      },
      {
        value: String(langs.size),
        label: lang === "id" ? "Bahasa dilayani" : "Languages spoken",
        icon: "language" as const,
      },
    ];
  }, [lang]);

  const filtered = useMemo(() => {
    if (filter === "all") return doctors;
    return doctors.filter((d) => d.category === filter);
  }, [filter]);

  const counts: Record<Filter, number> = useMemo(
    () => ({
      all: doctors.length,
      specialist: doctors.filter((d) => d.category === "specialist").length,
      general: doctors.filter((d) => d.category === "general").length,
    }),
    [],
  );

  // Animate cards in on mount and whenever the filter changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(".doctor-card");
    if (!cards.length) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      return;
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.06,
        overwrite: true,
        clearProps: "transform,opacity",
      },
    );
  }, [filter]);

  return (
    <section id="doctors" className="section-shell">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.doctorsLabel} title={c.doctorsTitle} body={c.doctorsBody} />

        {/* Stats strip */}
        <div className="gs-reveal grid gap-3 rounded-xl border border-primary/8 bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-lg bg-surface-2/40 px-4 py-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-gold">
                <Icon name={stat.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl leading-none text-primary">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/55">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div className="gs-reveal mt-8 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label={lang === "id" ? "Filter dokter" : "Doctor filter"} className="flex flex-wrap gap-2">
            {filterDefs.map((def) => {
              const isActive = filter === def.id;
              return (
                <button
                  key={def.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(def.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-all ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-primary/15 bg-white text-primary hover:-translate-y-0.5 hover:border-gold/60"
                  }`}
                >
                  <span>{def.label[lang]}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-accent text-[10px] font-bold ${
                      isActive ? "bg-white/15 text-white" : "bg-surface-2 text-primary/60"
                    }`}
                  >
                    {counts[def.id]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-primary/55">
            {lang === "id"
              ? `Menampilkan ${filtered.length} dari ${doctors.length} dokter`
              : `Showing ${filtered.length} of ${doctors.length} doctors`}
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              index={doctors.findIndex((d) => d.id === doctor.id)}
              onOpen={setSelected}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-lg border border-dashed border-primary/15 bg-white p-8 text-center text-sm text-primary/60">
            {lang === "id" ? "Tidak ada dokter di kategori ini." : "No doctors in this category."}
          </p>
        )}
      </div>

      <DoctorProfile doctor={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
