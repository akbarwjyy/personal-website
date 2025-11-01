// src/app/admin/posts/new/page.tsx
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/utils/slugify";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  // Server Action: Create new blog post
  const createPost = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("image_url") as string;
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const slug = slugify(title);

    // Cek duplikat slug
    const { data: existing } = await supabase
      .from("Post")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      // Jika slug sudah ada, tambahkan timestamp
      const uniqueSlug = `${slug}-${Date.now()}`;
      await supabase.from("Post").insert({
        title,
        slug: uniqueSlug,
        content,
        tags,
        image_url: imageUrl || null,
      });
    } else {
      await supabase.from("Post").insert({
        title,
        slug,
        content,
        tags,
        image_url: imageUrl || null,
      });
    }

    redirect("/admin/posts");
  };

  return (
    <Card className="bg-gray-900 border-gray-700 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>New Blog Post</CardTitle>
        <CardDescription>
          Write in Markdown. Slug will be auto-generated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createPost} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="image_url">
              Cover Image URL <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="tags">
              Tags <span className="text-gray-500">(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="nextjs, supabase, portfolio"
            />
          </div>
          <div>
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              name="content"
              rows={18}
              className="font-mono"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Publish Post
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/posts">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
