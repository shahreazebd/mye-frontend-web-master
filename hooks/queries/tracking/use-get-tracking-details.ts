import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { TrackingDetailsResponse } from "@/types/tracking";
import { fetchPostage } from "@/config/xior";

function getTrackingDetails({ queryKey }: QueryFunctionContext<[string, string]>) {
  const [, trackingInfoId] = queryKey;
  return fetchPostage
    .get<TrackingDetailsResponse>(`/trackings/${trackingInfoId}`)
    .then((res) => res.data.data);
}

export function useGetTrackingDetails(trackingInfoId: string) {
  return useQuery({
    queryKey: ["get-tracking-details", trackingInfoId],
    queryFn: getTrackingDetails,
  });
}
