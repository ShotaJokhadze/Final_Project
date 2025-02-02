import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .not("brand", "is", null)
    .order("brand");

  if (error) {
    return NextResponse.json(
      { error: "Could not fetch brands" },
      { status: 500 }
    );
  }

  const uniqueBrands = Array.from(new Set(data.map(product => product.brand)));
  return NextResponse.json(uniqueBrands, { status: 200 });
}