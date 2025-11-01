// src/components/cards/PostCard.tsx
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export default function PostCard({
  slug,
  title,
  excerpt,
  tags,
  date,
}: PostCardProps) {
  return (
    <motion.div whileHover={{ x: 5 }} className="group">
      <Link href={`/blog/${slug}`} className="block">
        <div className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl p-5 h-full hover:border-primary transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-orbitron text-primary group-hover:underline">
              {title}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {date}
            </span>
          </div>
          <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-gray-800"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
