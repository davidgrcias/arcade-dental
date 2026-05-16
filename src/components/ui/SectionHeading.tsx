import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`gs-reveal mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-gold" : ""}`}>{eyebrow}</p>
      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${dark ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-4 text-base leading-7 ${dark ? "text-white/70" : "text-secondary"}`}>{body}</p>
      ) : null}
    </div>
  );
}
