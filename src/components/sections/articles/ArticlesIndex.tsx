"use client";

import { useMemo, useState } from "react";
import {
  articleCategories,
  sortedArticles,
  type ArticleCategoryId,
} from "@/lib/articles";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ArticleCard } from "./ArticleCard";

type Filter = "all" | ArticleCategoryId;

export function ArticlesIndex() {
  const { c, lang, t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const all = useMemo(() => sortedArticles(), []);
  const filtered = useMemo(() => {
    if (filter === "all") return all;
    return all.filter((article) => article.category === filter);
  }, [all, filter]);

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: all.length,
      general: 0,
      specialist: 0,
      aesthetic: 0,
      kids: 0,
    };
    for (const article of all) {
      map[article.category] += 1;
    }
    return map;
  }, [all]);

  const featured = all[0];
  const rest = filtered.filter((article) => article.slug !== featured?.slug);
  const showFeatured = filter === "all" && featured;

  const totalMinutes = all.reduce((sum, a) => sum + a.readingMinutes, 0);

  const stats = [
    {
      value: String(all.length),
      label: lang === "id" ? "Artikel edukasi" : "Educational articles",
      icon: "spark" as const,
    },
    {
      value: `${totalMinutes}`,
      label: lang === "id" ? "Menit konten" : "Minutes of reading",
      icon: "clock" as const,
    },
    {
      value: String(articleCategories.length),
      label: lang === "id" ? "Kategori topik" : "Topic categories",
      icon: "scope" as const,
    },
  ];

  const filterDefs: { id: Filter; label: { id: string; en: string } }[] = [
    { id: "all", label: { id: "Semua topik", en: "All topics" } },
    ...articleCategories.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={c.articlesLabel}
          title={c.articlesTitle}
          body={c.articlesBody}
        />

        <div className="gs-reveal grid gap-3 rounded-2xl border border-primary/8 bg-white p-3 shadow-sm sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl bg-surface-2/45 px-4 py-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-gold">
                <Icon name={stat.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl leading-none text-primary">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/55">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="gs-reveal mt-8 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label={c.articlesLabel} className="flex flex-wrap gap-2">
            {filterDefs.map((def) => {
              const isActive = filter === def.id;
              return (
                <button
                  key={def.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(def.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-all ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-primary/15 bg-white text-primary hover:-translate-y-0.5 hover:border-gold/60"
                  }`}
                >
                  <span>{t(def.label)}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-accent text-[10px] font-bold ${
                      isActive ? "bg-white/15 text-white" : "bg-surface-2 text-primary/60"
                    }`}
                  >
                    {counts[def.id]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-primary/55">
            {lang === "id"
              ? `${filtered.length} dari ${all.length} artikel`
              : `${filtered.length} of ${all.length} articles`}
          </p>
        </div>

        {showFeatured && (
          <div className="gs-reveal mt-8 grid gap-4 lg:grid-cols-2">
            <ArticleCard article={featured} />
            {rest[0] && <ArticleCard article={rest[0]} />}
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(showFeatured ? rest.slice(1) : filtered).map((article) => (
            <ArticleCard key={article.slug} article={article} variant="compact" />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-primary/15 bg-white p-8 text-center text-sm text-primary/60">
            {lang === "id"
              ? "Belum ada artikel di kategori ini. Cek kategori lain atau kembali lagi nanti."
              : "No articles in this category yet. Try another or check back soon."}
          </p>
        )}
      </div>
    </section>
  );
}
