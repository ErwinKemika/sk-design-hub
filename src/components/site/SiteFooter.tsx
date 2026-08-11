import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div>
          <img src="/logo.png" alt="SK.Interior Design" className="h-11 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Sejak 2003, mitra terpercaya untuk kebutuhan konstruksi sipil, baja, desain interior,
            dan furniture custom. Presisi di setiap detail.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="grid h-10 w-10 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="grid h-10 w-10 place-items-center border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow">Navigasi</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/", "Beranda"],
              ["/about", "Tentang Kami"],
              ["/services", "Layanan"],
              ["/portfolio", "Portofolio"],
              ["/blog", "Blog"],
              ["/contact", "Kontak"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-foreground/75 transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Layanan</h4>
          <ul className="mt-5 space-y-3 text-sm text-foreground/75">
            <li>Pekerjaan Sipil</li>
            <li>Konstruksi Baja</li>
            <li>Desain & Interior</li>
            <li>Custom Furniture</li>
            <li>Kitchen Set & Wardrobe</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Kontak</h4>
          <ul className="mt-5 space-y-4 text-sm text-foreground/80">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={CONTACT.whatsappUrl} className="transition-colors hover:text-gold">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-gold">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-muted-foreground">{CONTACT.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground lg:flex-row lg:px-10">
          <div>© {new Date().getFullYear()} SK.INTERIOR.DESIGN. Seluruh hak cipta dilindungi.</div>
          <div>Established 2003 · Precision in Every Detail</div>
        </div>
      </div>
    </footer>
  );
}
