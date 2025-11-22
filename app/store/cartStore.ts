// app/store/cartStore.ts
import { create } from "zustand";

export interface CartItem {
  id: number;
  quantity: number;
  cart_id?: number;
  product_id?: number;
}

interface CartState {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  fetchCart: async () => {
    try {
      const res = await fetch("/api/carts");
      if (!res.ok) return;
      const data = await res.json();
      set({ cartItems: data.cartItems || [] });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      set({ cartItems: [] });
    }
  },
}));
