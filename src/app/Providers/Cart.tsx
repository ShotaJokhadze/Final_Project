'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextProps {
  cartItemCount: number;
  updateCartItemCount: (count: number) => void;
}

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


const CartContext = createContext<CartContextProps | undefined>(undefined);
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItemCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/cart`, { method: "GET" });
      const data: CartItem[] = await response.json();
      const totalItems = data.reduce((acc: number, item) => acc + item.quantity, 0);
      setCartItemCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart item count:", error);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
  }, []);

  const updateCartItemCount = (count: number) => {
    setCartItemCount(count);
  };
  
  return (
    <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
