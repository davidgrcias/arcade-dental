"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type Language, type LocalizedText } from "@/lib/content";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (localized: LocalizedText) => string;
  c: Record<string, string>;
  languageReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const copy = {
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
    locationLabelFooter: "Lokasi & Kontak",
    contactLabelFooter: "Kontak"
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
    locationLabelFooter: "Location & Contact",
    contactLabelFooter: "Contact"
  },
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("id");
  const [languageReady, setLanguageReady] = useState(false);

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

  const t = (localized: LocalizedText) => localized[lang];
  const c = copy[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, c, languageReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
