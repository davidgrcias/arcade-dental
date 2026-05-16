import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Space_Mono } from "next/font/google";
import { business } from "@/lib/content";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcadedentalclinic.com"),
  title: "Arcade Dental Bintaro | Klinik Gigi Spesialis Tangerang Selatan",
  description:
    "Arcade Dental adalah klinik gigi spesialis di Bintaro dengan dokter ahli, teknologi painless, layanan ortodonti, implan, estetika, dan rekanan BCA Life.",
  keywords: [
    "klinik gigi bintaro",
    "dokter gigi spesialis bintaro",
    "ortodonti bintaro",
    "implan gigi bintaro",
    "Arcade Dental",
    "BCA Life dental",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arcade Dental | Spesialis Perawatan Gigi Bintaro",
    description:
      "Perawatan gigi spesialis dengan teknologi painless di Bintaro. Tim dokter ahli dan rekanan BCA Life.",
    url: "https://arcadedentalclinic.com",
    siteName: "Arcade Dental",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-arcade-dental.svg",
        width: 1200,
        height: 630,
        alt: "Arcade Dental Bintaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Dental Bintaro",
    description: "Klinik gigi spesialis di Bintaro dengan teknologi painless dan tim dokter ahli.",
    images: ["/og-arcade-dental.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/assets/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/assets/logo.jpg",
    apple: "/assets/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: business.name,
    description: business.tagline.id,
    url: business.website,
    telephone: business.phoneDisplay,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ruko Kebayoran Arcade 2, Blok B2 No. 19, Jl. Boulevard Bintaro Jaya Sektor 7",
      addressLocality: "Pondok Aren",
      addressRegion: "Tangerang Selatan",
      postalCode: "15220",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    sameAs: [business.instagram, business.facebook],
    areaServed: ["Bintaro", "Tangerang Selatan", "Pondok Aren", "Ciputat"],
    medicalSpecialty: ["Dentistry", "Orthodontics", "Periodontics", "Oral Surgery", "Pediatric Dentistry"],
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
