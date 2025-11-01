// src/app/admin/posts/page.tsx
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function PostsAdminPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: posts, error } = await supabase
    .from("Post")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Blog Posts ({posts.length})</h2>
        <Button asChild>
          <Link href="/admin/posts/new">+ Add New</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-gray-900 border-gray-700 hover:border-primary transition-colors"
          >
            <CardHeader>
              <CardTitle className="text-primary">{post.title}</CardTitle>
              <p className="text-sm text-gray-400">/{post.slug}</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/posts/${post.id}`}>Edit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
