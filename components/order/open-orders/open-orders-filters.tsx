import React, { Dispatch, SetStateAction, useState } from "react";
import { Channel } from "@/schema/channel";
import { downloadCsv, removeSpecialChar } from "@/utils/helpers";
import { Download, Loader2, RotateCw } from "lucide-react";

import fetch from "@/config/xior";
import { cn } from "@/lib/utils";
import OpenOrderChannelSelect from "@/components/shared/open-order-channel-select";

import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";
import { RetrieveOrdersButton } from "./retrieve-orders-button";

type OrderReportData = {
  "Item title": string;
  "Shipping customer name": string;
  [key: string]: any;
};

/**
 * Sorts order report data based on the channel's sorting preference
 */
function sortReportData(data: OrderReportData[], sortBy?: string) {
  if (!sortBy) return data;

  return [...data].sort((a, b) => {
    if (sortBy === "sku") {
      return (
        a["Item title"]?.localeCompare(b["Item title"]) ||
        a["Shipping customer name"]?.localeCompare(b["Shipping customer name"])
      );
    }

    if (sortBy === "buyer") {
      return (
        a["Shipping customer name"]?.localeCompare(b["Shipping customer name"]) ||
        a["Item title"]?.localeCompare(b["Item title"])
      );
    }

    return 0;
  });
}

type Props = {
  selectedDataCount?: number;
  dataCount?: number;
  setSelectedChannelDetails: Dispatch<SetStateAction<Channel>>;
  selectedChannelDetails: Channel;
  refetchOpenOrder: () => void;
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

  async function downloadReport(record: Channel | null) {
    if (!record) {
      toast({
        title: "Error",
        description: "Please select a channel",
        variant: "destructive",
      });
      return;
    }

    try {
      setReportDownloadLoading(true);

      const URI = `/orders/api/v1/orders/open-order-report/${record.company_uid}/${record.channel_uid}/`;
      const res = await fetch.get(URI);

      if (res.status === 204) {
        toast({
          title: "No item",
          description: "No item to download",
        });
        return;
      }

      const sortedData = sortReportData(res?.data?.data, record.report_sorted_by);
      const cleanedData = removeSpecialChar(sortedData);
      downloadCsv(cleanedData, `${selectedChannelDetails.name}-${Date.now()}.csv`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to download report",
        variant: "destructive",
      });
    } finally {
      setReportDownloadLoading(false);
    }
  }

  const canDownloadReport = Boolean(selectedChannelDetails?.id && dataCount);

  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn(isFetching && "pointer-events-none text-gray-400")}
        size="sm"
        variant="outline"
        onClick={refetchOpenOrder}
        disabled={isFetching}
      >
        <RotateCw
          className={cn("h-4 text-gray-800", isFetching && "animate-spin text-gray-400")}
        />
        Refresh
      </Button>

      <Button
        disabled={reportDownloadLoading || !canDownloadReport}
        variant="outline"
        size="sm"
        onClick={() => downloadReport(selectedChannelDetails)}
        className="flex items-center gap-2"
      >
        {reportDownloadLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Download size={14} />
        )}
        Download Report
      </Button>

      <RetrieveOrdersButton channel={selectedChannelDetails} />

      <OpenOrderChannelSelect
        onValueChange={(value) => {
          setSelectedChannelDetails(value as Channel);
        }}
        dataCount={dataCount}
        selectedDataCount={selectedDataCount}
      />
    </div>
  );
}

export default OpenOrdersFilters;
