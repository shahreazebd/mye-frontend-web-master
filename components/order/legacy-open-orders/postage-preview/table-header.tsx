import { useSearchParams } from "next/navigation";
import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import CarrierSelect from "./carrier-select";

interface Props {
  channelDetails: Channel | undefined;
}

export function OthersTableHeader({ channelDetails }: Readonly<Props>) {
  const { setSelectedCarrierKV } = useSelectedCarrierKV();
  const { setAmazonCarrierOptions } = useAmazonCarrierOptions();
  const { handlePostagePreviewInfo } = usePostagePreviewAtom();
  const { openOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const { toast } = useToast();
  const params = useSearchParams();
  const carrier = params.get("carrier") || "evri";
  const reportSortedBy = channelDetails?.report_sorted_by || "sku";

  function handleWeightChange(value: string) {
    handlePostagePreviewInfo({ CarrierWillPickUpOption: value === "1" });
    setSelectedCarrierKV({});
    setAmazonCarrierOptions({});
  }

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
      {carrier === "amazon" && openOrdersWithStorage?.length ? (
        <p className="mr-2 text-base">
          Channel Name:{" "}
          <span className="font-semibold text-blue-800">
            {openOrdersWithStorage[0]?.channel?.name}
          </span>
        </p>
      ) : null}
      {carrier === "amazon" ? (
        <Select onValueChange={handleWeightChange} defaultValue="0">
          <SelectTrigger className="h-8 w-auto">
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Carrier will pick up</SelectItem>
            <SelectItem value="0">Shipper will drop off</SelectItem>
          </SelectContent>
        </Select>
      ) : null}

      <section className="space-x-2">
        <span className="text-xl font-semibold text-[#1C34B4]">
          {openOrdersWithStorage?.length}
        </span>
        <span className="text-sm font-medium text-[#64748B]">Total Postages</span>
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

      <CarrierSelect />
    </section>
  );
}
