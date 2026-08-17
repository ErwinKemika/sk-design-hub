import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/supabase";
import { IMAGES } from "@/lib/site-data";
import {
  CircularGallery as CircularGallery3D,
  type GalleryItem,
} from "@/components/ui/circular-gallery";
import { ParticleWave } from "@/components/ui/particle-wave";

export function CircularGallery({ items }: { items: PortfolioItem[] }) {
  const navigate = useNavigate();
  const galleryData: GalleryItem[] = items.map((item) => ({
    common: item.title,
    binomial: item.category,
    photo: {
      url: item.cover_image_url ?? IMAGES.page,
      text: item.title,
    },
  }));

  return (
    <>
      {/* Desktop: drag / swipe / arrow-controlled 3D circular gallery */}
      <section className="relative hidden overflow-hidden bg-charcoal py-24 lg:block">
        <ParticleWave className="pointer-events-none opacity-60" />
        <div className="relative z-10 text-center">
          <div className="eyebrow">Portofolio Terbaru</div>
          <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
            Proyek <span className="text-gradient-gold">Pilihan</span>
          </h2>
          <p className="mt-3 text-sm text-foreground/50">
            Geser ke kiri / kanan untuk melihat proyek lain
          </p>
        </div>
        <div className="relative z-10 mx-auto mt-10 h-[70vh] max-h-[560px] w-full">
          <CircularGallery3D
            items={galleryData}
            radius={420}
            onItemClick={(index) => {
              const item = items[index];
              if (item) navigate({ to: "/portfolio/$slug", params: { slug: item.slug } });
            }}
          />
        </div>
        <div className="relative z-10 mt-10 text-center">
          <Link to="/portfolio" className="btn-outline-gold">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Mobile / tablet: simple horizontal scroll row */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:hidden lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Portofolio Terbaru</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Proyek <span className="text-gradient-gold">Pilihan</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-outline-gold">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to="/portfolio/$slug"
              params={{ slug: item.slug }}
              className="group relative block aspect-[4/3] w-64 shrink-0 overflow-hidden"
            >
              <img
                src={item.cover_image_url ?? IMAGES.page}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4">
                <div className="eyebrow">{item.category}</div>
                <div className="mt-1 font-serif text-base font-semibold">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
