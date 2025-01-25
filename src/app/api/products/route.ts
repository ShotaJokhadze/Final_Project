import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select().order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Coud not fetch products" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
