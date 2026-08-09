import { Link, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) {
      navigate({ to: "/admin/login" });
    }
  }, [session, navigate]);

  if (session === "loading" || session === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground/60">
        Memuat...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-56 shrink-0 border-r border-border p-6">
        <div className="font-serif text-lg font-semibold text-gold">SK Admin</div>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          <Link
            to="/admin"
            className="rounded-md px-3 py-2 hover:bg-secondary [&.active]:bg-secondary [&.active]:text-gold"
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/portfolio"
            className="rounded-md px-3 py-2 hover:bg-secondary [&.active]:bg-secondary [&.active]:text-gold"
          >
            Portofolio
          </Link>
          <Link
            to="/admin/articles"
            className="rounded-md px-3 py-2 hover:bg-secondary [&.active]:bg-secondary [&.active]:text-gold"
          >
            Artikel
          </Link>
        </nav>
        <div className="mt-8 border-t border-border pt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
          >
            Keluar
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
