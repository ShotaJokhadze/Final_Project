"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart, CreditCard } from "lucide-react";
import Loader from "../../../../components/Loader/Loader";
import Image from "next/image";
import { useCart } from "../../../Providers/Cart";
import { Link } from "../../../../i18n/routing";

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    title: string;
    price: number;
    image: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItemCount, updateCartItemCount } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update quantity");
      }

      const currentItem = cartItems.find(item => item.id === id);
      const quantityDiff = newQuantity - (currentItem?.quantity || 0);

      updateCartItemCount(cartItemCount + quantityDiff);

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/cart/${id}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete item");
      }
      const deletedItemQuantity = cartItems.find(item => item.id === id)?.quantity || 0;

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      updateCartItemCount(cartItemCount - deletedItemQuantity);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="py-8 min-h-screen w-full transition-colors duration-300 -mx-24">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center">
            <ShoppingCart className="mr-4 text-blue-600 dark:text-blue-400" size={36} />
            Your Cart
          </h1>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div
            className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 px-6 py-4 rounded-lg shadow-md"
            role="alert"
          >
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            <ShoppingCart
              className="h-32 w-32 mx-auto mb-6 text-gray-300 dark:text-gray-600"
              strokeWidth={1}
            />
            <p className="text-2xl font-semibold">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Explore our <Link href={'/products'} className="underline text-mediumGray dark:text-light">products</Link> and add some items!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-[3fr,1fr] gap-8">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="h-[250px] w-[840px] bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center h-full p-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="rounded-lg mr-6 shadow-md object-contain"
                    />
                    <div className="flex-grow flex flex-col items-center">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {item.product.title}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
                        <button
                          className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-full transition-colors"
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="px-4 text-lg font-semibold text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-full transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                      <button
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="h-7 w-7" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-[280px] flex flex-col">
              <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Order Summary
                </h3>
              </div>
              <div className="space-y-4 flex-grow">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center text-lg border-b pb-2 last:border-b-0 border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {item.product.title}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        × {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold text-lg flex items-center justify-center self-end">
                <CreditCard className="mr-3" />
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}