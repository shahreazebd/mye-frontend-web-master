import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { useToast } from "@/components/ui/use-toast";

import useAddActivityLog from "../activity-log/useAddActivityLog";

const singleStockUpdate = (stock: any) => {
  return fetch.put("/miams/api/v1/stock/single-stock/update/", stock);
};

export default function useUpdateSingleStock(locationId: string) {
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();
  const { mutate: addActivityLog } = useAddActivityLog();

  const { toast } = useToast();

  return useMutation(singleStockUpdate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fetch-inventory-data", locationId]);

      toast({
        title: "Successful",
        description: "Single Stock updated!",
      });

      const payloadData = data.config.data[0];
      const prevStockLevel = localStorage.getItem("prevStockLevel");

      const activityPayload = {
        website_name: "mye",
        company_uid: userInformation?.company_uid,
        notification_data: {
          data: `${userInformation?.Name} updated ${payloadData.sku} from ${prevStockLevel} to ${payloadData.product_quantity}`,
          type: "update_single_stock",
          parent_type: "inventory",
          avatar_url: userInformation?.avater_url,
        },
      };

      addActivityLog(activityPayload);

      queryClient.invalidateQueries(["fetch-activity-logs"]);
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 500) {
          toast({
            title: "Something went wrong",
            description: "Check your internet or Server is down!",
            variant: "destructive",
          });
        }
      } else if (error.request) {
        toast({
          title: "Something went wrong",
          description: "Cannot connect to the server",
          variant: "destructive",
        });
      }
    },
  });
}
