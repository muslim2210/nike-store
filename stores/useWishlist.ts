import { create } from "zustand";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ProductType, WishlistState } from "@/types/model";

export const useWishlist = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  hydrated: false,

  fetchWishlist: async () => {
    set({ loading: true });

    try {
      const res = await api.get("/api/wishlist");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const productIds = res.data.data.map((p: any) => p.id);

      set({ wishlist: productIds, hydrated: true });
    } catch (err) {
      console.error("[FETCH WISHLIST FAILED]", err);
      set({ hydrated: true });
    } finally {
      set({ loading: false });
    }
  },

  toggleWishlist: async (productId) => {
    const { wishlist } = get();
    const isAdded = wishlist.includes(productId);
    set({ hydrated: true });

    try {
      if (isAdded) {
        await api.post("/api/wishlist/remove", { product_id: productId });
        toast.success("Removed from wishlist");
        set({ wishlist: wishlist.filter((id) => id !== productId) });
      } else {
        await api.post("/api/wishlist/add", { product_id: productId });
        toast.success("Added to wishlist");
        set({ wishlist: [...wishlist, productId] });
      }
    } catch (err) {
      console.error("[WISHLIST ERROR]", err);
      toast.error("Failed");
    }
  },

  isWishlisted: (productId) => {
    return get().wishlist.includes(productId);
  },

  clearWishlist: () => {
    set({ wishlist: [], hydrated: true });
  },

  hydrateWishlist: (products: ProductType[]) => {
    const ids = products.map((p) => p.id);
    set({ wishlist: ids, hydrated: true });
  },
}));
