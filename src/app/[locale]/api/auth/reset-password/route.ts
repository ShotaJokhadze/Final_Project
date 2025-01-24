'use server';

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const code = formData.get("code") as string;

    // Initialize Supabase client
    const supabase = await createClient();

    if (!code) {
      return NextResponse.json(
        { error: "Password reset code is missing." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      return NextResponse.json(
        { error: "Invalid or expired reset code." },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to update the password." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Password was changed successfully. Please log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
