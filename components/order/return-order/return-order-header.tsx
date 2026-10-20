import React from "react";
import { useReturnOrderFilterAtom } from "@/atoms/return-order-atom";
import dayjs from "dayjs";
import { RefreshCcw } from "lucide-react";

import { ReturnOrder } from "@/types/return-order";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { DownloadReport } from "@/components/core/download-report";
import { CustomChannelSelect } from "@/components/shared/custom-channel-select";

type Props = {
  refetch: () => void;
  isLoading: boolean;
  data?: ReturnOrder[];
};

export function ReturnOrderHeader({ refetch, isLoading, data }: Props) {
  const { setFilter, filter } = useReturnOrderFilterAtom();

  return (
    <div className="flex items-center gap-2">
      <DatePicker
        date={new Date(filter?.startDate)}
        setDate={(date) => {
          if (date instanceof Date) {
            setFilter((prev) => ({
              ...prev,
              startDate: dayjs(date).format("YYYY-MM-DD"),
            }));
          }
        }}
        className="w-[200px]"
      />
      <DatePicker
        date={new Date(filter?.endDate)}
        setDate={(date) => {
          if (date instanceof Date) {
            setFilter((prev) => ({
              ...prev,
              endDate: dayjs(date).format("YYYY-MM-DD"),
            }));
          }
        }}
        className="w-[200px]"
      />

      <Button onClick={refetch} variant="outline" className="h-8">
        <RefreshCcw className={cn("mr-2 size-4", isLoading && "animate-spin")} /> Refresh
      </Button>

      <CustomChannelSelect
        onValueChange={(value) => {
          setFilter((prev) => ({
            ...prev,
            channelUid: value?.channel_uid ?? "",
          }));
        }}
      />

      <DownloadReport
        showPdf={false}
        data={
          data?.map((order) => ({
            "Return ID": order.return_id || "",
            "Order ID": order.order_id || "",
            "Tracking ID": order.tracking_id || "",
            SKU: order.sku || "",
            "Item Name": order.item_name || "",
            "ASIN / Item ID": order.asin || order.item_id || "",
            "Channel Name": order.metadata?.channel_name || "",
            "Buyer Name": order.metadata?.buyer_name || "",
            "Ordered Quantity": order.ordered_quantity ?? "",
            "Return Quantity": order.return_quantity ?? "",
            Reason: order.reason || "",
            Status: order.status || "",
            "Order Date": order.order_date
              ? dayjs(order.order_date).format("DD/MM/YYYY, h:mm a")
              : "",
            "Return Request Date": order.return_request_date
              ? dayjs(order.return_request_date).format("DD/MM/YYYY, h:mm a")
              : "",
            Carrier: order.carrier || "",
            "Refund Amount": order.refund_amount || "",
            Currency: order.currency || "",
            Comments: order.comments || "",
          })) || []
        }
        filename={`return_orders_${dayjs().format("YYYY-MM-DD")}`}
      />
    </div>
  );
}
