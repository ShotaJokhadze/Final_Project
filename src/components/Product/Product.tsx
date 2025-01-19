'use client'

import React, { useState } from 'react';
import { Product as ProductInterface } from "../../types/product";

interface ProductProps extends ProductInterface {
  locale?: string; // Made optional to maintain compatibility
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

  // Use localized content based on the locale
  const localizedTitle = locale === 'ka' ? title_ge : title;
  const localizedDescription = locale === 'ka' ? description_ge : description;

  // Modal toggle functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal only if the backdrop is clicked
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="flex items-center gap-9 w-full relative justify-center h-1/2">
      {/* Image Section */}
      <div className="h-full w-1/2">
        <img 
          className="h-full w-full block object-cover cursor-pointer" 
          src={image} 
          alt={localizedTitle} 
          onClick={openModal} // Open modal on click
        />
      </div>

      {/* Details Section */}
      <div className="w-1/2 flex flex-col gap-3 justify-start">
        <h2 className="product-title">{localizedTitle}</h2>
        <div className="bg-yellow-100 w-fit p-2 rounded-lg text-black">{brand}</div>
        <div className="product-description">{localizedDescription}</div>
        <div className="flex justify-between w-1/2">
          <p>Price</p>${price}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick} // Close on blur
        >
          <div 
            className="relative bg-mediumGray p-4 rounded-lg shadow-lg w-1/2 h-[80vh] flex items-center justify-center"
          >
            <button 
              className="absolute top-4 right-4 text-4xl font-bold text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>
            <img 
              className="max-w-full max-h-full object-contain" 
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
