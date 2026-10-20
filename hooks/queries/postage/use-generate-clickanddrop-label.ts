import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type Service = "DHL" | "CLICKANDDROP" | "EVRI" | "FEDEX";

export type Payload = {
  service: Service;
  service_meta_data: ServiceMetaData;
  data: Order[];
};

export type Order = {
  trackingNumber: string;
  object_id: string;
};

export type ServiceMetaData = {
  shipment_service_uuid: string;
};

const fetcher = (payload: Payload) => {
  let url = "";

  switch (payload.service) {
    case "EVRI":
      url = "/evri/api/v1/evri/generate-label/";
      break;
    case "DHL":
      url = "/dhl/api/v1/dhl/generate-label/";
      break;
    default:
      break;
  }

  return fetch.post(url, payload);
};

export function useGenerateLabel() {
  return useMutation(fetcher, {
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
