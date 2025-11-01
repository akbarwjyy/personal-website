// src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/layout/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8 flex justify-between items-center border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/admin/projects">Projects</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin/posts">Blog Posts</Link>
          </Button>
          <LogoutButton />
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
