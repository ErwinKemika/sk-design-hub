import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";
import { supabase, type Article } from "@/lib/supabase";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    return { posts: (data as Article[]) ?? [] };
  },
  head: () => ({
    meta: [
      { title: "Blog & Artikel | SK.INTERIOR.DESIGN" },
      {
        name: "description",
        content:
          "Wawasan seputar konstruksi, desain interior, dan furniture custom dari tim SK.INTERIOR.DESIGN.",
      },
      { property: "og:title", content: "Blog SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Tips konstruksi, interior, dan furniture custom." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog & Artikel"
        title="Wawasan Konstruksi & Interior"
        subtitle="Kumpulan tulisan tim kami tentang tips, wawasan proyek, dan panduan praktis seputar konstruksi & desain."
        image={IMAGES.page}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {posts.length === 0 && (
          <p className="text-center text-foreground/60">Belum ada artikel yang dipublikasikan.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block border border-border transition-colors hover:border-gold"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover_image_url ?? IMAGES.page}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="eyebrow !text-gold">{p.category}</span>
                  {p.published_at && (
                    <>
                      <span>·</span>
                      <span>
                        {new Date(p.published_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/70">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
