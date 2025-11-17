import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";
import { AuthState } from "@/types/model";
import { toast } from "sonner";
import { useWishlist } from "./useWishlist";

export const useCustomerAuth = create(
  persist<AuthState>(
    (set, get) => ({
      customer: null,
      token: null,
      loading: false,
      hydrated: false, // penting untuk next.js

      // Dipanggil setelah hydration persist selesai
      init: async () => {
        const token = get().token;

        if (!token) {
          set({ hydrated: true });
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const res = await api.get("/api/customer/profile");
          set({ customer: res.data });
        } catch {
          set({ token: null, customer: null });
        } finally {
          set({ hydrated: true });
        }
      },

      login: async (email, password) => {
        set({ loading: true });

        try {
          const res = await api.post("/api/customer/login", { email, password });
          const token = res.data.token;

          set({ token }); // persist akan simpan auto
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const me = await api.get("/api/customer/profile");
          const customer = me.data;

          set({ customer });

          // Ambil wishlist saat login
          useWishlist.getState().fetchWishlist();

          toast.success("Login success");
          return true;
        } catch (err) {
          console.error("[LOGIN FAILED]", err);
          toast.error("Invalid email or password");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      register: async (form) => {
        set({ loading: true });

        try {
          const res = await api.post("/api/customer/register", form);
          const token = res.data.token;

          set({
            token,
            customer: res.data.customer,
          });

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return true;
        } catch (err) {
          console.error("[REGISTER FAILED]", err);
          return false;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        const store = useCustomerAuth.getState();
        set({ token: null, customer: null });
        
        // ❗ Reset storage persist
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (useCustomerAuth as any).persist?.clearStorage();

        delete api.defaults.headers.common["Authorization"];
        useWishlist.getState().clearWishlist();
        toast.success("You are logged out");
      },

    }),

    {
      name: "nike-customer-auth", // key localStorage
      
      // Restore token & header setelah persist load
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const token = state.token;
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        // langsung fetch wishlist setelah rehydrate & login
        if (state.customer) {
          useWishlist.getState().fetchWishlist();
        }
      },
    }
  )
);
