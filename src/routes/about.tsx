import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, Shield, Sparkles } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — SK.INTERIOR.DESIGN" },
      { name: "description", content: "Kisah perjalanan SK.INTERIOR.DESIGN sejak 2003 — dari kontraktor sipil menjadi mitra one-stop konstruksi & interior." },
      { property: "og:title", content: "Tentang SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Sejak 2003, membangun ruang dengan presisi dan integritas." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Sparkles, title: "Kualitas", desc: "Material terbaik, pengerjaan presisi, hasil akhir yang tahan waktu." },
  { icon: Shield, title: "Integritas", desc: "Transparan dalam biaya, jujur dalam proses, konsisten dalam janji." },
  { icon: HeartHandshake, title: "Kolaborasi", desc: "Mendengarkan klien dan bekerja sebagai satu tim menuju hasil terbaik." },
  { icon: Compass, title: "Konsistensi", desc: "Standar yang sama untuk proyek kecil maupun skala besar." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tentang Kami"
        title="Dua Dekade Membangun Ruang"
        subtitle="Dari pekerjaan sipil hingga furniture custom — perjalanan panjang yang dibangun di atas kepercayaan."
        image={IMAGES.page}
      />

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div className="relative">
            <img src={IMAGES.about} alt="" className="h-[560px] w-full object-cover" />
            <div className="absolute -bottom-6 -left-4 hidden bg-gradient-gold px-8 py-6 text-black md:block">
              <div className="font-serif text-5xl font-bold">2003</div>
              <div className="eyebrow !text-black/70">Established</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">Cerita Kami</div>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Berawal dari <span className="text-gradient-gold">Satu Komitmen</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/80">
              <p>
                SK.INTERIOR.DESIGN berdiri sejak tahun 2003, berawal dari layanan pekerjaan sipil
                skala kecil hingga menengah. Seiring berjalannya waktu dan kepercayaan klien yang
                terus tumbuh, kami memperluas layanan ke konstruksi baja, desain interior, dan
                furniture custom.
              </p>
              <p>
                Hari ini, kami hadir sebagai <span className="text-gold">one-stop solution</span>{" "}
                untuk kebutuhan bangunan dan ruang Anda. Sipil, baja, interior, hingga meja, kitchen
                set, dan lemari — semua dikerjakan tim yang sama, dengan standar kualitas yang
                konsisten.
              </p>
              <p>
                Setiap proyek — sekecil apapun — kami kerjakan dengan presisi, kualitas material
                terbaik, dan hasil akhir yang tahan lama. Karena bagi kami, membangun bukan sekadar
                menyusun struktur; ia adalah bentuk kepercayaan yang harus dijaga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 lg:px-10">
          <div className="border border-gold/30 bg-background p-10">
            <div className="eyebrow">Visi</div>
            <h3 className="mt-4 font-serif text-3xl font-bold">
              Menjadi mitra <span className="text-gradient-gold">konstruksi & interior</span>{" "}
              terpercaya di setiap tahap.
            </h3>
            <p className="mt-6 text-foreground/75">
              Menghadirkan solusi lengkap yang menyatukan kekuatan struktur, estetika desain, dan
              ketelitian furniture — dalam satu standar mutu yang tinggi.
            </p>
          </div>
          <div className="border border-border bg-background p-10">
            <div className="eyebrow">Misi</div>
            <ul className="mt-6 space-y-4 text-foreground/80">
              {[
                "Mengerjakan setiap proyek dengan presisi dan integritas.",
                "Memberikan layanan lengkap: sipil, baja, interior, dan furniture custom.",
                "Menggunakan material berkualitas dan tim profesional berpengalaman.",
                "Membangun hubungan jangka panjang berdasarkan kepercayaan.",
              ].map((m, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif text-lg font-bold text-gold">0{i + 1}</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Nilai Inti</div>
          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
            Empat Prinsip <span className="text-gradient-gold">Kerja</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="group border border-border p-8 transition-colors hover:border-gold">
              <v.icon className="text-gold" size={36} strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm text-foreground/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <Counter end={20} label="Tahun Pengalaman" />
          <Counter end={250} label="Proyek Selesai" />
          <Counter end={180} label="Klien Puas" />
          <Counter end={35} label="Tim Profesional" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          Ingin Berdiskusi Tentang <span className="text-gradient-gold">Proyek Anda?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-foreground/75">
          Tim kami siap mendengarkan kebutuhan Anda dan memberikan rekomendasi terbaik.
        </p>
        <Link to="/contact" className="btn-gold mt-10">
          Hubungi Kami <ArrowRight size={16} />
        </Link>
      </section>
    </SiteLayout>
  );
}
