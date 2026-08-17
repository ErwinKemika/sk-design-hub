import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { IMAGES } from "@/lib/site-data";
import { supabase, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }) => {
    const { data: item } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();
    if (!item) throw notFound();

    const { data: related } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("status", "published")
      .eq("category", item.category)
      .neq("slug", item.slug)
      .order("created_at", { ascending: false })
      .limit(3);

    return {
      item: item as PortfolioItem,
      related: (related as PortfolioItem[]) ?? [],
    };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    if (!item) return {};
    const title = item.seo_title || `${item.title} | SK.INTERIOR.DESIGN`;
    const description = item.seo_description || item.description || undefined;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        ...(item.cover_image_url ? [{ property: "og:image", content: item.cover_image_url }] : []),
      ],
    };
  },
  component: PortfolioDetailPage,
});

function PortfolioDetailPage() {
  const { item, related } = Route.useLoaderData();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const image = item.cover_image_url ?? IMAGES.page;

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <SiteLayout>
      <PageHero eyebrow={item.category} title={item.title} image={image} />

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Portofolio
        </Link>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative mt-8 block w-full overflow-hidden"
        >
          <img
            src={image}
            alt={item.title}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white">
              <ZoomIn size={16} /> Lihat Gambar Penuh
            </span>
          </div>
        </button>

        {item.description && <p className="mt-8 text-foreground/75">{item.description}</p>}

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm md:grid-cols-4">
          <div>
            <div className="eyebrow">Kategori</div>
            <div className="mt-2">{item.category}</div>
          </div>
          <div>
            <div className="eyebrow">Lokasi</div>
            <div className="mt-2">{item.location || "-"}</div>
          </div>
          <div>
            <div className="eyebrow">Tahun</div>
            <div className="mt-2">{item.year || "-"}</div>
          </div>
          <div>
            <div className="eyebrow">Klien</div>
            <div className="mt-2">{item.client || "-"}</div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm text-foreground/70">
            Tertarik dengan hasil serupa untuk proyek Anda?
          </p>
          <Link to="/contact" className="btn-gold mt-4">
            Konsultasikan Proyek Anda <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-charcoal py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="eyebrow text-center">Lainnya</div>
            <h2 className="mt-3 text-center font-serif text-3xl font-bold md:text-4xl">
              Proyek <span className="text-gradient-gold">Terkait</span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PortfolioCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-white/30 text-white transition-colors hover:border-gold hover:text-gold"
          >
            <X size={20} />
          </button>
          <img
            src={image}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SiteLayout>
  );
}
