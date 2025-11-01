// src/components/cards/ProjectCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
}

export default function ProjectCard({
  title,
  description,
  tech_stack,
  github_url,
  demo_url,
  image_url,
}: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} className="group h-full">
      <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col hover:border-primary transition-all duration-300">
        {image_url && (
          <div className="h-48 overflow-hidden">
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-orbitron text-primary mb-2">{title}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {tech_stack.map((tech) => (
              <Badge key={tech} className="bg-gray-800 text-xs px-2 py-1">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 mt-auto pt-2">
            {github_url && (
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link
                  href={github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
            )}
            {demo_url && (
              <Button
                asChild
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Link href={demo_url} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
