// src/app/admin/projects/[id]/page.tsx
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

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: project, error } = await supabase
    .from("Project")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !project) notFound();

  // Action untuk update
  const updateProject = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tech_stack = (formData.get("tech_stack") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const github_url = formData.get("github_url") as string;
    const demo_url = formData.get("demo_url") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabase
      .from("Project")
      .update({
        title,
        description,
        tech_stack,
        github_url: github_url || null,
        demo_url: demo_url || null,
        image_url: image_url || null,
      })
      .eq("id", params.id);

    if (!error) redirect("/admin/projects");
  };

  // Action untuk delete
  const deleteProject = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.from("Project").delete().eq("id", params.id);
    redirect("/admin/projects");
  };

  return (
    <Card className="bg-gray-900 border-gray-700 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
        <CardDescription>Update your project details</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={updateProject} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" defaultValue={project.title} required />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea name="description" defaultValue={project.description} />
          </div>
          <div>
            <Label>Tech Stack (comma-separated)</Label>
            <Input
              name="tech_stack"
              defaultValue={project.tech_stack.join(", ")}
            />
          </div>
          <div>
            <Label>GitHub URL</Label>
            <Input name="github_url" defaultValue={project.github_url || ""} />
          </div>
          <div>
            <Label>Demo URL</Label>
            <Input name="demo_url" defaultValue={project.demo_url || ""} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input name="image_url" defaultValue={project.image_url || ""} />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit">Save Changes</Button>
            <form action={deleteProject} className="inline">
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
            <Button asChild variant="outline">
              <Link href="/admin/projects">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
