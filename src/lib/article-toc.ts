import { slugify } from "@/lib/utils";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/**
 * Injects `id` attributes into <h2>/<h3> tags in Tiptap-generated HTML and
 * returns a flat table of contents alongside the modified HTML. Regex-based
 * (not DOMParser) so it works identically during SSR and in the browser.
 */
export function processContentHtml(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  const processed = html.replace(/<(h[23])>(.*?)<\/\1>/gi, (match, tag: string, inner: string) => {
    const level = tag.toLowerCase() === "h2" ? 2 : 3;
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;

    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;

    toc.push({ id, text, level: level as 2 | 3 });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });

  return { html: processed, toc };
}

export function estimateReadingMinutes(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
