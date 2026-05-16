"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { TranslationKey } from "@/lib/content";

interface GalleryCardProps {
  src: string;
  alt: TranslationKey;
  label: TranslationKey;
  index: number;
  onClick: () => void;
}

export function GalleryCard({ src, alt, label, index, onClick }: GalleryCardProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gs-card group relative overflow-hidden rounded-lg border border-primary/8 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
        index === 0 || index === 3 ? "md:col-span-2" : ""
      }`}
    >
      <div className="overflow-hidden">
        <Image src={src} alt={t(alt)} width={900} height={620} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-108" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/62 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-x-4 bottom-4 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-bold text-primary shadow-lg backdrop-blur transition-all duration-300 group-hover:bg-white">
        {t(label)}
      </span>
      <span className="absolute right-4 top-4 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <Icon name="scope" className="h-4 w-4" />
      </span>
    </button>
  );
}
