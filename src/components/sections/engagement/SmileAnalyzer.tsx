"use client";

import { Icon } from "@/components/ui/Icon";
import { smileConcerns, type LocalizedText } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

interface SmileAnalyzerProps {
  preview: string | null;
  handlePreview: (file: File | undefined) => void;
  smileConcern: string;
  setSmileConcern: (val: string) => void;
  selectedSmileConcern: {
    id: string;
    label: LocalizedText;
    result: LocalizedText;
  };
}

export function SmileAnalyzer({
  preview,
  handlePreview,
  smileConcern,
  setSmileConcern,
  selectedSmileConcern,
}: SmileAnalyzerProps) {
  const { t, c } = useLanguage();

  return (
    <article className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
      <p className="eyebrow text-gold">{c.analyzerLabel}</p>
      <h2 className="font-display text-3xl leading-tight">{c.analyzerTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-white/65">{c.analyzerBody}</p>
      <label className="mt-6 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-4 text-center transition-all duration-200 hover:border-gold hover:bg-white/[0.08]" htmlFor="smile-upload">
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-36 rounded-lg object-contain" />
        ) : (
          <>
            <Icon name="upload" className="h-8 w-8 text-gold" />
            <span className="mt-3 text-sm font-bold">{c.chooseFile}</span>
            <span className="mt-1 text-xs text-white/40">JPG, PNG, WEBP</span>
          </>
        )}
      </label>
      <input id="smile-upload" type="file" accept="image/*" className="sr-only" onChange={(event) => handlePreview(event.target.files?.[0])} />
      <label className="mt-5 block text-sm font-bold text-white" htmlFor="smile-concern">{c.concernLabel}</label>
      <select id="smile-concern" value={smileConcern} onChange={(event) => setSmileConcern(event.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-gold">
        {smileConcerns.map((concern) => (
          <option key={concern.id} value={concern.id}>{t(concern.label)}</option>
        ))}
      </select>
      <p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/80">{t(selectedSmileConcern.result)}</p>
      <p className="mt-3 text-xs leading-5 text-white/45">{c.analyzerDisclaimer}</p>
    </article>
  );
}
