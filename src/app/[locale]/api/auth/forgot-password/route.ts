"use server";

import { createClient } from "../../../../../utils/supabase/server";

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const locale = formData.get("locale") as string || 'en';

  try {
    if (!email) {
      return {
        error: "Email is required",
      };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/reset-password`,
    });

    if (error) {
      return {
        error: error.message,
      };
    }
    return {
      message: "Password reset email sent. Please check your inbox.",
    };
  } catch (error) {
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};