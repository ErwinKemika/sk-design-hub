import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { CATEGORIES, IMAGES, PORTFOLIO } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portofolio — SK.INTERIOR.DESIGN" },
      { name: "description", content: "Kumpulan proyek sipil, konstruksi baja, interior, dan furniture custom yang telah kami kerjakan sejak 2003." },
      { property: "og:title", content: "Portofolio SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Jelajahi proyek pilihan kami." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<(typeof PORTFOLIO)[number] | null>(null);
  const items = cat === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === cat);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portofolio Kami"
        title="Proyek yang Berbicara"
        subtitle="Setiap gambar adalah hasil kolaborasi kami dengan klien — presisi, kualitas, dan detail yang dikerjakan sungguh-sungguh."
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpen(p)}
              className="group relative aspect-[4/3] overflow-hidden text-left"
            >
              <img
                src={p.img}
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
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto border border-gold/40 bg-charcoal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border border-border bg-background text-foreground hover:border-gold hover:text-gold"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img src={open.img} alt={open.title} className="aspect-[16/10] w-full object-cover" />
            <div className="p-8 md:p-10">
              <div className="eyebrow">{open.category}</div>
              <h3 className="mt-3 font-serif text-3xl font-bold md:text-4xl">{open.title}</h3>
              <p className="mt-5 text-foreground/75">
                [Deskripsi proyek lengkap akan ditambahkan di sini — mencakup lingkup pekerjaan,
                material yang digunakan, tantangan teknis, dan hasil akhir yang dicapai.]
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm md:grid-cols-4">
                <div>
                  <div className="eyebrow">Kategori</div>
                  <div className="mt-2">{open.category}</div>
                </div>
                <div>
                  <div className="eyebrow">Lokasi</div>
                  <div className="mt-2">[Lokasi]</div>
                </div>
                <div>
                  <div className="eyebrow">Tahun</div>
                  <div className="mt-2">[2024]</div>
                </div>
                <div>
                  <div className="eyebrow">Klien</div>
                  <div className="mt-2">[Nama Klien]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
