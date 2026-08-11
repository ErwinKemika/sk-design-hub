import { useState } from "react";
import type { Article } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SeoFields } from "@/components/admin/SeoFields";

export type ArticleFormValues = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
};

function toFormValues(item: Article | null): ArticleFormValues {
  return {
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? "",
    excerpt: item?.excerpt ?? "",
    content_html: item?.content_html ?? "",
    cover_image_url: item?.cover_image_url ?? null,
    status: item?.status ?? "published",
    seo_title: item?.seo_title ?? "",
    seo_description: item?.seo_description ?? "",
  };
}

export function ArticleForm({
  initial,
  onSubmit,
}: {
  initial: Article | null;
  onSubmit: (values: ArticleFormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<ArticleFormValues>(() => toFormValues(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ArticleFormValues>(key: K, value: ArticleFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Artikel</Label>
        <Input
          id="title"
          required
          value={values.title}
          onChange={(e) => {
            const title = e.target.value;
            update("title", title);
            if (!slugTouched) update("slug", slugify(title));
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          required
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            update("slug", slugify(e.target.value));
          }}
        />
        <p className="text-xs text-muted-foreground">URL: /blog/{values.slug || "..."}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Input
          id="category"
          required
          placeholder="mis. Interior, Konstruksi, Tips Renovasi"
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Gambar Cover</Label>
        <ImageUploader
          value={values.cover_image_url}
          onChange={(url) => update("cover_image_url", url)}
          folder="articles"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan (excerpt)</Label>
        <Textarea
          id="excerpt"
          rows={3}
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Isi Artikel</Label>
        <RichTextEditor
          value={values.content_html}
          onChange={(html) => update("content_html", html)}
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={values.status}
          onValueChange={(v) => update("status", v as "draft" | "published")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <div className="text-sm font-semibold text-gold">SEO (opsional)</div>
        <SeoFields
          seoTitle={values.seo_title}
          seoDescription={values.seo_description}
          onSeoTitleChange={(v) => update("seo_title", v)}
          onSeoDescriptionChange={(v) => update("seo_description", v)}
          fallbackTitle={values.title}
          fallbackDescription={values.excerpt}
          slug={values.slug}
          urlPrefix="/blog/"
          content={values.content_html}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
