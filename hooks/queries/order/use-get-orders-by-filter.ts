import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import fetch from "@/config/xior";

export type OrderByFilterLineItem = {
  quantity: number;
  lineItemId: string;
  legacyItemId: string;
  legacyVariationId?: string;
};

export type OrderByFilterItemMeta = {
  lineItems?: OrderByFilterLineItem[];
  buyer_username?: string;
};

export type OrderByFilterProductItem = {
  id?: number;
  remote_sku: string;
  quantity: number;
  price: string | number;
  total_amount: string | number;
  channel_uid?: string;
  company_uid?: string;
  createdAt?: string;
  updatedAt?: string;
  position_item_ids?: string[];
  picked_sku?: string | null;
  picked_at?: string | null;
  picked_item_type?: string | null;
  packed_sku?: string | null;
  packed_at?: string | null;
  title?: string;
};

export type OrderByFilterData = {
  id: number;
  channel_order_id: string;
  payment_status: string;
  payment_method?: string;
  purchase_date?: string;
  currency: string;
  total: string;
  channel_uid: string;
  company_uid?: string;
  dispatch_status?: string;
  createdAt?: string;
  updatedAt?: string;
  items: OrderByFilterProductItem[];
  dispatched_at?: string | null;
  dispatched_by?: string;
  order_meta?: OrderByFilterItemMeta;
  cancelled_at?: string | null;
};

export type GetOrdersByFilterResponse = {
  success: boolean;
  order_count: number;
  data: OrderByFilterData[];
  message?: string;
};

export type GetOrdersByFilterParams = {
  channel_uid: string;
  buyer_username: string;
  legacy_item_id: string;
  date_from?: string;
  date_to?: string;
};

export async function getOrdersByFilter(params: GetOrdersByFilterParams) {
  const URL = "/orders/api/v1/orders/get-orders-by-filter/";

  const dateFrom = params.date_from || dayjs().subtract(3, "months").format("YYYY-MM-DD");
  const dateTo = params.date_to || dayjs().format("YYYY-MM-DD");

  return fetch
    .get<GetOrdersByFilterResponse>(URL, {
      params: {
        channel_uid: params.channel_uid,
        buyer_username: params.buyer_username,
        legacy_item_id: params.legacy_item_id,
        date_from: dateFrom,
        date_to: dateTo,
      },
    })
    .then((res) => res.data);
}

export function useGetOrdersByFilter(
  params: Partial<GetOrdersByFilterParams>,
  enabled = true
) {
  const hasRequiredParams = Boolean(
    params.channel_uid && params.buyer_username && params.legacy_item_id
  );

  return useQuery({
    queryKey: [
      "orders-by-filter",
      params.channel_uid,
      params.buyer_username,
      params.legacy_item_id,
      params.date_from,
      params.date_to,
    ],
    queryFn: () => getOrdersByFilter(params as GetOrdersByFilterParams),
    enabled: enabled && hasRequiredParams,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
