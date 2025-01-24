'use client'
import React, { useState, useCallback } from 'react';
import { Product as ProductInterface } from "../../types/product";
import { ZoomIn, X } from 'lucide-react';
import Loader from '../Loader/Loader';

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
  locale 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const localizedTitle = locale === 'ka' ? title_ge : title;
  const localizedDescription = locale === 'ka' ? description_ge : description;

  const handleImageLoad = () => setImageLoaded(true);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
    // Prevent scrolling when modal is open
    document.body.style.overflow = isModalOpen ? 'unset' : 'hidden';
  }, [isModalOpen]);

  // Escape key handler for modal
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
    <div className="flex flex-col md:flex-row items-stretch gap-9 w-full relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 transition-colors duration-200">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative group">
        <div 
          className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-zoom-in"
          onClick={toggleModal}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader />
            </div>
          )}
          <img 
            className={`h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={image} 
            alt={localizedTitle}
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
              <ZoomIn className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {localizedTitle}
            </h2>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-200 text-yellow-800 text-sm font-medium rounded-full">
              {brand}
            </span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {localizedDescription}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Price</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(price)}
            </span>
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
            className="relative bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xl dark:shadow-gray-900 w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
          >
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={toggleModal}
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              className="max-w-full max-h-[85vh] object-contain rounded-lg" 
              src={image} 
              alt={localizedTitle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
