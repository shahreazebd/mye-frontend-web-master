import { openErrorNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchPostage } from "@/config/xior";

import { Rate } from "./fetchAmazonBulkRates";

export type GetSingleAmazonRateResponse = {
  success: boolean;
  data: Data;
};

export type Data = {
  ineligibleRates: IneligibleRate[];
  rates: Rate[];
  requestToken: string;
  marketplaceOrderId: string;
};

export type IneligibleRate = {
  carrierId: string;
  carrierName: string;
  ineligibilityReasons: IneligibilityReason[];
  serviceId: string;
  serviceName: string;
};

export type IneligibilityReason = {
  code: string;
  message: string;
};

export function useGetAndUpdateAmazonShippingRates(batchId: string) {
  return useMutation({
    mutationKey: ["get-and-update-amazon-shipping-rates", batchId],
    mutationFn: (payload: any) =>
      fetchPostage
        .post<GetSingleAmazonRateResponse>(`/amazon/rates/${batchId}`, payload)
        .then((res) => res.data.data),

    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      }
    },
  });
}
