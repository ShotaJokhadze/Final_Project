'use client'

import React, { useState, useCallback } from 'react';
import { Product as ProductInterface } from "../../types/product";
import { ZoomIn, X, Tag, DollarSign, ArrowLeft, Pencil } from 'lucide-react';
import Loader from '../Loader/Loader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteProduct from '../DeleteProductButton/DeleteProductButton';
import { Link } from '../../i18n/routing';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

interface ProductProps extends ProductInterface {
  locale?: string;
}

const Product: React.FC<ProductProps> = ({ 
  title, 
  description, 
  brand, 
  price, 
  image, 
  title_ge, 
  description_ge,
  locale,
  id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const localizedTitle = locale === 'ka' ? title_ge : title;
  const localizedDescription = locale === 'ka' ? description_ge : description;

  const handleImageLoad = () => setImageLoaded(true);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
    document.body.style.overflow = isModalOpen ? 'unset' : 'hidden';
  }, [isModalOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, toggleModal]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 ">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300">
        <div className="p-6">
          {/* Back Button */}
          <button 
            onClick={() => router.push(`/${locale}/products`)}
            className="inline-flex items-center justify-center w-10 h-10 mb-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="relative h-full ">
              <div 
                className="h-full w-full  rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 cursor-zoom-in shadow-md group"
                onClick={toggleModal}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader />
                  </div>
                )}
                <Image
                  src={image}
                  alt={localizedTitle ?? title}
                  className={`w-full h-full object-contain transition duration-300 group-hover:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadingComplete={handleImageLoad}
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300" />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:items-start sm:justify-between">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 pr-4">
                    {localizedTitle || title}
                  </h1>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 text-sm font-medium rounded-full shadow-sm border border-yellow-200 dark:border-yellow-700">
                      <Tag size={14} className="mr-1.5 flex-shrink-0" />
                      <span className="truncate max-w-[120px]">{brand}</span>
                    </span>
                  </div>
                </div>
                
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {localizedDescription || description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row flex-wrap 2xl:flex-nowrap items-center justify-center sm:items-center md:justify-between gap-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <DollarSign size={20} className="text-blue-500" />
                    <span className="ml-2 text-lg font-medium">Price:</span>
                    <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatPrice(price)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full sm:w-auto">
                    <AddToCartButton productId={id}/>
                    <Link 
                      href={`/edit-product/${id}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 max-w-[140px]"
                    >
                      <Pencil size={18}/>
                      <span>Edit</span>
                    </Link>
                    <div className="flex-1 sm:flex-none">
                      <DeleteProduct id={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && toggleModal()}
        >
          <div className="relative flex justify-center w-full max-w-5xl bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl">
            <button 
              onClick={toggleModal}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-square max-h-[85vh]">
              <Image
                src={image}
                alt={localizedTitle ?? title}
                className="w-full h-full object-contain rounded-lg"
                width={1000}
                height={1000}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;