"use client";

import {
  downloadCsv,
  downloadXlsx,
  removeDuplicate,
  removeSpecialChar,
} from "@/utils/helpers";
import { Download } from "lucide-react";

import { PostageOrder } from "@/types/postage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransformedOrder {
  // OrderId: string;
  Buyer: string;
  SKU: string;
  Quantity: number;
}

function transformOrdersIntoReport(orders: PostageOrder[]): TransformedOrder[] {
  const result: TransformedOrder[] = [];

  for (const order of orders) {
    if (
      order?.buyerInfo?.name &&
      typeof order.buyerInfo.name === "string" &&
      order.orderItems &&
      order.orderItems.length > 0
    ) {
      for (const item of order.orderItems) {
        result.push({
          // OrderId: order.orderId,
          SKU: item.localSku,
          Quantity: item.quantity,
          Buyer: order.buyerInfo.name,
        });
      }
    }
    // Skip orders that don't meet the criteria
  }

  return result;
}

type Props = {
  data: PostageOrder[];
  disabled: boolean;
  channelType: string;
};

export default function PostageReportDownloadButton(props: Props) {
  function downloadReport(ext: "csv" | "xlsx") {
    const uniqueOrders = removeDuplicate(props.data, "trackingNumber");

    const reportSuccessDataList = uniqueOrders.filter(
      (order) => order.status === "SUCCESS"
    );

    const reportFailedDataList = uniqueOrders.filter(
      (order) => order.status === "FAILED"
    );

    const successData = reportSuccessDataList
      .map((order) => {
        return order.orderItems?.map((item) => ({
          ...(props.channelType === "amazon" && {
            "Order ID": order.orderId,
          }),

          SKU: item.localSku,
          Quantity: item.quantity,
          Buyer: order?.buyerInfo?.name,
        }));
      })
      .flat();

    const empty = {
      ...(props.channelType === "amazon" && {
        "Order ID": "",
      }),
      SKU: "",
      Quantity: null,
      Buyer: "",
    };

    const data = removeSpecialChar([...successData, empty, ...reportFailedDataList]);

    if (ext === "csv") {
      downloadCsv(data, `report_${new Date().toISOString()}.csv`);
      return;
    }

    downloadXlsx(data, `report_${new Date().toISOString()}.xlsx`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          disabled={props.disabled || !transformOrdersIntoReport(props.data).length}
        >
          <Download className="mr-2 size-4" /> Download Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Download Your Report</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => downloadReport("csv")}>In CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadReport("xlsx")}>
          In XLSX
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
