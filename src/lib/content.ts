export type Language = "id" | "en";

export type LocalizedText = Record<Language, string>;

export type ServiceCategory = "all" | "general" | "specialist" | "aesthetic" | "kids";

export type Service = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  category: Exclude<ServiceCategory, "all">;
  icon: "align" | "implant" | "spark" | "shield" | "child" | "surgery" | "scope";
};

export type Technology = {
  title: string;
  benefit: LocalizedText;
  icon: "sterile" | "scope" | "light" | "xray" | "motor";
};

export type Doctor = {
  name: string;
  role: LocalizedText;
  availability: LocalizedText;
};

export type Testimonial = {
  name: string;
  quote: LocalizedText;
};

export const business = {
  name: "Arcade Dental",
  tagline: {
    id: "Spesialis Perawatan Gigi & Mulut Didampingi Para Expert",
    en: "Specialist Dental and Oral Care Guided by Experts",
  },
  hashtag: "#SmileWithArcadeDental",
  phoneDisplay: "+62 812-1998-9191",
  whatsapp: "6281219989191",
  email: "info@arcadedentalclinic.com",
  hours: {
    id: "Senin-Sabtu, 10:00-20:00 WIB",
    en: "Monday-Saturday, 10:00-20:00 WIB",
  },
  shortHours: "10:00-20:00",
  address:
    "Ruko Kebayoran Arcade 2 Blok B2 No. 19, Jl. Boulevard Bintaro Jaya Sektor 7, Pondok Jaya, Pondok Aren, Tangerang Selatan",
  instagram: "https://www.instagram.com/arcade_dental/",
  facebook: "https://www.facebook.com/arcaddedental/",
  website: "https://arcadedentalclinic.com",
};

export const navItems = [
  { id: "about", label: { id: "Tentang", en: "About" } },
  { id: "services", label: { id: "Layanan", en: "Services" } },
  { id: "technology", label: { id: "Teknologi", en: "Technology" } },
  { id: "doctors", label: { id: "Dokter", en: "Doctors" } },
  { id: "location", label: { id: "Lokasi", en: "Location" } },
] as const;

export const heroCopy = {
  eyebrow: { id: "Klinik gigi spesialis di Bintaro", en: "Specialist dental clinic in Bintaro" },
  title: {
    id: "Senyum Terbaik Kamu Dimulai dari Sini.",
    en: "Your Best Smile Starts Here.",
  },
  description: {
    id: "Arcade Dental menghadirkan perawatan gigi spesialis dengan tim dokter ahli, teknologi painless, dan pengalaman klinik yang hangat untuk Anda dan keluarga.",
    en: "Arcade Dental delivers specialist dental care with expert doctors, painless technology, and a warmer clinic experience for you and your family.",
  },
  primaryCta: { id: "Buat Janji", en: "Book Appointment" },
  secondaryCta: { id: "Lihat Layanan", en: "View Services" },
  status: { id: "Tersedia hari ini", en: "Available today" },
};

export const trustBadges = [
  { id: "Rekanan BCA Life", en: "BCA Life Partner" },
  { id: "Dokter Spesialis", en: "Specialist Doctors" },
  { id: "Teknologi Painless", en: "Painless Technology" },
];

export const stats = [
  { value: "6+", label: { id: "Bidang spesialisasi", en: "Specialist fields" } },
  { value: "12+", label: { id: "Jenis perawatan", en: "Treatment types" } },
  { value: "5", label: { id: "Teknologi mutakhir", en: "Modern technologies" } },
  { value: "BCA", label: { id: "Rekanan asuransi", en: "Insurance partner" } },
];

