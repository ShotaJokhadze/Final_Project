"use client";
import React, { useState } from "react";
import { useLocale } from "next-intl";

export default function signup() {
  const locale = useLocale();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`/${locale}/api/auth/signup`, {
      method: "POST",
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      setErrorMessage(result.error);
    } else {
      window.location.href = `/${locale}`;
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col space-y-3 mb-6">
            <label
              htmlFor="password"
              className=" font-medium text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <button
            className="w-full py-3 bg-customPurple mt-6  text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800"
            type="submit"
          >
            Sign Up
          </button>

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
