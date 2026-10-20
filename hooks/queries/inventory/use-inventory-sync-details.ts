import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { InventorySync } from "@/types/inventory-sync-details";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

function getInventorySyncDetails({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>) {
  const companyUuid = queryKey[3];
  const localSku = queryKey[2];

  const url = `/miams/api/v1/mapping/inventory-sync-details/${companyUuid}/${localSku}`;
  return fetch.get<InventorySync>(url).then((res) => res.data);
}

export function useGetInventorySyncDetails({
  localSku,
  inView,
  isMapped,
}: {
  localSku: string;
  inView?: boolean;
  isMapped?: boolean;
}) {
  const { userInformation } = useAuth();

  const companyUuid = userInformation?.company_uid as string;

  return useQuery({
    queryKey: ["inventory", "sync-details", localSku, companyUuid],
    queryFn: getInventorySyncDetails,
    enabled: inView && !!localSku && isMapped,
    // staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
