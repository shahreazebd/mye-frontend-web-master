import { useInventoryAtom } from "@/atoms/inventoryAtom";
import { useStockInquiryPaginationAtom } from "@/atoms/stockInquiryAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

import { StockInquiryResponse } from "../../../types/stock-inquiry";

const fetchStockInquiry = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid, sku, locationId, pageSize, page] = queryKey;

  const params = {
    sku: sku,
    page_size: pageSize,
    page: page,
    location_id: locationId,
    company_uid: companyUid,
  };
  return fetch
    .get<StockInquiryResponse>("/miams/api/v1/stock/stock-data-inquiry/", {
      params,
    })
    .then((res) => res.data);
};

export default function useGetStockInquiry() {
  const { userInformation } = useAuth();
  const {
    pagination: { pageIndex, pageSize },
  } = useStockInquiryPaginationAtom();

  const { inventoryStore } = useInventoryAtom();

  return useQuery({
    queryKey: [
      "fetch-stock-inquiry",
      userInformation?.company_uid,
      inventoryStore.sku,
      inventoryStore.locationId,
      pageSize,
      pageIndex + 1,
    ],
    queryFn: fetchStockInquiry,
  });
}
