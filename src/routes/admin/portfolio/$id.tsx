import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PortfolioForm, type PortfolioFormValues } from "@/components/admin/PortfolioForm";
import { supabase, type PortfolioItem } from "@/lib/supabase";

export const Route = createFileRoute("/admin/portfolio/$id")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminPortfolioEdit,
});

function AdminPortfolioEdit() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | null | "loading">("loading");

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setItem((data as PortfolioItem) ?? null));
  }, [id]);

  async function handleSubmit(values: PortfolioFormValues) {
    const { error } = await supabase
      .from("portfolio_items")
      .update({
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
      })
      .eq("id", id);
    if (error) {
      alert(`Gagal menyimpan: ${error.message}`);
      return;
    }
    navigate({ to: "/admin/portfolio" });
  }

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-semibold">Ubah Proyek Portofolio</h1>
      {item === "loading" && <p className="mt-6 text-sm text-muted-foreground">Memuat...</p>}
      {item === null && <p className="mt-6 text-sm text-destructive">Proyek tidak ditemukan.</p>}
      {item && item !== "loading" && <PortfolioForm initial={item} onSubmit={handleSubmit} />}
    </AdminLayout>
  );
}
