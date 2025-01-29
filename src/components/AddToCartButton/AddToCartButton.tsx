'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../app/Providers/Cart';
import { Check, X } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function AddToCartButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const { cartItemCount, updateCartItemCount } = useCart();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleAddToCart = async () => {
    setLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to cart');
      }

      updateCartItemCount(cartItemCount + 1);
      setMessage('Item added to your cart successfully!');
      setShowModal(true);
    } catch (err) {
      setIsError(true);
      setMessage(err instanceof Error ? err.message : 'An unknown error occurred');
      setShowModal(true);
      console.error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 w-[115px]"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>

      {showModal && (
        <div 
          className="fixed left-1/2 top-20 -translate-x-1/2 z-50"
          onClick={() => setShowModal(false)}
        >
          <div 
            className={`flex items-center gap-2 p-3 rounded-lg shadow-lg ${
              isError ? 'bg-red-100 border border-red-200' : 'bg-green-100 border border-green-200'
            }`}
          >
            <div className="flex-shrink-0">
              {isError ? (
                <X className="h-5 w-5 text-red-500" />
              ) : (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </div>
            <p className={`text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>
              {message}
            </p>
            <button 
              className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}