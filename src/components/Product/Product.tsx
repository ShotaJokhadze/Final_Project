'use client'
import React, { useState, useCallback } from 'react';
import { Product as ProductInterface } from "../../types/product";
import { ZoomIn, X, Tag, DollarSign, ArrowLeft } from 'lucide-react';
import Loader from '../Loader/Loader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteProduct from '../DeleteProductButton/DeleteProductButton';

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
    <div className="product-card group relative mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      
      {/* Go Back Arrow in Circle */}
      <button 
        className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 mb-4"
        onClick={() => router.push(`/${locale}/products`)}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative group flex items-center justify-center">
          <div 
            className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 cursor-zoom-in shadow-md"
            onClick={toggleModal}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            )}
            <Image
              src={image}
              alt={localizedTitle}
              className={`h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={handleImageLoad}
              width={0}
              height={0}
              sizes="100vw"
            />  
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {localizedTitle || title}
              </h2>
              <span className="flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-200 text-yellow-800 text-sm font-medium rounded-full">
                <Tag size={14} className="mr-1" />
                {brand}
              </span>
            </div>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {localizedDescription || description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <DollarSign size={18} className="mr-2 text-blue-500" />
                <span className="text-base font-medium">Price</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPrice(price)}
              </span>
              <DeleteProduct id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={(e) => e.target === e.currentTarget && toggleModal()}
        >
          <div 
            className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl dark:shadow-gray-900 w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
          >
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={toggleModal}
            >
              <X className="w-5 h-5" />
            </button>
            <Image
              src={image}
              alt={localizedTitle}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              width={800} 
              height={600} 
              sizes="100vw"
            />
          </div>
        </div>  
      )}
    </div>
  );
};

export default Product;
