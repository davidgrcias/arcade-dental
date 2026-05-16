"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  business,
  doctors,
  gallery,
  heroCopy,
  navItems,
  services,
  serviceCategories,
  smileConcerns,
  stats,
  technologies,
  testimonials,
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
  | "arrow";

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
    whyLabel: "Mengapa Arcade Dental",
    whyTitle: "Perawatan dibuat lebih tenang, jelas, dan personal.",
    techLabel: "Teknologi",
    techTitle: "5 teknologi mutakhir untuk perawatan yang lebih nyaman.",
    techBody:
      "Teknologi terdepan yang membantu dokter memberikan hasil terbaik dengan rasa sakit minimal.",
    doctorsLabel: "Tim Dokter",
    doctorsTitle: "Didampingi dokter ahli di bidangnya.",
    doctorsBody:
      "Tim spesialis berpengalaman siap memberikan perawatan terbaik sesuai kebutuhan Anda.",
    testimonialsLabel: "Testimoni",
    testimonialsTitle: "Cerita pasien yang sudah merasakan perawatan.",
    galleryLabel: "Galeri",
    galleryTitle: "Kunjungan yang terasa lebih hangat.",
    galleryBody:
      "Fasilitas modern dan ramah pasien untuk pengalaman dental yang nyaman.",
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
    beforeAfterLabel: "Before / After",
    beforeAfterTitle: "Preview hasil estetika.",
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
    whyLabel: "Why Arcade Dental",
    whyTitle: "Care designed to feel calmer, clearer, and personal.",
    techLabel: "Technology",
    techTitle: "5 modern technologies for more comfortable care.",
    techBody:
      "Leading technology that helps our doctors deliver the best results with minimal discomfort.",
    doctorsLabel: "Doctor Team",
    doctorsTitle: "Guided by doctors in their respective fields.",
    doctorsBody:
      "Our experienced specialists are ready to deliver the best care for your needs.",
    testimonialsLabel: "Testimonials",
    testimonialsTitle: "Patient stories from real care experiences.",
    galleryLabel: "Gallery",
    galleryTitle: "A warmer dental visit awaits.",
    galleryBody:
      "Modern, patient-friendly facilities for a comfortable dental experience.",
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
    beforeAfterLabel: "Before / After",
    beforeAfterTitle: "Aesthetic preview.",
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
    facebook: (
      <>
        <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    star: (
      <path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3Z" />
    ),
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
    heart: (
      <path d="M20 8.5c0 5.5-8 10.5-8 10.5S4 14 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
    ),
    phone: (
      <path d="M6.5 4h4l1.5 4-2.5 1.5a12 12 0 0 0 5 5L16 12l4 1.5v4c0 1-1 2-2 2C10 19.5 4.5 14 4.5 6c0-1 1-2 2-2Z" />
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
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
    <div className={`gs-heading mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-gold" : ""}`}>{eyebrow}</p>
      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${dark ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {body ? <p className={`mt-4 text-base leading-7 ${dark ? "text-white/70" : "text-secondary"}`}>{body}</p> : null}
    </div>
  );
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ─── Doctor Avatar Colors ─── */
const doctorColors = [
  { bg: "from-emerald-100 to-teal-200", text: "text-teal-800" },
  { bg: "from-violet-100 to-purple-200", text: "text-purple-800" },
  { bg: "from-amber-100 to-yellow-200", text: "text-amber-800" },
  { bg: "from-sky-100 to-blue-200", text: "text-blue-800" },
  { bg: "from-rose-100 to-pink-200", text: "text-rose-800" },
  { bg: "from-lime-100 to-green-200", text: "text-green-800" },
  { bg: "from-orange-100 to-red-100", text: "text-orange-800" },
];

export function ArcadeDentalSite() {
  const [lang, setLang] = useState<Language>("id");
  const [scrolled, setScrolled] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState(services[0].id);
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

  /* ── GSAP refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const doctorsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const t = (localized: LocalizedText) => localized[lang];
  const c = copy[lang];

  /* ── Persist language ── */
  useEffect(() => {
    const stored = window.localStorage.getItem("arcade-dental-language");
    if (stored === "id" || stored === "en") {
      window.requestAnimationFrame(() => setLang(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("arcade-dental-language", lang);
  }, [lang]);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowFloating(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Testimonial auto-advance ── */
  useEffect(() => {
    if (pausedCarousel) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [pausedCarousel]);

  /* ── Gallery keyboard close ── */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGalleryIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── Preview cleanup ── */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ────────────────────────────────────────────
     GSAP Animations
  ──────────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── Hero floating orbs ── */
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -28,
          x: 12,
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 22,
          x: -18,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        });
      }
      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          y: -16,
          x: 8,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.5,
        });
      }

      /* ── Hero text stagger ── */
      if (heroTextRef.current) {
        const words = heroTextRef.current.querySelectorAll(".gs-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: -12 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.3,
          }
        );
        const sub = heroTextRef.current.querySelectorAll(".gs-sub");
        gsap.fromTo(
          sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.8 }
        );
      }

      /* ── Hero image ── */
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { opacity: 0, scale: 0.93, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.5 }
        );
      }

      /* ── About section ── */
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.fromTo(
            aboutRef.current!.querySelectorAll(".gs-about-item"),
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
          );
          gsap.fromTo(
            aboutRef.current!.querySelectorAll(".gs-stat"),
            { opacity: 0, y: 24, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", delay: 0.3 }
          );
        },
      });

      /* ── Services cards ── */
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            servicesRef.current!.querySelectorAll(".gs-card"),
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: "power2.out" }
          );
        },
      });

      /* ── Why Us ── */
      ScrollTrigger.create({
        trigger: whyRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            whyRef.current!.querySelectorAll(".gs-why"),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
          );
        },
      });

      /* ── Technology ── */
      ScrollTrigger.create({
        trigger: techRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            techRef.current!.querySelectorAll(".gs-tech"),
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "back.out(1.4)" }
          );
        },
      });

      /* ── Doctors ── */
      ScrollTrigger.create({
        trigger: doctorsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            doctorsRef.current!.querySelectorAll(".gs-doctor"),
            { opacity: 0, y: 50, rotateY: 8 },
            { opacity: 1, y: 0, rotateY: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" }
          );
        },
      });

      /* ── Testimonials ── */
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.fromTo(
            testimonialsRef.current!.querySelectorAll(".gs-testi"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.15, ease: "power2.out" }
          );
        },
      });

      /* ── Gallery ── */
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.fromTo(
            galleryRef.current!.querySelectorAll(".gs-gallery"),
            { opacity: 0, scale: 0.92, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
          );
        },
      });

      /* ── CTA section ── */
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current!.querySelectorAll(".gs-cta"),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
          );
        },
      });

    });

    return () => ctx.revert();
  }, []);

  /* ── Computed values ── */
  const filteredServices = useMemo(
    () => services.filter((service) => serviceFilter === "all" || service.category === serviceFilter),
    [serviceFilter],
  );

  const selectedServiceTitle = t(services.find((service) => service.id === selectedService)?.title ?? services[0].title);
  const selectedSmileConcern = smileConcerns.find((concern) => concern.id === smileConcern) ?? smileConcerns[0];
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

  function toggleLanguage() {
    setLang((current) => (current === "id" ? "en" : "id"));
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

  /* ─────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen overflow-hidden bg-surface text-primary">

      {/* ══ NAV ══════════════════════════════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-primary/8 bg-surface/94 shadow-lg shadow-primary/5 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#hero" className="group flex items-center gap-3" aria-label="Arcade Dental home">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-gold shadow-lg shadow-primary/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <Icon name="spark" className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-xl leading-none tracking-normal text-primary">{business.name}</span>
              <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.3em] text-secondary sm:block">
                Bintaro · Spesialis
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative text-sm font-semibold text-primary/70 transition-colors duration-200 hover:text-cta"
              >
                {t(item.label)}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-cta/20 bg-highlight px-3 py-2 text-xs font-bold text-cta sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cta" />
              {t(heroCopy.status)}
            </div>
            <button
              type="button"
              onClick={toggleLanguage}
              className="icon-button"
              aria-label="Switch language"
            >
              <Icon name="language" className="h-4.5 w-4.5" />
              <span className="text-xs font-bold">{c.language}</span>
            </button>
            <a
              href={buildWhatsAppUrl(smartMessage)}
              className="hidden items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl sm:inline-flex"
            >
              <Icon name="message" className="h-4 w-4" />
              {c.book}
            </a>
          </div>
        </div>
      </header>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section id="hero" ref={heroRef} className="relative isolate min-h-[95vh] overflow-hidden pt-24">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(200,169,110,0.18),transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(45,125,107,0.12),transparent_45%),linear-gradient(160deg,#faf8f5_0%,#f0ece6_55%,#e8f4f0_100%)]" />

        {/* Floating decorative orbs */}
        <div ref={orb1Ref} className="pointer-events-none absolute right-[12%] top-[18%] -z-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div ref={orb2Ref} className="pointer-events-none absolute left-[8%] top-[35%] -z-10 h-80 w-80 rounded-full bg-cta/8 blur-3xl" />
        <div ref={orb3Ref} className="pointer-events-none absolute right-[28%] bottom-[20%] -z-10 h-48 w-48 rounded-full bg-gold/14 blur-2xl" />

        {/* Decorative grid dots */}
        <div className="pointer-events-none absolute left-0 top-24 -z-10 h-full w-full opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #1a2332 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 md:px-8 lg:grid-cols-[1fr_0.95fr] lg:pb-20 lg:pt-12">

          {/* ── Text side ── */}
          <div ref={heroTextRef} className="max-w-2xl" style={{ perspective: "800px" }}>
            <p className="gs-word eyebrow">{t(heroCopy.eyebrow)}</p>
            <h1 className="mt-3 font-display leading-[0.96] text-primary">
              {t(heroCopy.title).split(" ").map((word, i) => (
                <span key={i} className="gs-word inline-block pr-[0.22em] text-5xl md:text-6xl lg:text-7xl">
                  {word}
                </span>
              ))}
            </h1>
            <p className="gs-sub mt-7 max-w-xl text-lg leading-8 text-secondary md:text-xl">
              {t(heroCopy.description)}
            </p>
            <div className="gs-sub mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-cta px-7 text-base font-bold text-white shadow-xl shadow-cta/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-2xl"
              >
                <Icon name="calendar" className="h-5 w-5" />
                {t(heroCopy.primaryCta)}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#services"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-primary/12 bg-white/80 px-7 text-base font-bold text-primary shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
              >
                {t(heroCopy.secondaryCta)}
              </a>
            </div>
            <div className="gs-sub mt-8 flex flex-wrap gap-2.5">
              {trustBadges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-xs font-bold text-primary/80 shadow-sm backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cta" />
                  {badge[lang]}
                </span>
              ))}
            </div>
            <p className="gs-sub mt-8 font-accent text-xs font-bold uppercase tracking-[0.32em] text-gold">{business.hashtag}</p>
          </div>

          {/* ── Image side ── */}
          <div ref={heroImageRef} className="relative">
            {/* Floating badge: hours */}
            <div className="absolute -left-4 top-10 z-20 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-2xl shadow-primary/12 backdrop-blur md:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Buka setiap</p>
              <p className="mt-0.5 font-display text-2xl text-primary">{business.shortHours}</p>
              <p className="mt-0.5 text-xs font-semibold text-cta">Senin – Sabtu</p>
            </div>

            {/* Floating badge: rating */}
            <div className="absolute -right-3 bottom-16 z-20 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-2xl shadow-primary/12 backdrop-blur md:block">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current text-gold" />
                ))}
              </div>
              <p className="mt-1.5 text-sm font-bold text-primary">Google Reviews</p>
              <p className="text-xs text-secondary">Highly rated</p>
            </div>

            {/* Main image frame */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 p-3 shadow-2xl shadow-primary/20 backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=900&q=85&auto=format&fit=crop"
                  alt={lang === "id" ? "Perawatan dental modern di Arcade Dental Bintaro" : "Modern dental care at Arcade Dental Bintaro"}
                  width={760}
                  height={580}
                  priority
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Image overlay gradient */}
              <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>

            {/* Decorative ring */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full border-2 border-dashed border-gold/30" />
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full border border-cta/20" />
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-20 overflow-hidden">
          <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#1a2332" />
          </svg>
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════ */}
      <section id="about" ref={aboutRef} className="bg-primary py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div className="gs-about-item">
              <p className="eyebrow text-gold">{c.aboutLabel}</p>
              <h2 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">{c.aboutTitle}</h2>
            </div>
            <div className="gs-about-item">
              <p className="text-lg leading-8 text-white/72">{c.aboutBody}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "shield" as const, text: { id: "Dokter spesialis ahli", en: "Specialist doctors" } },
                  { icon: "spark" as const, text: { id: "Teknologi painless", en: "Painless technology" } },
                  { icon: "calendar" as const, text: { id: business.hours.id, en: business.hours.en } },
                ].map((item) => (
                  <div
                    key={item.text.id}
                    className="rounded-xl border border-white/10 bg-white/[0.07] p-5 transition-all duration-200 hover:border-gold/30 hover:bg-white/[0.1]"
                  >
                    <Icon name={item.icon} className="h-6 w-6 text-gold" />
                    <p className="mt-3 text-sm font-bold text-white/86">{t(item.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label.id}
                className="gs-stat group rounded-xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.1]"
              >
                <div className="font-display text-5xl text-gold">{stat.value}</div>
                <p className="mt-3 text-sm font-semibold text-white/70">{t(stat.label)}</p>
                <div className="mt-4 h-px w-0 bg-gold/50 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════ */}
      <section id="services" ref={servicesRef} className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.servicesLabel} title={c.servicesTitle} body={c.servicesBody} />

          {/* Filter tabs */}
          <div
            className="mx-auto mb-10 flex max-w-3xl gap-2 overflow-x-auto rounded-full border border-primary/10 bg-white/80 p-2 shadow-sm backdrop-blur no-scrollbar"
            role="tablist"
          >
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={serviceFilter === category.id}
                onClick={() => setServiceFilter(category.id)}
                className={`min-h-11 flex-1 whitespace-nowrap rounded-full px-5 text-sm font-bold transition-all duration-200 ${
                  serviceFilter === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-primary/65 hover:bg-surface-2 hover:text-primary"
                }`}
              >
                {t(category.label)}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => (
              <article key={service.id} className="gs-card reveal-card group min-h-[220px]">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-highlight text-cta transition-all duration-300 group-hover:bg-cta group-hover:text-white group-hover:shadow-lg group-hover:shadow-cta/20">
                  <Icon name={service.icon} className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-primary">{t(service.title)}</h3>
                <p className="mt-2.5 text-sm leading-6 text-secondary">{t(service.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════ */}
      <section id="why-us" ref={whyRef} className="relative overflow-hidden bg-surface-2 py-20 md:py-28">
        {/* Decorative element */}
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-bl-full bg-gold/5" />
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.whyLabel} title={c.whyTitle} />
          <div className="grid gap-5 lg:grid-cols-2">
            {whyUs.map((item, index) => (
              <article
                key={item.title.id}
                className="gs-why group grid gap-5 rounded-2xl border border-primary/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl hover:shadow-primary/8 sm:grid-cols-[88px_1fr]"
              >
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

      {/* ══ TECHNOLOGY ════════════════════════════════════ */}
      <section id="technology" ref={techRef} className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
        {/* Background rings */}
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4">
          <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[15%] rounded-full border border-gold/[0.12]" />
          <div className="absolute inset-[30%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[45%] rounded-full border border-gold/[0.14]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.techLabel} title={c.techTitle} body={c.techBody} dark />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((technology, index) => (
              <article
                key={technology.title}
                className={`gs-tech group rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.1] hover:shadow-2xl ${
                  index === 4 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="grid h-13 w-13 place-items-center rounded-xl bg-gold text-primary shadow-lg shadow-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <Icon name={technology.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-white">{technology.title}</h3>
                <p className="mt-2.5 leading-7 text-white/65">{t(technology.benefit)}</p>
                <div className="mt-5 flex items-center gap-2 text-gold/70 transition-colors duration-200 group-hover:text-gold">
                  <div className="h-px flex-1 bg-current opacity-30" />
                  <Icon name="spark" className="h-3 w-3" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOCTORS ═══════════════════════════════════════ */}
      <section id="doctors" ref={doctorsRef} className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.doctorsLabel} title={c.doctorsTitle} body={c.doctorsBody} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor, index) => {
              const colorSet = doctorColors[index % doctorColors.length];
              const initials = doctor.name
                .split(" ")
                .filter((w) => w !== "drg.")
                .slice(0, 2)
                .map((w) => w[0])
                .join("");
              return (
                <article
                  key={doctor.name}
                  className="gs-doctor doctor-card group rounded-2xl border border-primary/8 bg-white p-6 shadow-sm"
                  style={{ perspective: "600px" }}
                >
                  {/* Avatar */}
                  <div className={`mx-auto grid h-28 w-28 place-items-center rounded-2xl bg-gradient-to-br ${colorSet.bg} shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                    <span className={`font-display text-3xl font-bold ${colorSet.text}`}>{initials}</span>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug text-primary">{doctor.name}</h3>
                    <span className="mt-2 inline-block rounded-full bg-highlight px-3 py-1 text-xs font-bold text-cta">
                      {t(doctor.role)}
                    </span>
                    <p className="mt-3 text-xs leading-5 text-secondary">{t(doctor.availability)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════ */}
      <section
        id="testimonials"
        ref={testimonialsRef}
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
                className={`gs-testi rounded-2xl border bg-white p-7 shadow-sm transition-all duration-500 ${
                  testimonialIndex === index
                    ? "border-gold shadow-xl shadow-primary/10 -translate-y-1"
                    : "border-primary/8"
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
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-gold">
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
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  testimonialIndex === index ? "w-10 bg-cta" : "w-2.5 bg-primary/20 hover:bg-primary/30"
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/search?q=Arcade+Dental+Bintaro+reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cta/20 bg-white/70 px-5 py-3 text-sm font-bold text-cta shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
            >
              {c.googleReviews}
              <Icon name="chevron" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════ */}
      <section id="gallery" ref={galleryRef} className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.galleryLabel} title={c.galleryTitle} body={c.galleryBody} />
          <div className="grid gap-4 md:grid-cols-4">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setGalleryIndex(index)}
                className={`gs-gallery group relative overflow-hidden rounded-2xl border border-primary/8 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/12 ${
                  index === 0 || index === 3 ? "md:col-span-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.src}
                    alt={t(item.alt)}
                    width={720}
                    height={480}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 rounded-xl bg-white/90 px-4 py-2.5 text-sm font-bold text-primary shadow-lg backdrop-blur transition-all duration-300 group-hover:bg-white">
                  {t(item.label)}
                </span>
                {/* Zoom icon */}
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary shadow-lg opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                  <Icon name="scope" className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ══ INSURANCE ═════════════════════════════════════ */}
      <section id="insurance" className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div className="rounded-2xl border border-primary/8 bg-white p-8 shadow-xl shadow-primary/8">
            <p className="eyebrow">{c.insuranceLabel}</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#0b4ea2]/12 bg-gradient-to-br from-white to-blue-50/50 px-7 py-5 shadow-sm">
              <span className="font-display text-4xl font-black tracking-tight text-[#0b4ea2]">BCA</span>
              <div className="h-8 w-px bg-primary/10" />
              <span className="text-2xl font-bold text-[#2ca3dc]">Life</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-secondary">{c.insuranceBody}</p>
          </div>
          <div>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{c.insuranceTitle}</h2>
            <a href="#contact" className="mt-8 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-primary px-7 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta hover:shadow-xl">
              <Icon name="shield" className="h-5 w-5" />
              {lang === "id" ? "Cek Asuransi Saya" : "Check My Insurance"}
            </a>
          </div>
        </div>
      </section>

      {/* ══ ENGAGEMENT ════════════════════════════════════ */}
      <section id="engagement" className="bg-primary py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="eyebrow text-gold">{c.quizLabel}</p>
            <h2 className="font-display text-3xl leading-tight">{c.quizTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{c.quizBody}</p>
            <label className="mt-6 block text-sm font-bold text-white" htmlFor="fear-range">{c.quizFear}: {quizFear}/5</label>
            <input id="fear-range" type="range" min="1" max="5" value={quizFear} onChange={(e) => setQuizFear(Number(e.target.value))} className="mt-3 w-full accent-gold" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/55">{c.quizBadExperience}</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setBadExperience(false)} className={`choice-button ${!badExperience ? "choice-active" : ""}`}>{c.no}</button>
              <button type="button" onClick={() => setBadExperience(true)} className={`choice-button ${badExperience ? "choice-active" : ""}`}>{c.yes}</button>
            </div>
            <select value={quizConcern} onChange={(e) => setQuizConcern(e.target.value as "pain" | "cost" | "time")} className="mt-3 w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-gold" aria-label={c.quizConcern}>
              <option value="pain">{c.pain}</option>
              <option value="cost">{c.cost}</option>
              <option value="time">{c.time}</option>
            </select>
            <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm leading-6 text-white/80">{quizResult}</p>
            <a href={buildWhatsAppUrl(quizMessage)} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25">
              <Icon name="message" className="h-5 w-5" />{c.messageCta}
            </a>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="eyebrow text-gold">{c.analyzerLabel}</p>
            <h2 className="font-display text-3xl leading-tight">{c.analyzerTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{c.analyzerBody}</p>
            <label className="mt-6 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-center transition-all duration-200 hover:border-gold hover:bg-white/[0.08]" htmlFor="smile-upload">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-36 rounded-lg object-contain" />
              ) : (
                <><Icon name="upload" className="h-8 w-8 text-gold" /><span className="mt-3 text-sm font-bold">{c.chooseFile}</span><span className="mt-1 text-xs text-white/40">JPG, PNG, WEBP</span></>
              )}
            </label>
            <input id="smile-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => handlePreview(e.target.files?.[0])} />
            <label className="mt-5 block text-sm font-bold text-white" htmlFor="smile-concern">{c.concernLabel}</label>
            <select id="smile-concern" value={smileConcern} onChange={(e) => setSmileConcern(e.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-gold">
              {smileConcerns.map((concern) => (<option key={concern.id} value={concern.id}>{t(concern.label)}</option>))}
            </select>
            <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm leading-6 text-white/80">{t(selectedSmileConcern.result)}</p>
            <p className="mt-3 text-xs leading-5 text-white/45">{c.analyzerDisclaimer}</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="eyebrow text-gold">{c.beforeAfterLabel}</p>
            <h2 className="font-display text-3xl leading-tight">{c.beforeAfterTitle}</h2>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-white/12">
              <Image src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=720&q=80&auto=format&fit=crop" alt={c.before} width={720} height={540} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
                <Image src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=720&q=80&auto=format&fit=crop" alt={c.after} width={720} height={540} className="h-full w-[720px] max-w-none object-cover" />
              </div>
              <div className="absolute inset-y-0 z-10 flex items-center justify-center" style={{ left: `calc(${sliderValue}% - 1px)` }}>
                <div className="h-full w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                <div className="absolute grid h-9 w-9 place-items-center rounded-full bg-white shadow-xl"><span className="text-xs font-bold text-primary">{"↔"}</span></div>
              </div>
              <span className="absolute left-3 top-3 z-10 rounded-full bg-cta/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.after}</span>
              <span className="absolute right-3 top-3 z-10 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">{c.before}</span>
            </div>
            <label className="sr-only" htmlFor="before-after-slider">{c.beforeAfterLabel}</label>
            <input id="before-after-slider" type="range" min="10" max="90" value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} className="mt-5 w-full accent-gold" />
          </article>
        </div>
      </section>

      {/* ══ LOCATION ══════════════════════════════════════ */}
      <section id="location" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow={c.locationLabel} title={c.locationTitle} />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <div className="overflow-hidden rounded-2xl border border-primary/8 bg-white shadow-xl shadow-primary/8">
              <iframe title="Google Maps Arcade Dental Bintaro" src="https://www.google.com/maps?q=Arcade%20Dental%20Bintaro%20Kebayoran%20Arcade%202&output=embed" width="100%" height="460" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block border-0" allowFullScreen />
            </div>
            <div className="grid gap-4 content-start">
              <div className="rounded-2xl border border-primary/8 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-highlight text-cta"><Icon name="map" className="h-6 w-6" /></div>
                  <h3 className="font-display text-2xl text-primary">Arcade Dental</h3>
                </div>
                <p className="mt-4 leading-7 text-secondary">{business.address}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <a href={`tel:${business.phoneDisplay.replace(/\s|-/g, "")}`} className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
                  <Icon name="phone" className="h-6 w-6 text-cta" />
                  <p className="mt-4 text-sm font-bold text-primary">{business.phoneDisplay}</p>
                  <p className="text-xs text-secondary">Telp / WA</p>
                </a>
                <a href={business.instagram} target="_blank" rel="noreferrer" className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
                  <Icon name="instagram" className="h-6 w-6 text-cta" />
                  <p className="mt-4 text-sm font-bold text-primary">@arcade_dental</p>
                  <p className="text-xs text-secondary">Instagram</p>
                </a>
              </div>
              <div className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm">
                <Icon name="calendar" className="h-6 w-6 text-cta" />
                <p className="mt-4 text-sm font-bold text-primary">{business.hours[lang]}</p>
                <p className="text-xs text-secondary">{lang === "id" ? "Jam operasional" : "Operating hours"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════ */}
      <section id="contact" className="bg-surface-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
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
          <form onSubmit={handleSmartSubmit} className="rounded-2xl border border-primary/8 bg-white p-7 shadow-xl shadow-primary/8">
            <label className="form-label" htmlFor="service-select">{c.servicesLabel}</label>
            <select id="service-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="form-control">
              {services.map((s) => (<option key={s.id} value={s.id}>{t(s.title)}</option>))}
            </select>
            <label className="form-label mt-5" htmlFor="patient-name">{lang === "id" ? "Nama" : "Name"}</label>
            <input id="patient-name" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="form-control" placeholder={c.namePlaceholder} />
            <label className="form-label mt-5" htmlFor="schedule">{lang === "id" ? "Preferensi jadwal" : "Preferred schedule"}</label>
            <input id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} className="form-control" placeholder={c.schedulePlaceholder} />
            <div className="mt-5 rounded-xl bg-highlight p-4">
              <p className="whitespace-pre-line text-sm leading-6 text-primary/80">{smartMessage}</p>
            </div>
            <button type="submit" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-cta px-6 font-bold text-white shadow-lg shadow-cta/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl">
              <Icon name="message" className="h-5 w-5" />{c.messageCta}
            </button>
          </form>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════ */}
      <section ref={ctaRef} id="booking-cta" className="relative overflow-hidden bg-primary px-5 py-16 text-white md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
          <div className="absolute bottom-0 left-0 h-60 w-60 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #c8a96e 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="gs-cta eyebrow text-gold">{business.hashtag}</p>
            <h2 className="gs-cta font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{c.finalTitle}</h2>
            <p className="gs-cta mt-4 max-w-xl text-lg leading-8 text-white/70">{c.finalBody}</p>
          </div>
          <div className="gs-cta flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={buildWhatsAppUrl(smartMessage)} className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-gold px-8 font-bold text-primary shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Icon name="message" className="h-5 w-5" />WhatsApp
            </a>
            <a href="#contact" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-8 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold">
              {c.formReservation}
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer className="bg-[#0d1520] px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-gold"><Icon name="spark" className="h-5 w-5" /></span>
              <h2 className="font-display text-2xl">{business.name}</h2>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{business.tagline[lang]}</p>
            <p className="mt-5 font-accent text-[10px] font-bold uppercase tracking-[0.28em] text-gold">{business.hashtag}</p>
            <div className="mt-5 flex gap-3">
              <a href={business.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="instagram" className="h-5 w-5" /></a>
              <a href={business.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"><Icon name="facebook" className="h-5 w-5" /></a>
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
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/35 md:flex-row md:items-center">
          <p>© 2026 Arcade Dental. All rights reserved.</p>
          <a href={business.website} target="_blank" rel="noreferrer" className="hover:text-white/60">{business.website.replace("https://", "")}</a>
        </div>
      </footer>

      {/* ══ FLOATING CTA ══════════════════════════════════ */}
      <a href={buildWhatsAppUrl(smartMessage)} className={`fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-cta px-5 font-bold text-white shadow-2xl shadow-cta/35 transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary ${showFloating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <Icon name="message" className="h-5 w-5" />
        <span className="hidden sm:inline">{c.book}</span>
      </a>

      {/* ══ GALLERY LIGHTBOX ══════════════════════════════ */}
      {galleryIndex !== null ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-primary/90 p-5 backdrop-blur-md" role="dialog" aria-modal="true" onClick={() => setGalleryIndex(null)}>
          <button type="button" onClick={() => setGalleryIndex(null)} className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-xl transition-all duration-200 hover:bg-gold">{c.close} ✕</button>
          <div className="max-h-[88vh] max-w-5xl overflow-hidden rounded-2xl bg-white p-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Image src={gallery[galleryIndex].src} alt={t(gallery[galleryIndex].alt)} width={1200} height={820} className="max-h-[78vh] w-full rounded-xl object-contain" />
            <p className="px-2 py-3 text-center font-bold text-primary">{t(gallery[galleryIndex].label)}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
