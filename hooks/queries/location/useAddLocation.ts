import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { useToast } from "@/components/ui/use-toast";

const addLocation = (newLocation: any) => {
  return fetch.post("/miams/api/v1/location/add/", newLocation);
};

export default function useAddLocation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(addLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-location-data"]);
      toast({
        title: "Successful",
        description: "Successfully Added!",
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
