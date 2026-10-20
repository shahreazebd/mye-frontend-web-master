import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type Service = "DHL" | "CLICKANDDROP" | "EVRI" | "FEDEX";

type CNDPayload = {
  type: "clickanddrop";
  service: Service;
  service_meta_data: {
    service_name: string;
    shipping_service_uuid: string;
  };

  order_identifier: string;
  object_id: string;
};

type EVRIDHLPayload = {
  type: "evri-dhl";
  service: Service;
  service_meta_data: {
    shipment_service_uuid: string;
  };
  data: {
    trackingNumber: string;
    object_id: string;
  }[];
};

export type AmazonPayload = {
  type: "amazon";
  trackingNumber: string;

  body: {
    object_id: string;
    channel_uuid: string;
  };
};

export type Payload = CNDPayload | EVRIDHLPayload | AmazonPayload;

function generateLabel(payload: Payload) {
  const { type, ...rest } = payload;

  if (payload.type === "clickanddrop") {
    const url = "/clickanddrop/api/v1/click-and-drop/get-label";

    return fetch.post(url, rest);
  }

  if (payload.type === "amazon") {
    const { type, ...rest } = payload;

    const url = `/amazon/api/v1/shipping/get-shipping-label/${rest.trackingNumber}/`;

    return fetch.post(url, rest.body);
  }

  // switch (payload.service) {
  //   case "EVRI":
  //     url = "/evri/api/v1/evri/generate-label/";

  //     break;
  //   case "DHL":
  //     url = "/dhl/api/v1/dhl/generate-label/";
  //     break;
  //   default:
  //     break;
  // }

  const url =
    payload.service === "EVRI"
      ? "/evri/api/v1/evri/generate-label/"
      : "/dhl/api/v1/dhl/generate-label/";

  return fetch.post(url, rest);
}

export function useGenerateLabel() {
  return useMutation({
    mutationFn: generateLabel,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully label generated",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
          variant: "destructive",
        });
      } else if (error instanceof Error)
        toast({ title: "Error", description: error.message, variant: "destructive" });
      else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
