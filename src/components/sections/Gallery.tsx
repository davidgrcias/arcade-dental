"use client";

import { gallery } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryCard } from "./gallery/GalleryCard";
import { GalleryMarquee } from "./gallery/GalleryMarquee";

interface GalleryProps {
  setGalleryIndex: (index: number) => void;
}

export function Gallery({ setGalleryIndex }: GalleryProps) {
  const { c } = useLanguage();

  return (
    <section id="gallery" className="section-shell overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={c.galleryLabel} title={c.galleryTitle} body={c.galleryBody} />
        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {gallery.map((item, index) => (
            <GalleryCard
              key={item.src}
              item={item}
              index={index}
              onClick={() => setGalleryIndex(index)}
            />
          ))}
        </div>
      </div>
      <GalleryMarquee />
    </section>
  );
}
