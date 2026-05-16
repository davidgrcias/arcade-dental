import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Layanan & Teknologi | Arcade Dental Bintaro",
  description:
    "Temukan layanan lengkap Arcade Dental: ortodonti, implan, estetika, konservasi, periodonsia, dan lebih banyak lagi. Didukung teknologi dental terkini.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Layanan & Teknologi | Arcade Dental",
    description: "Layanan gigi spesialis lengkap dengan teknologi painless di Bintaro.",
    url: "https://arcadedentalclinic.com/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
