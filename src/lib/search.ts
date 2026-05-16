import { services, doctors, type Service, type Doctor } from "./content";
import type { Language } from "./content";

export type SearchResultGroup = "page" | "service" | "doctor";

export interface SearchResult {
  group: SearchResultGroup;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  /** Used to rank by simple match score */
  score: number;
}

interface PageEntry {
  id: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  href: string;
  /** extra terms to match against */
  keywords?: string[];
}

const pages: PageEntry[] = [
  {
    id: "home",
    title: { id: "Beranda", en: "Home" },
    subtitle: { id: "Halaman utama Arcade Dental", en: "Arcade Dental homepage" },
    href: "/",
    keywords: ["home", "beranda", "hero", "arcade", "dental"],
  },
  {
    id: "about",
    title: { id: "Tentang Kami", en: "About Us" },
    subtitle: { id: "Cerita & nilai Arcade Dental", en: "Arcade Dental story and values" },
    href: "/#about",
    keywords: ["about", "tentang", "story", "klinik"],
  },
  {
    id: "services-page",
    title: { id: "Layanan", en: "Services" },
    subtitle: { id: "12+ layanan klinis lengkap", en: "12+ complete clinical services" },
    href: "/services",
    keywords: ["service", "layanan", "perawatan", "treatment"],
  },
  {
    id: "journey",
    title: { id: "Care Journey", en: "Care Journey" },
    subtitle: { id: "Alur kunjungan: comfort, scan, plan, treat, aftercare", en: "Visit flow: comfort, scan, plan, treat, aftercare" },
    href: "/services#journey",
    keywords: ["journey", "alur", "tahap", "step", "comfort", "aftercare"],
  },
  {
    id: "technology",
    title: { id: "Teknologi", en: "Technology" },
    subtitle: { id: "Microscope, autoclave, X-ray, curing light", en: "Microscope, autoclave, X-ray, curing light" },
    href: "/services#technology",
    keywords: ["technology", "teknologi", "tech", "microscope", "autoclave", "xray", "x-ray", "curing"],
  },
  {
    id: "doctors-page",
    title: { id: "Tim Dokter", en: "Doctor Team" },
    subtitle: { id: "7 dokter spesialis & umum", en: "7 specialist & general dentists" },
    href: "/doctors",
    keywords: ["doctor", "dokter", "team", "tim", "spesialis"],
  },
  {
    id: "engagement",
    title: { id: "Smile Preview", en: "Smile Preview" },
    subtitle: { id: "Fear meter, smile analyzer, before/after", en: "Fear meter, smile analyzer, before/after" },
    href: "/doctors#engagement",
    keywords: ["smile", "preview", "fear", "anxiety", "analyzer", "before", "after"],
  },
  {
    id: "gallery",
    title: { id: "Galeri", en: "Gallery" },
    subtitle: { id: "Virtual place tour klinik", en: "Virtual place tour of the clinic" },
    href: "/#gallery",
    keywords: ["gallery", "galeri", "tour", "place", "virtual", "klinik"],
  },
  {
    id: "testimonials",
    title: { id: "Testimoni", en: "Testimonials" },
    subtitle: { id: "Cerita pasien Arcade Dental", en: "Patient stories from Arcade Dental" },
    href: "/#testimonials",
    keywords: ["testimonial", "testimoni", "review", "ulasan", "pasien"],
  },
  {
    id: "location",
    title: { id: "Lokasi", en: "Location" },
    subtitle: { id: "Bintaro Jaya Sektor 7", en: "Bintaro Jaya Sector 7" },
    href: "/#location",
    keywords: ["location", "lokasi", "bintaro", "alamat", "address", "map"],
  },
  {
    id: "contact",
    title: { id: "Kontak & Booking", en: "Contact & Booking" },
    subtitle: { id: "Form reservasi via WhatsApp", en: "Reservation form via WhatsApp" },
    href: "/#contact",
    keywords: ["contact", "kontak", "booking", "reservasi", "whatsapp", "phone"],
  },
];

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function scoreMatch(haystack: string, needle: string): number {
  const h = normalize(haystack);
  const n = normalize(needle);
  if (!n) return 0;
  const idx = h.indexOf(n);
  if (idx === -1) return 0;
  // Word-start match scores higher than mid-word match
  const isWordStart = idx === 0 || /\s|-|\//.test(h[idx - 1]);
  return isWordStart ? 100 - idx : 50 - idx;
}

function highestMatch(query: string, haystacks: string[]): number {
  let best = 0;
  for (const h of haystacks) {
    const s = scoreMatch(h, query);
    if (s > best) best = s;
  }
  return best;
}

export function searchAll(rawQuery: string, lang: Language): SearchResult[] {
  const query = normalize(rawQuery);
  if (query.length < 1) return [];
  const results: SearchResult[] = [];

  // Pages
  for (const p of pages) {
    const score = highestMatch(query, [
      p.title.id,
      p.title.en,
      p.subtitle.id,
      p.subtitle.en,
      ...(p.keywords ?? []),
    ]);
    if (score > 0) {
      results.push({
        group: "page",
        id: p.id,
        title: p.title[lang],
        subtitle: p.subtitle[lang],
        href: p.href,
        score,
      });
    }
  }

  // Services
  for (const s of services as Service[]) {
    const score = highestMatch(query, [
      s.title.id,
      s.title.en,
      s.description.id,
      s.description.en,
      s.id,
      s.category,
    ]);
    if (score > 0) {
      results.push({
        group: "service",
        id: s.id,
        title: s.title[lang],
        subtitle: s.description[lang],
        href: `/services#${s.id}`,
        score,
      });
    }
  }

  // Doctors
  for (const d of doctors as Doctor[]) {
    const score = highestMatch(query, [
      d.name,
      d.role.id,
      d.role.en,
      d.experience.id,
      d.experience.en,
      ...d.expertise.flatMap((e) => [e.id, e.en]),
    ]);
    if (score > 0) {
      results.push({
        group: "doctor",
        id: d.id,
        title: d.name,
        subtitle: d.role[lang],
        href: `/doctors#${d.id}`,
        score,
      });
    }
  }

  // Sort by score desc, cap to 12 results
  return results.sort((a, b) => b.score - a.score).slice(0, 12);
}
