import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/ArticleDetailPage";
import { articles, getArticleBySlug } from "@/lib/articles";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Artikel tidak ditemukan | Arcade Dental" };
  }

  return {
    title: `${article.title.id} | Arcade Dental`,
    description: article.dek.id,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title.id,
      description: article.dek.id,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.cover ? [{ url: article.cover }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleDetailPage slug={slug} />;
}
