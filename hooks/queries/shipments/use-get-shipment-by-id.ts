import { usePostageAtom } from "@/atoms/postageAtom";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

import { ShipmentDetailsResponse } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";

async function fn({ queryKey }: QueryFunctionContext<[string, string]>) {
  const [, shipmentId] = queryKey;

  const response = await fetchPostage.get<ShipmentDetailsResponse>(
    `/shipments/${shipmentId}`
  );

  return response?.data?.data;
}

export function useGetShipmentById() {
  const { postageInfo } = usePostageAtom();

  return useQuery({
    queryKey: ["get-shipment-by-id", postageInfo?.selectedPostage?.id],
    queryFn: fn,
    enabled: !!postageInfo?.selectedPostage?.id,
  });
}
