"use client";

import { useRef, useState } from "react";
import { Channel } from "@/schema/channel";
import { openSuccessNotification } from "@/utils/notification";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

import useDatePicker from "@/hooks/custom/useDatePicker";
import useGetStockReport from "@/hooks/queries/report/useGetStockReport";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DataTable } from "@/components/core/data-table/data-table";
import ChannelSelect2 from "@/components/shared/channel-select-2";

import { columns } from "./stock-report-columns";

export default function StockWrapper() {
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const { date, setDate } = useDatePicker();
  const { data, isLoading } = useGetStockReport(
    date,
    channelDetails?.channel_uid as string
  );

  const stockReportCsvData = data?.map((e) => ({
    Source: e.souce,
    "Sub Source": e.sub_source,
    "Product Name": e.local_product_name,
    "Local SKU": e.local_product_sku,
    "Sold Quantity Total": e.total_quantity,
    "Sales Product Price": e.total_sell,
  }));

  const downloadReport = () => {
    openSuccessNotification({ description: "File is downloading..." });

    csvLink.current?.link.click();
  };

  const allTopButtons = (
    <>
      <DatePickerWithRange date={date} setDate={setDate} />

      <ChannelSelect2 setChannelDetails={setChannelDetails} />

      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2 lg:px-3"
        onClick={downloadReport}
      >
        <div className="flex gap-3">
          <Download size={18} />
          <span>Download Reports</span>
        </div>
      </Button>
    </>
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        searchColumn="local_product_sku"
        searchPlaceholder="Search by SKU"
        title="Stock Reports"
        description="Manage All Stock Reports"
        search={true}
        loading={isLoading}
        component={allTopButtons}
      />

      {csvLink && (
        <CSVLink
          data={stockReportCsvData ?? []}
          filename={`Stock_Report_${new Date().toLocaleDateString()}.csv`}
          ref={csvLink}
          href="_blank"
        />
      )}
    </div>
  );
}
