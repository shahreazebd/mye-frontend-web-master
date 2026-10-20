import { useMutation } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const resetPassword = (payload: any) => {
  const token = payload.token;
  delete payload.token;

  const URL = `/evident/auth/api/v1/user/reset-password-confirm/${token}/`;
  return fetchAuth.post(URL, payload);
};

export default function useResetPassword() {
  const { toast } = useToast();

  return useMutation(resetPassword, {
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message,
      });

      window.location.href = "/login";
    },
    onError: (error: XiorError) => {
      toast({
        title: "Please try again",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    },
  });
}
