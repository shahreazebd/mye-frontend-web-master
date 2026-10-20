import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import type { ChildProductResponse } from "@/types/product";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function fetcher({ queryKey }: QueryFunctionContext<[string, string, number]>) {
  const [, companyUid, parantProductId] = queryKey;

  const url = `/miams/api/v1/mapping/product/local-product/get-composite-local-v2/${companyUid}/${parantProductId}/`;
  return fetch.get<ChildProductResponse>(url).then((res) => res.data.data);
}

export default function useGetCompositeChildProducts(parentProductId: number) {
  const { userInformation } = useAuth();

  return useQuery(
    [
      "get-composite-child-products",
      userInformation?.company_uid as string,
      parentProductId,
    ],
    fetcher
  );
}
