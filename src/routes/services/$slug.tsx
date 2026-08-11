import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";
import { getServiceBySlug } from "@/lib/services-data";
import { supabase, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();

    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("status", "published")
      .eq("category", service.category)
      .order("created_at", { ascending: false })
      .limit(6);

    return { service, related: (data as PortfolioItem[]) ?? [] };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return {};
    return {
      meta: [
        { title: service.seoTitle },
        { name: "description", content: service.seoDescription },
        { property: "og:title", content: service.seoTitle },
        { property: "og:description", content: service.seoDescription },
        { property: "og:image", content: service.img },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service, related } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`Layanan ${service.tag}`}
        title={service.title}
        subtitle={service.heroSubtitle}
        image={service.img}
      />

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Layanan
        </Link>

        <div className="mt-8 space-y-5">
          {service.intro.map((p, i) => (
            <p key={i} className="text-foreground/75">
              {p}
            </p>
          ))}
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {service.items.map((it) => (
            <li key={it} className="flex gap-3 text-sm">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-gold text-gold">
                <Check size={12} />
              </span>
              {it}
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn-outline-gold mt-10">
          Minta Penawaran <ArrowRight size={16} />
        </Link>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <div className="eyebrow">Proses Kerja</div>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
              Bagaimana Kami <span className="text-gradient-gold">Mengerjakannya</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title}>
                <div className="font-serif text-3xl font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related portfolio */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">Proyek Terkait</div>
              <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
                Hasil <span className="text-gradient-gold">Pekerjaan Kami</span>
              </h2>
            </div>
            <Link to="/portfolio" className="btn-outline-gold">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
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
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border bg-charcoal">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
          <div className="eyebrow">Konsultasi</div>
          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
            Konsultasikan <span className="text-gradient-gold">Proyek Anda</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-foreground/75">
            Ceritakan visi Anda, tim kami akan bantu memetakan kebutuhan teknis, estimasi biaya, dan
            timeline pengerjaan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-gold">
              Konsultasikan Proyek <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-outline-gold">
              Lihat Layanan Lain
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
