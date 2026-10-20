import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

type Service = "DHL" | "CLICKANDDROP" | "EVRI" | "FEDEX";

export interface PostagePayload {
  serviceType: Service;
  data: unknown;
}

const serviceEndpoints = {
  CLICKANDDROP: "/clickanddrop/api/v1/click-and-drop/create-postage",
  DHL: "/dhl/api/v1/dhl/create-postage/",
  EVRI: "/evri/api/v1/evri/create-postage/",
  FEDEX: "/fedex/api/v1/ship/create-postage/",
};

const fetcher = (payload: PostagePayload) => {
  const endpoint = serviceEndpoints[payload?.serviceType];
  if (!endpoint) {
    throw new Error("Invalid service type");
  }
  return fetch.post(endpoint, payload?.data);
  // switch (payload?.serviceType) {
  //   case "CLICKANDDROP":
  //     return fetch.post(
  //       "/clickanddrop/api/v1/click-and-drop/create-postage",
  //       payload?.data
  //     );

  //   case "DHL":
  //     return fetch.post("/dhl/api/v1/dhl/create-postage/", payload?.data);

  //   case "EVRI":
  //     return fetch.post("/evri/api/v1/evri/create-postage/", payload?.data);

  //   case "FEDEX":
  //     return fetch.post("/fedex/api/v1/ship/create-postage/", payload?.data);

  //   default:
  //     throw new Error("Invalid service type");
  // }
};

export default function useBuyPostage() {
  return useMutation(fetcher, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Postage created successfully",
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
