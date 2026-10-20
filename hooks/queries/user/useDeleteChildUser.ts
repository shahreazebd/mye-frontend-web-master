import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import { fetchAuth } from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

function deleteChildUser(id: string) {
  return fetchAuth.delete(`/evident/auth/api/v1/user/delete/${id}/`);
}

export default function useDeleteChildUser() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteChildUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-user-data"]);
      toast({
        title: "User Deleted",
        description: "Successfully Deleted!",
      });
    },
    onError: (error) => {
      if (error instanceof XiorError) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description:
            JSON.stringify(error.response?.data?.details?.data) || error.message,
        });
      }
    },
  });
}
