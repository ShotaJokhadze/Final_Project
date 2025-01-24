"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ForgotPassword() {
  const locale = useLocale();
  // const t = useTranslations("ForgotPassword");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append('locale', locale);

      const response = await fetch(`/${locale}/api/auth/forgot-password`, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred");
      }

      const result = await response.json();

      if (result.error) {
        setErrorMessage(result.error);
      } else if (result.message) {
        setSuccessMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center h-full">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-sm m-4 rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Email
            </label>
            <input
              data-cy="forgot-password-email-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
              disabled={isLoading}
            />
          </div>

          <button
            data-cy="forgot-password-submit-button"
            className={`w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg transition-all duration-300 focus:outline-none dark:bg-blue-700 
              ${isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 dark:hover:bg-blue-800'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Submit Button'}
          </button>

          {errorMessage && (
            <div
              data-cy="forgot-password-error-message"
              className="text-center text-red-600 mt-4"
            >
              <strong>{errorMessage}</strong>
            </div>
          )}
          {successMessage && (
            <div
              data-cy="forgot-password-success-message"
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