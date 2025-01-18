"use client";
import React, { useState } from "react";
import { useLocale } from "next-intl";

export default function Signup() {
  const locale = useLocale();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = await fetch(`/${locale}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "An unknown error occurred.");
      } else {
        setErrorMessage(result.success || "An unknown error occurred.");
        setTimeout(() => {
          window.location.href = `/${locale}`;
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="password"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              data-cy="sign-up-link"
              href="./login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none"
            >
              Log in
            </a>
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
            type="submit"
          >
            Sign Up
          </button>

          {/* Error or Success Message */}
          {errorMessage && (
            <div className="text-center text-red-500 mt-4">
              <strong>{errorMessage}</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
