"use client";

import { useRef, useState } from "react";
import { Channel } from "@/schema/channel";
import { openSuccessNotification } from "@/utils/notification";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

import { useDatePicker2 } from "@/hooks/custom/useDatePicker";
import useGetSalesReport from "@/hooks/queries/report/useGetSalesReport";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";
import ChannelSelect2 from "@/components/shared/channel-select-2";

import { columns } from "./sales-report-columns";

export default function SalesWrapper() {
  const [q, setQ] = useState<any>("");
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const { fromDate, setFromDate, setToDate, toDate } = useDatePicker2();

  const date = {
    to: toDate,
    from: fromDate,
  };

  const { data, isLoading } = useGetSalesReport(
    date,
    channelDetails?.channel_uid as string
  );

  const salesReportCsvData = data?.map((e: any) => ({
    Source: e.channel_type,
    "Sub Source": e.channel_name,
    "Local SKU": e.local_sku,
    "Sold Quantity Total": e.total_selling_quantity,
    "Sales Product Price": e.total_price,
  }));

  const downloadReport = () => {
    openSuccessNotification({ description: "File is downloading..." });

    csvLink.current?.link.click();
  };

  const allTopButtons = (
    <>
      <DatePicker date={fromDate} setDate={setFromDate} className="w-[200px]" />
      <DatePicker date={toDate} setDate={setToDate} className="w-[200px]" />

      <ChannelSelect2 setChannelDetails={setChannelDetails} />

      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm" onClick={downloadReport}>
              <Download size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Download Report</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );

  return (
    <div>
      <DataTableToolbar q={q} setQ={setQ} component={allTopButtons} search={true} />

      <DataTable
        className="pt-3"
        query={q}
        header={false}
        data={data}
        columns={columns}
        search={false}
        loading={isLoading}
        isViewShow={false}
        pagination={false}
      />

      {csvLink && (
        <CSVLink
          data={salesReportCsvData ?? []}
          filename={`Sales_Report_${new Date().toLocaleDateString()}.csv`}
          ref={csvLink}
          href="_blank"
        />
      )}
    </div>
  );
}
