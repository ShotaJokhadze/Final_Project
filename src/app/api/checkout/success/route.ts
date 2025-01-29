import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function POST() {
  const supabase = await createClient();

  const { data: userResponse, error: userError } = await supabase.auth.getUser();
  if (userError || !userResponse?.user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const user_id = userResponse.user.id;

  const { error: deleteError } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", user_id);

  if (deleteError) {
    console.error("Error clearing cart:", deleteError.message);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }

  return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
}
