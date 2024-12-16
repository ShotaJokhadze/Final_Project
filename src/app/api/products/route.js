import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    return NextResponse.json(
      { error: "Coud not fetch products" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
