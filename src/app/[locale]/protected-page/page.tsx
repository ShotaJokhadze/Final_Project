'use client'
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const ProtectedPage = () => {
  const locale = useLocale();
  const t = useTranslations('protected');

    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-white">
          <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {t('title')}
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          {t('description')}
          </p>
          <Link
            href={`/${locale}/login`}
            className="mt-4 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {t('login')}
          </Link>
        </div>
      </div>
    );
}

export default ProtectedPage;