export const services: Service[] = [
  {
    id: "ortodonti",
    title: { id: "Ortodonti", en: "Orthodontics" },
    description: {
      id: "Mengoreksi ketidakrapian tumbuh kembang rahang dan gigi untuk semua usia.",
      en: "Corrects jaw and teeth alignment concerns across age groups.",
    },
    category: "specialist",
    icon: "align",
  },
  {
    id: "prostodonti",
    title: { id: "Prostodonti / Gigi Tiruan", en: "Prosthodontics / Dentures" },
    description: {
      id: "Mengganti gigi dan jaringan gusi yang hilang dengan solusi permanen atau lepasan.",
      en: "Replaces missing teeth and gum tissue with permanent or removable options.",
    },
    category: "specialist",
    icon: "implant",
  },
  {
    id: "scaling",
    title: { id: "Scaling", en: "Scaling" },
    description: {
      id: "Membersihkan plak dan karang gigi agar mulut terasa lebih sehat dan segar.",
      en: "Removes plaque and tartar for a cleaner, healthier mouth.",
    },
    category: "general",
    icon: "spark",
  },
  {
    id: "odontektomi",
    title: { id: "Odontektomi", en: "Wisdom Tooth Surgery" },
    description: {
      id: "Pencabutan gigi bungsu yang tumbuh bermasalah di rahang atas atau bawah.",
      en: "Removes problematic wisdom teeth in the upper or lower jaw.",
    },
    category: "specialist",
    icon: "surgery",
  },
  {
    id: "implan",
    title: { id: "Implan Gigi", en: "Dental Implant" },
    description: {
      id: "Penanaman akar gigi buatan agar tulang rahang dan implan menyatu.",
      en: "Places artificial tooth roots designed to integrate with the jawbone.",
    },
    category: "specialist",
    icon: "implant",
  },
  {
    id: "pencabutan",
    title: { id: "Pencabutan Gigi", en: "Tooth Extraction" },
    description: {
      id: "Solusi untuk gigi rusak, berlubang besar, atau bermasalah.",
      en: "Treatment for damaged, heavily decayed, or problematic teeth.",
    },
    category: "general",
    icon: "shield",
  },
  {
    id: "estetika",
    title: { id: "Perawatan Estetika", en: "Aesthetic Dentistry" },
    description: {
      id: "Veneer, whitening, bleaching, dan perbaikan tampilan senyum.",
      en: "Veneers, whitening, bleaching, and smile appearance improvements.",
    },
    category: "aesthetic",
    icon: "spark",
  },
  {
    id: "periodonsia",
    title: { id: "Periodonsia", en: "Periodontology" },
    description: {
      id: "Perawatan gusi dan jaringan pendukung gigi oleh dokter ahli.",
      en: "Gum and supporting tissue care guided by specialists.",
    },
    category: "specialist",
    icon: "shield",
  },
  {
    id: "konservasi",
    title: { id: "Konservasi Gigi", en: "Conservative Dentistry" },
    description: {
      id: "Penambalan gigi dan perawatan saluran akar untuk mempertahankan gigi alami.",
      en: "Fillings and root canal care to preserve natural teeth.",
    },
    category: "specialist",
    icon: "shield",
  },
  {
    id: "anak",
    title: { id: "Kedokteran Gigi Anak", en: "Pediatric Dentistry" },
    description: {
      id: "Pendekatan khusus anak agar perawatan terasa aman, ramah, dan tidak menakutkan.",
      en: "Child-focused care that feels safe, friendly, and less intimidating.",
    },
    category: "kids",
    icon: "child",
  },
  {
    id: "penyakit-mulut",
    title: { id: "Penyakit Mulut", en: "Oral Medicine" },
    description: {
      id: "Diagnosis dan perawatan kondisi medis pada rongga mulut.",
      en: "Diagnosis and treatment for medical conditions in the oral cavity.",
    },
    category: "specialist",
    icon: "scope",
  },
  {
    id: "bedah-mulut",
    title: { id: "Bedah Mulut", en: "Oral Surgery" },
    description: {
      id: "Prosedur bedah mulut kompleks dengan perencanaan yang akurat.",
      en: "Complex oral surgery procedures with careful planning.",
    },
    category: "specialist",
    icon: "surgery",
  },
];

export const serviceCategories: { id: ServiceCategory; label: LocalizedText }[] = [
  { id: "all", label: { id: "Semua", en: "All" } },
  { id: "general", label: { id: "Umum", en: "General" } },
  { id: "specialist", label: { id: "Spesialis", en: "Specialist" } },
  { id: "aesthetic", label: { id: "Estetika", en: "Aesthetic" } },
  { id: "kids", label: { id: "Anak", en: "Kids" } },
];

export const whyUs = [
  {
    title: { id: "Painless Technology", en: "Painless Technology" },
    description: {
      id: "Teknologi mutakhir membantu meminimalisir rasa sakit sehingga pasien lebih tenang saat perawatan.",
      en: "Modern technology helps reduce discomfort so patients feel calmer during treatment.",
    },
  },
  {
    title: { id: "Didampingi Dokter Ahli", en: "Expert-Led Care" },
    description: {
      id: "Perawatan diarahkan oleh dokter dengan keahlian dan standardisasi tinggi di bidangnya.",
      en: "Care is guided by doctors with strong expertise and high clinical standards.",
    },
  },
  {
    title: { id: "Rencana Personal", en: "Personalized Plans" },
    description: {
      id: "Setiap rekomendasi disesuaikan dengan kondisi gigi, tujuan, dan kenyamanan pasien.",
      en: "Each recommendation is tailored to the patient's dental condition, goals, and comfort.",
    },
  },
  {
    title: { id: "Rekanan Asuransi", en: "Insurance Partner" },
    description: {
      id: "Arcade Dental terdaftar sebagai klinik rekanan BCA Life untuk kemudahan pasien.",
      en: "Arcade Dental is listed as a BCA Life provider for easier patient access.",
    },
  },
];

