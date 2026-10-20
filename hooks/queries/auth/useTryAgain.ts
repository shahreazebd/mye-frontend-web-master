import { useMutation } from "@tanstack/react-query";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export default function useTryAgain() {
  const { toast } = useToast();

  return useMutation(
    (data: any) => {
      return fetchAuth.post("/evident/auth/api/v1/user/send-verification-token/", data);
    },
    {
      onSuccess: () => {
        toast({
          title: "Verification code sent",
          description: "Please check you email!",
        });
      },
      onError: (error: any) => {
        if (error.response) {
          if (error.response.status === 500) {
            toast({
              title: "Error",
              description: "Server is down!, Network Error",
              variant: "destructive",
            });
          }

          if (error.response.status === 400) {
            toast({
              title: "Error",
              description: error?.response?.data?.message || "400 Error",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Try Again",
            description: "Something went wrong!",
            variant: "destructive",
          });
        }
      },
    }
  );
}
