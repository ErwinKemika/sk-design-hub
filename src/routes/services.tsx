import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Layanan — SK.INTERIOR.DESIGN" },
      { name: "description", content: "Sipil, konstruksi baja, desain interior, dan furniture custom — layanan lengkap sejak 2003." },
      { property: "og:title", content: "Layanan SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Empat layanan lengkap: sipil, baja, interior, furniture." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    tag: "01",
    title: "Jasa Pekerjaan Sipil",
    img: IMAGES.civil,
    desc: "Layanan konstruksi sipil menyeluruh — dari pondasi hingga finishing struktur bangunan. Kami menangani proyek residensial dan komersial dengan pendekatan teknis yang matang.",
    items: ["Pembangunan struktur baru", "Renovasi & pengembangan bangunan", "Pondasi & pekerjaan beton", "Manajemen proyek end-to-end"],
  },
  {
    tag: "02",
    title: "Konstruksi Baja",
    img: IMAGES.steel,
    desc: "Struktur baja presisi untuk berbagai kebutuhan — mulai kanopi rumah hingga gudang industri berskala besar. Fabrikasi in-house dengan quality control ketat.",
    items: ["Rangka atap & kanopi baja ringan/berat", "Struktur gudang & pabrik", "Mezzanine & platform baja", "Fabrikasi baja custom sesuai gambar"],
  },
  {
    tag: "03",
    title: "Desain & Interior",
    img: IMAGES.interior,
    desc: "Menerjemahkan gaya hidup dan identitas brand Anda ke dalam ruang — dari konsep, 3D render, hingga eksekusi finishing yang matang.",
    items: ["Interior rumah tinggal", "Interior kantor & ruang komersial", "Konsultasi konsep & moodboard", "Finishing interior menyeluruh"],
  },
  {
    tag: "04",
    title: "Custom Furniture",
    img: IMAGES.furniture,
    desc: "Furniture dirancang khusus untuk ukuran, material, dan gaya ruang Anda. Presisi milimeter, hasil akhir yang rapi dan tahan lama.",
    items: ["Kitchen set custom", "Lemari & wardrobe custom", "Meja kerja, meja makan, meja custom", "Furniture custom lainnya sesuai kebutuhan"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Layanan Kami"
        title="Empat Layanan Satu Standar"
        subtitle="Dari struktur bangunan hingga detail furniture — semua dikerjakan tim yang sama, dengan standar kualitas yang konsisten."
        image={IMAGES.page}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {SERVICES.map((s, i) => (
          <section
            key={s.tag}
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
              <p className="mt-6 text-foreground/75">{s.desc}</p>
              <ul className="mt-8 space-y-3">
                {s.items.map((it) => (
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
            Ceritakan visi Anda, tim kami akan bantu memetakan kebutuhan teknis, estimasi biaya,
            dan timeline pengerjaan.
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
