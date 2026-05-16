"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { navItems, business } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { NavLogo } from "./navbar/NavLogo";
import { NavLinks } from "./navbar/NavLinks";
import { NavActions } from "./navbar/NavActions";

function usePathname() {
  const [pathname, setPathname] = useState("/");
  useEffect(() => {
    setPathname(window.location.pathname);
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return pathname;
}

export function Navbar() {
  const { languageReady, t, lang, setLang, c } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const bookingUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Arcade Dental, saya ingin membuat janji temu."
      : "Hello Arcade Dental, I would like to book an appointment.",
  )}`;

  function isActive(href: string): boolean {
    if (href === "/" || href === "/#about") return pathname === "/";
    const page = href.split("#")[0];
    return pathname === page || pathname.startsWith(page + "/");
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-lg shadow-primary/10 backdrop-blur-xl" : "bg-transparent"
        }`}
        style={{ visibility: languageReady ? "visible" : "hidden" }}
      >
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <NavLogo scrolled={scrolled} />
          <NavLinks scrolled={scrolled} pathname={pathname} />
          <div className="flex items-center gap-2">
            <NavActions scrolled={scrolled} />
            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-all lg:hidden ${
                scrolled
                  ? "border-primary/12 bg-white text-primary hover:border-gold/60"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {menuOpen ? (
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span className="block h-0.5 w-5 origin-center rotate-45 translate-y-[7px] rounded-full bg-current" />
                  <span className="block h-0.5 w-5 origin-center -rotate-45 rounded-full bg-current" />
                </span>
              ) : (
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-primary/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-primary/8 px-6 py-5">
          <NavLogo scrolled />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition-all ${
                  active
                    ? "bg-primary text-white"
                    : "text-primary/75 hover:bg-surface-2 hover:text-primary"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${active ? "bg-gold" : "bg-primary/25"}`}
                  aria-hidden
                />
                {t(item.label)}
              </a>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="mt-auto border-t border-primary/8 px-6 py-5">
          <a
            href={bookingUrl}
            onClick={() => setMenuOpen(false)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cta font-bold text-white shadow-lg shadow-cta/25 transition-all hover:bg-primary"
          >
            <Icon name="message" className="h-5 w-5" />
            {c.book}
          </a>
          <button
            type="button"
            onClick={() => { setLang(lang === "id" ? "en" : "id"); }}
            className="mt-3 flex w-full min-h-10 items-center justify-center gap-2 rounded-full border border-primary/12 text-sm font-bold text-primary transition-colors hover:border-gold/60"
          >
            <Icon name="language" className="h-4 w-4" />
            {c.language}
          </button>
        </div>
      </div>
    </>
  );
}
