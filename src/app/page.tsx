// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import type { Project } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from("Project")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);
        if (data) setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-[-1]">
          {/* Glowing radial center */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-3xl"></div>

          {/* Grid pattern (Github Universe style) */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,255,102,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center border-4 border-black">
              <span className="text-black font-orbitron text-2xl">AW</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-orbitron mb-6"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-white">
              FUTURISTIC
            </span>
            <br />
            <span className="text-white">DEVELOPER</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-rajdhani"
          >
            Crafting tomorrow&apos;s digital experiences with cutting-edge tech,
            clean code, and a touch of neon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-6 text-lg"
            >
              <Link href="/projects">
                View Projects <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              <Link
                href="https://github.com/akbarwjyy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 animate-bounce"
        >
          <ChevronRight className="h-6 w-6 text-primary rotate-90" />
        </motion.div>
      </section>

      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <section className="py-20 px-4 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-orbitron text-center mb-12 text-primary"
            >
              Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Button
                asChild
                variant="link"
                className="text-primary hover:text-primary/80 font-mono"
              >
                <Link href="/projects">View All Projects →</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-orbitron mb-6"
        >
          Ready to Build the Future?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Let&apos;s collaborate on something amazing. Reach out for projects,
          ideas, or just to say hello.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black font-bold px-8"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
}
