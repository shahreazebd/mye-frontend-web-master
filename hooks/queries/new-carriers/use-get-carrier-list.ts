import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { CarrierResponse } from "@/types/shipping-carriers";
import { fetchPostage } from "@/config/xior";

function getCarrierList({ queryKey }: QueryFunctionContext) {
  const [, , carrierName] = queryKey;

  return fetchPostage
    .get<CarrierResponse>("/carriers", {
      params: { type: carrierName, status: "CONNECTED" },
    })
    .then((res) => {
      return res.data.data;
    });
}

export function useGetCarrierList(carrierName?: string) {
  return useQuery({
    queryKey: ["carrier", "list", carrierName],
    queryFn: getCarrierList,
  });
}
