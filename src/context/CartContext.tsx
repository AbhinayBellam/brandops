import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartContext not found');
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // AsyncStorage.getItem('user_cart').then(data => {
    //   if (data) setCartItems(JSON.parse(data));
    // });

    AsyncStorage.getItem('user_cart').then(data => {
  try {
    const parsed = JSON.parse(data || '[]');
    if (Array.isArray(parsed)) {
      setCartItems(parsed);
    } else {
      setCartItems([]); // fallback
    }
  } catch (err) {
    console.error('Invalid cart data:', err);
    setCartItems([]); // fallback
  }
});

  }, []);

  useEffect(() => {
    AsyncStorage.setItem('user_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increment = (id: string) => {
    setCartItems(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );
  };

  const decrement = (id: string) => {
    setCartItems(prev =>
      prev
        .map(p => p.id === id ? { ...p, quantity: p.quantity - 1 } : p)
        .filter(p => p.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, increment, decrement, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
