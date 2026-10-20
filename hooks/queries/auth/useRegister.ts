// utils
import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

const register = (payload: any) => {
  return fetchAuth.post("/evident/auth/api/v1/user/register/", payload);
};

export default function useRegister() {
  const { toast } = useToast();

  return useMutation(register, {
    onSuccess: () => {
      toast({
        title: "Account created successfully!",
        description: "Your account has been registered. ",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        if (error?.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Server is down!, Network Error",
            variant: "destructive",
          });
        }
        toast({
          title: "Try Again",
          description: error?.response?.data?.details
            ? JSON.stringify(error.response?.data?.details)
            : error?.response?.data?.message || "Something went wrong!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Try Again",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
    },
  });
}
