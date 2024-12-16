import { supabase } from "../../../../lib/supabase";

export async function GET(request, { params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: "Blog post not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
