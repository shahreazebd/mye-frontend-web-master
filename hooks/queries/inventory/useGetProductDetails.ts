import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

export interface Product {
  barcode: string;
  company_uid: string;
  createdAt: string;
  depth: string;
  height: string;
  id: number;
  image: string | null;
  is_composite: boolean;
  is_child: boolean;
  stock_notification: boolean;
  name: string;
  purchase_price: string;
  selling_price: string;
  sku: string;
  updatedAt: string;
  weight: string;
  width: string;
}

const getProductDetails = ({ queryKey }: QueryFunctionContext) => {
  const [, productId, companyUid] = queryKey;

  let url = `/miams/api/v1/mapping/product/local-product/local-product-details/${companyUid}/${productId}/`;

  return fetch.get(url).then<Product>((res) => res.data.data);
};

export default function useGetProductDetails(productId: number | undefined) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["fetch-product-details", productId, userInformation?.company_uid],
    queryFn: getProductDetails,
    enabled: !!productId && !!userInformation?.company_uid,
  });
}
