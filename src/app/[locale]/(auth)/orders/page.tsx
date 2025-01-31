"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../../../../components/Loader/Loader";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface Order {
  id: string;
  payment_intent_id: string;
  order_items: { image: string | null }[];
  total_amount: number;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${baseUrl}/api/orders`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader />
    </div>
  );

  return (
    <div className="w-full md:w-4/5 min-h-screen mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 border-b dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium truncate">{order.payment_intent_id}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="w-full sm:w-2/3">
                    <div className="grid grid-cols-3 gap-3">
                      {order.order_items.slice(0, 3).map((item, index) => (
                        <div 
                          key={index} 
                          className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={`Product ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-full object-contain"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400 text-sm">No image</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {order.order_items.length > 3 && (
                      <p className="mt-3 text-sm text-gray-500">
                        +{order.order_items.length - 3} more items
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col  items-center justify-center sm:items-end">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-semibold">
                      ${(order.total_amount / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}