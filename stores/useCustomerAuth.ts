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

          // simpan token di cookie agar middleware bisa baca
          document.cookie = `customer_token=${token}; path=/;`;

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
        set({ token: null, customer: null });
        
        localStorage.removeItem("nike-customer-auth");

        document.cookie = "customer_token=; Max-Age=0; path=/;";
        delete api.defaults.headers.common["Authorization"];
        useWishlist.getState().clearWishlist();
        toast.success("You are logged out");
      },

    }),

    {
      name: "nike-customer-auth", 
      skipHydration: true, 
      
      onRehydrateStorage: () => (state) => {
        if (!state) return state;

        if (state.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
        }

        return state; 
      },
    }
  )
);
