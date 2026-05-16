"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceTour } from "./gallery/PlaceTour";

export function Gallery() {
  const { c, lang } = useLanguage();

  return (
    <section id="gallery" className="section-shell overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.galleryLabel} title={c.galleryTitle} body={c.galleryBody} />

        <div className="gs-reveal rounded-3xl border border-primary/8 bg-white p-4 shadow-xl shadow-primary/5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
            <div>
              <p className="font-accent text-[11px] font-bold uppercase tracking-[0.26em] text-cta">
                {lang === "id" ? "Virtual Place Tour" : "Virtual Place Tour"}
              </p>
              <h3 className="mt-1 font-display text-2xl leading-tight text-primary sm:text-3xl">
                {lang === "id" ? "Jalan-jalan ke klinik kami." : "Walk through our clinic."}
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-secondary">
              {lang === "id"
                ? "Ikuti rute kunjungan dari pintu masuk sampai ruang tindakan. Geser, klik, atau biarkan tur berjalan otomatis."
                : "Follow the visitor route from the entrance to the treatment room. Drag, click, or let the tour autoplay."}
            </p>
          </div>
          <PlaceTour />
        </div>
      </div>
    </section>
  );
}
