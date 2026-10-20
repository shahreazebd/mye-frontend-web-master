import type { CarrierResponse } from "@/schema/carriers";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetcher = ({ queryKey }: QueryFunctionContext<[string, string, string]>) => {
  const [, carrierName, COMPANY_UID] = queryKey;

  return fetch
    .get<CarrierResponse>("/integration/api/v1/shipping-carrier/all-shipping-carrier", {
      params: {
        company_uid: COMPANY_UID,
        shipping_service_name: carrierName,
      },
    })
    .then((res) => res.data.data);
};

export default function useGetAllCarriers(carrierName?: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["get-carriers", carrierName ?? "", userInformation?.company_uid as string],
    queryFn: fetcher,
  });
}
