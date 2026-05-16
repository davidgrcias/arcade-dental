"use client";

import type { LocalizedText } from "@/lib/content";

// Sub-components
import { FearMeter } from "./engagement/FearMeter";
import { SmileAnalyzer } from "./engagement/SmileAnalyzer";
import { BeforeAfter } from "./engagement/BeforeAfter";

interface EngagementProps {
  quizFear: number;
  setQuizFear: (val: number) => void;
  badExperience: boolean;
  setBadExperience: (val: boolean) => void;
  quizConcern: "pain" | "cost" | "time";
  setQuizConcern: (val: "pain" | "cost" | "time") => void;
  quizResult: string;
  quizMessage: string;
  preview: string | null;
  handlePreview: (file: File | undefined) => void;
  smileConcern: string;
  setSmileConcern: (val: string) => void;
  selectedSmileConcern: {
    id: string;
    label: LocalizedText;
    result: LocalizedText;
  };
  sliderValue: number;
  setSliderValue: (val: number) => void;
}

export default function Engagement({
  quizFear,
  setQuizFear,
  badExperience,
  setBadExperience,
  quizConcern,
  setQuizConcern,
  quizResult,
  quizMessage,
  preview,
  handlePreview,
  smileConcern,
  setSmileConcern,
  selectedSmileConcern,
  sliderValue,
  setSliderValue,
}: EngagementProps) {
  return (
    <section id="engagement" className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-3">
        <FearMeter 
          quizFear={quizFear}
          setQuizFear={setQuizFear}
          badExperience={badExperience}
          setBadExperience={setBadExperience}
          quizConcern={quizConcern}
          setQuizConcern={setQuizConcern}
          quizResult={quizResult}
          quizMessage={quizMessage}
        />

        <SmileAnalyzer 
          preview={preview}
          handlePreview={handlePreview}
          smileConcern={smileConcern}
          setSmileConcern={setSmileConcern}
          selectedSmileConcern={selectedSmileConcern}
        />

        <BeforeAfter 
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
      </div>
    </section>
  );
}
