// src/components/layout/Footer.tsx
"use client";

import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, href: "https://github.com/akbarwjyy", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/akbar-wijaya/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/akbarwjyaa_",
    label: "Instagram",
  },
  { icon: Mail, href: "mailto:akbarwjyy8@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/70 backdrop-blur pt-12 pb-6 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-black font-bold text-sm">AW</span>
              </div>
              <span className="font-orbitron text-lg text-primary">
                FUTURISTIC PORTFOLIO
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-md">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full border border-gray-700 text-gray-400 hover:border-primary hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
          <p>
            © {new Date().getFullYear()} Akbar Wijaya - Built with{" "}
            <span className="text-primary">Next.js + Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
