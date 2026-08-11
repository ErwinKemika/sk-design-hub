import { useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "@/lib/supabase";
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
import { SeoFields } from "@/components/admin/SeoFields";

const CATEGORIES: PortfolioCategory[] = ["Sipil", "Konstruksi Baja", "Interior", "Furniture"];

export type PortfolioFormValues = {
  title: string;
  slug: string;
  category: PortfolioCategory;
  description: string;
  location: string;
  year: string;
  client: string;
  cover_image_url: string | null;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
};

function toFormValues(item: PortfolioItem | null): PortfolioFormValues {
  return {
    title: item?.title ?? "",
    slug: item?.slug ?? "",
    category: item?.category ?? "Sipil",
    description: item?.description ?? "",
    location: item?.location ?? "",
    year: item?.year ?? "",
    client: item?.client ?? "",
    cover_image_url: item?.cover_image_url ?? null,
    status: item?.status ?? "published",
    seo_title: item?.seo_title ?? "",
    seo_description: item?.seo_description ?? "",
  };
}

export function PortfolioForm({
  initial,
  onSubmit,
}: {
  initial: PortfolioItem | null;
  onSubmit: (values: PortfolioFormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<PortfolioFormValues>(() => toFormValues(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PortfolioFormValues>(key: K, value: PortfolioFormValues[K]) {
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
        <Label htmlFor="title">Judul Proyek</Label>
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
        <p className="text-xs text-muted-foreground">URL: /portfolio/{values.slug || "..."}</p>
      </div>

      <div className="space-y-2">
        <Label>Kategori</Label>
        <Select
          value={values.category}
          onValueChange={(v) => update("category", v as PortfolioCategory)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Gambar Cover</Label>
        <ImageUploader
          value={values.cover_image_url}
          onChange={(url) => update("cover_image_url", url)}
          folder="portfolio"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Proyek</Label>
        <Textarea
          id="description"
          rows={5}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Lokasi</Label>
          <Input
            id="location"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Tahun</Label>
          <Input id="year" value={values.year} onChange={(e) => update("year", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client">Klien</Label>
          <Input
            id="client"
            value={values.client}
            onChange={(e) => update("client", e.target.value)}
          />
        </div>
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
          fallbackDescription={values.description}
          slug={values.slug}
          urlPrefix="/portfolio/"
          content={values.description}
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
