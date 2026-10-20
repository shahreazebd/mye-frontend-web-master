import { useEffect, useState } from "react";

import fetch from "@/config/xior";

import useAuth from "./useAuth";

export interface TopSellingProduct {
  remote_sku: string;
  channel_uid: string;
  company_uid: string;
  total_quantity: number;
  channel_name: string;
  channel_type: string;
  sku: string;
  image: string;
  selling_price: number;
}

export default function useTopSellingProductWithDetails() {
  const { userInformation } = useAuth();
  const [data, setData] = useState<TopSellingProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userInformation?.company_uid) {
      return;
    }

    async function a() {
      try {
        const ordersResponse = await fetch.get(
          `/dashboard/mye-dashboard/api/v1/order/top-orders/${userInformation?.company_uid}/`
        );

        const channelResponse = await fetch.get(
          `/integration/api/v1/channel/get-all-channels/${userInformation?.company_uid}/`
        );

        const ordersData = ordersResponse?.data?.data;
        const channelData = channelResponse?.data?.data;

        const payload = {
          company_uid: userInformation?.company_uid,
          local_sku: ordersData.map((d: TopSellingProduct) => d.sku),
        };

        const detailsData = await fetch.post(
          "/miams/api/v1/mapping/product/local-product/multiple-local-product/",
          payload
        );

        const newData = ordersData.map((pd: any) => {
          let obj = { ...pd };
          detailsData.data.data.map((d: any) => {
            if (pd.sku === d.sku) {
              obj = {
                ...pd,
                selling_price: +d.selling_price,
                image: d.image ? d?.image : "/images/no-image-available.svg",
              };
            } else {
              obj = {
                ...pd,
                selling_price: 0,
                image: "/images/no-image-available.svg",
              };
            }
          });

          return obj;
        });

        const response = newData?.map((data: any) => {
          for (let channel of channelData ?? []) {
            if (data.channel_uid === channel.channel_uid) {
              return {
                ...data,
                channel_name: channel?.name,
                channel_type: channel?.channel_type,
              };
            }
          }
        });

        setIsLoading(false);
        //   response.filter(Boolean) as TopSellingProduct[];

        setData(response);
      } catch (error) {
        setIsLoading(false);
      }
    }

    a();
  }, [userInformation?.company_uid]);

  return { data, isLoading };
}
