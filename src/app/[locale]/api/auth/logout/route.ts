import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

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
