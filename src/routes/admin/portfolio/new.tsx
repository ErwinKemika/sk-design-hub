import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PortfolioForm, type PortfolioFormValues } from "@/components/admin/PortfolioForm";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/portfolio/new")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminPortfolioNew,
});

function AdminPortfolioNew() {
  const navigate = useNavigate();

  async function handleSubmit(values: PortfolioFormValues) {
    const { error } = await supabase.from("portfolio_items").insert({
      title: values.title,
      slug: values.slug,
      category: values.category,
      description: values.description || null,
      location: values.location || null,
      year: values.year || null,
      client: values.client || null,
      cover_image_url: values.cover_image_url,
      status: values.status,
      seo_title: values.seo_title || null,
      seo_description: values.seo_description || null,
    });
    if (error) {
      alert(`Gagal menyimpan: ${error.message}`);
      return;
    }
    navigate({ to: "/admin/portfolio" });
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-semibold">Tambah Proyek Portofolio</h1>
      <PortfolioForm initial={null} onSubmit={handleSubmit} />
    </AdminLayout>
  );
}
