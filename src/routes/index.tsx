import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  Hammer,
  Quote,
  Sofa,
  Star,
  Wrench,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import { CircularGallery } from "@/components/site/CircularGallery";
import { ParticleWave } from "@/components/ui/particle-wave";
import { IMAGES } from "@/lib/site-data";
import { supabase, type Article, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [{ data: portfolio }, { data: posts }] = await Promise.all([
      supabase
        .from("portfolio_items")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3),
    ]);
    return {
      portfolio: (portfolio as PortfolioItem[]) ?? [],
      posts: (posts as Article[]) ?? [],
    };
  },
  head: () => ({
    meta: [
      { title: "SK.INTERIOR.DESIGN | Wujudkan Ruang Impian" },
      {
        name: "description",
        content:
          "Sejak 2003. Pekerjaan sipil, konstruksi baja, desain interior, dan furniture custom dengan presisi dan kualitas terbaik.",
      },
      { property: "og:title", content: "SK.INTERIOR.DESIGN | Wujudkan Ruang Impian" },
      {
        property: "og:description",
        content:
          "Konstruksi & interior premium sejak 2003. Sipil, baja, interior, furniture custom.",
      },
    ],
  }),
  component: HomePage,
});

const SLIDES = [
  {
    img: IMAGES.hero1,
    eyebrow: "Sejak 2003 · Konstruksi & Interior",
    title: "Wujudkan Ruang Impian, Dari Struktur Hingga Detail Terkecil",
  },
  {
    img: IMAGES.hero2,
    eyebrow: "One-Stop Solution",
    title: "Sipil, Baja, Interior, & Furniture Custom Dalam Satu Tangan",
  },
  {
    img: IMAGES.hero3,
    eyebrow: "Presisi & Kualitas",
    title: "Dua Dekade Membangun Hunian, Ruang Kerja, & Detail Furniture",
  },
];

const SERVICES = [
  {
    icon: Building2,
    title: "Pekerjaan Sipil",
    desc: "Pembangunan struktur, renovasi, pondasi, dan manajemen proyek dengan standar teknis tinggi.",
  },
  {
    icon: Hammer,
    title: "Konstruksi Baja",
    desc: "Rangka atap, kanopi, struktur gudang, mezzanine, hingga fabrikasi baja custom.",
  },
  {
    icon: Sofa,
    title: "Desain & Interior",
    desc: "Interior rumah, kantor, dan komersial, dari konsep hingga finishing.",
  },
  {
    icon: Wrench,
    title: "Custom Furniture",
    desc: "Kitchen set, lemari, meja, dan furniture custom presisi milimeter.",
  },
];

const WHY = [
  {
    title: "20+ Tahun Pengalaman",
    desc: "Rekam jejak sejak 2003 di proyek residensial hingga komersial.",
  },
  {
    title: "Layanan Lengkap Satu Atap",
    desc: "Sipil, baja, interior, dan furniture, tanpa pindah vendor.",
  },
  {
    title: "Kualitas & Presisi Custom",
    desc: "Setiap sambungan, finishing, dan detail dikerjakan terukur.",
  },
  {
    title: "Dipercaya Klien Rumahan & Komersial",
    desc: "Hunian pribadi, ruko, kantor, hingga gudang industri.",
  },
];

const CLIENTS_PLACEHOLDER = Array.from({ length: 8 }, (_, i) => `Klien ${i + 1}`);

const TESTIMONIALS = [
  {
    name: "[Nama Klien]",
    role: "Pemilik Rumah · Bintaro",
    text: "Tim SK sangat detail dari desain sampai finishing. Kitchen set kami rapi presisi, hasilnya jauh melebihi ekspektasi.",
    stars: 5,
  },
  {
    name: "[Nama Klien]",
    role: "Direktur · PT Placeholder",
    text: "Pengerjaan struktur baja untuk gudang kami selesai tepat waktu dan sangat kokoh. Komunikasi rapi.",
    stars: 5,
  },
  {
    name: "[Nama Klien]",
    role: "Pemilik Kafe · Kemang",
    text: "Renovasi interior kafe kami dibuat sesuai konsep. Estetik, fungsional, dan tahan lama.",
    stars: 5,
  },
];

