"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  business,
  careJourney,
  doctors,
  gallery,
  heroCopy,
  navItems,
  services,
  serviceCategories,
  siteAssets,
  smileConcerns,
  stats,
  techMetrics,
  technologies,
  testimonials,
  treatmentMatcher,
  trustBadges,
  whyUs,
  type Language,
  type LocalizedText,
  type ServiceCategory,
} from "@/lib/content";

type IconName =
  | "align"
  | "implant"
  | "spark"
  | "shield"
  | "child"
  | "surgery"
  | "scope"
  | "sterile"
  | "light"
  | "xray"
  | "motor"
  | "calendar"
  | "message"
  | "map"
  | "instagram"
  | "facebook"
  | "chevron"
  | "star"
  | "upload"
  | "language"
  | "heart"
  | "phone"
  | "arrow"
  | "check"
  | "clock"
  | "scan";

const copy = {
  id: {
    language: "EN",
    book: "Buat Janji",
    aboutLabel: "Tentang Arcade Dental",
    aboutTitle: "Lebih dari Sekadar Klinik Gigi.",
    aboutBody:
      "Arcade Dental hadir di Bintaro Jaya Sektor 7 sebagai klinik utama yang percaya bahwa perawatan gigi seharusnya tidak menakutkan. Kami memadukan keahlian dokter, teknologi dental terkini, dan pengalaman yang nyaman, personal, serta komprehensif.",
    servicesLabel: "Layanan",
    servicesTitle: "Solusi lengkap untuk setiap kebutuhan senyum.",
    servicesBody:
      "Dari penyembuhan, perbaikan, hingga estetika, pilih kategori yang paling relevan untuk kebutuhan Anda.",
    matcherLabel: "Treatment Matcher",
    matcherTitle: "Pilih tujuan senyum, kami arahkan jalurnya.",
    matcherBody:
      "Matcher ini bukan diagnosis medis, tetapi membantu membuat konsultasi awal lebih fokus.",
    matcherCta: "Konsultasikan jalur ini",
    journeyLabel: "Signature Care Journey",
    journeyTitle: "Setiap kunjungan punya ritme yang jelas.",
    journeyBody:
      "Dari rasa cemas pertama sampai kontrol lanjutan, pengalaman dirancang agar pasien tahu apa yang sedang terjadi dan apa langkah berikutnya.",
    whyLabel: "Mengapa Arcade Dental",
    whyTitle: "Perawatan dibuat lebih tenang, jelas, dan personal.",
    techLabel: "Tech Lab",
    techTitle: "Teknologi klinik dibuat terasa mudah dipahami.",
    techBody:
      "Perangkat modern membantu dokter membaca detail, menjaga sterilisasi, dan menyusun tindakan yang lebih presisi.",
    doctorsLabel: "Tim Dokter",
    doctorsTitle: "Didampingi dokter ahli di bidangnya.",
    doctorsBody:
      "Tim spesialis berpengalaman siap memberikan perawatan terbaik sesuai kebutuhan Anda.",
    testimonialsLabel: "Testimoni",
    testimonialsTitle: "Cerita pasien yang sudah merasakan perawatan.",
    galleryLabel: "Galeri",
    galleryTitle: "Klinik premium yang tetap terasa hangat.",
    galleryBody:
      "Asset dummy lokal ini menjaga visual tetap konsisten tanpa bergantung pada URL eksternal.",
    insuranceLabel: "Asuransi",
    insuranceTitle: "Rekanan resmi BCA Life.",
    insuranceBody:
      "Arcade Dental terdaftar sebagai Klinik Utama Arcade Dental di jaringan rekanan BCA Life. Konsultasikan manfaat asuransi Anda dengan tim admin sebelum kunjungan.",
    locationLabel: "Lokasi & Kontak",
    locationTitle: "Mudah ditemukan di jantung Bintaro.",
    contactTitle: "Buat pesan reservasi yang rapi.",
    contactBody:
      "Pilih layanan, isi nama dan preferensi jadwal, lalu lanjutkan ke WhatsApp dengan pesan yang sudah terformat.",
    namePlaceholder: "Nama Anda",
    schedulePlaceholder: "Contoh: Rabu sore / Sabtu jam 11",
    messageCta: "Chat via WhatsApp",
    quizLabel: "Fear Meter",
    quizTitle: "Seberapa cemas Anda ke dokter gigi?",
    quizBody:
      "Jawab 3 pertanyaan singkat. Kami akan bantu arahkan pesan yang lebih empatik untuk konsultasi awal.",
    quizFear: "Tingkat kecemasan",
    quizBadExperience: "Pernah punya pengalaman buruk?",
    quizConcern: "Kekhawatiran utama",
    yes: "Ya",
    no: "Tidak",
    pain: "Rasa sakit",
    cost: "Biaya",
    time: "Waktu tindakan",
    resultLow: "Anda tampak cukup siap. Konsultasi awal dapat difokuskan pada tujuan perawatan dan jadwal.",
    resultMid:
      "Ada sedikit kecemasan yang wajar. Sampaikan kekhawatiran Anda agar dokter bisa menjelaskan tahapan dengan jelas.",
    resultHigh:
      "Kecemasan Anda perlu diperhatikan sejak awal. Tim dapat membantu menjelaskan opsi painless dan ritme perawatan yang lebih nyaman.",
    analyzerLabel: "Smile Analyzer",
    analyzerTitle: "Upload foto senyum untuk arahan awal.",
    analyzerBody:
      "Fitur ini adalah stub v1. Foto hanya dipreview di perangkat Anda dan tidak dikirim ke server.",
    analyzerDisclaimer:
      "Bukan diagnosis medis. Rekomendasi ini hanya arahan awal dan harus dikonsultasikan dengan dokter Arcade Dental.",
    concernLabel: "Fokus perhatian",
    chooseFile: "Pilih foto",
    beforeAfterLabel: "Smile Preview",
    beforeAfterTitle: "Preview transformasi estetika.",
    before: "Sebelum",
    after: "Sesudah",
    finalTitle: "Siap untuk Senyummu yang Terbaik?",
    finalBody:
      "Buat janji sekarang dan konsultasikan kondisi gigimu dengan dokter Arcade Dental. Senin-Sabtu, 10:00-20:00 WIB.",
    formReservation: "Isi Form Reservasi",
    googleReviews: "Lihat semua ulasan di Google",
    close: "Tutup",
  },
  en: {
    language: "ID",
    book: "Book Now",
    aboutLabel: "About Arcade Dental",
    aboutTitle: "More Than a Dental Clinic.",
    aboutBody:
      "Arcade Dental is located in Bintaro Jaya Sector 7 as a specialist clinic that believes dental care should not feel intimidating. We combine doctor expertise, modern dental technology, and a comfortable, personal, comprehensive experience.",
    servicesLabel: "Services",
    servicesTitle: "Complete solutions for every smile need.",
    servicesBody:
      "From healing and restoration to aesthetics, choose the category that best matches your needs.",
    matcherLabel: "Treatment Matcher",
    matcherTitle: "Choose your smile goal, we map the path.",
    matcherBody:
      "This matcher is not a medical diagnosis, but it helps make the first consultation more focused.",
    matcherCta: "Consult this path",
    journeyLabel: "Signature Care Journey",
    journeyTitle: "Every visit has a clear rhythm.",
    journeyBody:
      "From first anxiety to aftercare, the experience is designed so patients understand what is happening and what comes next.",
    whyLabel: "Why Arcade Dental",
    whyTitle: "Care designed to feel calmer, clearer, and personal.",
    techLabel: "Tech Lab",
    techTitle: "Clinic technology made easier to understand.",
    techBody:
      "Modern devices help doctors read details, maintain sterilization, and plan more precise treatment.",
    doctorsLabel: "Doctor Team",
    doctorsTitle: "Guided by doctors in their respective fields.",
    doctorsBody:
      "Our experienced specialists are ready to deliver the best care for your needs.",
    testimonialsLabel: "Testimonials",
    testimonialsTitle: "Patient stories from real care experiences.",
    galleryLabel: "Gallery",
    galleryTitle: "A premium clinic that still feels warm.",
    galleryBody:
      "Local dummy assets keep the visual direction consistent without relying on external URLs.",
    insuranceLabel: "Insurance",
    insuranceTitle: "Official BCA Life provider.",
    insuranceBody:
      "Arcade Dental is listed as Klinik Utama Arcade Dental in the BCA Life provider network. Confirm your insurance benefits with the admin team before visiting.",
    locationLabel: "Location & Contact",
    locationTitle: "Easy to find in the heart of Bintaro.",
    contactTitle: "Create a clear reservation message.",
    contactBody:
      "Choose a service, enter your name and preferred schedule, then continue to WhatsApp with a formatted message.",
    namePlaceholder: "Your name",
    schedulePlaceholder: "Example: Wednesday afternoon / Saturday 11 AM",
    messageCta: "Chat via WhatsApp",
    quizLabel: "Fear Meter",
    quizTitle: "How anxious are you about dental visits?",
    quizBody:
      "Answer 3 quick questions. We will help shape a more empathetic first consultation message.",
    quizFear: "Anxiety level",
    quizBadExperience: "Had a bad experience before?",
    quizConcern: "Main concern",
    yes: "Yes",
    no: "No",
    pain: "Pain",
    cost: "Cost",
    time: "Procedure time",
    resultLow: "You seem ready. The first consultation can focus on your care goals and schedule.",
    resultMid:
      "Some anxiety is normal. Share your concern so the doctor can explain each step clearly.",
    resultHigh:
      "Your anxiety should be addressed from the start. The team can explain painless options and a more comfortable care rhythm.",
    analyzerLabel: "Smile Analyzer",
    analyzerTitle: "Upload a smile photo for early guidance.",
    analyzerBody:
      "This is a v1 stub. The photo is previewed only on your device and is not sent to a server.",
    analyzerDisclaimer:
      "Not a medical diagnosis. This recommendation is only early guidance and must be discussed with an Arcade Dental doctor.",
    concernLabel: "Focus area",
    chooseFile: "Choose photo",
    beforeAfterLabel: "Smile Preview",
    beforeAfterTitle: "Aesthetic transformation preview.",
    before: "Before",
    after: "After",
    finalTitle: "Ready for Your Best Smile?",
    finalBody:
      "Book now and consult your dental condition with Arcade Dental's doctors. Monday-Saturday, 10:00-20:00 WIB.",
    formReservation: "Reservation Form",
    googleReviews: "View all Google reviews",
    close: "Close",
  },
} satisfies Record<Language, Record<string, string>>;

