'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../app/Providers/Cart';
import { Check, X, ShoppingCart, Loader2 } from "lucide-react";

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
      setMessage('Added to cart!');
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
        className="inline-flex items-center justify-center gap-1 px-2 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-medium rounded-lg transition-all duration-200 min-w-[124px] max-w-[140px] shadow-sm hover:shadow group disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Adding...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>Add to Cart</span>
          </>
        )}
      </button>

      {showModal && (
        <div 
          className="fixed left-1/2 top-6 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
          onClick={() => setShowModal(false)}
        >
          <div 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm ${
              isError 
                ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' 
                : 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20'
            }`}
          >
            <div className={`flex-shrink-0 rounded-full p-1 ${
              isError ? 'bg-red-100 dark:bg-red-500/20' : 'bg-green-100 dark:bg-green-500/20'
            }`}>
              {isError ? (
                <X className="h-4 w-4 text-red-600 dark:text-red-400" />
              ) : (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              )}
            </div>
            <p className={`text-sm font-medium ${
              isError ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'
            }`}>
              {message}
            </p>
            <button 
              className="ml-auto flex-shrink-0 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close notification"
            >
              <X className={`h-4 w-4 ${
                isError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
              }`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}