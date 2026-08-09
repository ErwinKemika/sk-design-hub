import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Kelola konten portofolio dan artikel yang tampil di website.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/portfolio"
          className="border border-border p-6 transition-colors hover:border-gold"
        >
          <div className="font-serif text-lg font-semibold">Portofolio</div>
          <p className="mt-1 text-sm text-foreground/60">
            Tambah, ubah, atau hapus proyek portofolio.
          </p>
        </Link>
        <Link
          to="/admin/articles"
          className="border border-border p-6 transition-colors hover:border-gold"
        >
          <div className="font-serif text-lg font-semibold">Artikel</div>
          <p className="mt-1 text-sm text-foreground/60">
            Tulis dan kelola artikel blog untuk SEO.
          </p>
        </Link>
      </div>
    </AdminLayout>
  );
}
