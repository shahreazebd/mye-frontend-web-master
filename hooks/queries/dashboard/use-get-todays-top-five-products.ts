import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export type TodaysTopFiveProductResponse = {
  success: boolean;
  data: TodaysTopFiveProduct[];
};

export type TodaysTopFiveProduct = {
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

function getTodaysTopFiveProducts({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) {
  const [, , company_uid] = queryKey;

  return fetch
    .get<TodaysTopFiveProductResponse>(
      `/orders/api/v1/orders/dashboard/top-five-product-today/${company_uid}`
    )
    .then((res) => res.data.data);
}

export function useGetTodaysTopFiveProducts() {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["dashboard", "top-five-product", userInformation?.company_uid as string],
    queryFn: getTodaysTopFiveProducts,
    enabled: !!userInformation?.company_uid,
  });
}
