import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export interface LocalProduct {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  purchase_price: string;
  selling_price: string;
  is_composite: boolean;
  image: string | null;
  weight: string;
  height: string;
  width: string;
  depth: string;
  company_uid: string;
  createdAt: string;
  updatedAt: string;
}

const fetchLocalProductMappingData = ({ queryKey }: QueryFunctionContext) => {
  const [, company_uid] = queryKey;
  const URL = `/miams/api/v1/mapping/product/local-product/get-all-local-product/${company_uid}/`;

  return fetch.get(URL).then<LocalProduct[]>((res) => res.data.data);
};

export default function useGetLocalProducts() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-local-product", userInformation?.company_uid],
    fetchLocalProductMappingData,
    {
      enabled: !!userInformation?.company_uid,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );
}
