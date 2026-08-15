import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/site-data";
import type { Article } from "@/lib/supabase";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group block border border-border transition-colors hover:border-gold"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.cover_image_url ?? IMAGES.page}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="eyebrow !text-gold">{article.category}</span>
          {article.published_at && (
            <>
              <span>·</span>
              <span>
                {new Date(article.published_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>
        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-gold">
          {article.title}
        </h3>
        <p className="mt-3 text-sm text-foreground/70">{article.excerpt}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
          Read More <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
