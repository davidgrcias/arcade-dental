"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { searchAll, type SearchResult, type SearchResultGroup } from "@/lib/search";

interface NavSearchProps {
  solid: boolean;
}

const groupLabels: Record<SearchResultGroup, { id: string; en: string }> = {
  page: { id: "Halaman & Bagian", en: "Pages & Sections" },
  service: { id: "Layanan", en: "Services" },
  doctor: { id: "Dokter", en: "Doctors" },
};

const groupIcons: Record<SearchResultGroup, React.ComponentProps<typeof Icon>["name"]> = {
  page: "scan",
  service: "spark",
  doctor: "heart",
};

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-gold/30 px-0.5 text-primary">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function NavSearch({ solid }: NavSearchProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchAll(query, lang), [query, lang]);

  const grouped = useMemo(() => {
    const map: Record<SearchResultGroup, SearchResult[]> = { page: [], service: [], doctor: [] };
    results.forEach((r) => map[r.group].push(r));
    return map;
  }, [results]);

  // Flat list (in render order) so arrow keys can step through groups seamlessly
  const flatList = useMemo<SearchResult[]>(
    () => [...grouped.page, ...grouped.service, ...grouped.doctor],
    [grouped],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  // Open with cmd/ctrl+K, close with escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Lock body scroll when open + focus input
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset active index when results change
  useEffect(() => setActiveIndex(0), [query]);

  // Arrow key navigation inside the list
  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(flatList.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && flatList[activeIndex]) {
      e.preventDefault();
      window.location.href = flatList[activeIndex].href;
      close();
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-search-idx="${activeIndex}"]`);
    if (active) active.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const placeholder = lang === "id" ? "Cari layanan, dokter, atau halaman..." : "Search services, doctors, or pages...";
  const hint = lang === "id" ? "Tekan" : "Press";
  const closeLabel = lang === "id" ? "tutup" : "close";
  const navLabel = lang === "id" ? "navigasi" : "navigate";
  const selectLabel = lang === "id" ? "pilih" : "select";

  // Trigger button styled to match the navbar theme
  const triggerClass = solid
    ? "border-primary/12 bg-white/80 text-primary/70 hover:border-primary/25 hover:text-primary"
    : "border-white/20 bg-white/10 text-white/80 hover:border-white/40 hover:text-white";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={lang === "id" ? "Buka pencarian" : "Open search"}
        className={`group inline-flex min-h-11 items-center gap-2 rounded-full border px-3 transition-all hover:-translate-y-0.5 sm:gap-3 sm:px-3.5 ${triggerClass}`}
      >
        <Icon name="scope" className="h-4 w-4" />
        <span className="hidden text-xs font-bold sm:inline">
          {lang === "id" ? "Cari..." : "Search..."}
        </span>
        <span className={`hidden rounded border px-1.5 py-0.5 font-accent text-[10px] font-bold tracking-wider md:inline ${solid ? "border-primary/15 text-primary/55" : "border-white/25 text-white/70"}`}>
          ⌘K
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === "id" ? "Pencarian" : "Search"}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-primary/70 px-4 pt-[10vh] backdrop-blur-md sm:pt-[14vh]"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-2xl"
          >
            {/* Decorative glow */}
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-cta/15 blur-3xl" />

            {/* Search bar */}
            <div className="relative flex items-center gap-3 border-b border-primary/8 px-5 py-4">
              <Icon name="scope" className="h-5 w-5 shrink-0 text-cta" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-base text-primary outline-none placeholder:text-primary/40"
                aria-label={placeholder}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <span aria-hidden className="text-sm leading-none">×</span>
                </button>
              )}
              <kbd className="hidden rounded-md border border-primary/12 bg-surface-2 px-2 py-1 font-accent text-[10px] font-bold text-primary/60 sm:inline-flex">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="relative max-h-[60vh] overflow-y-auto">
              {!query && <EmptyState lang={lang} />}

              {query && results.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <p className="font-display text-lg text-primary">
                    {lang === "id" ? "Tidak ada hasil." : "No results."}
                  </p>
                  <p className="mt-2 text-sm text-secondary">
                    {lang === "id"
                      ? "Coba kata kunci lain seperti 'ortodonti', 'dokter anak', atau 'lokasi'."
                      : "Try other keywords like 'orthodontics', 'pediatric doctor', or 'location'."}
                  </p>
                </div>
              )}

              {query && results.length > 0 && (
                <div className="py-2">
                  {(["page", "service", "doctor"] as SearchResultGroup[]).map((group) => {
                    const items = grouped[group];
                    if (!items.length) return null;
                    return (
                      <div key={group} className="px-2 pb-2">
                        <p className="px-3 pb-1.5 pt-2 font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/45">
                          {groupLabels[group][lang]}
                        </p>
                        <ul>
                          {items.map((r) => {
                            const idx = flatList.findIndex((f) => f === r);
                            const active = idx === activeIndex;
                            return (
                              <li key={`${r.group}-${r.id}`}>
                                <a
                                  href={r.href}
                                  onClick={close}
                                  data-search-idx={idx}
                                  onMouseEnter={() => setActiveIndex(idx)}
                                  className={`group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                                    active ? "bg-primary text-white" : "text-primary hover:bg-surface-2"
                                  }`}
                                >
                                  <span
                                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                                      active ? "bg-white/15 text-gold" : "bg-highlight text-cta"
                                    }`}
                                  >
                                    <Icon name={groupIcons[r.group]} className="h-4 w-4" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className={`block truncate text-sm font-bold ${active ? "text-white" : "text-primary"}`}>
                                      {highlightMatch(r.title, query)}
                                    </span>
                                    <span className={`mt-0.5 block truncate text-xs ${active ? "text-white/70" : "text-secondary"}`}>
                                      {highlightMatch(r.subtitle, query)}
                                    </span>
                                  </span>
                                  <Icon
                                    name="arrow"
                                    className={`h-4 w-4 shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover/item:opacity-60"}`}
                                  />
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer hint bar */}
            <div className="relative flex flex-wrap items-center gap-3 border-t border-primary/8 bg-surface-2/50 px-5 py-3 text-[11px] font-bold text-primary/55">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-primary/15 bg-white px-1.5 py-0.5 font-accent text-[9px]">↑↓</kbd>
                {navLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-primary/15 bg-white px-1.5 py-0.5 font-accent text-[9px]">ENTER</kbd>
                {selectLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-primary/15 bg-white px-1.5 py-0.5 font-accent text-[9px]">ESC</kbd>
                {closeLabel}
              </span>
              <span className="ml-auto hidden sm:block">
                {hint} <kbd className="mx-1 rounded border border-primary/15 bg-white px-1.5 py-0.5 font-accent text-[9px]">⌘K</kbd>{" "}
                {lang === "id" ? "kapan saja" : "anytime"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EmptyState({ lang }: { lang: "id" | "en" }) {
  const suggestions = [
    { label: { id: "Ortodonti", en: "Orthodontics" }, href: "/services#ortodonti" },
    { label: { id: "Implan Gigi", en: "Dental Implant" }, href: "/services#implan" },
    { label: { id: "Whitening", en: "Whitening" }, href: "/services#estetika" },
    { label: { id: "Dokter Anak", en: "Pediatric Doctor" }, href: "/doctors" },
    { label: { id: "Lokasi", en: "Location" }, href: "/#location" },
    { label: { id: "Care Journey", en: "Care Journey" }, href: "/services#journey" },
  ];

  return (
    <div className="px-5 py-6">
      <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/45">
        {lang === "id" ? "Saran cepat" : "Quick suggestions"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/12 bg-white px-3 py-1.5 text-xs font-bold text-primary/75 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:text-primary"
          >
            {s.label[lang]}
          </a>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-primary/8 bg-surface-2/50 p-4">
        <p className="font-display text-base text-primary">
          {lang === "id" ? "Cari layanan, dokter, atau halaman" : "Search services, doctors, or pages"}
        </p>
        <p className="mt-1 text-xs text-secondary">
          {lang === "id"
            ? "Mulai mengetik untuk menjelajahi seluruh konten Arcade Dental."
            : "Start typing to explore all Arcade Dental content."}
        </p>
      </div>
    </div>
  );
}
