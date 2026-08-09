import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { ArrowLeft } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";
import { supabase, type Article } from "@/lib/supabase";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();
    if (!data) throw notFound();
    return { article: data as Article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    const title = article.seo_title || `${article.title} | SK.INTERIOR.DESIGN`;
    const description = article.seo_description || article.excerpt || undefined;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        ...(article.cover_image_url
          ? [{ property: "og:image", content: article.cover_image_url }]
          : []),
      ],
    };
  },
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { article } = Route.useLoaderData();
  // DOMPurify needs a DOM; Tiptap's schema already limits output to safe tags
  // (p/h2/h3/ul/ol/li/strong/em/a/img), so raw HTML is only used during SSR
  // where no `window` exists, and sanitized once hydrated in the browser.
  const html =
    typeof window !== "undefined" ? DOMPurify.sanitize(article.content_html) : article.content_html;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        image={article.cover_image_url ?? IMAGES.page}
      />

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Blog
        </Link>

        <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </SiteLayout>
  );
}
