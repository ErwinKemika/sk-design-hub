import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES, PORTFOLIO } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Artikel — SK.INTERIOR.DESIGN" },
      { name: "description", content: "Wawasan seputar konstruksi, desain interior, dan furniture custom dari tim SK.INTERIOR.DESIGN." },
      { property: "og:title", content: "Blog SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Tips konstruksi, interior, dan furniture custom." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  { title: "5 Kesalahan Umum Saat Merenovasi Rumah dan Cara Menghindarinya", cat: "Tips Renovasi", date: "12 Jul 2026", excerpt: "Renovasi rumah bukan sekadar merapikan tampilan. Kesalahan kecil di awal bisa berdampak besar pada biaya dan waktu pengerjaan." },
  { title: "Kelebihan Struktur Baja untuk Bangunan Modern", cat: "Konstruksi", date: "28 Jun 2026", excerpt: "Konstruksi baja menawarkan kecepatan, kekuatan, dan fleksibilitas desain yang sulit ditandingi material lain." },
  { title: "Memilih Material Kitchen Set yang Tahan Lama", cat: "Interior", date: "15 Jun 2026", excerpt: "Dari HPL hingga solid wood — pahami karakter material sebelum memutuskan investasi kitchen set Anda." },
  { title: "Cara Menentukan Konsep Interior Rumah yang Konsisten", cat: "Interior", date: "02 Jun 2026", excerpt: "Konsep yang matang membuat rumah terasa selaras dari ruang tamu hingga kamar tidur." },
  { title: "Tips Membangun Gudang dengan Struktur Baja", cat: "Konstruksi", date: "18 Mei 2026", excerpt: "Perencanaan bentang, tinggi, dan sirkulasi udara menjadi kunci gudang yang efisien." },
  { title: "Wardrobe Custom vs Beli Jadi: Mana yang Lebih Efisien?", cat: "Furniture", date: "05 Mei 2026", excerpt: "Custom bukan selalu lebih mahal — tergantung ukuran ruang dan kebutuhan penyimpanan Anda." },
  { title: "Perencanaan Anggaran Proyek Konstruksi Sipil", cat: "Konstruksi", date: "20 Apr 2026", excerpt: "Alokasi cadangan biaya dan tahap pembayaran yang jelas melindungi proyek dari over-budget." },
  { title: "Mendesain Kantor yang Meningkatkan Produktivitas", cat: "Interior", date: "08 Apr 2026", excerpt: "Pencahayaan, akustik, dan tata letak mempengaruhi fokus tim lebih dari yang Anda kira." },
  { title: "Furniture Multifungsi untuk Rumah Berukuran Kecil", cat: "Furniture", date: "25 Mar 2026", excerpt: "Setiap sentimeter matter — pelajari trik furniture custom untuk memaksimalkan ruang mungil Anda." },
];

function BlogPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog & Artikel"
        title="Wawasan Konstruksi & Interior"
        subtitle="Kumpulan tulisan tim kami tentang tips, wawasan proyek, dan panduan praktis seputar konstruksi & desain."
        image={IMAGES.page}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Link
              key={i}
              to="/blog"
              className="group block border border-border transition-colors hover:border-gold"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={PORTFOLIO[i % PORTFOLIO.length].img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="eyebrow !text-gold">{p.cat}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/70">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
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
