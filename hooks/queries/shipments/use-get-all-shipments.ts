import { useSearchParams } from "next/navigation";
import { toQueryParams } from "@/utils/helpers";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import dayjs from "dayjs";

import type { ShipmentList } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";

async function fn({
  queryKey,
}: QueryFunctionContext<[string, { date?: string; carrier?: string }]>) {
  const [, filters] = queryKey;

  const params = toQueryParams({ date: filters.date, carrierType: filters.carrier });

  const response = await fetchPostage.get<{ data: ShipmentList[] }>("/shipments", {
    params,
  });

  return response?.data?.data;
}

export function useGetAllShipments() {
  const searchParams = useSearchParams();

  const currentDate = dayjs().format("YYYY-MM-DD");

  const date = searchParams.get("date") || currentDate;
  const carrier = searchParams.get("carrier")?.toUpperCase();

  const filters = { date, carrier };

  return useQuery({
    queryKey: ["get-all-shipments", filters],
    queryFn: fn,
    // refetchInterval: 10000,
    // refetchIntervalInBackground: false,
  });
}
