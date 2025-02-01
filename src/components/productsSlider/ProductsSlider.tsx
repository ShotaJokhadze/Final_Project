'use client'

import React from 'react'
import { Product } from '../../types/product'
import Image from 'next/image';
import { Link } from '../../i18n/routing';

export default function ProductsSlider({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-6 items-center justify-center p-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="flex flex-col min-w-[280px] border border-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl snap-start dark:bg-zinc-900 dark:text-zinc-100 bg-white text-gray-900 hover:scale-105 transform transition-transform duration-500 ease-out"
        >
          <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg shadow-md">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              className="w-full h-full object-contain transform hover:scale-110 transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-col flex-grow space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 line-clamp-2 min-h-[56px]">{product.title}</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-3">{product.description}</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-zinc-200">
              ${product.price.toFixed(2)}
            </p>
            
            <Link 
              href={`/products`}
              className="mt-auto inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-md shadow-md hover:shadow-lg"
            >
              View Products
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
