import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

function trackingDetails({ queryKey }: QueryFunctionContext) {
  const [, trackingId] = queryKey;
  return fetch
    .get(`/evri/api/v1/evri/track-parcel/${trackingId}`)
    .then((res) => res?.data);
}

function useGetTrackingDetails(trackingId: string) {
  return useQuery({
    queryKey: ["tracking-details", trackingId],
    queryFn: trackingDetails,
    enabled: !!trackingId,
  });
}

export default useGetTrackingDetails;
