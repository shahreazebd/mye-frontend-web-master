import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

import useGetChannels from "../channel/useGetChannels";

export interface TopSellingProduct {
  remote_sku: string;
  channel_uid: string;
  company_uid: string;
  total_quantity: number;
  channel_name: string;
  sku: string;
}

const topSellingProduct = ({ queryKey }: QueryFunctionContext) => {
  const [, companyUid] = queryKey;
  return fetch
    .get(`/dashboard/mye-dashboard/api/v1/order/top-orders/${companyUid}/`)
    .then<TopSellingProduct[]>((res) => res?.data?.data);
};

export default function useGetTopSellingProducts() {
  const { userInformation } = useAuth();
  const { data: allChannels, isLoading } = useGetChannels();
  // const { mutate } = useGetMultipleLocalProductDetails();

  return useQuery({
    queryKey: ["get-top-selling-product", userInformation?.company_uid],
    queryFn: topSellingProduct,

    enabled: !!userInformation?.company_uid && !!isLoading,

    select: (data) => {
      const response = data?.map((data) => {
        for (let channel of allChannels ?? []) {
          if (data.channel_uid === channel.channel_uid) {
            return {
              ...data,
              channel_name: channel?.name,
              channel_type: channel?.channel_type,
            };
          }
        }
      });

      return response.filter(Boolean) as TopSellingProduct[];
    },
  });
}
