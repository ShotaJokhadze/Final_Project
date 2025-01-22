"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Password has been successfully reset. You can now sign in with your new password.");
        // Optional: Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!code) {
    return (
      <div className="flex flex-grow items-center justify-center h-full">
        <div className="w-full max-w-md p-6">
          <div className="text-center text-red-600">
            <strong>Invalid or missing reset code. Please request a new password reset.</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow items-center justify-center h-full">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-sm m-4 rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="text-center text-red-600 mt-4">
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