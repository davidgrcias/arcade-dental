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

export type CareJourneyStep = {
  id: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  metric: string;
  icon: "heart" | "scope" | "spark" | "shield" | "calendar";
};

export type TechMetric = {
  value: string;
  label: LocalizedText;
};

export type TreatmentMatcherOption = {
  id: string;
  label: LocalizedText;
  result: LocalizedText;
  serviceId: string;
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

export const siteAssets = {
  clinicInterior: "/assets/clinic-interior-premium.png",
  techLab: "/assets/tech-lab-equipment.png",
  careJourney: "/assets/care-journey-consult.png",
  smileTransform: "/assets/smile-transform-preview.png",
  techTexture: "/assets/dental-tech-texture.png",
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

export const treatmentMatcher: TreatmentMatcherOption[] = [
  {
    id: "straighten",
    label: { id: "Gigi ingin lebih rapi", en: "Straighter teeth" },
    result: {
      id: "Mulai dari evaluasi ortodonti. Tim akan cek susunan gigi, rahang, dan opsi ritme perawatan yang paling nyaman.",
      en: "Start with an orthodontic evaluation. The team can review alignment, jaw position, and a comfortable treatment rhythm.",
    },
    serviceId: "ortodonti",
  },
  {
    id: "brighten",
    label: { id: "Senyum ingin lebih cerah", en: "Brighter smile" },
    result: {
      id: "Konsultasi estetika cocok untuk membahas whitening, bleaching, veneer, dan target senyum yang natural.",
      en: "An aesthetic consultation can cover whitening, bleaching, veneers, and a natural smile target.",
    },
    serviceId: "estetika",
  },
  {
    id: "pain",
    label: { id: "Nyeri, lubang, atau ngilu", en: "Pain, cavities, sensitivity" },
    result: {
      id: "Evaluasi konservasi gigi membantu menentukan apakah cukup tambal, scaling, atau perlu perawatan saluran akar.",
      en: "A conservative dentistry evaluation helps decide whether filling, scaling, or root canal care is needed.",
    },
    serviceId: "konservasi",
  },
  {
    id: "replace",
    label: { id: "Gigi hilang / ingin implan", en: "Missing tooth / implant" },
    result: {
      id: "Dokter dapat menilai tulang rahang, opsi implan, atau prostodonti sesuai kondisi dan prioritas Anda.",
      en: "The doctor can assess jawbone condition, implant options, or prosthodontics based on your priorities.",
    },
    serviceId: "implan",
  },
  {
    id: "kids",
    label: { id: "Perawatan anak", en: "Kids dental care" },
    result: {
      id: "Pilih dokter gigi anak untuk pendekatan yang lebih ramah, bertahap, dan tidak menakutkan.",
      en: "Choose pediatric dentistry for a friendlier, gradual, and less intimidating approach.",
    },
    serviceId: "anak",
  },
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

export const careJourney: CareJourneyStep[] = [
  {
    id: "comfort",
    eyebrow: { id: "Step 01", en: "Step 01" },
    title: { id: "Comfort Check", en: "Comfort Check" },
    body: {
      id: "Kunjungan dimulai dengan mendengar keluhan, pengalaman sebelumnya, dan tingkat kenyamanan pasien.",
      en: "Each visit starts by listening to your concern, past experience, and comfort level.",
    },
    metric: "01",
    icon: "heart",
  },
  {
    id: "scan",
    eyebrow: { id: "Step 02", en: "Step 02" },
    title: { id: "Digital Scan & Diagnosis", en: "Digital Scan & Diagnosis" },
    body: {
      id: "Pemeriksaan dibantu teknologi visual dan radiografi agar masalah terlihat lebih jelas.",
      en: "Visual and radiography tools help make the concern clearer before treatment starts.",
    },
    metric: "02",
    icon: "scope",
  },
  {
    id: "plan",
    eyebrow: { id: "Step 03", en: "Step 03" },
    title: { id: "Specialist Plan", en: "Specialist Plan" },
    body: {
      id: "Dokter menyusun opsi perawatan yang realistis, personal, dan mudah dipahami.",
      en: "The doctor maps realistic, personal, and easy-to-understand treatment options.",
    },
    metric: "03",
    icon: "spark",
  },
  {
    id: "treat",
    eyebrow: { id: "Step 04", en: "Step 04" },
    title: { id: "Precision Treatment", en: "Precision Treatment" },
    body: {
      id: "Tindakan dilakukan bertahap dengan kontrol kenyamanan dan standar sterilisasi klinik.",
      en: "Treatment runs step by step with comfort control and clinical sterilization standards.",
    },
    metric: "04",
    icon: "shield",
  },
  {
    id: "aftercare",
    eyebrow: { id: "Step 05", en: "Step 05" },
    title: { id: "Aftercare Rhythm", en: "Aftercare Rhythm" },
    body: {
      id: "Pasien mendapat arahan kontrol, kebiasaan harian, dan jadwal lanjutan yang jelas.",
      en: "Patients receive clear follow-up guidance, daily habits, and next-visit timing.",
    },
    metric: "05",
    icon: "calendar",
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

export const techMetrics: TechMetric[] = [
  { value: "5", label: { id: "perangkat utama", en: "core devices" } },
  { value: "360", label: { id: "sudut pandang perawatan", en: "care perspective" } },
  { value: "1:1", label: { id: "rencana personal", en: "personal plan" } },
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
    src: siteAssets.clinicInterior,
    alt: {
      id: "Area resepsionis premium Arcade Dental yang modern dan nyaman",
      en: "Arcade Dental premium modern and comfortable reception area",
    },
    label: { id: "Premium reception", en: "Premium reception" },
  },
  {
    src: siteAssets.techLab,
    alt: {
      id: "Peralatan teknologi dental canggih di Arcade Dental",
      en: "Advanced dental technology equipment at Arcade Dental",
    },
    label: { id: "Tech lab", en: "Tech lab" },
  },
  {
    src: siteAssets.careJourney,
    alt: {
      id: "Momen konsultasi hangat dengan perencanaan perawatan dental",
      en: "Warm consultation moment with dental care planning",
    },
    label: { id: "Care journey", en: "Care journey" },
  },
  {
    src: siteAssets.smileTransform,
    alt: {
      id: "Preview transformasi senyum untuk perawatan estetika",
      en: "Smile transformation preview for aesthetic dental care",
    },
    label: { id: "Smile preview", en: "Smile preview" },
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
