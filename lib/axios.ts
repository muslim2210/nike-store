import axios from "axios";
import { useCustomerAuth } from "@/stores/useCustomerAuth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Ambil token setelah hydrate
api.interceptors.request.use((config) => {
  const token = useCustomerAuth.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
