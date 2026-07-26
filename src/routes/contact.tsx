import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { IMAGES } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — SK.INTERIOR.DESIGN" },
      { name: "description", content: "Hubungi SK.INTERIOR.DESIGN untuk konsultasi proyek sipil, konstruksi baja, desain interior, atau furniture custom." },
      { property: "og:title", content: "Hubungi SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Konsultasi gratis untuk proyek Anda." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Mari Bicarakan Proyek Anda"
        subtitle="Isi formulir atau hubungi kami langsung — kami merespon setiap pesan dengan serius."
        image={IMAGES.contact}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* INFO */}
          <div>
            <div className="eyebrow">Informasi Kontak</div>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Kami Siap <span className="text-gradient-gold">Mendengarkan</span>
            </h2>
            <p className="mt-6 text-foreground/75">
              Baik proyek kecil maupun skala besar — konsultasi awal selalu gratis. Sampaikan
              kebutuhan Anda, tim kami akan membantu memetakan langkah selanjutnya.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: MapPin, label: "Alamat", value: "[Alamat Kantor SK.Interior.Design]" },
                { icon: Phone, label: "Telepon / WhatsApp", value: "[+62 8xx-xxxx-xxxx]" },
                { icon: Mail, label: "Email", value: "[info@sk-interior.design]" },
                { icon: Clock, label: "Jam Operasional", value: "Senin – Sabtu · 09.00 – 17.00 WIB" },
                { icon: MessageCircle, label: "Area Layanan", value: "[Jabodetabek & sekitarnya]" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 border-b border-border pb-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center border border-gold/40 text-gold">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="eyebrow">{c.label}</div>
                    <div className="mt-1 text-foreground/85">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a href="#" className="grid h-11 w-11 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold">
                <Instagram size={16} />
              </a>
              <a href="#" className="grid h-11 w-11 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="border border-gold/30 bg-charcoal p-8 md:p-10">
            <div className="eyebrow">Kirim Permintaan</div>
            <h3 className="mt-3 font-serif text-2xl font-bold md:text-3xl">
              Ceritakan Kebutuhan Proyek Anda
            </h3>

            {sent ? (
              <div className="mt-8 border border-gold/40 bg-background p-8 text-center">
                <div className="font-serif text-2xl font-bold text-gradient-gold">Terima Kasih!</div>
                <p className="mt-3 text-sm text-foreground/75">
                  Permintaan Anda telah kami terima. Tim kami akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nama Lengkap" name="name" required />
                  <Field label="No. Telepon / WA" name="phone" required />
                </div>
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="eyebrow">Jenis Layanan</label>
                  <select
                    required
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih layanan…
                    </option>
                    <option>Pekerjaan Sipil</option>
                    <option>Konstruksi Baja</option>
                    <option>Desain & Interior</option>
                    <option>Custom Furniture</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow">Pesan</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Ceritakan singkat kebutuhan, lokasi, dan rencana anggaran Anda…"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Kirim Permintaan <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="eyebrow text-center">Lokasi Kami</div>
          <h2 className="mt-3 text-center font-serif text-3xl font-bold md:text-4xl">
            Temui Kami di <span className="text-gradient-gold">Kantor</span>
          </h2>
          <div className="mt-10 aspect-[16/7] w-full border border-border">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps?q=Jakarta&output=embed"
              className="h-full w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
      />
    </div>
  );
}
