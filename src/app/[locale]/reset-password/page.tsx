"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { resetPasswordAction } from "../api/auth/reset-password/route";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const locale = useLocale();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    // Create a new FormData object and set all required fields
    const submissionData = new FormData();
    submissionData.set('password', password);
    submissionData.set('confirmPassword', confirmPassword);
    submissionData.set('locale', locale);
    if (code) {
      submissionData.set('code', code);
    }
  
    try {
      const result = await resetPasswordAction(submissionData);
  
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
          Reset Your Password
        </h2>

        <form action={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="password"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label
              htmlFor="confirmPassword"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <button
            className={`w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg transition-all duration-300 focus:outline-none dark:bg-blue-700 
              ${isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 dark:hover:bg-blue-800'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>

          {errorMessage && (
            <div className="text-center text-red mt-4">
              <strong>{errorMessage}</strong>
            </div>
          )}
          {successMessage && (
            <div className="text-center text-green-600 mt-4">
              <strong>{successMessage}</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}