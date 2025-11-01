// src/app/admin/posts/[id]/page.tsx
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
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

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: post, error } = await supabase
    .from("Post")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !post) notFound();

  const updatePost = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const slug = slugify(title); // auto-generate slug

    const { error } = await supabase
      .from("Post")
      .update({
        title,
        slug,
        content,
        tags,
      })
      .eq("id", params.id);

    if (!error) redirect("/admin/posts");
  };

  const deletePost = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.from("Post").delete().eq("id", params.id);
    redirect("/admin/posts");
  };

  return (
    <Card className="bg-gray-900 border-gray-700 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
        <CardDescription>Write in Markdown</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={updatePost} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" defaultValue={post.title} required />
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input name="tags" defaultValue={post.tags.join(", ")} />
          </div>
          <div>
            <Label>Content (Markdown)</Label>
            <Textarea
              name="content"
              rows={15}
              defaultValue={post.content}
              className="font-mono"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit">Save Post</Button>
            <form action={deletePost} className="inline">
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
            <Button asChild variant="outline">
              <Link href="/admin/posts">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
