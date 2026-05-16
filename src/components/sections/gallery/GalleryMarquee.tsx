"use client";

import Image from "next/image";
import { gallery } from "@/lib/content";

export function GalleryMarquee() {
  return (
    <div className="mt-12 overflow-hidden border-y border-primary/8 bg-white/60 py-4">
      <div className="gallery-marquee-track flex w-[200%] gap-4">
        {[...gallery, ...gallery].map((item, index) => (
          <div key={`${item.src}-${index}`} className="relative h-24 w-44 shrink-0 overflow-hidden rounded-lg">
            <Image src={item.src} alt="" fill sizes="176px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
