"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CheckCircle, Loader2 } from "lucide-react";

export default function Signup() {
  const locale = useLocale();
  const t = useTranslations("Signup");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set('locale', locale);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;

      const response = await fetch(`/${locale}/api/auth/signup`, {
        method: "POST",
        body: new URLSearchParams({
          email,
          password,
          name,
          phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: "error", text: result.error || "An unknown error occurred." });
      } else {
        setMessage({ type: "success", text: result.success || "Signup successful!" });
        setShowSuccessModal(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: error.message || "An error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Spinner Component
  const LoadingSpinner = () => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <p className="mt-2 text-white">Processing...</p>
        </div>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal = ({ message, isOpen }: { message: string; isOpen: boolean }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Success!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {t("title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="displayName"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your display name"
              className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label
              htmlFor="phone"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="US"
              value={phone}
              onChange={setPhone}
              className="phone-input-container"
              name="phone"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              {t("Email")}
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

          <div className="flex flex-col space-y-3">
            <label
              htmlFor="password"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              {t("Password")}
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
            {t("Registered")}{" "}
            <a
              data-cy="sign-up-link"
              href="./login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none"
            >
              {t("Login")}
            </a>
          </div>

          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing up...
              </div>
            ) : (
              t("title")
            )}
          </button>

          {message?.type === "error" && (
            <div className="text-center mt-4 font-bold text-red">
              {message.text}
            </div>
          )}
        </form>

        <LoadingSpinner />
        
        <SuccessModal 
          message={message?.text || ""} 
          isOpen={showSuccessModal && message?.type === "success"} 
        />
      </div>
    </div>
  );
}