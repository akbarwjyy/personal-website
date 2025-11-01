import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !data) notFound();

  return (
    <article className="prose prose-invert max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-orbitron text-primary">{data.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
    </article>
  );
}
