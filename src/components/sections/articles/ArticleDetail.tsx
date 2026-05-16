"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getArticleBySlug,
  getCategory,
  relatedArticles,
  type Article,
} from "@/lib/articles";
import { services } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { ArticleBody } from "./ArticleBody";
import { ArticleCard } from "./ArticleCard";

interface ArticleDetailProps {
  slug: string;
}

const accentTokens = {
  cta: { chip: "bg-cta/12 text-cta", border: "border-cta/30" },
  gold: { chip: "bg-gold/15 text-amber-700", border: "border-gold/35" },
  primary: { chip: "bg-primary/10 text-primary", border: "border-primary/20" },
  amber: { chip: "bg-amber-100 text-amber-800", border: "border-amber-200" },
} as const;

function formatDate(iso: string, lang: "id" | "en") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const locale = lang === "id" ? "id-ID" : "en-US";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleDetail({ slug }: ArticleDetailProps) {
  const { t, lang, c } = useLanguage();
  const article = getArticleBySlug(slug);

  const tocItems = useMemo(() => {
    if (!article) return [] as { id: string; title: string }[];
    return article.body
      .map((block, index) =>
        block.type === "heading"
          ? { id: `section-${index}`, title: t(block.text) }
          : null,
      )
      .filter((item): item is { id: string; title: string } => item !== null);
  }, [article, t]);

  if (!article) {
    return (
      <section className="section-shell">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <p className="font-accent text-xs font-bold uppercase tracking-[0.22em] text-cta">404</p>
          <h1 className="mt-3 font-display text-3xl text-primary md:text-4xl">
            {lang === "id" ? "Artikel tidak ditemukan" : "Article not found"}
          </h1>
          <p className="mt-3 text-sm text-secondary">
            {lang === "id"
              ? "Halaman yang Anda cari mungkin sudah dipindah atau dihapus."
              : "The page you are looking for may have moved or been removed."}
          </p>
          <Link
            href="/articles"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            {lang === "id" ? "Kembali ke Edukasi" : "Back to articles"}
          </Link>
        </div>
      </section>
    );
  }

  const category = getCategory(article.category);
  const tokens = accentTokens[category.accent];
  const related = relatedArticles(article.slug, 3);
  const linkedServices = services.filter((service) =>
    article.relatedServices?.includes(service.id),
  );

  return (
    <article className="bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-primary text-white">
        {article.cover && (
          <Image
            src={article.cover}
            alt={article.coverAlt ? t(article.coverAlt) : t(article.title)}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-35"
          />
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/75 to-primary" />
        <span aria-hidden className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#ffffff_1px,transparent_1px),linear-gradient(#ffffff_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-accent text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur transition-colors hover:bg-white/20"
          >
            <Icon name="arrow" className="h-3 w-3 rotate-180" />
            {lang === "id" ? "Edukasi" : "Articles"}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-accent text-[10px] font-bold uppercase tracking-[0.22em] ${tokens.chip}`}
            >
              {t(category.label)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/85">
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt, lang)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/85">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {article.readingMinutes} {lang === "id" ? "menit baca" : "min read"}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            {t(article.title)}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
            {t(article.dek)}
          </p>

          <div className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary">
              <Icon name="heart" className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-bold text-white">{article.author.name}</p>
              <p className="text-xs text-white/65">{t(article.author.role)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body + sidebar */}
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <ArticleBody blocks={article.body} />

            {/* End-of-post CTA */}
            <aside className={`mt-12 overflow-hidden rounded-2xl border ${tokens.border} bg-gradient-to-br from-white to-surface-2/55 p-6 sm:p-8`}>
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-cta">
                {lang === "id" ? "Lanjutkan dengan tindakan" : "Take the next step"}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-primary sm:text-3xl">
                {lang === "id"
                  ? "Diskusikan kondisi Anda dengan dokter Arcade Dental."
                  : "Talk through your case with an Arcade Dental doctor."}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary">
                {lang === "id"
                  ? "Setiap mulut berbeda. Konsultasi singkat membuat rencana perawatan Anda lebih terarah, transparan, dan personal."
                  : "Every mouth is different. A short consultation makes your plan clearer, transparent, and personal."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-cta px-5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all hover:-translate-y-0.5 hover:bg-primary"
                >
                  <Icon name="message" className="h-4 w-4" />
                  {c.book}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/15 bg-white px-5 text-sm font-bold text-primary transition-colors hover:border-gold/60"
                >
                  {lang === "id" ? "Lihat semua layanan" : "View all services"}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            {linkedServices.length > 0 && (
              <section className="mt-10">
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                  {lang === "id" ? "Layanan terkait" : "Related services"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {linkedServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/12 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-all hover:-translate-y-0.5 hover:border-gold/60"
                    >
                      <Icon name={service.icon} className="h-3.5 w-3.5 text-cta" />
                      {t(service.title)}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — sticky TOC + meta */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {tocItems.length > 0 && (
              <nav
                aria-label={lang === "id" ? "Daftar isi" : "Table of contents"}
                className="rounded-2xl border border-primary/8 bg-surface-2/40 p-5"
              >
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                  {lang === "id" ? "Daftar isi" : "On this page"}
                </p>
                <ol className="mt-3 grid gap-2">
                  {tocItems.map((item, index) => (
                    <li key={item.id} className="flex items-start gap-2 text-sm leading-6">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white font-accent text-[10px] font-bold text-primary/65">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${item.id}`}
                        className="text-primary/75 transition-colors hover:text-cta"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="mt-4 rounded-2xl border border-primary/8 bg-white p-5 shadow-sm">
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "Tentang artikel" : "About this article"}
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-primary/75">
                <li className="flex items-center gap-2">
                  <Icon name="calendar" className="h-4 w-4 text-primary/55" />
                  {formatDate(article.publishedAt, lang)}
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="clock" className="h-4 w-4 text-primary/55" />
                  {article.readingMinutes} {lang === "id" ? "menit baca" : "min read"}
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="heart" className="h-4 w-4 text-primary/55" />
                  {article.author.name}
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-cta">
                  {lang === "id" ? "Bacaan lainnya" : "Keep reading"}
                </p>
                <h2 className="mt-1 font-display text-2xl text-primary sm:text-3xl">
                  {lang === "id" ? "Artikel yang relevan" : "Related articles"}
                </h2>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-white px-4 py-2 text-xs font-bold text-primary transition-colors hover:border-gold/60"
              >
                {lang === "id" ? "Semua artikel" : "All articles"}
                <Icon name="arrow" className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item: Article) => (
                <ArticleCard key={item.slug} article={item} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
