import type { Metadata } from "next";
import { ArticlesIndexPage } from "@/components/ArticlesIndexPage";

export const metadata: Metadata = {
  title: "Edukasi Gigi & Mulut | Arcade Dental Bintaro",
  description:
    "Artikel edukasi seputar perawatan gigi, prosedur, risiko, dan aftercare. Ditulis oleh tim dokter Arcade Dental.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Edukasi Arcade Dental",
    description:
      "Panduan perawatan gigi yang ditulis oleh dokter spesialis & umum Arcade Dental.",
    url: "/articles",
    type: "website",
  },
};

export default function Page() {
  return <ArticlesIndexPage />;
}
