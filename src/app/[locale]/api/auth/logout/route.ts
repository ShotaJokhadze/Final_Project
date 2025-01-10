import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  console.log("Cookies passed to Supabase:", cookieStore.getAll());

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  console.log("Session data:", session);
  if (sessionError) {
    console.error("Session error:", sessionError);
  }

  await supabase.auth.signOut();

  return NextResponse.json({ message: "Logged out successfully" });
}
