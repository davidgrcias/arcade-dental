import { siteAssets, type LocalizedText } from "./content";

export type ArticleCategoryId = "general" | "specialist" | "aesthetic" | "kids";

export type ArticleCategory = {
  id: ArticleCategoryId;
  label: LocalizedText;
  /** Tailwind hue used for chips, accents, and gradient covers. */
  accent: "cta" | "gold" | "primary" | "amber";
};

export const articleCategories: ArticleCategory[] = [
  {
    id: "general",
    label: { id: "Perawatan Umum", en: "General Care" },
    accent: "cta",
  },
  {
    id: "specialist",
    label: { id: "Spesialis", en: "Specialist" },
    accent: "primary",
  },
  {
    id: "aesthetic",
    label: { id: "Estetika", en: "Aesthetic" },
    accent: "gold",
  },
  {
    id: "kids",
    label: { id: "Gigi Anak", en: "Pediatric" },
    accent: "amber",
  },
];

// ─── Article body block types ────────────────────────────────────────────────

export type LedeBlock = { type: "lede"; text: LocalizedText };
export type HeadingBlock = { type: "heading"; text: LocalizedText };
export type ParagraphBlock = { type: "paragraph"; text: LocalizedText };
export type ListBlock = { type: "list"; items: LocalizedText[] };
export type StepsBlock = {
  type: "steps";
  items: { title: LocalizedText; body: LocalizedText }[];
};
export type CalloutBlock = {
  type: "callout";
  variant: "tip" | "warning" | "info";
  title: LocalizedText;
  text: LocalizedText;
};
export type FaqBlock = {
  type: "faq";
  title: LocalizedText;
  items: { question: LocalizedText; answer: LocalizedText }[];
};

export type ArticleBlock =
  | LedeBlock
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | StepsBlock
  | CalloutBlock
  | FaqBlock;

// ─── Article model ───────────────────────────────────────────────────────────

export type Article = {
  slug: string;
  category: ArticleCategoryId;
  /** Display title shown on cards and the detail header. */
  title: LocalizedText;
  /** One-sentence dek used on cards and meta descriptions. */
  dek: LocalizedText;
  /** ISO date used for sorting and display. */
  publishedAt: string;
  /** Estimated read time in minutes. */
  readingMinutes: number;
  /** Optional clinic photo from /public used as the cover. */
  cover?: string;
  /** Optional alt text for the cover image. */
  coverAlt?: LocalizedText;
  /** Author byline shown on the detail page. */
  author: { name: string; role: LocalizedText };
  /** Body composed of structured blocks. */
  body: ArticleBlock[];
  /** Slugs of services to link to under the post. */
  relatedServices?: string[];
};

