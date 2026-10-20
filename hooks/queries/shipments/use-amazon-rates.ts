"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchPostage } from "@/config/xior";

export function useAmazonRates() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batchId");
  const carrier = searchParams.get("carrier");

  const fetchRates = async () => {
    if (!batchId) throw new Error("Missing batchId in URL");
    const { data } = await fetchPostage.post(`/amazon/rates/${batchId}`);

    return data;
  };

  const {
    data: amazonRates,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["amazonRates", batchId],
    queryFn: fetchRates,
    enabled: carrier === "AMAZON" && !!batchId,
  });

  useEffect(() => {
    if (carrier === "AMAZON") refetch();
    return () => {};
  }, [carrier, refetch]);

  return { amazonRates, isLoading, isError, refetch };
}
