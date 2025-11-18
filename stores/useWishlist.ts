import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ProductType, WishlistState } from "@/types/model";

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      loading: false,
      hydrated: false, // sangat penting untuk Next.js

      /** Hydrate dari API setelah login */
      fetchWishlist: async () => {
        set({ loading: true });

        try {
          const res = await api.get("/api/wishlist");
          const productIds = res.data.data.map((p: ProductType) => p.id);

          set({
            wishlist: productIds,
            hydrated: true,
          });
        } catch (err) {
          console.error("[FETCH WISHLIST FAILED]", err);

          // tetap nyalakan hydrated supaya UI muncul
          set({ hydrated: true });
        } finally {
          set({ loading: false });
        }
      },

      toggleWishlist: async (productId) => {
        const { wishlist } = get();
        const isAdded = wishlist.includes(productId);

        try {
          if (isAdded) {
            await api.post("/api/wishlist/remove", { product_id: productId });
            set({ wishlist: wishlist.filter((id) => id !== productId) });
            toast.success("Removed from wishlist");
          } else {
            await api.post("/api/wishlist/add", { product_id: productId });
            set({ wishlist: [...wishlist, productId] });
            toast.success("Added to wishlist");
          }
        } catch (err) {
          console.error("[WISHLIST TOGGLE FAILED]", err);
          toast.error("Failed");
        }
      },

      isWishlisted: (productId) => get().wishlist.includes(productId),

      clearWishlist: () => {
        set({ wishlist: [] });
      },

      /** Hydrate dari halaman server (opsional) */
      hydrateWishlist: (products: ProductType[]) => {
        const ids = products.map((p) => p.id);

        set({
          wishlist: ids,
          hydrated: true,
        });
      },
    }),
    {
      name: "wishlist-storage", // key localStorage

      // ketika persist sudah dimuat, jalankan ini
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
