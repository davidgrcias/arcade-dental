"use client";

import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

interface NavActionsProps {
  scrolled: boolean;
}

export function NavActions({ scrolled }: NavActionsProps) {
  const { c, lang, setLang } = useLanguage();

  function toggleLanguage() {
    setLang(lang === "id" ? "en" : "id");
  }

  const bookingUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    lang === "id" 
      ? "Halo Arcade Dental, saya ingin membuat janji temu." 
      : "Hello Arcade Dental, I would like to book an appointment."
  )}`;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`hidden min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-bold shadow-sm backdrop-blur md:inline-flex ${
          scrolled ? "border-primary/10 bg-white text-primary" : "border-white/20 bg-white/10 text-white"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {lang === "id" ? "Tersedia hari ini" : "Available today"}
      </span>
      <button
        type="button"
        onClick={toggleLanguage}
        className={`icon-button ${scrolled ? "" : "border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"}`}
        aria-label="Switch language"
      >
        <Icon name="language" className="h-4 w-4" />
        <span className="text-xs font-bold">{c.language}</span>
      </button>
      <a
        href={bookingUrl}
        className={`hidden min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 sm:inline-flex ${
          scrolled ? "bg-cta text-white shadow-cta/20 hover:bg-primary" : "bg-gold text-primary shadow-black/20 hover:bg-white"
        }`}
      >
        <Icon name="message" className="h-4 w-4" />
        {c.book}
      </a>
    </div>
  );
}
