import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT, IMAGES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak | SK.INTERIOR.DESIGN" },
      {
        name: "description",
        content:
          "Hubungi SK.INTERIOR.DESIGN untuk konsultasi proyek sipil, konstruksi baja, desain interior, atau furniture custom.",
      },
      { property: "og:title", content: "Hubungi SK.INTERIOR.DESIGN" },
      { property: "og:description", content: "Konsultasi gratis untuk proyek Anda." },
    ],
  }),
  component: ContactPage,
});

const SERVICE_OPTIONS = [
  "Pekerjaan Sipil",
  "Konstruksi Baja",
  "Desain & Interior",
  "Custom Furniture",
  "Lainnya",
];

const PHONE_REGEX = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { name: "", phone: "", email: "", service: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 3) errors.name = "Nama minimal 3 karakter.";
  if (!PHONE_REGEX.test(values.phone.trim()))
    errors.phone = "Format nomor tidak valid, contoh: 0813-xxxx-xxxx.";
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = "Format email tidak valid.";
  if (!values.service) errors.service = "Pilih salah satu layanan.";
  if (values.message.trim().length < 10)
    errors.message = "Ceritakan kebutuhan Anda lebih detail (min. 10 karakter).";
  return errors;
}

function buildWhatsappMessage(values: FormValues) {
  return [
    "Halo SK.Interior Design, saya ingin konsultasi proyek:",
    "",
    `Nama: ${values.name.trim()}`,
    `No. HP: ${values.phone.trim()}`,
    `Email: ${values.email.trim()}`,
    `Layanan: ${values.service}`,
    `Pesan: ${values.message.trim()}`,
  ].join("\n");
}

function ContactPage() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = encodeURIComponent(buildWhatsappMessage(values));
    window.open(`${CONTACT.whatsappUrl}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Mari Bicarakan Proyek Anda"
        subtitle="Isi formulir atau hubungi kami langsung. Kami merespon setiap pesan dengan serius."
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
              Baik proyek kecil maupun skala besar, konsultasi awal selalu gratis. Sampaikan
              kebutuhan Anda, tim kami akan membantu memetakan langkah selanjutnya.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: MapPin, label: "Alamat", value: CONTACT.address, href: CONTACT.mapsUrl },
                {
                  icon: Phone,
                  label: "Telepon / WhatsApp",
                  value: CONTACT.phoneDisplay,
                  href: CONTACT.whatsappUrl,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: CONTACT.email,
                  href: `mailto:${CONTACT.email}`,
                },
                { icon: Clock, label: "Jam Operasional", value: CONTACT.hours },
                { icon: MessageCircle, label: "Area Layanan", value: CONTACT.serviceArea },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 border-b border-border pb-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center border border-gold/40 text-gold">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="eyebrow">{c.label}</div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 block text-foreground/85 transition-colors hover:text-gold"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-foreground/85">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="#"
                className="grid h-11 w-11 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
              >
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
                <div className="font-serif text-2xl font-bold text-gradient-gold">
                  Terima Kasih!
                </div>
                <p className="mt-3 text-sm text-foreground/75">
                  Anda akan diarahkan ke WhatsApp untuk mengirim permintaan Anda. Tim kami akan
                  segera merespon.
                </p>
              </div>
            ) : (
              <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Nama Lengkap"
                    name="name"
                    value={values.name}
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                  />
                  <Field
                    label="No. Telepon / WA"
                    name="phone"
                    type="tel"
                    placeholder="0813-xxxx-xxxx"
                    value={values.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                  />
                </div>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                />
                <div>
                  <label className="eyebrow" htmlFor="service">
                    Jenis Layanan
                  </label>
                  <select
                    id="service"
                    value={values.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={cn(
                      "mt-2 w-full border bg-background px-4 py-3 text-sm text-foreground focus:outline-none",
                      errors.service
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-gold",
                    )}
                  >
                    <option value="" disabled>
                      Pilih layanan…
                    </option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.service}</p>
                  )}
                </div>
                <div>
                  <label className="eyebrow" htmlFor="message">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Ceritakan singkat kebutuhan, lokasi, dan rencana anggaran Anda…"
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={cn(
                      "mt-2 w-full border bg-background px-4 py-3 text-sm text-foreground focus:outline-none",
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-gold",
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <button type="submit" className="btn-gold w-full">
                  Kirim via WhatsApp <Send size={16} />
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
              src={CONTACT.mapEmbedUrl}
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
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "mt-2 w-full border bg-background px-4 py-3 text-sm text-foreground focus:outline-none",
          error ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold",
        )}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
