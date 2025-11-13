/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useCallback, useMemo } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface UseFetchDetailOptions {
  url: string;              // contoh: "/api/collections"
  id?: string | number;     // id data
  params?: Record<string, any>; // query params, misal fields, with, dll
  immediate?: boolean;      // otomatis fetch saat mount
}

export function useFetchDetail<T = any>({ url, id, params = {}, immediate = true }: UseFetchDetailOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stabilkan object params biar gak berubah tiap render
  const stableParams = useMemo(() => params, [JSON.stringify(params)]);

  const fetchDetail = useCallback(async (customId?: string | number, customParams?: Record<string, any>) => {
    const finalId = customId ?? id;
    if (!finalId) {
      console.warn(`[useFetchDetail] No ID provided for ${url}`);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`${url}/${finalId}`, { params: { ...stableParams, ...customParams } });
      const payload = res.data?.data || res.data;
      setData(payload as T);
      console.info(`[useFetchDetail] Response ${url}/${finalId}:`, res);
      console.info(`[useFetchDetail] Fetched ${url}/${finalId} data:`, payload);
      return payload;
    } catch (err: any) {
      console.error(`[useFetchDetail] Error fetching ${url}/${finalId}:`, err);
      setError(err?.message || "Something went wrong.");
      toast.error(err?.message || "Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, id, stableParams]);

  useEffect(() => {
    if (immediate && id) fetchDetail();
  }, [fetchDetail, immediate, id]);

  return { data, loading, error, refetch: fetchDetail };
}
