import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/site-data";
import type { PortfolioItem } from "@/lib/supabase";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: item.slug }}
      className="group relative block aspect-[4/3] overflow-hidden"
    >
      <img
        src={item.cover_image_url ?? IMAGES.page}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="eyebrow">{item.category}</div>
        <h3 className="mt-2 font-serif text-xl font-semibold">{item.title}</h3>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
          View Project <ArrowRight size={14} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-4 border border-gold/0 transition-all duration-500 group-hover:inset-3 group-hover:border-gold/60" />
    </Link>
  );
}
