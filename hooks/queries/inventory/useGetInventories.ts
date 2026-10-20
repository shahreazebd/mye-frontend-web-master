import { useInventoryAtom, useInventoryPaginationAtom } from "@/atoms/inventoryAtom";
import locationAtom from "@/atoms/locationAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import type { InventoryResponse } from "@/types/inventory";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const fetchInventoryTableData = ({ queryKey }: QueryFunctionContext) => {
  const [, locationId, pageSize, page, name, companyUid] = queryKey;

  const params = {
    page_size: pageSize,
    page: page,
    sku: name,
  };
  return fetch
    .get<InventoryResponse>(
      `/miams/api/v1/stock/get-all-stock/${companyUid}/${locationId}/`,
      {
        params,
      }
    )
    .then((res) => res.data);
};

export default function useGetInventories() {
  const { userInformation } = useAuth();
  const {
    pagination: { pageIndex, pageSize },
  } = useInventoryPaginationAtom();

  const { inventoryStore } = useInventoryAtom();

  const [location] = useAtom(locationAtom);

  return useQuery({
    queryKey: [
      "fetch-inventory-data",
      location.locationId,
      pageSize,
      pageIndex + 1,
      inventoryStore.searchQuery,
      userInformation?.company_uid,
    ],
    queryFn: fetchInventoryTableData,
    enabled:
      !!userInformation?.company_uid &&
      !!location?.locationId &&
      (!!pageSize || !!pageIndex || !!inventoryStore?.searchQuery),
    refetchIntervalInBackground: false,
    keepPreviousData: true,
    select: (data: any) => {
      const sortedData = data?.data?.sort((a: any, b: any) =>
        a?.local_product?.sku.localeCompare(b?.local_product?.sku)
      );

      return { ...data, data: sortedData };
    },
  });
}
