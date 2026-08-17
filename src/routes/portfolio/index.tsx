import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { PortfolioCard } from "@/components/site/PortfolioCard";
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
            <PortfolioCard key={p.id} item={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
