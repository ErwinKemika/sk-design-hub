import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase, type PortfolioItem } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/portfolio/")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminPortfolioList,
});

function AdminPortfolioList() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[] | null>(null);

  async function load() {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as PortfolioItem[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    await supabase.from("portfolio_items").delete().eq("id", id);
    load();
    router.invalidate();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold">Portofolio</h1>
        <Button asChild size="sm">
          <Link to="/admin/portfolio/new">
            <Plus size={14} /> Tambah Proyek
          </Link>
        </Button>
      </div>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <span
                  className={item.status === "published" ? "text-gold" : "text-muted-foreground"}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button asChild variant="outline" size="icon" className="h-8 w-8">
                  <Link to="/admin/portfolio/$id" params={{ id: item.id }}>
                    <Pencil size={14} />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 size={14} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus proyek ini?</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{item.title}" akan dihapus permanen dan hilang dari halaman portofolio.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {items?.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">Belum ada proyek portofolio.</p>
      )}
    </AdminLayout>
  );
}
