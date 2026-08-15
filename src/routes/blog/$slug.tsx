import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { ArrowLeft, Check, Clock, Copy, MessageCircle } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ArticleCard } from "@/components/site/ArticleCard";
import { CONTACT, IMAGES } from "@/lib/site-data";
import { supabase, type Article } from "@/lib/supabase";
import { estimateReadingMinutes, processContentHtml } from "@/lib/article-toc";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data: article } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();
    if (!article) throw notFound();

    const [{ data: related }, { data: recent }] = await Promise.all([
      supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .eq("category", article.category)
        .neq("slug", article.slug)
        .order("published_at", { ascending: false })
        .limit(3),
      supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .neq("slug", article.slug)
        .order("published_at", { ascending: false })
        .limit(4),
    ]);

    return {
      article: article as Article,
      related: (related as Article[]) ?? [],
      recent: (recent as Article[]) ?? [],
    };
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
  const { article, related, recent } = Route.useLoaderData();
  const { html: processedHtml, toc } = useMemo(
    () => processContentHtml(article.content_html),
    [article.content_html],
  );
  const readingMinutes = useMemo(
    () => estimateReadingMinutes(article.content_html),
    [article.content_html],
  );
  // DOMPurify needs a DOM; Tiptap's schema already limits output to safe tags
  // (p/h2/h3/ul/ol/li/strong/em/a/img), so raw HTML is only used during SSR
  // where no `window` exists, and sanitized once hydrated in the browser.
  const html = typeof window !== "undefined" ? DOMPurify.sanitize(processedHtml) : processedHtml;

  const [copied, setCopied] = useState(false);
  function handleCopyLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const shareText = encodeURIComponent(`${article.title} - SK.INTERIOR.DESIGN`);
  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  const publishedDate = article.published_at ?? article.created_at;
  const formattedDate = new Date(publishedDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo_description || article.excerpt || undefined,
    image: article.cover_image_url ?? undefined,
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: "SK.INTERIOR.DESIGN" },
    publisher: { "@type": "Organization", name: "SK.INTERIOR.DESIGN" },
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        image={article.cover_image_url ?? IMAGES.page}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/60">
            <span className="eyebrow !text-gold">{article.category}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {readingMinutes} menit baca
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bagikan ke WhatsApp"
              className="grid h-9 w-9 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle size={15} />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Salin link"
              className="grid h-9 w-9 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {toc.length > 0 && (
              <details className="mb-8 border border-border bg-charcoal p-5 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-gold">
                  Daftar Isi
                </summary>
                <ul className="mt-4 space-y-2 text-sm">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "ml-4" : ""}>
                      <a href={`#${t.id}`} className="text-foreground/70 hover:text-gold">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {article.excerpt && (
              <p className="text-lg leading-relaxed text-foreground/75">{article.excerpt}</p>
            )}
            <div className="article-content mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            {toc.length > 0 && (
              <div className="hidden border border-border p-6 lg:block">
                <div className="eyebrow">Daftar Isi</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "ml-4" : ""}>
                      <a
                        href={`#${t.id}`}
                        className="text-foreground/70 transition-colors hover:text-gold"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border border-gold/30 bg-charcoal p-6 text-center">
              <div className="font-serif text-lg font-bold">Punya Proyek Serupa?</div>
              <p className="mt-2 text-sm text-foreground/70">
                Konsultasikan kebutuhan Anda, gratis tanpa komitmen.
              </p>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-4 w-full !text-xs justify-center"
              >
                Konsultasi via WhatsApp
              </a>
            </div>

            {recent.length > 0 && (
              <div className="border border-border p-6">
                <div className="eyebrow">Artikel Terbaru</div>
                <ul className="mt-4 space-y-4">
                  {recent.map((r) => (
                    <li key={r.id}>
                      <Link to="/blog/$slug" params={{ slug: r.slug }} className="group flex gap-3">
                        <img
                          src={r.cover_image_url ?? IMAGES.page}
                          alt=""
                          className="h-14 w-14 shrink-0 object-cover"
                        />
                        <span className="text-sm font-medium leading-snug text-foreground/85 transition-colors group-hover:text-gold">
                          {r.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-charcoal py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="eyebrow text-center">Baca Juga</div>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold md:text-4xl">
              Artikel <span className="text-gradient-gold">Terkait</span>
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
