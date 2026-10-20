// utils
import { useMutation } from "@tanstack/react-query";

// configs
import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const changePassword = (data: any) => {
  return fetchAuth.post("/evident/auth/api/v1/user/change-password/", data);
};

export default function useChangePassword() {
  const { toast } = useToast();

  return useMutation(changePassword, {
    onSuccess: () => {
      toast({
        title: "Password Changed!",
        description: "You have successfully changed your password.",
      });
    },
    onError: (error: any) => {
      if (error?.response) {
        if (error?.response?.status >= 500) {
          toast({
            title: "Network Error!",
            variant: "destructive",
          });
        }

        if (error?.response?.status === 400) {
          toast({
            title: "Error",
            description: error?.response?.data?.message || "400 Error",
            variant: "destructive",
          });
        }
      }
    },
  });
}
