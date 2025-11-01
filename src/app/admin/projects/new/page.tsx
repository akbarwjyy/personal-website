// src/app/admin/projects/new/page.tsx
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

export default async function NewProjectPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  // Server Action: Create new project
  const createProject = async (formData: FormData) => {
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

    const { error } = await supabase.from("Project").insert({
      title,
      description,
      tech_stack,
      github_url: github_url || null,
      demo_url: demo_url || null,
      image_url: image_url || null,
    });

    if (!error) {
      redirect("/admin/projects");
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>Create a new entry for your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createProject} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required />
          </div>
          <div>
            <Label htmlFor="tech_stack">
              Tech Stack{" "}
              <span className="text-gray-500">(comma-separated)</span>
            </Label>
            <Input
              id="tech_stack"
              name="tech_stack"
              placeholder="Next.js, TypeScript, Supabase"
            />
          </div>
          <div>
            <Label htmlFor="github_url">GitHub URL (optional)</Label>
            <Input id="github_url" name="github_url" type="url" />
          </div>
          <div>
            <Label htmlFor="demo_url">Demo URL (optional)</Label>
            <Input id="demo_url" name="demo_url" type="url" />
          </div>
          <div>
            <Label htmlFor="image_url">Image URL (optional)</Label>
            <Input id="image_url" name="image_url" type="url" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Create Project
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/projects">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
