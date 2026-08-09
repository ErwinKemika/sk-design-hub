import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleForm, type ArticleFormValues } from "@/components/admin/ArticleForm";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminArticleNew,
});

function AdminArticleNew() {
  const navigate = useNavigate();

  async function handleSubmit(values: ArticleFormValues) {
    const { error } = await supabase.from("articles").insert({
      title: values.title,
      slug: values.slug,
      category: values.category,
      excerpt: values.excerpt || null,
      content_html: values.content_html,
      cover_image_url: values.cover_image_url,
      status: values.status,
      seo_title: values.seo_title || null,
      seo_description: values.seo_description || null,
      published_at: values.status === "published" ? new Date().toISOString() : null,
    });
    if (error) {
      alert(`Gagal menyimpan: ${error.message}`);
      return;
    }
    navigate({ to: "/admin/articles" });
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-semibold">Tulis Artikel Baru</h1>
      <ArticleForm initial={null} onSubmit={handleSubmit} />
    </AdminLayout>
  );
}
