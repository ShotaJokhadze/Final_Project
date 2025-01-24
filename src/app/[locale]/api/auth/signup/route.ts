import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const name = String(formData.get("name"));
  const phone = String(formData.get("phone"))
  const locale = formData.get("locale") as string || 'en';

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
      },
      emailRedirectTo : `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/login`,
    },
  });

  if (error) {
    console.error("Sign-up error:", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Success response with message
  return NextResponse.json(
    { success: "Thanks for signing up! Please check your email for a verification link." },
    { status: 200 }
  );
}
