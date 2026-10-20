import React, { Dispatch, SetStateAction, useState } from "react";
import { Channel } from "@/schema/channel";
import { downloadCsv, removeSpecialChar } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Download, Loader2, RefreshCw, RotateCw } from "lucide-react";

import fetch from "@/config/xior";
import { cn } from "@/lib/utils";
import OpenOrderChannelSelect from "@/components/shared/open-order-channel-select";

import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";

type Props = {
  selectedDataCount?: number;
  dataCount?: number;
  setSelectedChannelDetails: Dispatch<SetStateAction<Channel>>;
  selectedChannelDetails: Channel;
  refetchOpenOrder: any;
  isFetching: boolean;
};

function OpenOrdersFilters({
  selectedDataCount,
  dataCount,
  setSelectedChannelDetails,
  selectedChannelDetails,
  isFetching,
  refetchOpenOrder,
}: Props) {
  const { toast } = useToast();

  const [reportDownloadLoading, setReportDownloadLoading] = useState(false);

  const downloadReport = async (record: Channel | null) => {
    if (record) {
      try {
        const URI = `/orders/api/v1/orders/open-order-report/${record?.company_uid}/${record?.channel_uid}/`;

        setReportDownloadLoading(true);

        const res = await fetch.get(URI);

        if (res.status === 204) {
          return toast({
            title: "No item",
            description: "No item to download",
          });
        }

        const sortedData = res?.data?.data?.sort((a: any, b: any) => {
          if (!record?.report_sorted_by) {
            return 0;
          } else if (record?.report_sorted_by === "sku") {
            return (
              a["Item title"]?.localeCompare(b["Item title"]) ||
              a["Shipping customer name"]?.localeCompare(b["Shipping customer name"])
            );
          } else if (record?.report_sorted_by === "buyer") {
            return (
              a["Shipping customer name"]?.localeCompare(b["Shipping customer name"]) ||
              a["Item title"]?.localeCompare(b["Item title"])
            );
          }
        });

        downloadCsv(removeSpecialChar(sortedData), `${selectedChannelDetails?.name}.csv`);

        setReportDownloadLoading(false);
      } catch (error: any) {
        setReportDownloadLoading(false);
        toast({
          title: "Error",
          description: error?.toString(),
          variant: "destructive",
        });
      }
    } else {
      setReportDownloadLoading(false);
      toast({
        title: "Error",
        description: "Please select a channel",
        variant: "destructive",
      });
    }
  };

  const start_date = dayjs().subtract(3, "day").format("YYYY-MM-DD");
  const end_date = dayjs().add(1, "day").format("YYYY-MM-DD");

  const { mutate: fetchOrders, isLoading: orderFetchLoading } = useMutation({
    mutationFn: async (channel_uid: string) => {
      const res = await fetch.get(
        `/woocommerce/api/v1/orders/fetch?channel_uid=${channel_uid}&start_date=${start_date}&end_date=${end_date}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Order sync started",
        description:
          "Fetching latest orders from WooCommerce in the background. This may take a few minutes.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch orders.",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className={`${isFetching && "pointer-events-none text-gray-400"}`}
          size="sm"
          variant="outline"
          onClick={refetchOpenOrder}
        >
          <RotateCw
            className={cn(
              "h-4 cursor-pointer text-gray-800",
              isFetching && "pointer-events-none animate-spin text-gray-400"
            )}
          />{" "}
          Refresh
        </Button>

        {selectedChannelDetails?.channel_type === "woocommerce" ? (
          <Button
            className="flex items-center gap-2"
            size="sm"
            variant="outline"
            disabled={!selectedChannelDetails?.channel_uid || orderFetchLoading}
            onClick={() => {
              if (!selectedChannelDetails?.channel_uid) {
                toast({
                  title: "Error",
                  description: "Please select a channel first.",
                  variant: "destructive",
                });
                return;
              }
              fetchOrders(selectedChannelDetails.channel_uid);
            }}
          >
            {orderFetchLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            Sync Orders
          </Button>
        ) : null}

        {selectedChannelDetails?.id && dataCount ? (
          <Button
            disabled={reportDownloadLoading}
            variant="default"
            size="sm"
            onClick={() => downloadReport(selectedChannelDetails)}
            className="flex  items-center gap-2"
          >
            {reportDownloadLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            Download
          </Button>
        ) : null}

        <OpenOrderChannelSelect
          onValueChange={(value) => {
            setSelectedChannelDetails(value as Channel);
          }}
          dataCount={dataCount}
          selectedDataCount={selectedDataCount}
        />
      </div>
    </>
  );
}

export default OpenOrdersFilters;
