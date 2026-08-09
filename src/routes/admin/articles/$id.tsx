import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleForm, type ArticleFormValues } from "@/components/admin/ArticleForm";
import { supabase, type Article } from "@/lib/supabase";

export const Route = createFileRoute("/admin/articles/$id")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminArticleEdit,
});

function AdminArticleEdit() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Article | null | "loading">("loading");

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setItem((data as Article) ?? null));
  }, [id]);

  async function handleSubmit(values: ArticleFormValues) {
    const wasPublished = item !== "loading" && item?.status === "published";
    const { error } = await supabase
      .from("articles")
      .update({
        title: values.title,
        slug: values.slug,
        category: values.category,
        excerpt: values.excerpt || null,
        content_html: values.content_html,
        cover_image_url: values.cover_image_url,
        status: values.status,
        seo_title: values.seo_title || null,
        seo_description: values.seo_description || null,
        published_at:
          values.status === "published" && !wasPublished ? new Date().toISOString() : undefined,
      })
      .eq("id", id);
    if (error) {
      alert(`Gagal menyimpan: ${error.message}`);
      return;
    }
    navigate({ to: "/admin/articles" });
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-semibold">Ubah Artikel</h1>
      {item === "loading" && <p className="mt-6 text-sm text-muted-foreground">Memuat...</p>}
      {item === null && <p className="mt-6 text-sm text-destructive">Artikel tidak ditemukan.</p>}
      {item && item !== "loading" && <ArticleForm initial={item} onSubmit={handleSubmit} />}
    </AdminLayout>
  );
}
