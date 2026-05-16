"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/utils";

interface FearMeterProps {
  quizFear: number;
  setQuizFear: (val: number) => void;
  badExperience: boolean;
  setBadExperience: (val: boolean) => void;
  quizConcern: "pain" | "cost" | "time";
  setQuizConcern: (val: "pain" | "cost" | "time") => void;
  quizResult: string;
  quizMessage: string;
}

export function FearMeter({
  quizFear,
  setQuizFear,
  badExperience,
  setBadExperience,
  quizConcern,
  setQuizConcern,
  quizResult,
  quizMessage,
}: FearMeterProps) {
  const { c } = useLanguage();

  return (
    <article id="fear-meter" className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur scroll-mt-32">
      <p className="eyebrow text-gold">{c.quizLabel}</p>
      <h2 className="font-display text-3xl leading-tight">{c.quizTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-white/65">{c.quizBody}</p>
      <label className="mt-6 block text-sm font-bold text-white" htmlFor="fear-range">
        {c.quizFear}: {quizFear}/5
      </label>
      <input id="fear-range" type="range" min="1" max="5" value={quizFear} onChange={(event) => setQuizFear(Number(event.target.value))} className="mt-3 w-full accent-gold" />
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/55">{c.quizBadExperience}</p>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setBadExperience(false)} className={`choice-button ${!badExperience ? "choice-active" : ""}`}>{c.no}</button>
        <button type="button" onClick={() => setBadExperience(true)} className={`choice-button ${badExperience ? "choice-active" : ""}`}>{c.yes}</button>
      </div>
      <select value={quizConcern} onChange={(event) => setQuizConcern(event.target.value as "pain" | "cost" | "time")} className="mt-3 w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-gold" aria-label={c.quizConcern}>
        <option value="pain">{c.pain}</option>
        <option value="cost">{c.cost}</option>
        <option value="time">{c.time}</option>
      </select>
      <p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/80">{quizResult}</p>
      <a href={buildWhatsAppUrl(quizMessage)} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25">
        <Icon name="message" className="h-5 w-5" />
        {c.messageCta}
      </a>
    </article>
  );
}
