import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CartStore } from "@/types/model";

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      hydrated: false,
      cartItems: [],

      hydrate: () => set({ hydrated: true }),

      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems; // all the items already in cart
        const isExisting = currentItems.find(
          (cartItem) =>
            cartItem.item.id === item.id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (isExisting) {
          toast.info("item already in cart");
          return;
        }

        const newItem: CartItem = {
          item,
          quantity: quantity ?? 1,
          color: color ?? null,
          size: size ?? null,
        };

        set({ cartItems: [...currentItems, newItem] });
        toast.success("Item added to cart", { icon: "🛒" });
      },

      removeItem: (idToRemove: number) => {
        const newCart = get().cartItems.filter(
          (cartItem) => cartItem.item.id !== idToRemove
        );

        set({ cartItems: newCart });
        toast.success("Item removed from cart");
      },

      increaseQuantity: (id: number) => {
        const newCart = get().cartItems.map((cartItem) =>
          cartItem.item.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );

        set({ cartItems: newCart });
      },

      decreaseQuantity: (id: number) => {
        const newCart = get().cartItems.map((cartItem) =>
          cartItem.item.id === id
            ? {
                ...cartItem,
                quantity: Math.max(1, cartItem.quantity - 1), // ← tidak boleh minus
              }
            : cartItem
        );

        set({ cartItems: newCart });
      },

      clearCart: () => {
        set({ cartItems: [] });
        toast.success("Cart cleared");
      },

      getTotalItems: () => {
        return get().cartItems.reduce((acc, item) => acc + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cartItems.reduce(
          (acc, item) => acc + item.item.price * item.quantity,
          0
        );
      },

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),

      skipHydration: true,
    }
  )
);

export default useCart;
