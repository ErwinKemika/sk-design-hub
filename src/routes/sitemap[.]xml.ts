import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { SERVICES } from "@/lib/services-data";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/portfolio",
  "/blog",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        const [{ data: portfolio }, { data: articles }] = await Promise.all([
          supabase.from("portfolio_items").select("slug, updated_at").eq("status", "published"),
          supabase.from("articles").select("slug, updated_at").eq("status", "published"),
        ]);

        const urls = [
          ...STATIC_PATHS.map((path) => ({
            loc: `${origin}${path}`,
            lastmod: undefined as string | undefined,
          })),
          ...(portfolio ?? []).map((p) => ({
            loc: `${origin}/portfolio/${p.slug}`,
            lastmod: p.updated_at,
          })),
          ...(articles ?? []).map((a) => ({
            loc: `${origin}/blog/${a.slug}`,
            lastmod: a.updated_at,
          })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
