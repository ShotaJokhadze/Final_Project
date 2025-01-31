import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server"

export async function GET() {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser()
  const user_id = userResponse.data?.user?.id

  const {data, error } = await supabase.from('orders').select().eq("user_id", user_id);

  if (error) {
      return NextResponse.json(
        { error: "Could not fetch orders" },
        { status: 500 }
      );
  }

  return NextResponse.json(data, { status: 200 });
}