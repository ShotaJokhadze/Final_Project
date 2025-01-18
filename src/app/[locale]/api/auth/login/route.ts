import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../../../utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const formData = await req.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const locale = cookieStore.get("locale")?.value || "en";

    if (error) {
      console.error("Login error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Return success message along with the redirect URL
    return NextResponse.json({
      message: "Login successful! Welcome back.",
      redirectTo: `/${locale}`, 
    });
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
