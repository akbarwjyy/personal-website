// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React.js",
  "Node.js",
  "Express.js",
  "Vue.js",
  "Tailwind CSS",
  "Laravel",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Prisma",
  "shadcn/ui",
  "Vercel",
  "Git",
  "REST API",
];

const experience = [
  { year: "2025", role: "Full-Stack Developer", company: "Tech Innovators" },
  { year: "2024", role: "Frontend Engineer", company: "Digital Labs" },
  { year: "2023", role: "Web Developer Intern", company: "Startup XYZ" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-orbitron text-center mb-12 text-primary"
      >
        About Me
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            Hi! I&apos;m a passionate developer obsessed with building
            futuristic, performant, and user-friendly web experiences. I thrive
            at the intersection of design, technology, and innovation — turning
            ideas into reality with clean code.
          </p>
        </motion.div>

        {/* Skills */}
        <Card className="bg-gray-900/70 backdrop-blur border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Skills & Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Badge className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-gray-900/70 backdrop-blur border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 w-3 h-3 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <p className="text-gray-400">
                      {exp.company} • {exp.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
