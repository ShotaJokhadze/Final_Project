'use client'

import React from 'react'
import { Product } from '../../types/product'
import Image from 'next/image';
import { Link } from '../../i18n/routing';
import { useLocale } from 'next-intl';

export default function ProductsSlider({ products }: { products: Product[] }) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center w-4/5 mx-auto gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md sm:mx-2 hover:shadow-lg w-full"
        >
          <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              className="w-full h-full object-contain transform"
            />
          </div>
          
          <div className="flex flex-col flex-grow space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 line-clamp-2 min-h-[56px]">{locale==='ka' ? product.title_ge : product.title}</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3">{locale==='ka' ? product.description_ge : product.description}</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
              ${product.price?.toFixed(2)}
            </p>
            
            <Link 
              href={`/products`}
              className="mt-auto inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-md shadow-md hover:shadow-lg"
            >
              {locale==='ka' ? 'პროდუქტები' : 'View Products'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
