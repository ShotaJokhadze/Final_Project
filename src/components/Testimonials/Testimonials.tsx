'use client'

import React from 'react'
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Testimonial {
  id: number; 
  name: string;
  feedback: string;
  rating: number;
  created_at: string; 
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const locale = useLocale();

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Testimonials
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            See what our customers have to say about us.
          </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial: Testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-center">
                  {testimonial.feedback}
                </p>
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        
        
        <div className="text-center mt-8">
          <Link 
            href={`/${locale}/rate-us`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Rate Us
          </Link>
        </div>
      </div>
    </section>
  );
}
