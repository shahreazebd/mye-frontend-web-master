"use client";

import { useRef, useState } from "react";
import { Channel } from "@/schema/channel";
import { removeSpecialChar } from "@/utils/helpers";
import { CSVLink } from "react-csv";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./open-order-reports-columns";

export let handleDropboxFileUpload = (
  // eslint-disable-next-line no-unused-vars
  name: string,
  // eslint-disable-next-line no-unused-vars
  companyUid: string,
  // eslint-disable-next-line no-unused-vars
  channelUid: string
) => {};

// eslint-disable-next-line no-unused-vars
export let handleDownloadButton = (record: any) => {};

export default function OpenOrderReportsWrapper() {
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const [csvData, setCsvData] = useState<Channel["report_ref"]["report_column_name"]>();
  const [channelName, setChannelName] = useState("default");
  const { toast } = useToast();

  const { data, isLoading } = useGetChannels();
  const { userInformation } = useAuth();
  const { mutate: addActivityLog } = useAddActivityLog();

  const userFullName = userInformation?.Name;

  handleDropboxFileUpload = async (
    name: string,
    companyUid: string,
    channelUid: string
  ) => {
    try {
      const URL = `/dropbox/api/v1/dropbox/file-upload/${companyUid}/${channelUid}/`;

      await fetch.post(URL);

      const activityPayload = {
        website_name: "mye",
        company_uid: userInformation?.company_uid,
        notification_data: {
          data: `${name}'s open order report sent in Dropbox`,
          user: userFullName,
          type: "dropbox",
          parent_type: "drive",
          avatar_url: `https://api.dicebear.com/9.x/micah/svg?seed=${userFullName}&translateY=5&background=%23dddddd`,
        },
      };

      addActivityLog(activityPayload);

      toast({
        title: "Success",
        description: "Open order report sent in Dropbox",
      });
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 500) {
          toast({
            title: "Error",
            description: "Something went wrong, please try again later.",
            variant: "destructive",
          });
        }

        if (error.response.status === 400) {
          toast({
            title: "Error",
            description: error?.response?.data?.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  let downloadReport = async (record: any) => {
    try {
      let URI;
      switch (record.channel_type) {
        case "otto":
          URI = `/reports/api/v1/order/open-order/create-otto/${record.company_uid}/${record.channel_uid}/`;
          break;

        default:
          URI = `/reports/api/v1/order/open-order/create/${record.company_uid}/${record.channel_uid}/`;
          break;
      }

      const res = await fetch.get(URI);

      if (res.status === 204) {
        return toast({
          title: "No item",
          description: "No item to download",
        });
      }

      const sortedData = res.data.data.sort((a: any, b: any) => {
        if (!record.report_sorted_by) {
          return 0;
        } else if (record.report_sorted_by === "sku") {
          return (
            a["Item title"].localeCompare(b["Item title"]) ||
            a["Shipping customer name"].localeCompare(b["Shipping customer name"])
          );
        } else if (record.report_sorted_by === "buyer") {
          return (
            a["Shipping customer name"].localeCompare(b["Shipping customer name"]) ||
            a["Item title"].localeCompare(b["Item title"])
          );
        }
      });

      const dataWithoutSpecialChar = removeSpecialChar(sortedData);

      setCsvData(dataWithoutSpecialChar);

      setTimeout(() => {
        csvLink?.current?.link?.click();
        toast({
          title: "Success",
          description: "File downloaded successfully",
        });
      }, 500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.toString(),
        variant: "destructive",
      });
    }
  };

  handleDownloadButton = (record: any) => {
    downloadReport(record);
    setChannelName(record.name);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        title="Open Orders Reports"
        description="Manage All Open Orders Reports"
        search={false}
        loading={isLoading}
        pagination={false}
      />

      {csvLink && (
        <CSVLink
          data={csvData ?? []}
          filename={`${channelName}.csv`}
          ref={csvLink}
          href="_blank"
        />
      )}
    </div>
  );
}
