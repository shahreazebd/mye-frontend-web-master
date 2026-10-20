"use client";

import { useEffect, useState } from "react";
import { useDispatchedOrdersAtom } from "@/atoms/dispatched-orders-atom";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText, Loader2 } from "lucide-react";

import type { DispatchedOrderDetails } from "@/types/dispatched-order";
import fetch from "@/config/xior";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useDownloadDispatchedInvoice } from "./download-invoice";

export function DispatchedOrderActionCell({
  order,
}: Readonly<{ order: DispatchedOrderDetails }>) {
  const [vatRate, setVatRate] = useState<number>(() => {
    if (
      (order as any)?.vat_percentage != null &&
      !Number.isNaN(Number((order as any).vat_percentage))
    ) {
      return Number((order as any).vat_percentage);
    }
    const country = order.shipping_address?.country?.toUpperCase() || "";
    return country === "DE" ||
      country.includes("GERMANY") ||
      country.includes("DEUTSCHLAND")
      ? 19
      : 20;
  });
  const [isVatModified, setIsVatModified] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { downloadSingle, isDownloading } = useDownloadDispatchedInvoice();
  const { dispatchedOrdersInfo } = useDispatchedOrdersAtom();

  const batch = dispatchedOrdersInfo?.dispatchedOrdersInfo;
  const channelUid =
    batch?.channel_uid ||
    (order as any)?.channel_uid ||
    (order as any)?.channel?.channel_uid;
  const orderId = order.channel_order_id;
  const marketplace = (order.market_place || batch?.channel_type || "").toUpperCase();
  const isSupported = marketplace.includes("AMAZON");

  // Fetch Amazon order details to get default vat_percentage and prefetch for download
  const { data: amazonOrderData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["amazon-order-details", orderId, channelUid],
    queryFn: async () => {
      const res = await fetch.get(
        `/amazon/api/v1/orders/${encodeURIComponent(
          orderId
        )}?channel_uid=${encodeURIComponent(
          channelUid || ""
        )}&included_data=RECIPIENT,PROCEEDS,BUYER`
      );
      return res.data?.data || res.data;
    },
    enabled: isOpen && isSupported && !!orderId && !!channelUid,
    staleTime: 5 * 60 * 1000,
  });

  // When vat_percentage is returned from the API, use it as default percentage
  useEffect(() => {
    if (amazonOrderData?.vat_percentage != null && !isVatModified) {
      setVatRate(Number(amazonOrderData.vat_percentage));
    }
  }, [amazonOrderData?.vat_percentage, isVatModified]);

  async function handleDownload() {
    try {
      await downloadSingle({
        dispatchedOrder: order,
        batchInfo: batch,
        customVatRate: isVatModified
          ? vatRate
          : amazonOrderData?.vat_percentage != null
          ? Number(amazonOrderData.vat_percentage)
          : vatRate,
        prefetchedOrderData: amazonOrderData,
      });
      setIsOpen(false);
    } catch {
      // error handled in downloadSingle
    }
  }

  if (!isSupported) {
    return (
      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="ghost"
          className="size-8 cursor-not-allowed p-0 text-slate-300"
          disabled
          title="Invoice download only supported for Amazon"
        >
          <FileText className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (!isDownloading) {
            setIsOpen(open);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="size-8 p-0 text-slate-700 hover:text-slate-900"
            disabled={isDownloading}
            title={isDownloading ? "Generating invoice..." : "Download Invoice"}
          >
            {isDownloading ? (
              <Loader2 className="size-4 animate-spin text-primary" />
            ) : (
              <FileText className="size-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-68 p-3 shadow-lg">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <FileText className="size-3.5 text-primary" />
                  Download Invoice
                </h4>
                {isLoadingOrder && !isDownloading && (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Loader2 className="size-2.5 animate-spin" />
                    Loading info...
                  </span>
                )}
              </div>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {order.channel_order_id}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 border-t pt-2">
              <Label
                htmlFor={`vat-${order.id}`}
                className="text-xs font-medium text-slate-700"
              >
                VAT Rate (%):
              </Label>
              <Input
                id={`vat-${order.id}`}
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={vatRate}
                disabled={isDownloading || isLoadingOrder}
                onChange={(e) => {
                  setVatRate(Number(e.target.value));
                  setIsVatModified(true);
                }}
                className="h-7 w-20 text-right text-xs"
              />
            </div>

            {isDownloading && (
              <div className="flex items-center justify-center gap-2 rounded-md bg-slate-50 px-2 py-1.5 text-[11px] text-slate-600">
                <Loader2 className="size-3 animate-spin text-primary" />
                <span>Generating invoice PDF...</span>
              </div>
            )}

            <Button
              size="sm"
              className="h-8 w-full text-xs font-medium"
              onClick={handleDownload}
              disabled={isDownloading || isLoadingOrder}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : isLoadingOrder ? (
                <>
                  <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                  <span>Loading order...</span>
                </>
              ) : (
                <>
                  <Download className="mr-1.5 size-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
