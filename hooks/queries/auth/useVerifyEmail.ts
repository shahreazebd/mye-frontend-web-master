import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
// configs
import { useToast } from "@/components/ui/use-toast";

const verifyEmail = (email: string) => {
  const URL = `/evident/auth/api/v1/user/get-user-by-email/${email}/`;
  return fetchAuth.post(URL);
};

export default function useVerifyEmail() {
  const { toast } = useToast();

  return useMutation(verifyEmail, {
    onError: (error: unknown) => {
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
