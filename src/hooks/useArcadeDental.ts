"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  services,
  treatmentMatcher,
  smileConcerns,
  type ServiceCategory,
} from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

export function useArcadeDental() {
  const { lang, t, c, languageReady } = useLanguage();
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [matcherId, setMatcherId] = useState(treatmentMatcher[0].id);
  const [patientName, setPatientName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [quizFear, setQuizFear] = useState(3);
  const [badExperience, setBadExperience] = useState(false);
  const [quizConcern, setQuizConcern] = useState<"pain" | "cost" | "time">("pain");
  const [sliderValue, setSliderValue] = useState(52);
  const [smileConcern, setSmileConcern] = useState(smileConcerns[0].id);
  const [preview, setPreview] = useState<string | null>(null);

  const [activeTech, setActiveTech] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [pausedCarousel, setPausedCarousel] = useState(false);

  // Derived state for WhatsApp messages
  const selectedServiceTitle = t(services.find((s) => s.id === selectedService)?.title ?? services[0].title);
  
  const smartMessage = lang === "id"
    ? `Halo Arcade Dental, saya ingin membuat janji untuk ${selectedServiceTitle}.\nNama: ${patientName || "..."}\nPreferensi jadwal: ${schedule || "..."}`
    : `Hello Arcade Dental, I would like to book an appointment for ${selectedServiceTitle}.\nName: ${patientName || "..."}\nPreferred schedule: ${schedule || "..."}`;

  const quizScore = quizFear + (badExperience ? 2 : 0) + (quizConcern === "pain" ? 1 : 0);
  const quizResultText = quizScore >= 6 ? c.resultHigh : quizScore >= 4 ? c.resultMid : c.resultLow;
  
  const quizMessage = lang === "id"
    ? `Halo Arcade Dental, saya ingin konsultasi. Tingkat cemas saya ${quizFear}/5, kekhawatiran utama saya ${c[quizConcern]}. ${quizResultText}`
    : `Hello Arcade Dental, I would like to consult. My anxiety level is ${quizFear}/5, and my main concern is ${c[quizConcern]}. ${quizResultText}`;

  const selectedSmileConcern = smileConcerns.find((concern) => concern.id === smileConcern) ?? smileConcerns[0];

  function handleSmartSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = `https://wa.me/6281119213123?text=${encodeURIComponent(smartMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handlePreview(file: File | undefined) {
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return {
    state: {
      serviceFilter,
      selectedService,
      matcherId,
      patientName,
      schedule,
      quizFear,
      badExperience,
      quizConcern,
      sliderValue,
      smileConcern,
      preview,
      selectedServiceTitle,
      smartMessage,
      quizResultText,
      quizMessage,
      selectedSmileConcern,
      activeTech,
      activeJourney,
      testimonialIndex,
      pausedCarousel,
    },
    actions: {
      setServiceFilter,
      setSelectedService,
      setMatcherId,
      setPatientName,
      setSchedule,
      setQuizFear,
      setBadExperience,
      setQuizConcern,
      setSliderValue,
      setSmileConcern,
      handleSmartSubmit,
      handlePreview,
      setActiveTech,
      setActiveJourney,
      setTestimonialIndex,
      setPausedCarousel,
    },
    languageReady,
  };
}
