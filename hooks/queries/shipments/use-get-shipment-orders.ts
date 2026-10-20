import {
  useShipmentOrdersFiltersAtom,
  useShipmentOrdersPaginationAtom,
} from "@/atoms/postageAtom";
import { toQueryParams } from "@/utils/helpers";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

import type { ShipmentOrdersResponse } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";

type FiltersType = {
  q?: string;
  status?: string;
  trackingUploadStatus?: string;
  shipmentId?: string;
  marketplace?: string;
  carrierType?: string;
};

async function getShipmentOrders({
  queryKey,
}: QueryFunctionContext<[string, { page: number; limit: number } & FiltersType]>) {
  const [, filters] = queryKey;

  const params = toQueryParams(filters);

  const response = await fetchPostage.get<ShipmentOrdersResponse>("/orders", { params });

  const rawData = response?.data;

  // Clean parse count and orders
  const orders = rawData?.data || [];
  const count = rawData?.meta?.total ?? orders.length;

  return { orders, count };
}

export function useGetShipmentOrders() {
  const { filters } = useShipmentOrdersFiltersAtom();
  const { pagination } = useShipmentOrdersPaginationAtom();

  const queryFilters = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    q: filters.q,
    status: filters.status,
    trackingUploadStatus: filters.trackingUploadStatus,
    shipmentId: filters.shipmentId,
    carrierType: filters.carrierType,
  };

  return useQuery({
    queryKey: ["get-shipment-orders", queryFilters] as const,
    queryFn: getShipmentOrders,
    keepPreviousData: true,
  });
}
