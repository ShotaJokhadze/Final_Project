import { createClient } from "../../../../../utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const locale = url.pathname.split("/")[1];
  const code = url.searchParams.get("code");

  if (code) {
    // Initialize Supabase using the custom createClient
    const supabase = await createClient(); // Ensure createClient is awaited

    try {
      // Exchange the authorization code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error during code exchange:", error.message);
        return NextResponse.redirect(`${url.origin}/${locale}/auth/error`);
      }

      // Redirect to the home page if successful
      return NextResponse.redirect(`${url.origin}/${locale}`);
    } catch (error) {
      console.error("Unexpected error during code exchange:", error);
      return NextResponse.redirect(`${url.origin}/${locale}/auth/error`);
    }
  }

  // Redirect to error if no code is provided
  return NextResponse.redirect(`${url.origin}/${locale}/auth/error`);
}
