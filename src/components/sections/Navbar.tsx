"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { business } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { NavLogo } from "./navbar/NavLogo";
import { NavActions } from "./navbar/NavActions";

// ─── helpers ────────────────────────────────────────────────────────────────

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

// Only the homepage has a dark hero — all other pages start light
function pageHasDarkHero(pathname: string) {
  return pathname === "/";
}

// ─── nav structure ──────────────────────────────────────────────────────────

interface NavItem {
  label: { id: string; en: string };
  href: string;
  children?: { label: { id: string; en: string }; href: string }[];
}

const NAV: NavItem[] = [
  {
    label: { id: "Tentang", en: "About" },
    href: "/#about",
  },
  {
    label: { id: "Layanan", en: "Services" },
    href: "/services",
    children: [
      { label: { id: "Semua Layanan", en: "All Services" }, href: "/services" },
      { label: { id: "Care Journey", en: "Care Journey" }, href: "/services#journey" },
      { label: { id: "Teknologi", en: "Technology" }, href: "/services#technology" },
    ],
  },
  {
    label: { id: "Dokter", en: "Doctors" },
    href: "/doctors",
    children: [
      { label: { id: "Tim Dokter", en: "Doctor Team" }, href: "/doctors" },
      { label: { id: "Smile Preview", en: "Smile Preview" }, href: "/doctors#engagement" },
    ],
  },
  {
    label: { id: "Lokasi", en: "Location" },
    href: "/#location",
  },
];

// ─── active detection ────────────────────────────────────────────────────────

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/#about" || item.href === "/#location") return pathname === "/";
  const page = item.href.split("#")[0];
  return pathname === page;
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

interface DropdownProps {
  item: NavItem;
  isActive: boolean;
  solid: boolean;
}

function Dropdown({ item, isActive, solid }: DropdownProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const textClass = solid
    ? isActive
      ? "bg-primary text-white"
      : "text-primary/75 hover:bg-primary/6 hover:text-primary"
    : isActive
      ? "bg-white/18 text-white"
      : "text-white/80 hover:bg-white/12 hover:text-white";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${textClass}`}
      >
        {item.label[lang]}
        <Icon
          name="chevron"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 overflow-hidden rounded-xl border border-primary/10 bg-white shadow-xl shadow-primary/12">
          <div className="py-1">
            {item.children!.map((child) => (
              <a
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-bold text-primary/80 transition-colors hover:bg-surface-2 hover:text-primary"
              >
                {child.label[lang]}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Desktop nav links ────────────────────────────────────────────────────────

interface DesktopNavProps {
  pathname: string;
  solid: boolean;
}

function DesktopNav({ pathname, solid }: DesktopNavProps) {
  const { lang } = useLanguage();

  return (
    <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
      {NAV.map((item) => {
        const active = isItemActive(item, pathname);

        if (item.children) {
          return <Dropdown key={item.href} item={item} isActive={active} solid={solid} />;
        }

        const textClass = solid
          ? active
            ? "bg-primary text-white"
            : "text-primary/75 hover:bg-primary/6 hover:text-primary"
          : active
            ? "bg-white/18 text-white"
            : "text-white/80 hover:bg-white/12 hover:text-white";

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${textClass}`}
          >
            {item.label[lang]}
          </a>
        );
      })}
    </nav>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileDrawer({ open, onClose, pathname }: MobileDrawerProps) {
  const { lang, setLang, c } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const bookingUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Arcade Dental, saya ingin membuat janji temu."
      : "Hello Arcade Dental, I would like to book an appointment.",
  )}`;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-primary/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/8 px-5 py-4">
          <NavLogo scrolled />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <span aria-hidden className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          {NAV.map((item) => {
            const active = isItemActive(item, pathname);
            return (
              <div key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition-all ${
                    active ? "bg-primary text-white" : "text-primary/75 hover:bg-surface-2 hover:text-primary"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-gold" : "bg-primary/20"}`} aria-hidden />
                  {item.label[lang]}
                </a>
                {item.children && (
                  <div className="ml-7 mt-1 flex flex-col gap-0.5 border-l-2 border-primary/8 pl-3">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="flex min-h-10 items-center rounded-lg px-3 text-sm text-primary/65 transition-colors hover:bg-surface-2 hover:text-primary"
                      >
                        {child.label[lang]}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-2 border-t border-primary/8 px-5 py-5">
          <a
            href={bookingUrl}
            onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cta font-bold text-white shadow-lg shadow-cta/25 transition-all hover:bg-primary"
          >
            <Icon name="message" className="h-5 w-5" />
            {c.book}
          </a>
          <button
            type="button"
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="flex w-full min-h-10 items-center justify-center gap-2 rounded-full border border-primary/12 text-sm font-bold text-primary transition-colors hover:border-gold/60"
          >
            <Icon name="language" className="h-4 w-4" />
            {c.language}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const { languageReady } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const darkHero = pageHasDarkHero(pathname);
  // Solid (white) when: scrolled, OR page doesn't have a dark hero
  const solid = scrolled || !darkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-white/92 shadow-sm shadow-primary/8 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={{ visibility: languageReady ? "visible" : "hidden" }}
      >
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <NavLogo scrolled={solid} />
          <DesktopNav pathname={pathname} solid={solid} />
          <div className="flex items-center gap-2">
            <NavActions scrolled={solid} />
            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-all lg:hidden ${
                solid
                  ? "border-primary/12 bg-white text-primary hover:border-gold/60"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span aria-hidden className="flex flex-col gap-[5px]">
                {menuOpen ? (
                  <>
                    <span className="block h-0.5 w-5 origin-center translate-y-[7px] rotate-45 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 origin-center -rotate-45 rounded-full bg-current" />
                  </>
                ) : (
                  <>
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                    <span className="block h-0.5 w-3.5 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
