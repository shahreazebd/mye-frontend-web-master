import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { toast } from "@/components/ui/use-toast";

function buyAmazonPostage(payload: any) {
  return fetch.post("/amazon/api/v1/shipping/create-shipping/", payload);
}

export function useBuyAmazonPostage() {
  return useMutation({
    mutationFn: buyAmazonPostage,
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
      } else if (error instanceof Error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
}
