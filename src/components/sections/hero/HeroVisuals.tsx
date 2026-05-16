"use client";

export function HeroVisuals() {
  return (
    <>
      <video
        aria-hidden="true"
        autoPlay
        className="hero-video absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
        loop
        muted
        playsInline
        poster="/assets/real/unnamed.webp"
        preload="auto"
      >
        <source src="/assets/herovideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-primary/58 md:bg-primary/22" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,21,32,0.84)_0%,rgba(13,21,32,0.58)_37%,rgba(13,21,32,0.14)_68%,rgba(13,21,32,0.28)_100%)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(circle_at_18%_42%,rgba(200,169,110,0.34),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(232,244,240,0.16),transparent_35%)]" />
    </>
  );
}
