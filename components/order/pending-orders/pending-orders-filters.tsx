import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Channel } from "@/schema/channel";
import { removeSpecialChar } from "@/utils/helpers";
import { Download, Loader2 } from "lucide-react";
import { CSVLink } from "react-csv";

import fetch from "@/config/xior";
import ChannelSelect2 from "@/components/shared/channel-select-2";

import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";

type Props = {
  selectedDataCount?: number;
  dataCount?: number;
  setSelectedChannelId?: Dispatch<SetStateAction<string>>;
};

function OpenOrdersFilters({
  selectedDataCount,
  dataCount,
  setSelectedChannelId,
}: Readonly<Props>) {
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const [csvData, setCsvData] =
    React.useState<Channel["report_ref"]["report_column_name"]>();
  const { toast } = useToast();
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);

  const [reportDownloadLoading, setReportDownloadLoading] = useState(false);

  const downloadReport = async (record: Channel | null) => {
    if (record) {
      try {
        const URI = `/orders/api/v1/orders/open-order-report/${record?.company_uid}/${record?.channel_uid}/`;

        setReportDownloadLoading(true);

        const res = await fetch.get(URI);

        if (res?.status === 204) {
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

        const dataWithoutSpecialChar = removeSpecialChar(sortedData);

        setCsvData(dataWithoutSpecialChar);

        setReportDownloadLoading(false);

        setTimeout(() => {
          csvLink?.current?.link?.click();
          toast({
            title: "Success",
            description: "File downloaded successfully",
          });
        }, 500);
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

  return (
    <>
      <div className="flex items-center gap-4">
        {channelDetails?.id && dataCount ? (
          <>
            {/* <ShareDropdown channel={channelDetails} /> */}

            <Button
              disabled={reportDownloadLoading}
              variant="default"
              size="sm"
              onClick={() => downloadReport(channelDetails)}
              className="flex h-[32px] items-center gap-2"
            >
              {reportDownloadLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              Download
            </Button>
          </>
        ) : null}

        <ChannelSelect2
          onValueChange={(value) => {
            setChannelDetails(value);
            setSelectedChannelId?.(value?.channel_uid || "all");
          }}
          dataCount={dataCount}
          selectedDataCount={selectedDataCount}
        />
      </div>
      {channelDetails?.id && csvLink && (
        <CSVLink
          data={csvData ?? []}
          filename={`${channelDetails?.name}.csv`}
          ref={csvLink}
          href="_blank"
        />
      )}
    </>
  );
}

export default OpenOrdersFilters;
