'use client';

import { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export default function AddToCartButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 w-[115px]"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
