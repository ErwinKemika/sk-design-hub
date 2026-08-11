import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/lib/services-data";

const NAV_BEFORE = [
  { to: "/", label: "Beranda" },
  { to: "/about", label: "Tentang" },
] as const;

const NAV_AFTER = [
  { to: "/portfolio", label: "Portofolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Kontak" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="SK.Interior Design" className="h-10 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_BEFORE.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}

          <div className="group relative">
            <Link
              to="/services"
              className="flex items-center gap-1 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              Layanan
              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="border border-border bg-black/95 backdrop-blur-md">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="block px-5 py-3 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_AFTER.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-gold !py-3 !px-6 !text-xs">
            Konsultasi
          </Link>
        </nav>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-black/95 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">
            {NAV_BEFORE.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-foreground/90 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}

            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="py-2 text-base text-foreground/90 hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              Layanan
            </Link>
            <div className="ml-4 flex flex-col gap-1 border-l border-border pl-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => setOpen(false)}
                  className="py-1.5 text-sm text-foreground/70 hover:text-gold"
                >
                  {s.title}
                </Link>
              ))}
            </div>

            {NAV_AFTER.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-foreground/90 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3 w-fit">
              Konsultasi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
