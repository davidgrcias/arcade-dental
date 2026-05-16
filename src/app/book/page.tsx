import type { Metadata } from "next";
import { BookPage } from "@/components/BookPage";

export const metadata: Metadata = {
  title: "Booking Real-time | Arcade Dental Bintaro",
  description:
    "Pilih dokter, jadwal, dan layanan secara real-time. Konfirmasi booking Anda di Arcade Dental dalam 4 langkah.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Booking Real-time Arcade Dental",
    description: "Pilih dokter dan jadwal yang tersedia di Arcade Dental Bintaro.",
    url: "/book",
    type: "website",
  },
};

export default function Page() {
  return <BookPage />;
}
