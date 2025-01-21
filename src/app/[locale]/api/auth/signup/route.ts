import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const routing = defineRouting({
  locales: ["en", "ka"],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const name = String(formData.get("name"));
  const phone = String(formData.get("phone"))
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
      },
    },
  });

  const locale = cookies().get("locale")?.value || "en";

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
