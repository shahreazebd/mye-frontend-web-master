import { useCustomerPaginationAtom } from "@/atoms/customer-atom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { CustomerResponse } from "@/types/customer";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function getCustomerList({
  queryKey,
}: QueryFunctionContext<
  ["customer", "list", { pageIndex: number; pageSize: number }, string]
>) {
  const companyUuid = queryKey[3];
  const filters = queryKey[2];

  const params = {
    page: filters.pageIndex + 1,
    per_page: filters.pageSize,
  };

  return fetch
    .get<CustomerResponse>(`/orders/api/v1/orders/get-all-customers/${companyUuid}/`, {
      params,
    })
    .then((res) => res.data);
}

export function useGetCustomerList() {
  const { userInformation } = useAuth();

  const { customerListPagination } = useCustomerPaginationAtom();

  const filters = {
    ...customerListPagination,
  };

  return useQuery({
    queryKey: ["customer", "list", filters, userInformation?.company_uid as string],
    queryFn: getCustomerList,
    enabled: !!userInformation?.company_uid,
    keepPreviousData: true,
  });
}
