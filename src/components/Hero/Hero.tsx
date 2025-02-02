'use client'

import React from 'react';
import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('hero');

  return (
    <section className="w-full bg-[#d4d4dc] dark:bg-[#1d1e22]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                         text-gray-900 dark:text-white
                         leading-tight sm:leading-tight md:leading-tight">
              {t('title')}
              <span className="block text-blue-600 dark:text-blue-400 mt-2">
                {t('subtitle')}
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg 
                         text-gray-600 dark:text-gray-300
                         max-w-2xl mx-auto">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
              <Link href={'/products'} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                               bg-blue-600 hover:bg-blue-700 
                               dark:bg-blue-500 dark:hover:bg-blue-600
                               text-white font-semibold 
                               rounded-lg sm:rounded-xl
                               transition-all duration-300 
                               text-sm sm:text-base">
                {t('shop_now')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;