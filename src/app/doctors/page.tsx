import type { Metadata } from "next";
import { DoctorsPage } from "@/components/DoctorsPage";

export const metadata: Metadata = {
  title: "Tim Dokter | Arcade Dental Bintaro",
  description:
    "Kenali tim dokter spesialis Arcade Dental: periodonsia, ortodonti, konservasi, kedokteran gigi anak, dan dokter umum berpengalaman.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    title: "Tim Dokter | Arcade Dental",
    description: "Tim dokter spesialis Arcade Dental siap mendampingi perawatan Anda.",
    url: "https://arcadedentalclinic.com/doctors",
  },
};

export default function Doctors() {
  return <DoctorsPage />;
}
