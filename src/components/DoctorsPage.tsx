"use client";

import { useArcadeDental } from "@/hooks/useArcadeDental";
import { PageShell } from "./PageShell";
import { Doctors } from "./sections/Doctors";
import Engagement from "./sections/Engagement";

export function DoctorsPage() {
  const { state, actions } = useArcadeDental();

  return (
    <PageShell>
      <Doctors />
      <Engagement
        quizFear={state.quizFear}
        setQuizFear={actions.setQuizFear}
        badExperience={state.badExperience}
        setBadExperience={actions.setBadExperience}
        quizConcern={state.quizConcern}
        setQuizConcern={actions.setQuizConcern}
        quizResult={state.quizResultText}
        quizMessage={state.quizMessage}
        preview={state.preview}
        handlePreview={actions.handlePreview}
        smileConcern={state.smileConcern}
        setSmileConcern={actions.setSmileConcern}
        selectedSmileConcern={state.selectedSmileConcern}
        sliderValue={state.sliderValue}
        setSliderValue={actions.setSliderValue}
      />
    </PageShell>
  );
}
