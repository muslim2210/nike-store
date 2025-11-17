import { create } from "zustand";
import api from "@/lib/axios";
import { AuthState } from "@/types/model";
import { toast } from "sonner";

export const useCustomerAuth = create<AuthState>((set) => ({
  customer: null,
  token: null,
  loading: false,

  // 🔹 Ambil token + data user saat initial load (auto login)
  init: async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) return;

    set({ token });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const res = await api.get("/api/customer/profile"); // endpoint untuk get profile
      set({ customer: res.data });
    } catch {
      set({ token: null, customer: null });
      localStorage.removeItem("token");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await api.post("/api/customer/login", { email, password });

      const token = res.data.token;
      

      // 🔹 Simpan token
      set({ token });
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // // 🔹 Ambil profile customer
      const me = await api.get("/api/customer/profile");
      const customer = me.data;
      set({ customer });

      console.info("[LOGIN SUCCESS]", res, me);
      toast.success("Login success");
      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("[LOGIN FAILED]", err);
      toast.error("invalid email or password");
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

      // 🔹 Auto-login setelah register
      set({ token, customer: res.data.customer });
      localStorage.setItem("token", token);
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
    localStorage.removeItem("token");

    delete api.defaults.headers.common["Authorization"];
  },
}));