const doctorColors = [
  { bg: "from-emerald-100 to-teal-200", text: "text-teal-800" },
  { bg: "from-violet-100 to-purple-200", text: "text-purple-800" },
  { bg: "from-amber-100 to-yellow-200", text: "text-amber-800" },
  { bg: "from-sky-100 to-blue-200", text: "text-blue-800" },
  { bg: "from-rose-100 to-pink-200", text: "text-rose-800" },
  { bg: "from-lime-100 to-green-200", text: "text-green-800" },
  { bg: "from-orange-100 to-red-100", text: "text-orange-800" },
];

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    align: (
      <>
        <path d="M6 7c2 2 10 2 12 0" />
        <path d="M6 12c2 2 10 2 12 0" />
        <path d="M6 17c2 2 10 2 12 0" />
        <path d="M8 5v14M16 5v14" />
      </>
    ),
    implant: (
      <>
        <path d="M12 3c3 0 5 2 5 5 0 4-3 5-3 9 0 2-1 4-2 4s-2-2-2-4c0-4-3-5-3-9 0-3 2-5 5-5Z" />
        <path d="M9 12h6M10 16h4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.6 5.1L19 10l-5.4 1.9L12 17l-1.6-5.1L5 10l5.4-1.9L12 3Z" />
        <path d="m5 16 .7 2.3L8 19l-2.3.7L5 22l-.7-2.3L2 19l2.3-.7L5 16Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    child: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21c1.5-4 12.5-4 14 0" />
        <path d="M9 8h.01M15 8h.01" />
      </>
    ),
    surgery: (
      <>
        <path d="M4 20 18 6" />
        <path d="m14 4 6 6" />
        <path d="M6 18h6" />
        <path d="M4 14h4" />
      </>
    ),
    scope: (
      <>
        <circle cx="10" cy="10" r="5" />
        <path d="m14 14 6 6" />
        <path d="M8 10h4M10 8v4" />
      </>
    ),
    sterile: (
      <>
        <path d="M7 3h10v7a5 5 0 0 1-10 0V3Z" />
        <path d="M9 7h6M12 4v6" />
        <path d="M12 15v6M8 21h8" />
      </>
    ),
    light: (
      <>
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    xray: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    motor: (
      <>
        <path d="M5 13h10l4-4v10l-4-4H5v-2Z" />
        <path d="M7 9h5M7 17h5" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    message: (
      <>
        <path d="M5 5h14v10H8l-3 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    map: (
      <>
        <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M16.5 7.5h.01" />
      </>
    ),
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    star: <path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3Z" />,
    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </>
    ),
    language: (
      <>
        <path d="M4 5h9M9 3v2c0 5-2 8-5 10" />
        <path d="M6 9c1 3 4 5 7 6" />
        <path d="M14 21l4-9 4 9M15.5 18h5" />
      </>
    ),
    heart: <path d="M20 8.5c0 5.5-8 10.5-8 10.5S4 14 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />,
    phone: <path d="M6.5 4h4l1.5 4-2.5 1.5a12 12 0 0 0 5 5L16 12l4 1.5v4c0 1-1 2-2 2C10 19.5 4.5 14 4.5 6c0-1 1-2 2-2Z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    check: (
      <>
        <path d="M20 6 9 17l-5-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
    scan: (
      <>
        <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2" />
        <path d="M7 12h10" />
        <path d="M9 9h6M9 15h6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className || "h-6 w-6"}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={`gs-reveal mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-gold" : ""}`}>{eyebrow}</p>
      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${dark ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-4 text-base leading-7 ${dark ? "text-white/70" : "text-secondary"}`}>{body}</p>
      ) : null}
    </div>
  );
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => word !== "drg.")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function ArcadeDentalSite() {
  const [lang, setLang] = useState<Language>("id");
  const [languageReady, setLanguageReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [matcherId, setMatcherId] = useState(treatmentMatcher[0].id);
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [quizFear, setQuizFear] = useState(3);
  const [badExperience, setBadExperience] = useState(false);
  const [quizConcern, setQuizConcern] = useState<"pain" | "cost" | "time">("pain");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [pausedCarousel, setPausedCarousel] = useState(false);
  const [sliderValue, setSliderValue] = useState(52);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [smileConcern, setSmileConcern] = useState(smileConcerns[0].id);
  const [preview, setPreview] = useState<string | null>(null);

  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const t = (localized: LocalizedText) => localized[lang];
  const c = copy[lang];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem("arcade-dental-language");
      if (stored === "id" || stored === "en") {
        setLang(stored);
      }
      setLanguageReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    window.localStorage.setItem("arcade-dental-language", lang);
  }, [lang, languageReady]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowFloating(window.scrollY > 380);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pausedCarousel) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [pausedCarousel]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!languageReady) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = mainRef.current;
    if (!root) return;

    if (reduceMotion) {
      gsap.set(root.querySelectorAll(".gs-word, .gs-sub, .hero-title-word, .hero-chip, .gs-reveal, .gs-card, .gs-counter"), {
        clearProps: "all",
        opacity: 1,
      });
      return;
    }

    const cleanupFns: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".hero-title-word", { opacity: 0, y: 46, rotateX: -16 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.08 })
        .fromTo(".gs-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.35")
        .fromTo(".hero-chip", { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 }, "-=0.35");

      ScrollTrigger.batch(".gs-reveal, .gs-card", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.72,
            stagger: 0.07,
            ease: "power2.out",
          });
        },
      });

      root.querySelectorAll<HTMLElement>(".gs-counter").forEach((element) => {
        const target = Number(element.dataset.count ?? "0");
        const suffix = element.dataset.suffix ?? "";
        gsap.fromTo(
          element,
          { innerText: "0" },
          {
            innerText: target,
            duration: 1.25,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate() {
              element.textContent = `${Math.round(Number(element.innerText))}${suffix}`;
            },
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      if (journeyRef.current && window.innerWidth >= 1024) {
        const progress = root.querySelector<HTMLElement>(".journey-progress-bar");
        ScrollTrigger.create({
          trigger: journeyRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.6}`,
          pin: ".journey-pin",
          scrub: 0.35,
          onUpdate(self) {
            const index = Math.min(careJourney.length - 1, Math.floor(self.progress * careJourney.length));
            setActiveJourney(index);
            if (progress) {
              gsap.to(progress, { scaleX: self.progress, duration: 0.12, overwrite: true, ease: "none" });
            }
          },
        });

        gsap.to(".journey-image", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      } else {
        gsap.set(".journey-progress-bar", { scaleX: 1 });
      }

      gsap.to(".tech-diagnostic-line", {
        xPercent: 120,
        repeat: -1,
        duration: 3.6,
        ease: "power1.inOut",
        yoyo: true,
      });

      gsap.to(".gallery-marquee-track", {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      const tiltCards = root.querySelectorAll<HTMLElement>(".tilt-card");
      tiltCards.forEach((card) => {
        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = ((y / rect.height) - 0.5) * -7;
          gsap.to(card, { rotateX, rotateY, transformPerspective: 800, duration: 0.35, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }, root);

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [languageReady]);

  const filteredServices = useMemo(
    () => services.filter((service) => serviceFilter === "all" || service.category === serviceFilter),
    [serviceFilter],
  );

  const selectedServiceTitle = t(services.find((service) => service.id === selectedService)?.title ?? services[0].title);
  const selectedSmileConcern = smileConcerns.find((concern) => concern.id === smileConcern) ?? smileConcerns[0];
  const selectedMatcher = treatmentMatcher.find((item) => item.id === matcherId) ?? treatmentMatcher[0];
  const quizScore = quizFear + (badExperience ? 2 : 0) + (quizConcern === "pain" ? 1 : 0);
  const quizResult = quizScore >= 6 ? c.resultHigh : quizScore >= 4 ? c.resultMid : c.resultLow;
  const smartMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin membuat janji untuk ${selectedServiceTitle}.\nNama: ${patientName || "..."}\nPreferensi jadwal: ${schedule || "..."}`
      : `Hello Arcade Dental, I would like to book an appointment for ${selectedServiceTitle}.\nName: ${patientName || "..."}\nPreferred schedule: ${schedule || "..."}`;
  const quizMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin konsultasi. Tingkat cemas saya ${quizFear}/5, kekhawatiran utama saya ${c[quizConcern]}. ${quizResult}`
      : `Hello Arcade Dental, I would like to consult. My anxiety level is ${quizFear}/5, and my main concern is ${c[quizConcern]}. ${quizResult}`;
  const matcherMessage =
    lang === "id"
      ? `Halo Arcade Dental, saya ingin konsultasi untuk: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`
      : `Hello Arcade Dental, I would like to consult for: ${t(selectedMatcher.label)}. ${t(selectedMatcher.result)}`;

  function toggleLanguage() {
    setLang((current) => {
      const next = current === "id" ? "en" : "id";
      window.localStorage.setItem("arcade-dental-language", next);
      return next;
    });
  }

  function handleMatcherSelect(id: string, serviceId: string) {
    setMatcherId(id);
    setSelectedService(serviceId);
  }

  function handleSmartSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(buildWhatsAppUrl(smartMessage), "_blank", "noopener,noreferrer");
  }

  function handlePreview(file: File | undefined) {
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-surface text-primary"
      style={{ visibility: languageReady ? "visible" : "hidden" }}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-lg shadow-primary/10 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <span className={`grid h-11 w-11 place-items-center rounded-lg border ${scrolled ? "border-primary/10 bg-primary text-gold" : "border-white/20 bg-white/10 text-gold backdrop-blur"}`}>
              <Icon name="spark" className="h-5 w-5" />
            </span>
            <span>
              <span className={`block font-display text-xl leading-none ${scrolled ? "text-primary" : "text-white"}`}>{business.name}</span>
              <span className={`hidden text-[10px] font-bold uppercase tracking-[0.24em] md:block ${scrolled ? "text-secondary" : "text-white/58"}`}>
                Bintaro - Spesialis
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  scrolled ? "text-primary/68 hover:bg-primary/5 hover:text-primary" : "text-white/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              className={`hidden min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-bold shadow-sm backdrop-blur md:inline-flex ${
                scrolled ? "border-primary/10 bg-white text-primary" : "border-white/20 bg-white/10 text-white"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t(heroCopy.status)}
            </span>
            <button
              type="button"
              onClick={toggleLanguage}
              className={`icon-button ${scrolled ? "" : "border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"}`}
              aria-label="Switch language"
            >
              <Icon name="language" className="h-4 w-4" />
              <span className="text-xs font-bold">{c.language}</span>
            </button>
            <a
              href={buildWhatsAppUrl(smartMessage)}
              className={`hidden min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5 sm:inline-flex ${
                scrolled ? "bg-cta text-white shadow-cta/20 hover:bg-primary" : "bg-gold text-primary shadow-black/20 hover:bg-white"
              }`}
            >
              <Icon name="message" className="h-4 w-4" />
              {c.book}
            </a>
          </div>
        </div>
      </header>

      <section id="hero" ref={heroRef} className="relative isolate min-h-[92vh] overflow-hidden bg-primary pt-24 text-white">
        <video
          aria-hidden="true"
          autoPlay
          className="hero-video absolute inset-0 h-full w-full object-cover object-[57%_center] md:object-center"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/assets/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/58 md:bg-primary/22" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,21,32,0.84)_0%,rgba(13,21,32,0.58)_37%,rgba(13,21,32,0.14)_68%,rgba(13,21,32,0.28)_100%)]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(circle_at_18%_42%,rgba(200,169,110,0.34),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(232,244,240,0.16),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-center px-5 pb-16 pt-8 md:px-8 lg:pb-20 lg:pt-12">
          <div ref={heroTextRef} className="max-w-3xl" style={{ perspective: "900px" }}>
            <p className="gs-sub eyebrow text-gold">{t(heroCopy.eyebrow)}</p>
            <h1 className="mt-3 max-w-3xl font-display leading-[0.96] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.32)]">
              {t(heroCopy.title)
                .split(" ")
                .map((word, i) => (
                  <span key={`${word}-${i}`} className="hero-title-word inline-block pr-[0.22em] text-5xl md:text-6xl lg:text-7xl">
                    {word}
                  </span>
                ))}
            </h1>
            <p className="gs-sub mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{t(heroCopy.description)}</p>
            <div className="gs-sub mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="magnetic-cta group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-7 text-base font-bold text-primary shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl">
                <Icon name="calendar" className="h-5 w-5" />
                {t(heroCopy.primaryCta)}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </a>
              <a href="#services" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-base font-bold text-white shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-white/16">
                {t(heroCopy.secondaryCta)}
              </a>
            </div>
            <div className="gs-sub mt-8 flex flex-wrap gap-2.5">
              {trustBadges.map((badge) => (
                <span key={badge.id} className="hero-chip inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/90 shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {badge[lang]}
                </span>
              ))}
            </div>
            <p className="gs-sub mt-8 font-accent text-xs font-bold uppercase tracking-[0.32em] text-gold">{business.hashtag}</p>
          </div>
        </div>

        <div className="relative h-20 overflow-hidden">
          <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#1a2332" />
          </svg>
        </div>
      </section>

      <section id="about" className="bg-primary py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="gs-reveal">
            <p className="eyebrow text-gold">{c.aboutLabel}</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{c.aboutTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-white/72">{c.aboutBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => {
              const numeric = stat.value.match(/^(\d+)(.*)$/);
              return (
                <div key={stat.label.id} className="gs-card rounded-lg border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
                  <div className="font-display text-5xl text-gold">
                    {numeric ? (
                      <span className="gs-counter" data-count={numeric[1]} data-suffix={numeric[2]}>
                        0{numeric[2]}
                      </span>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white/70">{t(stat.label)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.servicesLabel} title={c.servicesTitle} body={c.servicesBody} />

          <div className="gs-reveal mb-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="rounded-lg border border-primary/8 bg-white p-6 shadow-xl shadow-primary/8">
              <p className="eyebrow">{c.matcherLabel}</p>
              <h3 className="font-display text-3xl leading-tight text-primary">{c.matcherTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{c.matcherBody}</p>
              <div className="mt-6 grid gap-2">
                {treatmentMatcher.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleMatcherSelect(option.id, option.serviceId)}
                    className={`group flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 text-left text-sm font-bold transition-all ${
                      matcherId === option.id
                        ? "border-cta bg-highlight text-primary shadow-sm"
                        : "border-primary/8 bg-white text-primary/66 hover:border-gold/70 hover:text-primary"
                    }`}
                  >
                    {t(option.label)}
                    <Icon name={matcherId === option.id ? "check" : "chevron"} className="h-4 w-4 text-cta" />
                  </button>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-primary p-6 text-white shadow-2xl shadow-primary/16">
              <Image src={siteAssets.techTexture} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-25" />
              <div className="absolute inset-0 bg-primary/76" />
              <div className="relative grid h-full gap-5 md:grid-cols-[0.75fr_1fr] md:items-center">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                  <Image src={siteAssets.smileTransform} alt={c.beforeAfterTitle} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                </div>
                <div>
                  <p className="eyebrow text-gold">{t(selectedMatcher.label)}</p>
                  <p className="text-lg leading-8 text-white/80">{t(selectedMatcher.result)}</p>
                  <a href={buildWhatsAppUrl(matcherMessage)} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-white">
                    <Icon name="message" className="h-5 w-5" />
                    {c.matcherCta}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mb-10 flex max-w-3xl gap-2 overflow-x-auto rounded-full border border-primary/10 bg-white/80 p-2 shadow-sm backdrop-blur no-scrollbar" role="tablist">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={serviceFilter === category.id}
                onClick={() => setServiceFilter(category.id)}
                className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-5 text-sm font-bold transition-all duration-200 ${
                  serviceFilter === category.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-primary/65 hover:bg-surface-2 hover:text-primary"
                }`}
              >
                {t(category.label)}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => (
              <article key={service.id} className="gs-card tilt-card reveal-card group min-h-[220px]">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-highlight text-cta transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:shadow-lg group-hover:shadow-cta/20">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-primary">{t(service.title)}</h3>
                <p className="mt-2.5 text-sm leading-6 text-secondary">{t(service.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" ref={journeyRef} className="relative bg-surface-2">
        <div className="journey-pin min-h-screen overflow-hidden py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="gs-reveal">
              <p className="eyebrow">{c.journeyLabel}</p>
              <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.journeyTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-secondary">{c.journeyBody}</p>
              <div className="mt-8 h-1 overflow-hidden rounded-full bg-primary/10">
                <div className="journey-progress-bar h-full origin-left scale-x-0 bg-gradient-to-r from-cta to-gold" />
              </div>
              <div className="mt-6 overflow-hidden rounded-lg border border-primary/8 bg-white shadow-xl shadow-primary/8">
                <div className="journey-image relative aspect-[4/3]">
                  <Image src={siteAssets.careJourney} alt="Arcade Dental consultation journey" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/62 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta">{careJourney[activeJourney].metric}</p>
                    <p className="font-display text-xl text-primary">{t(careJourney[activeJourney].title)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {careJourney.map((step, index) => (
                <article
                  key={step.id}
                  className={`journey-step gs-card grid gap-4 rounded-lg border p-5 transition-all duration-300 sm:grid-cols-[56px_1fr] ${
                    activeJourney === index
                      ? "border-gold bg-white shadow-xl shadow-primary/10"
                      : "border-primary/8 bg-white/70 shadow-sm"
                  }`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-lg ${activeJourney === index ? "bg-primary text-gold" : "bg-highlight text-cta"}`}>
                    <Icon name={step.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{t(step.eyebrow)}</p>
                    <h3 className="mt-1 font-display text-2xl text-primary">{t(step.title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-secondary">{t(step.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(90deg,#1a2332_1px,transparent_1px),linear-gradient(#1a2332_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.whyLabel} title={c.whyTitle} />
          <div className="grid gap-5 lg:grid-cols-2">
            {whyUs.map((item, index) => (
              <article key={item.title.id} className="gs-card group grid gap-5 rounded-lg border border-primary/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/8 sm:grid-cols-[88px_1fr]">
                <div className="font-display text-6xl font-bold text-gold/50 transition-colors duration-300 group-hover:text-gold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-primary">{t(item.title)}</h3>
                  <p className="mt-2.5 leading-7 text-secondary">{t(item.description)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
        <Image src={siteAssets.techTexture} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/82" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.techLabel} title={c.techTitle} body={c.techBody} dark />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="gs-reveal relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20">
              <Image src={siteAssets.techLab} alt="Arcade Dental technology lab" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/22 to-transparent" />
              <div className="tech-diagnostic-line absolute bottom-0 top-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(200,169,110,0.24),transparent)]" />
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {techMetrics.map((metric) => {
                  const numeric = metric.value.match(/^(\d+)(.*)$/);
                  return (
                    <div key={metric.label.id} className="rounded-lg border border-white/12 bg-primary/62 p-4 backdrop-blur">
                      <p className="font-display text-4xl text-gold">
                        {numeric ? (
                          <span className="gs-counter" data-count={numeric[1]} data-suffix={numeric[2]}>
                            0{numeric[2]}
                          </span>
                        ) : (
                          metric.value
                        )}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/58">{t(metric.label)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-3">
              {technologies.map((technology, index) => (
                <button
                  key={technology.title}
                  type="button"
                  onMouseEnter={() => setActiveTech(index)}
                  onFocus={() => setActiveTech(index)}
                  className={`gs-card group grid gap-4 rounded-lg border p-5 text-left transition-all sm:grid-cols-[56px_1fr] ${
                    activeTech === index ? "border-gold bg-white text-primary shadow-xl shadow-gold/10" : "border-white/10 bg-white/[0.06] text-white hover:border-gold/40 hover:bg-white/[0.10]"
                  }`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-lg ${activeTech === index ? "bg-primary text-gold" : "bg-gold text-primary"}`}>
                    <Icon name={technology.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-display text-2xl ${activeTech === index ? "text-primary" : "text-white"}`}>{technology.title}</h3>
                    <p className={`mt-2 text-sm leading-6 ${activeTech === index ? "text-primary/68" : "text-white/62"}`}>{t(technology.benefit)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="doctors" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.doctorsLabel} title={c.doctorsTitle} body={c.doctorsBody} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor, index) => {
              const colorSet = doctorColors[index % doctorColors.length];
              return (
                <article key={doctor.name} className="gs-card doctor-card group rounded-lg border border-primary/8 bg-white p-6 shadow-sm">
                  <div className={`mx-auto grid h-28 w-28 place-items-center rounded-lg bg-gradient-to-br ${colorSet.bg} shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                    <span className={`font-display text-3xl font-bold ${colorSet.text}`}>{getInitials(doctor.name)}</span>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-xl leading-snug text-primary">{doctor.name}</h3>
                    <span className="mt-2 inline-block rounded-full bg-highlight px-3 py-1 text-xs font-bold text-cta">{t(doctor.role)}</span>
                    <p className="mt-3 text-xs leading-5 text-secondary">{t(doctor.availability)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="bg-[linear-gradient(145deg,#e8f4f0,#f0ece6)] py-20 md:py-28"
        onMouseEnter={() => setPausedCarousel(true)}
        onMouseLeave={() => setPausedCarousel(false)}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.testimonialsLabel} title={c.testimonialsTitle} />
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`gs-card rounded-lg border bg-white p-7 shadow-sm transition-all duration-500 ${
                  testimonialIndex === index ? "-translate-y-1 border-gold shadow-xl shadow-primary/10" : "border-primary/8"
                }`}
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Icon key={star} name="star" className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 min-h-28 text-base leading-7 text-primary/75">
                  <span className="text-gold/70">&ldquo;</span>
                  {t(testimonial.quote)}
                  <span className="text-gold/70">&rdquo;</span>
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-primary/6 pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-gold">
                    <Icon name="heart" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Google Review</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2.5">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setTestimonialIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${testimonialIndex === index ? "w-10 bg-cta" : "w-2.5 bg-primary/20 hover:bg-primary/30"}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://www.google.com/search?q=Arcade+Dental+Bintaro+reviews" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cta/20 bg-white/70 px-5 py-3 text-sm font-bold text-cta shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md">
              {c.googleReviews}
              <Icon name="chevron" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.galleryLabel} title={c.galleryTitle} body={c.galleryBody} />
          <div className="grid gap-4 md:grid-cols-4">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setGalleryIndex(index)}
                className={`gs-card group relative overflow-hidden rounded-lg border border-primary/8 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
                  index === 0 || index === 3 ? "md:col-span-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <Image src={item.src} alt={t(item.alt)} width={900} height={620} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-108" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/62 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-bold text-primary shadow-lg backdrop-blur transition-all duration-300 group-hover:bg-white">
                  {t(item.label)}
                </span>
                <span className="absolute right-4 top-4 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Icon name="scope" className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 overflow-hidden border-y border-primary/8 bg-white/60 py-4">
          <div className="gallery-marquee-track flex w-[200%] gap-4">
            {[...gallery, ...gallery].map((item, index) => (
              <div key={`${item.src}-${index}`} className="relative h-24 w-44 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.src} alt="" fill sizes="176px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="insurance" className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div className="gs-reveal rounded-lg border border-primary/8 bg-white p-8 shadow-xl shadow-primary/8">
            <p className="eyebrow">{c.insuranceLabel}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-[#0b4ea2]/12 bg-gradient-to-br from-white to-blue-50/50 px-7 py-5 shadow-sm">
              <span className="font-display text-4xl font-black tracking-tight text-[#0b4ea2]">BCA</span>
              <div className="h-8 w-px bg-primary/10" />
              <span className="text-2xl font-bold text-[#2ca3dc]">Life</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-secondary">{c.insuranceBody}</p>
          </div>
          <div className="gs-reveal">
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.insuranceTitle}</h2>
            <a href="#contact" className="mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-primary px-7 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta hover:shadow-xl">
              <Icon name="shield" className="h-5 w-5" />
              {lang === "id" ? "Cek Asuransi Saya" : "Check My Insurance"}
            </a>
          </div>
        </div>
      </section>

      <section id="engagement" className="bg-primary py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-3">
          <article className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
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

          <article className="gs-card rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="eyebrow text-gold">{c.beforeAfterLabel}</p>
            <h2 className="font-display text-3xl leading-tight">{c.beforeAfterTitle}</h2>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-white/12">
              <Image src={siteAssets.smileTransform} alt={c.before} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-left" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
                <div className="relative h-full w-[720px] max-w-none">
                  <Image src={siteAssets.smileTransform} alt={c.after} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-right" />
                </div>
              </div>
              <div className="absolute inset-y-0 z-10 flex items-center justify-center" style={{ left: `calc(${sliderValue}% - 1px)` }}>
                <div className="h-full w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                <div className="absolute grid h-9 w-9 place-items-center rounded-full bg-white shadow-xl">
                  <Icon name="arrow" className="h-4 w-4 text-primary" />
                </div>
              </div>
              <span className="absolute left-3 top-3 z-10 rounded-full bg-cta/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.after}</span>
              <span className="absolute right-3 top-3 z-10 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.before}</span>
            </div>
            <label className="sr-only" htmlFor="before-after-slider">{c.beforeAfterLabel}</label>
            <input id="before-after-slider" type="range" min="10" max="90" value={sliderValue} onChange={(event) => setSliderValue(Number(event.target.value))} className="mt-5 w-full accent-gold" />
          </article>
        </div>
      </section>

      <section id="location" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.locationLabel} title={c.locationTitle} />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <div className="gs-reveal overflow-hidden rounded-lg border border-primary/8 bg-white shadow-xl shadow-primary/8">
              <iframe title="Google Maps Arcade Dental Bintaro" src="https://www.google.com/maps?q=Arcade%20Dental%20Bintaro%20Kebayoran%20Arcade%202&output=embed" width="100%" height="460" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block border-0" allowFullScreen />
            </div>
            <div className="grid content-start gap-4">
              <div className="gs-card rounded-lg border border-primary/8 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-highlight text-cta"><Icon name="map" className="h-6 w-6" /></div>
                  <h3 className="font-display text-2xl text-primary">Arcade Dental</h3>
                </div>
                <p className="mt-4 leading-7 text-secondary">{business.address}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <a href={`tel:${business.phoneDisplay.replace(/\s|-/g, "")}`} className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
                  <Icon name="phone" className="h-6 w-6 text-cta" />
                  <p className="mt-4 text-sm font-bold text-primary">{business.phoneDisplay}</p>
                  <p className="text-xs text-secondary">Telp / WA</p>
                </a>
                <a href={business.instagram} target="_blank" rel="noreferrer" className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
                  <Icon name="instagram" className="h-6 w-6 text-cta" />
                  <p className="mt-4 text-sm font-bold text-primary">@arcade_dental</p>
                  <p className="text-xs text-secondary">Instagram</p>
                </a>
              </div>
              <div className="gs-card rounded-lg border border-primary/8 bg-white p-5 shadow-sm">
                <Icon name="clock" className="h-6 w-6 text-cta" />
                <p className="mt-4 text-sm font-bold text-primary">{business.hours[lang]}</p>
                <p className="text-xs text-secondary">{lang === "id" ? "Jam operasional" : "Operating hours"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div className="gs-reveal">
            <p className="eyebrow">{c.locationLabel}</p>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.contactTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-secondary">{c.contactBody}</p>
            <div className="mt-8 flex flex-col gap-3">
              {([
                { icon: "shield" as const, text: lang === "id" ? "Rekanan resmi BCA Life" : "Official BCA Life partner" },
                { icon: "spark" as const, text: lang === "id" ? "Teknologi painless terkini" : "Latest painless technology" },
                { icon: "calendar" as const, text: business.hours[lang] },
              ] as const).map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-secondary">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-highlight text-cta"><Icon name={item.icon} className="h-4 w-4" /></div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSmartSubmit} className="gs-reveal rounded-lg border border-primary/8 bg-white p-7 shadow-xl shadow-primary/8">
            <label className="form-label" htmlFor="service-select">{c.servicesLabel}</label>
            <select id="service-select" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="form-control">
              {services.map((service) => (
                <option key={service.id} value={service.id}>{t(service.title)}</option>
              ))}
            </select>
            <label className="form-label mt-5" htmlFor="patient-name">{lang === "id" ? "Nama" : "Name"}</label>
            <input id="patient-name" value={patientName} onChange={(event) => setPatientName(event.target.value)} className="form-control" placeholder={c.namePlaceholder} />
            <label className="form-label mt-5" htmlFor="schedule">{lang === "id" ? "Preferensi jadwal" : "Preferred schedule"}</label>
            <input id="schedule" value={schedule} onChange={(event) => setSchedule(event.target.value)} className="form-control" placeholder={c.schedulePlaceholder} />
            <div className="mt-5 rounded-lg bg-highlight p-4">
              <p className="whitespace-pre-line text-sm leading-6 text-primary/80">{smartMessage}</p>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-cta px-6 font-bold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl">
              <Icon name="message" className="h-5 w-5" />
              {c.messageCta}
            </button>
          </form>
        </div>
      </section>

      <section ref={ctaRef} id="booking-cta" className="relative overflow-hidden bg-primary px-5 py-16 text-white md:px-8 md:py-24">
        <Image src={siteAssets.techTexture} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-primary/82" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="gs-reveal">
            <p className="eyebrow text-gold">{business.hashtag}</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{c.finalTitle}</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">{c.finalBody}</p>
          </div>
          <div className="gs-reveal flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={buildWhatsAppUrl(smartMessage)} className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-8 font-bold text-primary shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
              <Icon name="message" className="h-5 w-5" />
              WhatsApp
            </a>
            <a href="#contact" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-8 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold">
              {c.formReservation}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1520] px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-gold"><Icon name="spark" className="h-5 w-5" /></span>
              <h2 className="font-display text-2xl">{business.name}</h2>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{business.tagline[lang]}</p>
            <p className="mt-5 font-accent text-[10px] font-bold uppercase tracking-[0.28em] text-gold">{business.hashtag}</p>
            <div className="mt-5 flex gap-3">
              <a href={business.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="instagram" className="h-5 w-5" /></a>
              <a href={business.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="facebook" className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{c.locationLabel}</p>
            <p className="mt-4 text-sm leading-7 text-white/55">{business.address}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{lang === "id" ? "Kontak" : "Contact"}</p>
            <div className="mt-4 space-y-2.5 text-sm text-white/55">
              <p>{business.hours[lang]}</p>
              <a href={`tel:${business.phoneDisplay.replace(/\s|-/g, "")}`} className="block transition-colors hover:text-gold">{business.phoneDisplay}</a>
              <a href={`mailto:${business.email}`} className="block transition-colors hover:text-gold">{business.email}</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center">
          <p>(c) 2026 Arcade Dental. All rights reserved.</p>
          <a href={business.website} target="_blank" rel="noreferrer" className="hover:text-white/60">{business.website.replace("https://", "")}</a>
        </div>
      </footer>

      <a href={buildWhatsAppUrl(smartMessage)} className={`fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-cta px-5 font-bold text-white shadow-2xl shadow-cta/35 transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary ${showFloating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <Icon name="message" className="h-5 w-5" />
        <span className="hidden sm:inline">{c.book}</span>
      </a>

      {galleryIndex !== null ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-primary/90 p-5 backdrop-blur-md" role="dialog" aria-modal="true" onClick={() => setGalleryIndex(null)}>
          <button type="button" onClick={() => setGalleryIndex(null)} className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-xl transition-all duration-200 hover:bg-gold">
            {c.close} x
          </button>
          <div className="max-h-[88vh] max-w-5xl overflow-hidden rounded-lg bg-white p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Image src={gallery[galleryIndex].src} alt={t(gallery[galleryIndex].alt)} width={1200} height={820} className="max-h-[78vh] w-full rounded-lg object-contain" />
            <p className="px-2 py-3 text-center font-bold text-primary">{t(gallery[galleryIndex].label)}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
