import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { Channel } from "@/schema/channel";
import { downloadCsv, downloadXlsx } from "@/utils/helpers";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

import { CarrierSelect } from "./carrier-select";

interface Props {
  channelDetails: Channel | undefined;
}

export function PostagePreviewTableToolbar({ channelDetails }: Readonly<Props>) {
  const { openOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const { toast } = useToast();
  const reportSortedBy = channelDetails?.report_sorted_by || "sku";

  function downloadReport(type: "csv" | "xlsx") {
    const orders = openOrdersWithStorage
      .sort((a, b) => {
        if (reportSortedBy === "sku") {
          return (
            a?.sku?.localeCompare(b?.sku) ||
            a?.shipping_address?.buyer_name?.localeCompare(
              b?.shipping_address?.buyer_name
            )
          );
        } else if (reportSortedBy === "buyer") {
          return (
            a?.shipping_address?.buyer_name?.localeCompare(
              b?.shipping_address?.buyer_name
            ) || a?.sku?.localeCompare(b?.sku)
          );
        }

        return 0;
      })
      ?.flatMap((e) => {
        const quantities = e?.quantity?.split(",")?.map(Number);

        return quantities?.map((quantity, i) => {
          return {
            ...(channelDetails?.channel_type === "amazon" && {
              "Order ID": e?.channel_order_id,
            }),
            SKU: e?.modified_sku?.split(",")[i],
            Quantity: quantity,
            Buyer: e?.shipping_address.buyer_name,
          };
        });
      });

    if (type === "csv") {
      downloadCsv(orders, `postage_orders_${new Date().toLocaleDateString()}.csv`);
    } else {
      downloadXlsx(orders, `postage_orders_${new Date().toLocaleDateString()}.xlsx`);
    }

    toast({
      title: "Success",
      description: "File downloaded successfully",
    });
  }

  return (
    <section className="flex items-center gap-4">
      <section className="flex items-center gap-2">
        <span className="text-sm font-medium">Channel Name:</span>
        <span className="text-md font-semibold text-primary">{channelDetails?.name}</span>

        <span className="text-sm font-medium">Total Postages:</span>
        <span className="text-md font-semibold text-primary">
          {openOrdersWithStorage?.length}
        </span>
      </section>

      {openOrdersWithStorage?.length ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              <Download className="mr-2 size-4" /> Download Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Download Your Report</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadReport("csv")}>
              In CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadReport("xlsx")}>
              In XLSX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      {channelDetails?.channel_type !== "amazon" ? <CarrierSelect /> : null}
    </section>
  );
}
