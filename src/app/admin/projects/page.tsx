// src/app/admin/projects/page.tsx
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function ProjectsAdminPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: projects, error } = await supabase
    .from("Project")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading projects</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects ({projects.length})</h2>
        <Button asChild>
          <Link href="/admin/projects/new">+ Add New</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-gray-900 border-gray-700 hover:border-primary transition-colors duration-300"
          >
            <CardHeader>
              <CardTitle className="text-primary">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-3 flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
