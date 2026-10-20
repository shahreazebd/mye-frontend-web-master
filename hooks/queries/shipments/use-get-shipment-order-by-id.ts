import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

import type { Order } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";

export async function getShipmentOrderById({
  queryKey,
}: QueryFunctionContext<[string, string]>) {
  const [, orderId] = queryKey;
  const response = await fetchPostage.get<{ success: boolean; data: Order }>(
    `/orders/${orderId}`
  );
  return response?.data?.data;
}

export function useGetShipmentOrderById(orderId: string, enabled = true) {
  return useQuery({
    queryKey: ["get-shipment-order-by-id", orderId],
    queryFn: getShipmentOrderById,
    enabled: enabled && !!orderId,
  });
}
