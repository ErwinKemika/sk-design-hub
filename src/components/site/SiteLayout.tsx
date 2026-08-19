import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center fade-in-up">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          {title.split(" ").map((w, i) => (
            <span key={i} className={i % 3 === 1 ? "text-gradient-gold" : ""}>
              {w}{" "}
            </span>
          ))}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/75 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
