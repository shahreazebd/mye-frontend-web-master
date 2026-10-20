import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { useToast } from "@/components/ui/use-toast";

const fn = (payload: any) => {
  return fetchAuth.put(`/evident/auth/api/v1/user/edit/${payload?.uuid}/`, payload?.data);
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { userInformation } = useAuth();

  return useMutation(fn, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "fetch-all-user-data",
        userInformation?.company_uid,
      ]);
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.details?.data || error.message,
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
