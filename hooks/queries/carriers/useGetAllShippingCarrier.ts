import { ShippingCarrier } from "@/schema/shipping-carrier";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchShippingCarrier = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid] = queryKey;

  return fetch
    .get(
      `/integration/api/v1/shipping-carrier/all-shipping-carrier?company_uid=${companyUid}`
    )
    .then<ShippingCarrier[]>((res) => res.data.data);
};

export default function useGetAllShippingCarrier() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-shipping-carrier-data", userInformation?.company_uid as string],
    fetchShippingCarrier,
    {
      enabled: !!(userInformation?.company_uid as string),
    }
  );
}
