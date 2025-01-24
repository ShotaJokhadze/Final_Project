'use server';

import { createClient } from "../../../../../utils/supabase/server";

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const code = formData.get('code') as string;

  if (!code) {
    return { error: "Password reset code is missing" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" };
  }

  try {
    const supabase = await createClient();
    
    // Use exchangeCodeForSession to establish the session first
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      return { error: "Invalid or expired reset code" };
    }

    // Then update the password
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: error.message };
    } 
    
    return { message: "Password was changed successfully, please log in" };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again later." };
  }
}