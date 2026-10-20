import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export type Orders = {
  success: boolean;
  data: Datum[];
};

export type Datum = {
  channel_uid: string;
  market_place: string;
  total_count: number;
  channel_details: ChannelDetails | null;
};

export type ChannelDetails = {
  id: number;
  name: string;
  channel_uid: string;
  company_uid: string;
  channel_type: string;
  channel_state: string;
  shop_url: string;
  country: string;
  channel_max_stock: number;
  report_ref: ReportRef | null;
  report_sorted_by: null | string;
  is_authorized: boolean;
  expires_on: Date | null;
  channel_metadata: null;
  order_sync: boolean | null;
  inventory_sync: boolean | null;
};

export type ReportRef = {
  column_order: any[];
  report_column_name: object;
};

function getOrdersByChannel({ queryKey }: QueryFunctionContext) {
  const [, , companyUuid] = queryKey;

  return fetch
    .get<Orders>(
      `/orders/api/v1/orders/dashboard/channel-total-order-count/${companyUuid}/`
    )
    .then((res) => res.data.data);
}

export function useGetOrdersByChannel() {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["orders", "by-channel", userInformation?.company_uid],
    queryFn: getOrdersByChannel,
    enabled: !!userInformation?.company_uid,
  });
}
