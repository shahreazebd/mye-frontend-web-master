import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const addUserData = (userData: any) => {
  return fetchAuth.post("/evident/auth/api/v1/user/create-child-user/", userData);
};

export default function useAddChildUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(addUserData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-user-data"]);
      toast({
        title: "Success",
        description: "User added successfully",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: error.response?.data?.details
            ? JSON.stringify(error.response?.data?.details)
            : error.response?.data?.message || "Something went wrong!",
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
