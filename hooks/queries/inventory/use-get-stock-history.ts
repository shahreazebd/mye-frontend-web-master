import {
  useInventoryAtom,
  useStockHistoryListFiltersAtom,
  useStockHistoryListPaginationAtom,
} from "@/atoms/inventoryAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { StockHistoryResponse } from "@/types/stock-history";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

type QueryFnContext = QueryFunctionContext<
  [
    string,
    {
      pageIndex: number;
      pageSize: number;
      localSku: string;
      startDate: Date | undefined;
      endDate: Date | undefined;
      operation: string;
      locationId: string;
    },
    string
  ]
>;

function getStockHistory({ queryKey }: QueryFnContext) {
  const companyUuid = queryKey[2];
  const filters = queryKey[1];

  const params = {
    filter_type: filters.operation === "all" ? "" : filters.operation,
    company_uid: companyUuid,
    local_sku: filters.localSku,
    page: filters.pageIndex + 1,
    page_size: filters.pageSize,
    start_date: filters.startDate ? dayjs(filters.startDate).format("YYYY-MM-DD") : "",
    end_date: filters.endDate ? dayjs(filters.endDate).format("YYYY-MM-DD") : "",
    location_id: filters.locationId,
  };

  return fetch
    .get<StockHistoryResponse>("/miams/api/v1/stock/get-stock-history/", {
      params,
    })
    .then((res) => res.data);
}

export function useGetStockHistory() {
  const { userInformation } = useAuth();
  const { stockHistoryListFilters } = useStockHistoryListFiltersAtom();
  const { stockHistoryListPagination } = useStockHistoryListPaginationAtom();

  const { inventoryStore } = useInventoryAtom();

  const filters = {
    localSku: inventoryStore.sku,
    ...stockHistoryListFilters,
    ...stockHistoryListPagination,
  };

  return useQuery({
    queryKey: ["stock-history", filters, userInformation?.company_uid as string],
    queryFn: getStockHistory,
    enabled: !!userInformation?.company_uid && !!filters.startDate && !!filters.endDate,
  });
}
