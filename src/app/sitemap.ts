import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arcadedentalclinic.com";
  const now = new Date("2026-05-16");
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/doctors`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
