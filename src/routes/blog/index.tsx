import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ArticleCard } from "@/components/site/ArticleCard";
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
            <ArticleCard key={p.id} article={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
