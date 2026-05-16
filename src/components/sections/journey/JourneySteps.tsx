"use client";

import { careJourney } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";

interface JourneyStepsProps {
  activeJourney: number;
  setActiveJourney?: (index: number) => void;
}

const accentTokens = {
  gold: {
    border: "border-gold",
    ring: "ring-gold/30",
    bar: "bg-gold",
    softBg: "bg-gold/15",
    text: "text-gold",
    indicator: "bg-gold text-primary",
  },
  cta: {
    border: "border-cta",
    ring: "ring-cta/25",
    bar: "bg-cta",
    softBg: "bg-cta/12",
    text: "text-cta",
    indicator: "bg-cta text-white",
  },
} as const;

export function JourneySteps({ activeJourney, setActiveJourney }: JourneyStepsProps) {
  const { t, lang } = useLanguage();
  const total = careJourney.length;
  const doneLabel = lang === "id" ? "Selesai" : "Done";
  const nowLabel = lang === "id" ? "Sekarang" : "Now";

  return (
    <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {careJourney.map((step, index) => {
        const isActive = activeJourney === index;
        const isDone = index < activeJourney;
        const isUpcoming = index > activeJourney;
        const tokens = accentTokens[step.accent];
        const Tag = setActiveJourney ? "button" : "div";

        const cardState = isActive
          ? `${tokens.border} bg-white shadow-xl shadow-primary/12 ring-1 ${tokens.ring}`
          : isDone
            ? "border-primary/10 bg-white/85"
            : "border-primary/8 bg-white/65";

        const indicatorState = isActive
          ? `${tokens.indicator} shadow-md`
          : isDone
            ? "bg-primary text-white"
            : "bg-highlight text-cta";

        return (
          <li key={step.id} className="relative">
            <Tag
              type={setActiveJourney ? "button" : undefined}
              onClick={setActiveJourney ? () => setActiveJourney(index) : undefined}
              aria-current={isActive ? "step" : undefined}
              className={`gs-card group relative flex w-full flex-col gap-3 overflow-hidden rounded-lg border p-4 text-left transition-all duration-300 ${cardState} ${
                setActiveJourney ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : ""
              } ${isUpcoming ? "opacity-80" : "opacity-100"}`}
            >
              {/* Top accent bar (active only) */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-500 ${
                  isActive ? `${tokens.bar} scale-x-100` : "scale-x-0"
                }`}
              />

              <div className="flex items-center justify-between gap-2">
                <div className={`grid h-9 w-9 place-items-center rounded-lg transition-colors duration-300 ${indicatorState}`}>
                  {isDone ? <Icon name="check" className="h-4 w-4" /> : <Icon name={step.icon} className="h-4 w-4" />}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-accent text-[10px] font-bold uppercase tracking-[0.18em] ${
                    isActive
                      ? `${tokens.softBg} ${tokens.text}`
                      : isDone
                        ? "bg-primary/8 text-primary/70"
                        : "bg-primary/5 text-primary/50"
                  }`}
                >
                  {isActive ? nowLabel : isDone ? doneLabel : `${step.metric}/${String(total).padStart(2, "0")}`}
                </span>
              </div>

              <div className="min-w-0">
                <p className={`font-accent text-[10px] font-bold uppercase tracking-[0.22em] ${tokens.text}`}>
                  {t(step.eyebrow)}
                </p>
                <h4 className={`mt-1 font-display text-lg leading-tight ${isActive ? "text-primary" : "text-primary/85"}`}>
                  {t(step.title)}
                </h4>
                <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-secondary/90">{t(step.body)}</p>
              </div>

              <div className="mt-auto flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-primary/65">
                <Icon name="clock" className="h-3.5 w-3.5 text-primary/45" />
                <span>{t(step.duration)}</span>
              </div>
            </Tag>
          </li>
        );
      })}
    </ol>
  );
}
