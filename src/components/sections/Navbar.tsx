"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { NavLogo } from "./navbar/NavLogo";
import { NavLinks } from "./navbar/NavLinks";
import { NavActions } from "./navbar/NavActions";

export function Navbar() {
  const { languageReady } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-lg shadow-primary/10 backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{ visibility: languageReady ? "visible" : "hidden" }}
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <NavLogo scrolled={scrolled} />
        <NavLinks scrolled={scrolled} />
        <NavActions scrolled={scrolled} />
      </div>
    </header>
  );
}

