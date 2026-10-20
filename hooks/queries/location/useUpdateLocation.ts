import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

export interface UpdateLocation {
  data: {
    address: string;
    country: string;
    name: string;
    post_code: string;
  };
  company_uid: string;
  id: number;
}

export default function useUpdateLocation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (payload: UpdateLocation) => {
      return fetch.patch(
        `/miams/api/v1/location/update/${payload?.id}/${payload?.company_uid}/`,
        payload.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-location-data"]);
        toast({
          title: "Successful",
          description: "Successfully Updated!",
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
    }
  );
}
