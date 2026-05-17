"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVisuals() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Only load the video on devices that are likely to play it smoothly.
  // On mobile (small viewport or save-data) we skip the video entirely and
  // show only the poster — saves ~3-5 MB on first visit.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // connection.saveData check (Chrome / Android)
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = nav.connection?.saveData;
    const slowConn =
      nav.connection?.effectiveType === "2g" ||
      nav.connection?.effectiveType === "slow-2g";
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Skip video on mobile or slow/save-data connections
    if (!saveData && !slowConn && !isMobile) {
      setShowVideo(true);
    }
  }, []);

  return (
    <>
      {showVideo ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          className="hero-video absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
          loop
          muted
          playsInline
          poster="/assets/real/unnamed.webp"
          preload="none"
        >
          <source src="/assets/herovideo.mp4" type="video/mp4" />
        </video>
      ) : (
        // Poster image only — next/image optimised, much lighter on mobile
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/real/unnamed.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
          fetchPriority="high"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-primary/58 md:bg-primary/22" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,21,32,0.84)_0%,rgba(13,21,32,0.58)_37%,rgba(13,21,32,0.14)_68%,rgba(13,21,32,0.28)_100%)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(circle_at_18%_42%,rgba(200,169,110,0.34),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(232,244,240,0.16),transparent_35%)]" />
    </>
  );
}
