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

export function useAmazonShippingRate() {
  return useMutation({
    mutationKey: ["amazon-shipping-rate"],
    mutationFn: (payload: any) =>
      fetchPostage
        .post<GetSingleAmazonRateResponse>("/amazon/rates", payload)
        .then((res) => res.data.data),
    onSuccess: () => {
      // openSuccessNotification({ description: res. });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        openErrorNotification({
          description: error.response?.data?.message || error.message,
        });
      }
    },
  });
}