function HomePage() {
  const { portfolio, posts } = Route.useLoaderData();
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout>
      {/* HERO SLIDER */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt=""
              className={`h-full w-full object-cover ${i === slide ? "kenburns" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
          </div>
        ))}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 lg:px-10">
          <div key={slide} className="max-w-3xl fade-in-up">
            <div className="eyebrow">{SLIDES[slide].eyebrow}</div>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {SLIDES[slide].title.split(",").map((chunk, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-gradient-gold">{chunk}</span> : chunk}
                  {i === 0 && ","}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg">
              Mitra konstruksi & interior terpercaya sejak 2003, sipil, baja, desain, dan furniture
              custom dikerjakan dengan presisi.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-gold">
                Konsultasi Gratis <ArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn-outline-gold">
                Lihat Portofolio Kami
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-[3px] w-10 transition-all ${
                  i === slide ? "bg-gradient-gold" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img src={IMAGES.about} alt="About" className="h-[520px] w-full object-cover" />
            <div className="absolute -bottom-8 -right-4 hidden bg-gradient-gold px-8 py-6 text-black md:block">
              <div className="font-serif text-5xl font-bold">20+</div>
              <div className="eyebrow !text-black/70">Tahun Pengalaman</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">About SK.Interior.Design</div>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Strategi & <span className="text-gradient-gold">Presisi</span> di Setiap Detail
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/75">
              SK.INTERIOR.DESIGN adalah mitra terpercaya untuk kebutuhan konstruksi dan interior
              Anda, mulai dari pekerjaan sipil, konstruksi baja, desain interior, hingga furniture
              custom seperti meja, kitchen set, dan lemari. Berpengalaman sejak 2003, kami
              mengerjakan setiap proyek dengan presisi, kualitas material terbaik, dan hasil akhir
              yang tahan lama.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Sejak 2003",
                "One-Stop Solution",
                "Presisi Custom",
                "Klien Rumahan & Komersial",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center border border-gold text-gold">
                    <Check size={12} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-outline-gold mt-10">
              Read More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <ParticleWave className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Layanan Kami</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Empat Layanan, <span className="text-gradient-gold">Satu Standar</span>
            </h2>
            <p className="mt-4 text-foreground/70">
              Dari struktur hingga detail furniture, semua dikerjakan tim yang sama, dengan standar
              kualitas yang konsisten.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group relative border border-border bg-background p-8 transition-all hover:border-gold"
              >
                <s.icon className="text-gold" size={40} strokeWidth={1.4} />
                <h3 className="mt-6 font-serif text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-all group-hover:gap-3"
                >
                  Read More <ArrowRight size={14} />
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-[2px] scale-x-0 bg-gradient-gold transition-transform group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      {portfolio.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <div className="eyebrow">Portofolio Terbaru</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Proyek <span className="text-gradient-gold">Pilihan</span>
            </h2>
            <p className="mt-12 text-foreground/60">Belum ada proyek portofolio.</p>
          </div>
        </section>
      ) : (
        <CircularGallery items={portfolio} />
      )}

      {/* STATS */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.hero2} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <Counter end={20} label="Tahun Pengalaman" />
          <Counter end={250} label="Proyek Selesai" />
          <Counter end={180} label="Klien Puas" />
          <Counter end={35} label="Tim Profesional" />
        </div>
      </section>

      {/* TRUSTED BY / CLIENTS */}
      <section className="relative overflow-hidden py-24">
        <img
          src="/images/site/indonesia-dots.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[1400px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <div className="eyebrow">Klien & Mitra</div>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight md:text-4xl">
            Dipercaya oleh{" "}
            <span className="relative inline-block text-gold">
              50+
              <svg
                viewBox="0 0 100 12"
                className="absolute -bottom-1 left-0 h-3 w-full text-gold"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 C 25 2, 75 2, 98 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            klien & mitra dari berbagai sektor
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/60">
            Rumah tinggal, kantor, ruko, hingga proyek kolaborasi dengan studio desain dan kontraktor
            mitra di seluruh Indonesia.
          </p>
        </div>
        <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 lg:px-10">
          {CLIENTS_PLACEHOLDER.map((label) => (
            <div
              key={label}
              className="grid h-20 place-items-center border border-dashed border-border text-foreground/30 transition-colors hover:border-gold/40 hover:text-foreground/50"
            >
              <div className="flex flex-col items-center gap-1.5">
                <Building2 size={20} strokeWidth={1.4} />
                <span className="text-[10px] uppercase tracking-widest">Logo {label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Kenapa Memilih Kami</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Dua Dekade <span className="text-gradient-gold">Kepercayaan</span>
            </h2>
            <p className="mt-6 text-foreground/75">
              Kami tidak hanya membangun struktur atau memasang furniture. Kami membangun hubungan
              jangka panjang dengan klien lewat konsistensi kualitas.
            </p>
            <Link to="/about" className="btn-outline-gold mt-8">
              Cerita Lengkap <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="border border-border p-6 transition-colors hover:border-gold"
              >
                <div className="font-serif text-3xl font-bold text-gradient-gold">0{i + 1}</div>
                <h3 className="mt-4 font-serif text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center">
            <div className="eyebrow">Testimoni Klien</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Kata Mereka <span className="text-gradient-gold">Tentang Kami</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="relative border border-border bg-background p-8">
                <Quote className="absolute right-6 top-6 text-gold/30" size={48} />
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-foreground/85">"{t.text}"</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-serif text-base font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="relative border border-gold/40 bg-charcoal p-10 md:p-16">
          <Award className="absolute right-8 top-8 text-gold/20" size={80} />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow">Mari Bicara</div>
              <h2 className="mt-4 font-serif text-3xl font-bold md:text-5xl">
                Siap Mewujudkan <span className="text-gradient-gold">Proyek Anda?</span>
              </h2>
              <p className="mt-4 max-w-2xl text-foreground/75">
                Konsultasikan ide, kebutuhan, dan anggaran Anda. Tim kami siap membantu dari tahap
                perencanaan hingga serah terima.
              </p>
            </div>
            <Link to="/contact" className="btn-gold">
              Hubungi Kami <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Blog & Artikel</div>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Wawasan <span className="text-gradient-gold">Terbaru</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-outline-gold">
            Semua Artikel <ArrowRight size={16} />
          </Link>
        </div>
        {posts.length === 0 && (
          <p className="mt-12 text-center text-foreground/60">
            Belum ada artikel yang dipublikasikan.
          </p>
        )}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((b) => (
            <Link
              key={b.id}
              to="/blog/$slug"
              params={{ slug: b.slug }}
              className="group block border border-border transition-colors hover:border-gold"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.cover_image_url ?? IMAGES.page}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="eyebrow !text-gold">{b.category}</span>
                  {b.published_at && (
                    <>
                      <span>·</span>
                      <span>
                        {new Date(b.published_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-gold">
                  {b.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
