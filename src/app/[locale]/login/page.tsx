"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../supabase/supabase";

export default function Login() {
  const locale = useLocale();
  const t = useTranslations('Login');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = await fetch(`/${locale}/api/auth/login`, {
        method: "POST",
        body: new URLSearchParams({
          email,
          password,
          locale
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "An unknown error occurred.");
      } else if (result.message){
        setSuccessMessage(result.message);
        setTimeout(() => {
          window.location.href = result.redirectTo;
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/${locale}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center h-ful">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-sm m-4 rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {t("title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              {t("Email")}
            </label>
            <input
              data-cy="login-email-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="password"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              {t("Password")}
            </label>
            <input
              data-cy="login-password-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 flex justify-between gap-3">
          {t("NotRegistered")}{" "}
            <a
              data-cy="sign-up-link"
              href="./signup"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none"
            >
              {t("Signup")}
            </a>
            <a
              data-cy="forgot-password-link"
              href="./forgot-password"
              className="font-medium hover:underline focus:outline-none underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* GitHub Login Button */}
          <button
            onClick={handleGithubLogin}
            type="button"
            className="w-full py-3 px-4 bg-darkGray text-white rounded-md mt-4 flex justify-center items-center gap-3"
          >
            {t("Github")}
            <FaGithub className="text-xl"/>
          </button>

          {/* Submit Button */}
          <button
            data-cy="login-submit-button"
            className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
            type="submit"
          >
            {t("title")}
          </button>

          {/* Error or Success Message */}
          {errorMessage && (
            <div
              data-cy="login-error-message"
              className="text-center text-red mt-4"
            >
              <strong>{errorMessage}</strong>
            </div>
          )}
          {successMessage && (
            <div
              data-cy="login-success-message"
              className="text-center text-green-600 mt-4"
            >
              <strong>{successMessage}</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
