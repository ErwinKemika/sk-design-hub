import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Layanan | SK.INTERIOR.DESIGN" },
      {
        name: "description",
        content:
          "Custom furniture, sipil, konstruksi baja, dan desain interior: layanan lengkap sejak 2003.",
      },
      { property: "og:title", content: "Layanan SK.INTERIOR.DESIGN" },
      {
        property: "og:description",
        content: "Empat layanan lengkap: furniture, sipil, baja, interior.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Layanan Kami"
        title="Empat Layanan Satu Standar"
        subtitle="Dari furniture custom hingga struktur bangunan, semua dikerjakan tim yang sama, dengan standar kualitas yang konsisten."
        image={IMAGES.page}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {SERVICES.map((s, i) => (
          <section
            key={s.slug}
            className={`grid items-center gap-14 py-16 lg:grid-cols-2 ${
              i !== 0 ? "border-t border-border" : ""
            }`}
          >
            <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <img src={s.img} alt={s.title} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute -top-6 -left-4 hidden bg-gradient-gold px-6 py-4 font-serif text-3xl font-bold text-black md:block">
                {s.tag}
              </div>
            </div>
            <div>
              <div className="eyebrow">Layanan {s.tag}</div>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">
                {s.title}
              </h2>
              <p className="mt-6 text-foreground/75">{s.shortDesc}</p>
              <ul className="mt-8 space-y-3">
                {s.items.slice(0, 4).map((it) => (
                  <li key={it} className="flex gap-3 text-sm">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-gold text-gold">
                      <Check size={12} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/services/$slug" params={{ slug: s.slug }} className="btn-gold">
                  Lihat Detail Layanan <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline-gold">
                  Minta Penawaran
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-charcoal">
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
            <Link to="/portfolio" className="btn-outline-gold">
              Lihat Portofolio
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
