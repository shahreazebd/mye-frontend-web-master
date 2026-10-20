import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export type TopProductResponse = {
  success: boolean;
  data: TopProduct[];
};

export type TopProduct = {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  purchase_price: string;
  selling_price: string;
  is_composite: boolean;
  is_child: boolean;
  image: null | string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  company_uid: string;
  stock_notification: boolean;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  total_sold: number;
  currency: string;
};

function getMonthlyTopTenProducts({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) {
  const [, , company_uid] = queryKey;

  return fetch
    .get<TopProductResponse>(
      `/orders/api/v1/orders/dashboard/top-ten-product-monthly/${company_uid}`
    )
    .then((res) => res.data.data);
}

export function useGetMonthlyTopTenProducts() {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: [
      "dashboard",
      "top-ten-monthly-product",
      userInformation?.company_uid as string,
    ],
    queryFn: getMonthlyTopTenProducts,
    enabled: !!userInformation?.company_uid,
  });
}
