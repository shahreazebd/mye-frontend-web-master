import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { CustomerDetailsResponse } from "@/types/customer-details";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetcherFunction = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid, customerName, phone] = queryKey;

  return fetch
    .get<CustomerDetailsResponse>(
      `/orders/api/v1/orders/get-customer-details/${companyUid}/`,
      {
        params: {
          customer_name: customerName,
          phone: phone || "",
        },
      }
    )
    .then((res) => res.data);
};

export function useGetCustomerDetails(customerName: string, phone: string) {
  const { userInformation } = useAuth();

  return useQuery({
    queryKey: ["get-customer-details", userInformation?.company_uid, customerName, phone],
    queryFn: fetcherFunction,
    enabled: !!userInformation?.company_uid,
  });
}
