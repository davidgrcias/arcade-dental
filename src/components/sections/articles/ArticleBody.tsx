"use client";

import type { ArticleBlock } from "@/lib/articles";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

const calloutTokens = {
  tip: {
    container: "bg-cta/8 border-cta/25 text-primary",
    iconBg: "bg-cta text-white",
    icon: "spark" as const,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-900",
    iconBg: "bg-amber-500 text-white",
    icon: "shield" as const,
  },
  info: {
    container: "bg-highlight border-cta/20 text-primary",
    iconBg: "bg-primary text-gold",
    icon: "scope" as const,
  },
} as const;

export function ArticleBody({ blocks }: ArticleBodyProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="flex flex-col gap-6 text-primary/85">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "lede") {
          return (
            <p
              key={key}
              className="font-display text-xl leading-relaxed text-primary sm:text-2xl sm:leading-relaxed"
            >
              {t(block.text)}
            </p>
          );
        }

        if (block.type === "heading") {
          const id = `section-${index}`;
          return (
            <h2
              key={key}
              id={id}
              className="scroll-mt-32 pt-2 font-display text-2xl leading-tight text-primary sm:text-3xl"
            >
              {t(block.text)}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={key} className="text-base leading-7 text-primary/80">
              {t(block.text)}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="grid gap-2.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-7 text-primary/80">
                  <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cta/10 text-cta">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "steps") {
          return (
            <ol key={key} className="grid gap-3">
              {block.items.map((step, i) => (
                <li
                  key={i}
                  className="relative flex gap-4 rounded-xl border border-primary/8 bg-white p-4 shadow-sm sm:p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-base font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-tight text-primary">
                      {t(step.title)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-secondary">{t(step.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "callout") {
          const tokens = calloutTokens[block.variant];
          return (
            <aside
              key={key}
              className={`relative flex flex-col gap-2 rounded-xl border p-5 sm:flex-row sm:gap-4 ${tokens.container}`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tokens.iconBg}`}
              >
                <Icon name={tokens.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] opacity-65">
                  {block.variant === "tip"
                    ? lang === "id" ? "Tips" : "Tip"
                    : block.variant === "warning"
                      ? lang === "id" ? "Perhatian" : "Heads up"
                      : lang === "id" ? "Catatan" : "Note"}
                </p>
                <p className="mt-1 font-display text-lg leading-tight">{t(block.title)}</p>
                <p className="mt-2 text-sm leading-6 opacity-90">{t(block.text)}</p>
              </div>
            </aside>
          );
        }

        if (block.type === "faq") {
          return (
            <section key={key} className="rounded-2xl border border-primary/8 bg-surface-2/40 p-5 sm:p-6">
              <p className="font-accent text-[11px] font-bold uppercase tracking-[0.22em] text-primary/55">
                {lang === "id" ? "FAQ" : "FAQ"}
              </p>
              <h3 className="mt-1 font-display text-2xl text-primary">{t(block.title)}</h3>
              <ul className="mt-4 grid gap-2">
                {block.items.map((qa, i) => (
                  <li
                    key={i}
                    className="overflow-hidden rounded-xl border border-primary/8 bg-white"
                  >
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-bold text-primary transition-colors hover:bg-surface-2/60 sm:px-5">
                        <span className="text-sm leading-6 sm:text-base">{t(qa.question)}</span>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-primary transition-transform group-open:rotate-180">
                          <Icon name="chevron" className="h-3.5 w-3.5 rotate-90" />
                        </span>
                      </summary>
                      <div className="border-t border-primary/8 px-4 py-3 text-sm leading-6 text-primary/80 sm:px-5">
                        {t(qa.answer)}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
