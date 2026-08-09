import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { CATEGORIES, IMAGES } from "@/lib/site-data";
import { supabase, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/portfolio/")({
  loader: async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    return { items: (data as PortfolioItem[]) ?? [] };
  },
  head: () => ({
    meta: [
      { title: "Portofolio | SK.INTERIOR.DESIGN" },
      {
        name: "description",
        content:
          "Kumpulan proyek sipil, konstruksi baja, interior, dan furniture custom yang telah kami kerjakan sejak 2003.",
      },
      { property: "og:title", content: "Portofolio SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Jelajahi proyek pilihan kami." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { items: allItems } = Route.useLoaderData();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const items = cat === "All" ? allItems : allItems.filter((p) => p.category === cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portofolio Kami"
        title="Proyek yang Berbicara"
        subtitle="Setiap gambar adalah hasil kolaborasi kami dengan klien, presisi, kualitas, dan detail yang dikerjakan sungguh-sungguh."
        image={IMAGES.page}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
                cat === c
                  ? "bg-gradient-gold text-black"
                  : "border border-border text-foreground/70 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-12 text-center text-foreground/60">Belum ada proyek di kategori ini.</p>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="group relative block aspect-[4/3] overflow-hidden"
            >
              <img
                src={p.cover_image_url ?? IMAGES.page}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="eyebrow">{p.category}</div>
                <h3 className="mt-2 font-serif text-xl font-semibold">{p.title}</h3>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  View Project <ArrowRight size={14} />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-4 border border-gold/0 transition-all duration-500 group-hover:inset-3 group-hover:border-gold/60" />
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
