import { useQuery } from "@tanstack/react-query";

import { Price } from "@/types/price";
import { fetchPayment } from "@/config/xior";

const getAllPrice = () => {
  return fetchPayment.get("api/v1/mye/price").then<Price[]>((res) => res.data?.data);
};

export default function useGetAllPrice() {
  return useQuery(["all-price"], getAllPrice);
}
