"use client";

import { PageShell } from "./PageShell";
import { ArticleDetail } from "./sections/articles/ArticleDetail";

interface ArticleDetailPageProps {
  slug: string;
}

export function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  return (
    <PageShell>
      <ArticleDetail slug={slug} />
    </PageShell>
  );
}
