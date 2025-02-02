import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("search") || "";
  const brand = url.searchParams.get("brand") || "";

  let query = supabase.from("products").select('title, description, title_ge, description_ge, image, price, id, brand').order("created_at", { ascending: false });


  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`);
  }

  // Filter by brand
  if (brand) {
    query = query.eq("brand", brand);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Could not fetch products" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
