import { supabase } from "../../../../lib/supabase";

interface Params {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Params }
): Promise<Response> {
  const { id } = params;

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
