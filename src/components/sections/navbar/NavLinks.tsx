"use client";

import { navItems } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface NavLinksProps {
  scrolled: boolean;
  pathname: string;
}

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  const page = href.split("#")[0];
  return pathname === page || pathname.startsWith(page + "/");
}

export function NavLinks({ scrolled, pathname }: NavLinksProps) {
  const { t } = useLanguage();

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      {navItems.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <a
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              scrolled
                ? active
                  ? "bg-primary/8 text-primary"
                  : "text-primary/68 hover:bg-primary/5 hover:text-primary"
                : active
                  ? "bg-white/15 text-white"
                  : "text-white/72 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t(item.label)}
            {active && (
              <span
                aria-hidden
                className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${scrolled ? "bg-cta" : "bg-gold"}`}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
