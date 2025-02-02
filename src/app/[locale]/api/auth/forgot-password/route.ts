import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const locale = formData.get("locale")?.toString() || "en";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();

    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/${locale}/reset-password`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Password reset email sent. Please check your inbox.",
    });
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
