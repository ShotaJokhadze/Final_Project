'use client'
import { useSearchParams } from "next/navigation";
import { Link } from "../../../../../i18n/routing";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "Something went wrong.";

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Payment Failed ❌
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {errorMessage}
        </p>
        <div className="space-y-4">
          <Link
            href="/cart"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
