"use client";

import { useState } from "react";
import { downloadCsv, downloadXlsx, removeSpecialChar } from "@/utils/helpers";
import { Download, Loader2 } from "lucide-react";

import { fetchPostage } from "@/config/xior";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  shipmentId: string;
  marketplace: string;
};

type PostageOrder = {
  SKU: string;
  Quantity: string;
  Buyer: string;
  "Order ID": string;
};

export default function ShipmentReportDownloadButton({
  shipmentId,
  marketplace,
}: Readonly<Props>) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function downloadReport(ext: "csv" | "xlsx") {
    setIsDownloading(true);

    try {
      // Fetch orders from API
      const res = await fetchPostage.get(`/shipments/${shipmentId}/report`);
      const orders = res.data?.data;

      const successData = orders.map((order: PostageOrder) => ({
        ...(marketplace === "AMAZON" && { "Order ID": order["Order ID"] }),
        SKU: order.SKU,
        Quantity: order.Quantity,
        Buyer: order?.Buyer,
      }));

      const data = removeSpecialChar([...successData]);

      const filename = `report_${new Date().toISOString()}.${ext}`;

      if (ext === "csv") {
        downloadCsv(data, filename);
      } else {
        downloadXlsx(data, filename);
      }
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" /> Preparing...
            </>
          ) : (
            <>
              <Download className="mr-2 size-4" /> Download Report
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Download Your Report</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => downloadReport("csv")}>In CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadReport("xlsx")}>
          In XLSX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
