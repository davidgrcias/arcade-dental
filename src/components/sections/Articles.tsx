"use client";

import Link from "next/link";
import { sortedArticles } from "@/lib/articles";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "./articles/ArticleCard";

/**
 * Homepage teaser. Shows the three most recent articles plus a CTA to the
 * full education library at /articles.
 */
export function Articles() {
  const { c, lang } = useLanguage();
  const featured = sortedArticles().slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section
      id="articles"
      aria-labelledby="articles-heading"
      className="relative overflow-hidden bg-[#fbfaf7] py-20 md:py-24"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(90deg,#1a2332_1px,transparent_1px),linear-gradient(#1a2332_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={c.articlesLabel}
          title={c.articlesTeaserTitle}
          body={c.articlesTeaserBody}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="compact" />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-primary/8 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cta/12 text-cta">
              <Icon name="spark" className="h-5 w-5" />
            </span>
            <p className="text-sm leading-6 text-primary/75">
              {lang === "id"
                ? "Konten edukasi ditulis langsung oleh tim dokter Arcade Dental dan disesuaikan dengan kondisi pasien Indonesia."
                : "Educational content is written by the Arcade Dental doctor team and tailored to Indonesian patients."}
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-cta hover:shadow-lg"
          >
            {lang === "id" ? "Jelajahi semua artikel" : "Browse all articles"}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
