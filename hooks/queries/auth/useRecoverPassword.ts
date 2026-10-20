import { useMutation } from "@tanstack/react-query";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const resetPassword = (payload: any) => {
  return fetchAuth.post("/evident/auth/api/v1/user/reset-password/", payload);
};

export default function useRecoverPassword() {
  const { toast } = useToast();

  return useMutation(resetPassword, {
    onSuccess: (data: any) => {
      toast({
        title: "Success!",
        description: data.data.message,
      });
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status >= 400) {
          toast({
            title: "Error",
            variant: "destructive",
          });
        } else if (error.response.status >= 500) {
          toast({
            title: "Error",
            variant: "destructive",
          });
        }
      } else if (error.request) {
        toast({
          title: "Error",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
        });
      }
    },
  });
}
