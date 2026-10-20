import { useQuery } from "@tanstack/react-query";

import { Price } from "@/types/price";
import { fetchPayment } from "@/config/xior";

const getSinglePrice = (priceId: string) => {
  return fetchPayment
    .get(`api/v1/mye/price/${priceId}`)
    .then<Price>((res) => res.data?.data);
};

export default function useGetSinglePrice(priceId: string) {
  return useQuery(["single-price", priceId], () => getSinglePrice(priceId), {
    enabled: !!priceId,
  });
}
