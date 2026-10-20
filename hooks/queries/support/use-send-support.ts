// import { openErrorNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";

const createSupport = (payload: any) => {
  return axios.post("https://transmitter.evidentbd.com/api/v1/email/send", payload, {
    headers: {
      "Content-Type": "application/json",
      "SECRET-KEY": "GYGWYERY58454FDS4FD8V487FF8WQ8EF11D88W1D",
      SERVICE: "mye",
    },
  });
};

export default function useSendSupport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: createSupport,
    onSuccess: (res) => {
      toast({
        title: "Successfully send support",
        description: res.data.message,
      });
      // openSuccessNotification({ description: res.data.message });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast({
          title: "Error in sending support",
          description: err?.response?.data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error in sending support",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    },
  });
}
