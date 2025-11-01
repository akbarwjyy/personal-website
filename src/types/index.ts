// src/types/index.ts

/**
 * Tipe untuk tabel `projects`
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  created_at: string; // ISO string
}

/**
 * Tipe untuk tabel `posts`
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  image_url: string | null;
  created_at: string; // ISO string
}

/**
 * Tipe untuk tabel `contacts`
 */
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

/**
 * Tipe untuk form input (opsional, untuk validasi)
 */
export interface ProjectInput {
  title: string;
  description: string;
  tech_stack: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
}

export interface PostInput {
  title: string;
  content: string;
  tags: string;
  image_url?: string;
}
