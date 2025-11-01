// src/app/projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Project } from "@/types";
import ProjectCard from "@/components/cards/ProjectCard";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ProjectsPage() {
  const [typedProjects, setTypedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects } = await supabase
        .from("Project")
        .select("*")
        .order("created_at", { ascending: false });

      // TypeScript akan otomatis infer tipe, tapi kamu bisa cast jika perlu:
      const typed = projects as Project[];
      if (typed) setTypedProjects(typed);
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-orbitron text-center mb-12 text-primary"
      >
        Projects
      </motion.h1>

      {typedProjects && typedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {typedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects yet.</p>
      )}
    </div>
  );
}
