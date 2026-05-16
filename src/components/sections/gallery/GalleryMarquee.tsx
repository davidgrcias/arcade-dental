"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { gallery } from "@/lib/content";

export function GalleryMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".gallery-marquee-track", {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: "none",
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);
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
