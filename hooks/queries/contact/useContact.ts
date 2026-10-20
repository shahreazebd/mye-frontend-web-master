import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { evidentApi } from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

const contact = (payload: unknown) => {
  return evidentApi.post("/web-svc/api/v1/contact/post/", payload);
};

export default function useContact() {
  const { toast } = useToast();

  return useMutation(contact, {
    onSuccess: () => {
      toast({
        title: "Successfully Sent.",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        if (error.response) {
          if (error.response.status === 500) {
            return toast({
              title: "Error",
              description: "Server is down!, Network Error",
              variant: "destructive",
            });
          }
          if (error.response.status === 400) {
            if (error?.response?.data?.message) {
              return toast({
                title: "Error",
                description: JSON.stringify(error?.response?.data?.message),
                variant: "destructive",
              });
            }
          }
        }

        if (error.request) {
          toast({
            title: "Network Problem",
            description: "Check your internet connection",
            variant: "destructive",
          });
        }
      }
    },
  });
}
