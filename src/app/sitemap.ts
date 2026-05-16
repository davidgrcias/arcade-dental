import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arcadedentalclinic.com";
  const now = new Date("2026-05-16");
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/doctors`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];
}
