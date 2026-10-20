import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

type Payload = {
  id: number;
  companyUid: string;
};

const deleteLocation = (payload: Payload) => {
  return fetch.delete(
    `/miams/api/v1/location/delete/${payload.id}/${payload.companyUid}/`
  );
};

export default function useDeleteLocation() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-location-data"]);
      toast({
        title: "Successful",
        description: "Successfully Deleted!",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof XiorError) {
        toast({
          title: "Error",
          description: JSON.stringify(error.response?.data?.details),
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
