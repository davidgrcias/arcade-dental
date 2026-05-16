"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import type { GalleryItem } from "@/lib/content";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const { t } = useLanguage();
  const isFeatured = index === 0 || index === 6;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gs-card group relative h-full min-h-[260px] overflow-hidden rounded-lg border border-primary/8 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold/70 hover:shadow-2xl hover:shadow-primary/10 ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Image
        src={item.src}
        alt={t(item.alt)}
        fill
        sizes={isFeatured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
        style={{ objectPosition: item.focus ?? "center center" }}
        className="object-cover transition-transform duration-700 group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/72 via-primary/14 to-transparent opacity-78 transition-opacity duration-300 group-hover:opacity-95" />
      <span className="absolute left-4 top-4 rounded-full border border-white/16 bg-white/14 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute inset-x-4 bottom-4 rounded-lg bg-white/92 px-4 py-3 text-sm font-bold text-primary shadow-lg backdrop-blur transition-all duration-300 group-hover:bg-white">
        {t(item.label)}
      </span>
      <span className="absolute right-4 top-4 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <Icon name="scope" className="h-4 w-4" />
      </span>
    </button>
  );
}
