import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";
import { supabase, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();
    if (!data) throw notFound();
    return { item: data as PortfolioItem };
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
  const { item } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        image={item.cover_image_url ?? IMAGES.page}
      />

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Portofolio
        </Link>

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
      </section>
    </SiteLayout>
  );
}
