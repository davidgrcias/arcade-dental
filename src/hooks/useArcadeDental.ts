"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  services,
  smileConcerns,
  treatmentMatcher,
  type ServiceCategory,
} from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Build the WhatsApp "smart message" that the floating CTA + booking form share.
 * Centralised here so PageShell, Contact form, and Hero CTA all stay in sync.
 */
function buildSmartMessage(
  lang: "id" | "en",
  serviceTitle: string,
  patientName: string,
  schedule: string,
) {
  const name = patientName.trim() || (lang === "id" ? "..." : "...");
  const slot = schedule.trim() || (lang === "id" ? "..." : "...");
  return lang === "id"
    ? `Halo Arcade Dental, saya ingin membuat janji untuk ${serviceTitle}.\nNama: ${name}\nPreferensi jadwal: ${slot}`
    : `Hello Arcade Dental, I would like to book an appointment for ${serviceTitle}.\nName: ${name}\nPreferred schedule: ${slot}`;
}

/**
 * Slim hook for the global page shell — only the data the floating CTA needs.
 * Avoids re-rendering every section whenever a form input changes.
 */
export function useShellState() {
  const { lang, t } = useLanguage();
  const fallbackTitle = useMemo(() => t(services[0].title), [t]);

  const smartMessage = useMemo(
    () => buildSmartMessage(lang, fallbackTitle, "", ""),
    [lang, fallbackTitle],
  );

  return { smartMessage };
}

/**
 * State + actions for the homepage Contact form and the testimonials carousel.
 */
export function useHomeState() {
  const { lang, t } = useLanguage();

  const [selectedService, setSelectedService] = useState(services[0].id);
  const [patientName, setPatientName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [pausedCarousel, setPausedCarousel] = useState(false);

  const selectedServiceTitle = useMemo(() => {
    const service = services.find((s) => s.id === selectedService) ?? services[0];
    return t(service.title);
  }, [selectedService, t]);

  const smartMessage = useMemo(
    () => buildSmartMessage(lang, selectedServiceTitle, patientName, schedule),
    [lang, selectedServiceTitle, patientName, schedule],
  );

  const handleSmartSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const url = `https://wa.me/6281119213123?text=${encodeURIComponent(smartMessage)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [smartMessage],
  );

  return {
    state: {
      selectedService,
      patientName,
      schedule,
      smartMessage,
      testimonialIndex,
      pausedCarousel,
    },
    actions: {
      setSelectedService,
      setPatientName,
      setSchedule,
      setTestimonialIndex,
      setPausedCarousel,
      handleSmartSubmit,
    },
  };
}

/**
 * State + actions for the Services page (filters, matcher, journey, tech).
 */
export function useServicesState() {
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [matcherId, setMatcherId] = useState(treatmentMatcher[0].id);
  const [activeTech, setActiveTech] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);

  return {
    state: {
      serviceFilter,
      selectedService,
      matcherId,
      activeTech,
      activeJourney,
    },
    actions: {
      setServiceFilter,
      setSelectedService,
      setMatcherId,
      setActiveTech,
      setActiveJourney,
    },
  };
}

/**
 * State + actions for the Doctors page engagement modules.
 */
export function useDoctorsState() {
  const { lang, c } = useLanguage();

  const [quizFear, setQuizFear] = useState(3);
  const [badExperience, setBadExperience] = useState(false);
  const [quizConcern, setQuizConcern] = useState<"pain" | "cost" | "time">("pain");
  const [sliderValue, setSliderValue] = useState(52);
  const [smileConcern, setSmileConcern] = useState(smileConcerns[0].id);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePreview = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    },
    [],
  );

  // Cleanup blob URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const quizScore =
    quizFear + (badExperience ? 2 : 0) + (quizConcern === "pain" ? 1 : 0);
  const quizResultText =
    quizScore >= 6 ? c.resultHigh : quizScore >= 4 ? c.resultMid : c.resultLow;

  const quizMessage = useMemo(
    () =>
      lang === "id"
        ? `Halo Arcade Dental, saya ingin konsultasi. Tingkat cemas saya ${quizFear}/5, kekhawatiran utama saya ${c[quizConcern]}. ${quizResultText}`
        : `Hello Arcade Dental, I would like to consult. My anxiety level is ${quizFear}/5, and my main concern is ${c[quizConcern]}. ${quizResultText}`,
    [lang, quizFear, quizConcern, c, quizResultText],
  );

  const selectedSmileConcern = useMemo(
    () => smileConcerns.find((concern) => concern.id === smileConcern) ?? smileConcerns[0],
    [smileConcern],
  );

  return {
    state: {
      quizFear,
      badExperience,
      quizConcern,
      sliderValue,
      smileConcern,
      preview,
      quizResultText,
      quizMessage,
      selectedSmileConcern,
    },
    actions: {
      setQuizFear,
      setBadExperience,
      setQuizConcern,
      setSliderValue,
      setSmileConcern,
      handlePreview,
    },
  };
}
