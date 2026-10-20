import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import { MappingProductResponse } from "@/types/mapping-product";
import fetch from "@/config/xior";

function getMappingProducts({ queryKey }: QueryFunctionContext) {
  const [, productId, companyUid] = queryKey;

  return fetch
    .get<MappingProductResponse>(
      `/miams/api/v1/mapping/product-details/${companyUid}/${productId}/`
    )
    .then((res) => res.data.data);
}

export function useGetMappingProducts(productId: number) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["mapping-products", productId, userInformation?.company_uid],
    queryFn: getMappingProducts,
    enabled: !!productId && !!userInformation?.company_uid,
  });
}
