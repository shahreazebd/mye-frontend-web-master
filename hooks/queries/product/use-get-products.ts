import { ProductResponse } from "@/schema/product";
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchProductTableData = (company_uid: string) => {
  return fetch
    .get<ProductResponse>(
      `/miams/api/v1/mapping/product/local-product/get-all-local-product/${company_uid}/`
    )
    .then((res) => res.data.data.map((e) => ({ ...e, composite_quantity: 1 })));
};

export default function useGetProducts() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-product-data"],
    () => fetchProductTableData(userInformation?.company_uid as string),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