// ─── Articles ────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    slug: "scaling-gigi-101",
    category: "general",
    title: {
      id: "Scaling Gigi 101: Apa, Kapan, dan Kenapa Penting",
      en: "Dental Scaling 101: What, When, and Why It Matters",
    },
    dek: {
      id: "Panduan singkat memahami pembersihan karang gigi, frekuensi ideal, dan apa yang sebenarnya terjadi di kursi pasien.",
      en: "A short guide to professional cleaning, ideal frequency, and what actually happens in the chair.",
    },
    publishedAt: "2026-05-04",
    readingMinutes: 6,
    cover: siteAssets.treatmentRoom,
    coverAlt: {
      id: "Ruang tindakan Arcade Dental tempat scaling dilakukan",
      en: "Arcade Dental treatment room where scaling is performed",
    },
    author: {
      name: "drg. Oktarina Anggeriani",
      role: { id: "Dokter Gigi Umum", en: "General Dentist" },
    },
    body: [
      {
        type: "lede",
        text: {
          id: "Karang gigi adalah hal yang sering tidak terlihat tapi paling banyak menyebabkan masalah jangka panjang. Scaling adalah perawatan paling sederhana yang bisa Anda lakukan untuk mencegah jauh lebih banyak masalah di kemudian hari.",
          en: "Tartar is the silent driver of most long-term dental issues. Scaling is the simplest preventive step you can take to avoid much bigger problems later.",
        },
      },
      {
        type: "heading",
        text: { id: "Apa itu scaling?", en: "What is scaling?" },
      },
      {
        type: "paragraph",
        text: {
          id: "Scaling adalah prosedur pembersihan karang gigi (kalkulus) yang menempel di permukaan gigi dan di bawah garis gusi. Karang gigi terbentuk dari plak yang mengeras dan tidak bisa dihilangkan hanya dengan menyikat gigi biasa.",
          en: "Scaling is the professional removal of hardened plaque (calculus) from tooth surfaces and just below the gumline. Once plaque hardens into tartar, brushing alone can no longer remove it.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Tindakan ini menggunakan alat ultrasonic scaler yang menghasilkan getaran halus untuk memecah karang, dilanjutkan dengan polishing untuk meratakan permukaan gigi.",
          en: "We use an ultrasonic scaler that generates fine vibrations to break up tartar, followed by polishing to smooth the tooth surface.",
        },
      },
      {
        type: "heading",
        text: { id: "Tanda Anda perlu scaling", en: "Signs you need scaling" },
      },
      {
        type: "list",
        items: [
          { id: "Gusi mudah berdarah saat sikat gigi", en: "Gums that bleed easily when brushing" },
          { id: "Bau mulut yang tidak hilang setelah sikat", en: "Persistent bad breath even after brushing" },
          { id: "Lapisan kuning atau cokelat di sekitar gusi", en: "Yellow or brown buildup around the gumline" },
          { id: "Sensasi kasar saat lidah menyentuh permukaan gigi", en: "A rough feeling when your tongue touches the teeth" },
          { id: "Terakhir scaling lebih dari 6 bulan lalu", en: "Your last scaling was more than 6 months ago" },
        ],
      },
      {
        type: "heading",
        text: { id: "Bagaimana prosesnya?", en: "What the visit looks like" },
      },
      {
        type: "steps",
        items: [
          {
            title: { id: "Pemeriksaan awal", en: "Initial check" },
            body: {
              id: "Dokter memeriksa kondisi gusi, kedalaman kantong gusi, dan area yang paling memerlukan perhatian.",
              en: "The doctor inspects gum condition, pocket depth, and which areas need the most attention.",
            },
          },
          {
            title: { id: "Scaling ultrasonic", en: "Ultrasonic scaling" },
            body: {
              id: "Karang dibersihkan rahang per rahang dengan kombinasi getaran dan semprotan air yang lembut.",
              en: "Tartar is cleared jaw by jaw using gentle vibration combined with a fine water spray.",
            },
          },
          {
            title: { id: "Polishing", en: "Polishing" },
            body: {
              id: "Permukaan gigi dipoles dengan pasta khusus agar plak lebih sulit menempel kembali.",
              en: "Teeth are polished with a fine paste so plaque has a harder time sticking back.",
            },
          },
          {
            title: { id: "Edukasi pulang", en: "Take-home guidance" },
            body: {
              id: "Anda mendapat catatan kebiasaan harian: teknik menyikat, jenis benang gigi, dan jadwal kontrol berikutnya.",
              en: "You leave with personalised habit tips: brushing technique, floss type, and the next visit timing.",
            },
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: { id: "Frekuensi ideal", en: "Ideal frequency" },
        text: {
          id: "Untuk kebanyakan orang dewasa, scaling rutin setiap 6 bulan sudah cukup. Pasien dengan riwayat radang gusi atau perokok mungkin disarankan setiap 3-4 bulan.",
          en: "For most adults, scaling every 6 months is sufficient. Patients with a history of gum inflammation or smokers may benefit from every 3-4 months.",
        },
      },
      {
        type: "heading",
        text: { id: "Apakah ada risikonya?", en: "Are there any risks?" },
      },
      {
        type: "paragraph",
        text: {
          id: "Scaling adalah salah satu prosedur paling aman di kedokteran gigi. Sensitivitas ringan selama 24-48 jam setelahnya wajar, terutama jika sebelumnya banyak karang yang menutupi akar gigi. Sensasi ini biasanya hilang dengan sendirinya.",
          en: "Scaling is one of the safest dental procedures. Mild sensitivity for 24-48 hours afterward is normal, especially if a lot of tartar was covering the tooth roots. The feeling typically resolves on its own.",
        },
      },
      {
        type: "heading",
        text: { id: "Setelah scaling, lakukan ini", en: "Aftercare checklist" },
      },
      {
        type: "list",
        items: [
          { id: "Hindari makanan/minuman sangat panas atau dingin selama 24 jam pertama", en: "Avoid very hot or cold food and drinks for the first 24 hours" },
          { id: "Gunakan pasta gigi anti-sensitif jika diperlukan", en: "Use a sensitivity-formula toothpaste if needed" },
          { id: "Sikat dengan teknik bass (sudut 45° menuju gusi) dua kali sehari", en: "Brush with the bass technique (45° angle toward the gums) twice daily" },
          { id: "Pakai benang gigi setiap malam, fokus di antara gigi", en: "Floss every night, focusing between teeth" },
          { id: "Jadwalkan kontrol rutin berikutnya sebelum lupa", en: "Schedule the next check-up before you forget" },
        ],
      },
      {
        type: "faq",
        title: { id: "Pertanyaan yang sering muncul", en: "Frequently asked" },
        items: [
          {
            question: { id: "Apakah scaling membuat gigi renggang?", en: "Does scaling make my teeth feel loose?" },
            answer: {
              id: "Tidak. Yang sering terjadi adalah karang yang sebelumnya mengisi celah antar-gigi terangkat, sehingga celah aslinya terasa lebih jelas. Itu sebenarnya kondisi normal Anda.",
              en: "No. What you feel is tartar previously filling the spaces between teeth being removed. The natural gap was already there.",
            },
          },
          {
            question: { id: "Berapa lama satu sesi scaling?", en: "How long does one scaling session take?" },
            answer: {
              id: "Biasanya 30-60 menit tergantung tingkat karang. Konsultasi awal singkat untuk pasien baru menambah sekitar 15 menit.",
              en: "Usually 30-60 minutes depending on tartar level. A short first-visit consultation adds about 15 minutes.",
            },
          },
          {
            question: { id: "Apakah scaling ditanggung asuransi?", en: "Is scaling covered by insurance?" },
            answer: {
              id: "Beberapa polis BCA Life menanggung scaling sebagai perawatan preventif. Tim admin Arcade Dental dapat membantu memeriksa cakupan polis Anda sebelum kunjungan.",
              en: "Some BCA Life policies cover scaling as preventive care. The Arcade Dental admin can help verify your coverage before the visit.",
            },
          },
        ],
      },
    ],
    relatedServices: ["scaling", "periodonsia"],
  },
  {
    slug: "bleaching-vs-veneer",
    category: "aesthetic",
    title: {
      id: "Bleaching atau Veneer? Memilih Jalur yang Tepat untuk Senyum Anda",
      en: "Bleaching or Veneer? Choosing the Right Path for Your Smile",
    },
    dek: {
      id: "Dua perawatan estetika populer dengan tujuan dan keterbatasan yang sangat berbeda. Ini cara membedakannya.",
      en: "Two popular aesthetic treatments with very different goals and limits. Here is how to tell them apart.",
    },
    publishedAt: "2026-04-22",
    readingMinutes: 8,
    cover: siteAssets.calmCorner,
    coverAlt: {
      id: "Sudut tenang Arcade Dental untuk konsultasi estetika",
      en: "Quiet aesthetic consultation corner at Arcade Dental",
    },
    author: {
      name: "drg. Kharisya Handayani Rahmansyah",
      role: { id: "Dokter Gigi Umum", en: "General Dentist" },
    },
    body: [
      {
        type: "lede",
        text: {
          id: "Banyak pasien datang dengan permintaan yang sama: ingin senyum lebih cerah. Kabar baiknya, ada lebih dari satu cara mencapainya. Kabar yang perlu dipahami: tidak semua jalan cocok untuk setiap orang.",
          en: "Many patients walk in with the same goal: a brighter smile. The good news is there is more than one way to get there. The honest part is that not every path fits every person.",
        },
      },
      {
        type: "heading",
        text: { id: "Singkatnya", en: "The short version" },
      },
      {
        type: "list",
        items: [
          { id: "Bleaching mencerahkan warna gigi alami Anda.", en: "Bleaching brightens your natural tooth shade." },
          { id: "Veneer menutupi permukaan depan gigi dengan lapisan tipis porselen atau komposit.", en: "Veneers cover the front of the tooth with a thin layer of porcelain or composite." },
          { id: "Bleaching tidak mengubah bentuk gigi. Veneer bisa.", en: "Bleaching does not change tooth shape. Veneers can." },
          { id: "Bleaching reversibel & berkala. Veneer permanen & jangka panjang.", en: "Bleaching is reversible and periodic. Veneers are permanent and long-term." },
        ],
      },
      {
        type: "heading",
        text: { id: "Kapan bleaching cukup", en: "When bleaching is enough" },
      },
      {
        type: "paragraph",
        text: {
          id: "Bleaching paling tepat ketika bentuk gigi Anda sudah sesuai keinginan, tetapi warna gigi terasa kuning karena kebiasaan minum kopi, teh, atau merokok. Hasilnya bisa bertahan 1-3 tahun tergantung kebiasaan.",
          en: "Bleaching makes the most sense when your tooth shape is already what you want but the color feels yellow from coffee, tea, or smoking habits. Results last 1-3 years depending on lifestyle.",
        },
      },
      {
        type: "paragraph",
        text: {
          id: "Bleaching in-office (di klinik) menggunakan gel hidrogen peroksida dengan konsentrasi lebih tinggi dan diaktifkan dengan light. Hasilnya lebih cepat, biasanya selesai dalam satu sesi 60-90 menit.",
          en: "In-office bleaching uses a higher-concentration hydrogen peroxide gel activated with light. Results show up faster, typically within a single 60-90 minute session.",
        },
      },
      {
        type: "heading",
        text: { id: "Kapan veneer lebih masuk akal", en: "When veneers make more sense" },
      },
      {
        type: "list",
        items: [
          { id: "Bentuk gigi tidak proporsional (kecil, runcing, atau patah ringan).", en: "Tooth shape is not proportional (small, pointed, or slightly chipped)." },
          { id: "Ada celah antar-gigi yang ingin ditutup tanpa behel.", en: "There are gaps between teeth you want closed without braces." },
          { id: "Warna gigi memiliki noda dalam (intrinsic) yang tidak hilang dengan bleaching.", en: "Teeth have intrinsic stains that bleaching cannot lift." },
          { id: "Anda menginginkan hasil senyum yang sangat seragam dan tahan lama.", en: "You want a highly uniform, long-lasting smile result." },
        ],
      },
      {
        type: "heading",
        text: { id: "Bagaimana proses veneer?", en: "How the veneer process works" },
      },
      {
        type: "steps",
        items: [
          {
            title: { id: "Konsultasi & desain senyum", en: "Consultation & smile design" },
            body: {
              id: "Dokter mendengar tujuan estetika Anda, mengambil foto, dan menyiapkan simulasi bentuk akhir.",
              en: "The doctor reviews your aesthetic goals, takes photos, and prepares a target shape simulation.",
            },
          },
          {
            title: { id: "Persiapan gigi", en: "Tooth preparation" },
            body: {
              id: "Lapisan tipis email gigi (sekitar 0,3-0,5 mm) dikurangi agar veneer bisa duduk rata dan natural.",
              en: "A thin layer of enamel (around 0.3-0.5 mm) is reduced so the veneer can sit flush and look natural.",
            },
          },
          {
            title: { id: "Pencetakan & pemasangan", en: "Impression & bonding" },
            body: {
              id: "Veneer dibuat sesuai cetakan gigi Anda, lalu direkatkan dengan adhesive khusus dan disinari curing light.",
              en: "Veneers are crafted from your impression and bonded with a specialised adhesive cured with a curing light.",
            },
          },
          {
            title: { id: "Penyesuaian gigitan", en: "Bite refinement" },
            body: {
              id: "Dokter menyempurnakan gigitan agar veneer tidak terasa mengganjal saat mengunyah.",
              en: "The doctor refines the bite so the veneer feels seamless when chewing.",
            },
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: {
          id: "Hal yang perlu disadari",
          en: "Important to understand",
        },
        text: {
          id: "Veneer bersifat permanen. Setelah lapisan email dikurangi, gigi tidak bisa kembali ke kondisi sebelumnya. Diskusi yang jujur dengan dokter sebelum mulai sangat penting.",
          en: "Veneers are permanent. Once enamel is reduced, the tooth cannot go back. An honest conversation with the doctor before starting is essential.",
        },
      },
      {
        type: "heading",
        text: { id: "Risiko & cara mengelolanya", en: "Risks & how to manage them" },
      },
      {
        type: "list",
        items: [
          { id: "Sensitivitas pasca-bleaching (24-48 jam) - gunakan pasta anti-sensitif.", en: "Post-bleaching sensitivity (24-48 hours) - use a sensitivity toothpaste." },
          { id: "Veneer dapat retak jika menggigit benda keras - hindari menggigit es atau membuka kemasan dengan gigi.", en: "Veneers can chip from biting hard objects - avoid ice or opening packaging with teeth." },
          { id: "Warna veneer tidak ikut berubah saat bleaching - lakukan bleaching dulu sebelum membuat veneer jika perlu.", en: "Veneer color does not change with bleaching - bleach first if needed, then make the veneer." },
        ],
      },
      {
        type: "heading",
        text: { id: "Aftercare & maintenance", en: "Aftercare & maintenance" },
      },
      {
        type: "list",
        items: [
          { id: "Kurangi konsumsi kopi, teh hitam, dan rokok untuk menjaga warna.", en: "Cut down coffee, black tea, and smoking to preserve color." },
          { id: "Gunakan sedotan untuk minuman berwarna selama 1-2 minggu pasca bleaching.", en: "Use a straw for colored drinks for 1-2 weeks after bleaching." },
          { id: "Sikat dua kali sehari, flossing setiap malam.", en: "Brush twice daily, floss nightly." },
          { id: "Kunjungan kontrol setiap 6 bulan untuk evaluasi veneer atau touch-up bleaching.", en: "Visit every 6 months to check veneers or refresh bleaching." },
        ],
      },
      {
        type: "faq",
        title: { id: "Pertanyaan populer", en: "Common questions" },
        items: [
          {
            question: { id: "Apakah bleaching merusak email?", en: "Does bleaching damage enamel?" },
            answer: {
              id: "Bleaching profesional dengan dokter gigi tidak merusak email. Yang harus dihindari adalah produk over-the-counter dengan konsentrasi tidak terstandar.",
              en: "Professional bleaching with a dentist does not damage enamel. What you should avoid is over-the-counter product with unregulated concentration.",
            },
          },
          {
            question: { id: "Veneer porselen vs komposit, mana yang lebih baik?", en: "Porcelain vs composite veneer, which is better?" },
            answer: {
              id: "Porselen lebih tahan noda dan tahan lama (10-15 tahun) tapi biayanya lebih tinggi. Komposit lebih ekonomis dan bisa dipoles ulang, tapi usia pakai lebih singkat (4-7 tahun).",
              en: "Porcelain resists stains and lasts longer (10-15 years) but costs more. Composite is more affordable and can be repolished, but lasts shorter (4-7 years).",
            },
          },
          {
            question: { id: "Bisakah bleaching dan veneer dikombinasikan?", en: "Can bleaching and veneers be combined?" },
            answer: {
              id: "Bisa. Pendekatan umumnya adalah bleaching dulu untuk mendapat warna dasar yang diinginkan, baru veneer dibuat menyesuaikan warna gigi yang sudah cerah.",
              en: "Yes. The usual approach is to bleach first to get the desired baseline color, then craft veneers to match the already-brightened teeth.",
            },
          },
        ],
      },
    ],
    relatedServices: ["estetika", "konservasi"],
  },
  {
    slug: "memulai-perjalanan-behel",
    category: "specialist",
    title: {
      id: "Memulai Perjalanan Behel: Tahapan, Durasi, dan Cara Merawatnya",
      en: "Starting Your Braces Journey: Steps, Timeline, and Care",
    },
    dek: {
      id: "Behel bukan hanya soal merapikan gigi. Ini panduan jujur soal apa yang akan Anda lalui dari konsultasi pertama hingga retainer.",
      en: "Braces are about more than straight teeth. Here is an honest look at what you will go through from first consult to retainer.",
    },
    publishedAt: "2026-04-08",
    readingMinutes: 9,
    cover: siteAssets.careJourney,
    coverAlt: {
      id: "Sesi perawatan ortodonti di Arcade Dental",
      en: "Orthodontic treatment session at Arcade Dental",
    },
    author: {
      name: "drg. Chitra Martalia",
      role: { id: "Spesialis Ortodonti", en: "Orthodontics Specialist" },
    },
    body: [
      {
        type: "lede",
        text: {
          id: "Memutuskan pasang behel adalah keputusan jangka panjang. Rata-rata perjalanan ortodonti memakan waktu 18-30 bulan, dan tahap retainer setelahnya lebih panjang lagi. Memahami timeline-nya membuat ekspektasi lebih realistis.",
          en: "Choosing braces is a long-term commitment. Most orthodontic journeys take 18-30 months, with a longer retainer phase afterward. Understanding the timeline keeps expectations realistic.",
        },
      },
      {
        type: "heading",
        text: { id: "Behel itu untuk siapa?", en: "Who is this for?" },
      },
      {
        type: "list",
        items: [
          { id: "Gigi berjejal atau tidak rapi (crowded).", en: "Crowded or misaligned teeth." },
          { id: "Ada celah antar gigi yang ingin ditutup.", en: "Gaps between teeth that you want closed." },
          { id: "Gigitan tidak pas (gigitan terbuka, dalam, silang).", en: "Bite issues (open, deep, or cross bite)." },
          { id: "Rahang atas atau bawah terasa tidak proporsional.", en: "Upper or lower jaw feeling out of proportion." },
        ],
      },
      {
        type: "heading",
        text: { id: "Pilihan jenis behel", en: "Types of braces" },
      },
      {
        type: "paragraph",
        text: {
          id: "Behel konvensional metal adalah pilihan paling umum dan paling efisien untuk kasus kompleks. Behel keramik lebih estetis tapi sedikit lebih rapuh. Aligner clear (seperti Invisalign) cocok untuk kasus ringan-menengah dan dapat dilepas saat makan.",
          en: "Conventional metal braces are the most common and most efficient choice for complex cases. Ceramic braces look subtler but are slightly more fragile. Clear aligners (like Invisalign) suit mild-moderate cases and can be removed for meals.",
        },
      },
      {
        type: "heading",
        text: { id: "Timeline perjalanan ortodonti", en: "The orthodontic timeline" },
      },
      {
        type: "steps",
        items: [
          {
            title: { id: "Bulan 0: Konsultasi & rontgen", en: "Month 0: Consultation & x-ray" },
            body: {
              id: "Pemeriksaan menyeluruh, foto, rontgen panoramic, dan diskusi rencana. Estimasi biaya dan durasi disampaikan transparan.",
              en: "Comprehensive exam, photos, panoramic x-ray, and a treatment plan discussion. Cost and duration are shared transparently.",
            },
          },
          {
            title: { id: "Bulan 1: Persiapan & pemasangan", en: "Month 1: Prep & bonding" },
            body: {
              id: "Pencabutan gigi (jika perlu), scaling, lalu pemasangan bracket dan kawat pertama.",
              en: "Tooth extractions (if needed), scaling, then bracket bonding and first wire placement.",
            },
          },
          {
            title: { id: "Bulan 2-18: Kontrol bulanan", en: "Months 2-18: Monthly visits" },
            body: {
              id: "Setiap 4-6 minggu, kawat dan elastis disesuaikan untuk menggerakkan gigi sesuai rencana.",
              en: "Every 4-6 weeks, wires and elastics are adjusted to move teeth according to plan.",
            },
          },
          {
            title: { id: "Bulan 18-24: Detailing", en: "Months 18-24: Detailing" },
            body: {
              id: "Penyempurnaan halus pada posisi tiap gigi sebelum behel dilepas.",
              en: "Fine adjustments to each tooth's position before brackets come off.",
            },
          },
          {
            title: { id: "Pelepasan & retainer", en: "Removal & retainer" },
            body: {
              id: "Bracket dilepas, gigi dipoles. Anda mendapat retainer yang harus dipakai untuk mempertahankan hasil.",
              en: "Brackets are removed and teeth polished. You receive a retainer to lock in the result.",
            },
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: { id: "Fakta retainer", en: "About retainers" },
        text: {
          id: "Retainer perlu dipakai seumur hidup, dengan frekuensi yang menurun secara bertahap (full-time, malam saja, lalu beberapa malam per minggu). Tanpa retainer, gigi cenderung kembali ke posisi semula.",
          en: "Retainers are a lifetime commitment with declining frequency (full-time, then nights only, then a few nights a week). Without them, teeth tend to drift back.",
        },
      },
      {
        type: "heading",
        text: { id: "Risiko & cara mengelolanya", en: "Risks & how to manage them" },
      },
      {
        type: "list",
        items: [
          { id: "Sariawan di awal pemasangan - gunakan wax ortodonti yang diberikan oleh klinik.", en: "Mouth ulcers in the first weeks - use the orthodontic wax provided by the clinic." },
          { id: "Risiko karies meningkat karena sulit menyikat - gunakan sikat khusus behel & flosser.", en: "Higher cavity risk from harder cleaning - use a braces toothbrush and a flosser." },
          { id: "Resorpsi akar (sangat jarang) - kontrol rutin memantau hal ini.", en: "Root resorption (very rare) - routine controls monitor this." },
          { id: "Bracket lepas - hindari makanan keras, lengket, dan kenyal.", en: "Loose brackets - avoid hard, sticky, and chewy foods." },
        ],
      },
      {
        type: "heading",
        text: { id: "Aftercare harian dengan behel", en: "Daily care with braces" },
      },
      {
        type: "list",
        items: [
          { id: "Sikat setiap setelah makan dengan sikat khusus ortodonti.", en: "Brush after every meal with an orthodontic toothbrush." },
          { id: "Gunakan interdental brush untuk membersihkan sela bracket.", en: "Use an interdental brush to clean between brackets." },
          { id: "Hindari permen keras, kacang utuh, popcorn, dan es batu.", en: "Avoid hard candy, whole nuts, popcorn, and ice." },
          { id: "Potong buah atau sayur keras menjadi potongan kecil.", en: "Cut hard fruit or vegetables into small pieces." },
          { id: "Bawa wax ortodonti dalam tas untuk antisipasi gesekan.", en: "Carry orthodontic wax in your bag for friction emergencies." },
        ],
      },
      {
        type: "faq",
        title: { id: "Yang sering ditanyakan", en: "Frequently asked" },
        items: [
          {
            question: { id: "Apakah pasang behel sakit?", en: "Does putting on braces hurt?" },
            answer: {
              id: "Pemasangan tidak sakit. Yang muncul adalah ngilu ringan 2-4 hari setelah aktivasi awal dan setiap kontrol kawat. Paracetamol biasa cukup membantu.",
              en: "The bonding itself is not painful. You may feel mild soreness 2-4 days after the initial activation and each wire change. Regular paracetamol usually helps.",
            },
          },
          {
            question: { id: "Bisa makan apa saja?", en: "Can I eat anything?" },
            answer: {
              id: "Sebagian besar bisa, asalkan dipotong kecil. Yang harus dihindari: makanan keras (es, kacang utuh), lengket (karamel, dodol), dan kenyal berlebihan.",
              en: "Most things, as long as cut small. Avoid: hard foods (ice, whole nuts), sticky foods (caramel, chewy candy), and overly chewy items.",
            },
          },
          {
            question: { id: "Berapa biaya behel di Arcade Dental?", en: "How much do braces cost at Arcade Dental?" },
            answer: {
              id: "Behel konvensional mulai Rp 8,5 juta untuk paket pemasangan dan kontrol awal. Biaya total tergantung kompleksitas kasus dan jenis behel yang dipilih, akan dijelaskan transparan setelah konsultasi.",
              en: "Conventional braces start at Rp 8.5M for the placement package and initial controls. Total cost depends on case complexity and braces type, explained transparently after consultation.",
            },
          },
        ],
      },
    ],
    relatedServices: ["ortodonti", "konservasi", "scaling"],
  },
  {
    slug: "kunjungan-pertama-anak",
    category: "kids",
    title: {
      id: "Kunjungan Pertama Si Kecil ke Dokter Gigi: Tenang, Singkat, Menyenangkan",
      en: "Your Child's First Dental Visit: Calm, Brief, and Friendly",
    },
    dek: {
      id: "Bagaimana mempersiapkan anak agar pengalaman pertama dengan dokter gigi tidak menjadi trauma seumur hidup.",
      en: "How to prepare your child so their first dentist visit does not become a lifelong fear.",
    },
    publishedAt: "2026-03-26",
    readingMinutes: 5,
    cover: siteAssets.consultationLounge,
    coverAlt: {
      id: "Area konsultasi ramah anak di Arcade Dental",
      en: "Child-friendly consultation area at Arcade Dental",
    },
    author: {
      name: "drg. Yoana",
      role: { id: "Spesialis Kedokteran Gigi Anak", en: "Pediatric Dentistry Specialist" },
    },
    body: [
      {
        type: "lede",
        text: {
          id: "Banyak orang dewasa yang takut ke dokter gigi sampai hari ini bisa melacak rasa takut itu ke kunjungan pertama mereka di masa kecil. Pengalaman pertama menentukan banyak hal.",
          en: "Many adults who fear the dentist today can trace that fear back to their very first visit as a child. The first experience matters more than people realise.",
        },
      },
      {
        type: "heading",
        text: { id: "Kapan sebaiknya kunjungan pertama?", en: "When should the first visit happen?" },
      },
      {
        type: "paragraph",
        text: {
          id: "American Academy of Pediatric Dentistry merekomendasikan kunjungan pertama dilakukan saat gigi pertama tumbuh atau paling lambat di usia 1 tahun. Tujuannya bukan tindakan, tetapi mengenalkan suasana dan membangun kebiasaan.",
          en: "The American Academy of Pediatric Dentistry recommends the first visit when the first tooth erupts, or by age 1 at the latest. The goal is not treatment, but familiarisation and habit-building.",
        },
      },
      {
        type: "heading",
        text: { id: "Yang dilakukan di kunjungan pertama", en: "What happens at the first visit" },
      },
      {
        type: "steps",
        items: [
          {
            title: { id: "Tour singkat", en: "Quick tour" },
            body: {
              id: "Anak diajak melihat ruangan, kursi pasien, dan alat-alat dengan bahasa ramah anak (cermin = sendok ajaib, dst).",
              en: "The child sees the room, the chair, and the tools using kid-friendly language (mirror = magic spoon, etc).",
            },
          },
          {
            title: { id: "Hitung gigi", en: "Counting teeth" },
            body: {
              id: "Dokter menghitung gigi sambil bercerita. Tidak ada tindakan, hanya sentuhan ringan.",
              en: "The doctor counts teeth while telling a story. No procedures, just a gentle touch.",
            },
          },
          {
            title: { id: "Edukasi orang tua", en: "Parent coaching" },
            body: {
              id: "Diskusi singkat tentang teknik menyikat, pasta gigi yang sesuai usia, dan kebiasaan makan.",
              en: "A quick discussion on brushing technique, age-appropriate toothpaste, and eating habits.",
            },
          },
          {
            title: { id: "Hadiah kecil", en: "A small reward" },
            body: {
              id: "Stiker atau tanda penghargaan untuk anak yang berani datang. Asosiasi positif itu penting.",
              en: "A sticker or token to reward a brave visit. Positive association matters.",
            },
          },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: { id: "Pro tip untuk orang tua", en: "Parent pro-tip" },
        text: {
          id: "Hindari kalimat 'tidak akan sakit' atau 'jangan takut'. Otak anak hanya menangkap kata 'sakit' dan 'takut'. Coba ganti dengan: 'kita ke dokter gigi untuk hitung-hitung gigi'.",
          en: "Avoid phrases like 'it will not hurt' or 'do not be afraid'. A child's brain only catches the words 'hurt' and 'afraid'. Try instead: 'we are visiting the dentist to count your teeth'.",
        },
      },
      {
        type: "heading",
        text: { id: "Cara mempersiapkan di rumah", en: "How to prepare at home" },
      },
      {
        type: "list",
        items: [
          { id: "Bacakan buku cerita tentang dokter gigi seminggu sebelumnya.", en: "Read a children's book about visiting the dentist a week before." },
          { id: "Mainkan peran 'dokter gigi-pasien' dengan boneka atau diri sendiri.", en: "Role-play 'dentist and patient' with a doll or yourself." },
          { id: "Pilih jam ketika anak biasanya paling segar (pagi setelah sarapan).", en: "Pick a time slot when your child is freshest (morning after breakfast)." },
          { id: "Datang 10-15 menit lebih awal agar anak punya waktu menyesuaikan diri.", en: "Arrive 10-15 minutes early so the child can settle in." },
          { id: "Bawa benda kesayangan (selimut, mainan kecil) untuk kenyamanan.", en: "Bring a comfort item (blanket, small toy) along." },
        ],
      },
      {
        type: "heading",
        text: { id: "Kapan harus segera datang?", en: "When to come sooner" },
      },
      {
        type: "list",
        items: [
          { id: "Ada gigi berlubang yang terlihat hitam atau cokelat.", en: "Visible cavities (black or brown spots)." },
          { id: "Anak mengeluh sakit saat makan atau minum.", en: "The child complains of pain when eating or drinking." },
          { id: "Gusi bengkak atau berdarah.", en: "Swollen or bleeding gums." },
          { id: "Trauma karena terjatuh yang melibatkan area mulut.", en: "Trauma to the mouth from a fall." },
        ],
      },
      {
        type: "faq",
        title: { id: "Pertanyaan orang tua", en: "Parent questions" },
        items: [
          {
            question: { id: "Apakah anak perlu didampingi orang tua saat pemeriksaan?", en: "Should I stay with my child during the exam?" },
            answer: {
              id: "Untuk kunjungan pertama, ya. Setelah anak nyaman, biasanya kami menyarankan orang tua menunggu di luar agar dokter dapat membangun kepercayaan langsung dengan anak.",
              en: "For the first visit, yes. Once your child is comfortable, we usually suggest parents wait outside so the doctor can build direct trust with the child.",
            },
          },
          {
            question: { id: "Pasta gigi anak yang aman?", en: "What toothpaste is safe for kids?" },
            answer: {
              id: "Untuk anak di bawah 3 tahun, gunakan pasta gigi anak dengan kandungan fluoride 1.000 ppm seukuran beras. Usia 3-6 tahun, seukuran kacang polong.",
              en: "Under 3 years: kids' toothpaste with 1,000 ppm fluoride, rice-grain amount. Ages 3-6: pea-sized amount.",
            },
          },
          {
            question: { id: "Anak saya menangis terus, apa harus dipaksa?", en: "My child keeps crying, should I push through?" },
            answer: {
              id: "Tidak. Memaksa hari pertama justru memperkuat asosiasi negatif. Kami lebih suka split menjadi 2-3 kunjungan singkat agar anak adapt secara bertahap.",
              en: "No. Pushing through on day one reinforces the negative association. We prefer splitting into 2-3 short visits so the child adapts gradually.",
            },
          },
        ],
      },
    ],
    relatedServices: ["anak"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getCategory(id: ArticleCategoryId): ArticleCategory {
  return articleCategories.find((cat) => cat.id === id) ?? articleCategories[0];
}

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return sortedArticles().slice(0, limit);
  const sameCategory = articles.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const others = articles.filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
