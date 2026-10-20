import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import type { InventoryStockRequestData } from "@/types/inventory-stock-request";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

import useGetLocations from "../location/useGetLocations";

const getAllInventoryStockRequest = ({ queryKey }: QueryFunctionContext) => {
  const companyUUid = queryKey[1];

  return fetch
    .get(`/miams/api/v1/stock/get-all-inventory-request-stock/${companyUUid}/`)
    .then((res) => res.data.data);
};

export function useGetAllInventoryStockRequest() {
  const { userInformation } = useAuth();
  const { data: locations, isLoading } = useGetLocations();

  return useQuery({
    queryKey: ["inventory-stock-request", userInformation?.company_uid],
    queryFn: getAllInventoryStockRequest,
    enabled: !!userInformation?.company_uid && !!isLoading,
    select: (data) => {
      return data.map((request: any) => {
        return {
          ...request,
          location: locations?.find((location) => location.id === request.location),
        };
      }) as InventoryStockRequestData[];
    },
  });
}
