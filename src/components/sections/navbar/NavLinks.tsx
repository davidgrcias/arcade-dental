"use client";

import { navItems } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface NavLinksProps {
  scrolled: boolean;
}

export function NavLinks({ scrolled }: NavLinksProps) {
  const { t } = useLanguage();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            scrolled ? "text-primary/68 hover:bg-primary/5 hover:text-primary" : "text-white/72 hover:bg-white/10 hover:text-white"
          }`}
        >
          {t(item.label)}
        </a>
      ))}
    </nav>
  );
}
