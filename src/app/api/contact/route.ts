import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const { error } = await supabase
    .from("Contact")
    .insert([{ name, email, message }]);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
