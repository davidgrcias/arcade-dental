"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getCategory } from "@/lib/articles";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

const accentTokens = {
  cta: { chip: "bg-cta/12 text-cta", glow: "from-cta/22 to-highlight/0" },
  gold: { chip: "bg-gold/15 text-amber-700", glow: "from-gold/22 to-amber-50/0" },
  primary: { chip: "bg-primary/8 text-primary", glow: "from-primary/14 to-surface-2/0" },
  amber: { chip: "bg-amber-100 text-amber-800", glow: "from-amber-200/45 to-amber-50/0" },
} as const;

function formatDate(iso: string, lang: "id" | "en") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const locale = lang === "id" ? "id-ID" : "en-US";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const { t, lang } = useLanguage();
  const category = getCategory(article.category);
  const tokens = accentTokens[category.accent];
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/55 hover:shadow-xl"
    >
      <div className={`relative w-full overflow-hidden ${isCompact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        {article.cover ? (
          <Image
            src={article.cover}
            alt={article.coverAlt ? t(article.coverAlt) : t(article.title)}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${tokens.glow}`} />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/0 to-primary/0"
        />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-accent text-[10px] font-bold uppercase tracking-[0.22em] shadow-sm ${tokens.chip}`}
        >
          {t(category.label)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/55">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt, lang)}
          </span>
          <span aria-hidden className="text-primary/25">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {article.readingMinutes} {lang === "id" ? "menit baca" : "min read"}
          </span>
        </div>

        <h3 className="font-display text-xl leading-snug text-primary group-hover:text-cta sm:text-2xl">
          {t(article.title)}
        </h3>

        <p className="text-sm leading-6 text-secondary line-clamp-3">{t(article.dek)}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-primary/65">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-gold">
              <Icon name="heart" className="h-3.5 w-3.5" />
            </span>
            <div className="leading-tight">
              <p className="font-bold text-primary">{article.author.name}</p>
              <p className="text-[11px] text-primary/55">{t(article.author.role)}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-[11px] font-bold text-cta transition-colors group-hover:bg-cta group-hover:text-white">
            {lang === "id" ? "Baca" : "Read"}
            <Icon name="arrow" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
