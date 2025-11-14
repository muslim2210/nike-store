/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useCallback, useMemo } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface UseFetchOptions {
  url: string;
  params?: Record<string, any>;
  immediate?: boolean;
}

export function useFetch<T = any>({ url, params = {}, immediate = true }: UseFetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stabilkan object params biar gak berubah tiap render
  const stableParams = useMemo(() => params, [JSON.stringify(params)]);

  const fetchData = useCallback(async (customParams?: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(url, { params: { ...stableParams, ...customParams } });
      const payload = res.data?.data?.data || res.data?.data || res.data;
      setData(payload as T);
      console.info(`[useFetch] Response ${url}:`, res);
      console.info(`[useFetch] payload ${url} data:`, payload);
      return payload;
    } catch (err: any) {
      console.error(`[useFetch] Error fetching ${url}:`, err);
      setError(err?.message || "Something went wrong.");
      toast.error(err?.message || "Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, stableParams]);

  useEffect(() => {
    if (immediate) fetchData();
  }, [fetchData, immediate]);

  return { data, loading, error, refetch: fetchData };
}