export const technologies: Technology[] = [
  {
    title: "Autoclave",
    benefit: {
      id: "Sterilisasi instrumen untuk standar kebersihan klinik yang ketat.",
      en: "Instrument sterilization for strict clinical hygiene standards.",
    },
    icon: "sterile",
  },
  {
    title: "Microscope Dental",
    benefit: {
      id: "Membantu dokter melihat detail kecil saat tindakan presisi.",
      en: "Helps doctors see fine details during precision procedures.",
    },
    icon: "scope",
  },
  {
    title: "Valo X Curing Light",
    benefit: {
      id: "Mendukung hasil restorasi gigi dengan proses curing yang konsisten.",
      en: "Supports restorative results with consistent curing performance.",
    },
    icon: "light",
  },
  {
    title: "Vatech EzRay Air Portable Handheld",
    benefit: {
      id: "Pemeriksaan radiografi lebih praktis untuk membantu diagnosis.",
      en: "Practical radiography support for clearer diagnostic planning.",
    },
    icon: "xray",
  },
  {
    title: "Saeshin X-Cube Motor Implant",
    benefit: {
      id: "Perangkat motor implant untuk membantu prosedur implan lebih terkontrol.",
      en: "Implant motor system that supports more controlled implant procedures.",
    },
    icon: "motor",
  },
];

export const doctors: Doctor[] = [
  {
    name: "drg. Muhammad Ryan",
    role: { id: "Spesialis Periodonsia", en: "Periodontology Specialist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Chitra Martalia",
    role: { id: "Spesialis Ortodonti", en: "Orthodontics Specialist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Indra Suherdian Topanesa",
    role: { id: "Spesialis Konservasi Gigi", en: "Conservative Dentistry Specialist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Yoana",
    role: { id: "Spesialis Kedokteran Gigi Anak", en: "Pediatric Dentistry Specialist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Oktarina Anggeriani",
    role: { id: "Dokter Gigi Umum", en: "General Dentist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Kharisya Handayani Rahmansyah",
    role: { id: "Dokter Gigi Umum", en: "General Dentist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
  {
    name: "drg. Amelia Yasmine Kusuma",
    role: { id: "Dokter Gigi Umum", en: "General Dentist" },
    availability: { id: "Jadwal dikonfirmasi melalui admin.", en: "Schedule confirmed through admin." },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Bu N***a",
    quote: {
      id: "Dokternya ok, penanganan dan penyampaian ke pasien jelas. Lokasi sangat bersih dan nyaman. Overall sudah ok.",
      en: "The doctor was great, treatment and explanations were clear. The place was very clean and comfortable.",
    },
  },
  {
    name: "Bu M***a",
    quote: {
      id: "Pelayanannya sangat memuaskan mulai dari pendaftaran, dokter, perawat, sampai tim klinik. Tidak menyesal perawatan di Arcade Dental.",
      en: "The service was satisfying from registration to the doctors, nurses, and clinic team. A very positive care experience.",
    },
  },
  {
    name: "Pak A***s",
    quote: {
      id: "Tempatnya ok dan nyaman. Pelayanannya bagus, dokternya profesional. Recommended.",
      en: "The place is good and comfortable. Service is excellent, the doctors are professional. Recommended.",
    },
  },
];

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&q=85&auto=format&fit=crop",
    alt: {
      id: "Area resepsionis Arcade Dental yang modern dan nyaman",
      en: "Arcade Dental modern and comfortable reception area",
    },
    label: { id: "Area resepsionis", en: "Reception area" },
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffbb172d4e1?w=900&q=85&auto=format&fit=crop",
    alt: {
      id: "Ruang perawatan dental modern dengan teknologi terkini",
      en: "Modern dental treatment room with latest technology",
    },
    label: { id: "Ruang perawatan", en: "Treatment room" },
  },
  {
    src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=85&auto=format&fit=crop",
    alt: {
      id: "Peralatan teknologi dental canggih di Arcade Dental",
      en: "Advanced dental technology equipment at Arcade Dental",
    },
    label: { id: "Teknologi klinik", en: "Clinic technology" },
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e1c?w=900&q=85&auto=format&fit=crop",
    alt: {
      id: "Dokter dan asisten gigi memberikan perawatan terbaik",
      en: "Dentist and assistant delivering the best dental care",
    },
    label: { id: "Perawatan spesialis", en: "Specialist care" },
  },
];

export const smileConcerns = [
  {
    id: "alignment",
    label: { id: "Gigi tidak rapi", en: "Alignment" },
    result: {
      id: "Ortodonti atau clear aligner bisa menjadi topik konsultasi awal untuk memperbaiki susunan gigi.",
      en: "Orthodontics or clear aligners may be useful topics for an initial consultation.",
    },
  },
  {
    id: "color",
    label: { id: "Warna gigi", en: "Tooth color" },
    result: {
      id: "Whitening, bleaching, atau veneer dapat didiskusikan untuk target senyum yang lebih cerah.",
      en: "Whitening, bleaching, or veneers can be discussed for a brighter smile goal.",
    },
  },
  {
    id: "missing",
    label: { id: "Gigi hilang", en: "Missing tooth" },
    result: {
      id: "Implan gigi atau prostodonti dapat membantu mengganti gigi yang hilang dengan rencana personal.",
      en: "Dental implants or prosthodontics may help replace missing teeth with a personalized plan.",
    },
  },
  {
    id: "pain",
    label: { id: "Nyeri atau lubang", en: "Pain or cavity" },
    result: {
      id: "Konservasi gigi, tambal, atau perawatan saluran akar bisa menjadi langkah evaluasi berikutnya.",
      en: "Conservative dentistry, fillings, or root canal evaluation may be relevant next steps.",
    },
  },
];
