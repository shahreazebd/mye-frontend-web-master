import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { TrackingListResponse } from "@/types/tracking";
import { fetchPostage } from "@/config/xior";

type TrackingListFilters = {
  carrierType?: string;
  startDate?: string;
  endDate?: string;
};

function getTrackingList({
  queryKey,
}: QueryFunctionContext<[string, TrackingListFilters]>) {
  const [, filters] = queryKey;

  const params = Object.fromEntries(
    Object.entries({
      carrierType: filters.carrierType,
      startDate: filters.startDate,
      endDate: filters.endDate,
    }).filter(([, value]) => value !== "" && value !== undefined && value !== null)
  );

  return fetchPostage
    .get<TrackingListResponse>("/trackings", {
      params,
    })
    .then((res) => res.data.data);
}

export function useGetTrackingList(filters: TrackingListFilters) {
  return useQuery({
    queryKey: ["get-tracking-list", filters],
    queryFn: getTrackingList,
  });
}
