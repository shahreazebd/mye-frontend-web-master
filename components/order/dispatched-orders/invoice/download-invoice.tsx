import { useState } from "react";
import type { Channel } from "@/schema/channel";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { downloadPDF } from "@/utils/pdf-download";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";

import type { DispatchOrders, DispatchedOrderDetails } from "@/types/dispatched-order";
import type { Order, ShipmentOrderPreview } from "@/types/shipments";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { getChannelDetails } from "@/hooks/queries/channel/useGetChannelDetails";
import { getShipmentOrderById } from "@/hooks/queries/shipments/use-get-shipment-order-by-id";

import { createInvoiceOrder } from "./invoice-utils";

export async function downloadDispatchedOrderInvoice({
  dispatchedOrder,
  batchInfo,
  customVatRate,
  companyUuid,
  qc,
  silentSuccess = false,
  prefetchedOrderData,
}: {
  dispatchedOrder: DispatchedOrderDetails;
  batchInfo?: Partial<DispatchOrders> | null;
  customVatRate?: number;
  companyUuid?: string;
  qc: QueryClient;
  silentSuccess?: boolean;
  prefetchedOrderData?: any;
}) {
  try {
    const marketplace = (
      dispatchedOrder.market_place ||
      batchInfo?.channel_type ||
      ""
    ).toUpperCase();

    const isSupportedMarketplace = marketplace.includes("AMAZON");

    if (!isSupportedMarketplace) {
      openErrorNotification({
        description: "Invoice download is currently only supported for Amazon orders.",
      });
      return;
    }

    const channelUid =
      batchInfo?.channel_uid ||
      (dispatchedOrder as any)?.channel_uid ||
      (dispatchedOrder as any)?.channel?.channel_uid;
    let channelDetails: Channel | null = null;

    if (channelUid && companyUuid) {
      try {
        channelDetails = await qc.fetchQuery({
          queryKey: ["fetch-channel-data-details", channelUid, companyUuid],
          queryFn: getChannelDetails,
        });
      } catch {
        // Continue if channel details fetch fails
      }
    }

    let fullOrder: any = prefetchedOrderData || null;
    const orderId = dispatchedOrder.channel_order_id;
    if (!fullOrder && channelUid && orderId) {
      try {
        const res = await fetch.get(
          `/amazon/api/v1/orders/${encodeURIComponent(
            orderId
          )}?channel_uid=${encodeURIComponent(
            channelUid
          )}&included_data=RECIPIENT,PROCEEDS,BUYER`
        );
        fullOrder = res.data?.data || res.data;
      } catch (amazonErr) {
        console.warn(
          "Failed to fetch Amazon order details via /amazon/api/v1/orders:",
          amazonErr
        );
        if (companyUuid) {
          try {
            const fallbackRes = await fetch.get(
              `orders/api/v1/orders/get-order-details?company_uid=${companyUuid}&channel_uid=${channelUid}&order_id=${encodeURIComponent(
                orderId
              )}`
            );
            fullOrder = fallbackRes.data?.data;
          } catch {
            // Fall back gracefully to dispatchedOrder data
          }
        }
      }
    }

    const order: Order = createInvoiceOrder({
      dispatchedOrder,
      fullOrder,
      channelDetails,
      batchInfo,
    });

    const [{ pdf }, { InvoicePdfDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("./invoice-pdf-document"),
    ]);

    const effectiveVatRate =
      customVatRate !== undefined
        ? customVatRate
        : typeof fullOrder?.vat_percentage === "number"
        ? fullOrder.vat_percentage
        : typeof (dispatchedOrder as any)?.vat_percentage === "number"
        ? (dispatchedOrder as any).vat_percentage
        : undefined;

    const doc = (
      <InvoicePdfDocument
        order={order}
        customVatRate={effectiveVatRate}
        shopUrl={channelDetails?.shop_url || ""}
      />
    );
    const blob = await pdf(doc).toBlob();

    const fileName = `Invoice-${order.marketplaceOrderId || order.id}.pdf`;
    downloadPDF(blob, fileName);

    if (!silentSuccess) {
      openSuccessNotification({
        description: `Invoice downloaded: ${fileName}`,
      });
    }
  } catch (error: any) {
    console.error("Invoice generation error:", error);
    openErrorNotification({
      description: error?.message || "Failed to generate invoice. Please try again.",
    });
  }
}

// Fallback legacy download function if needed for compatibility
export async function downloadOrderInvoice(
  orderId: string,
  qc: QueryClient,
  preloadedOrder?: ShipmentOrderPreview | null,
  customVatRate?: number,
  companyUuid?: string
) {
  try {
    let order: Order | undefined =
      preloadedOrder?.shipment && preloadedOrder.items?.length
        ? (preloadedOrder as Order)
        : undefined;

    order ??= await qc.fetchQuery({
      queryKey: ["get-shipment-order-by-id", orderId],
      queryFn: getShipmentOrderById,
    });

    if (!order) {
      openErrorNotification({
        description: "Failed to retrieve order details for invoice generation.",
      });
      return;
    }

    const channelId = order?.shipment?.storeId || "all";

    const channelDetails = await qc.fetchQuery({
      queryKey: ["fetch-channel-data-details", channelId, companyUuid],
      queryFn: getChannelDetails,
    });

    const marketplace = order.shipment?.marketplace?.toUpperCase() || "";

    const isSupportedMarketplace = marketplace.includes("AMAZON");

    if (!isSupportedMarketplace) {
      openErrorNotification({
        description: "Invoice download is currently only supported for Amazon orders.",
      });
      return;
    }

    const orderIdStr = order.marketplaceOrderId || order.id;
    let amazonOrderData: any = null;
    if (channelId && channelId !== "all" && orderIdStr) {
      try {
        const res = await fetch.get(
          `/amazon/api/v1/orders/${encodeURIComponent(
            orderIdStr
          )}?channel_uid=${encodeURIComponent(
            channelId
          )}&included_data=RECIPIENT,PROCEEDS,BUYER`
        );
        amazonOrderData = res.data?.data || res.data;
      } catch {
        // Fall back to preloaded order data
      }
    }

    if (amazonOrderData) {
      order = createInvoiceOrder({
        dispatchedOrder: {
          id: Number(order.id) || 0,
          dispatch_identifier: order.shipmentId || "",
          dispatched_at: order.purchaseDate
            ? new Date(order.purchaseDate).toISOString()
            : "",
          dispatched_by: "",
          channel_order_id: orderIdStr,
          market_place: "AMAZON",
          total: String(amazonOrderData.proceeds?.grandTotal?.amount || ""),
          items: [],
          shipping_address: order.address as any,
        },
        fullOrder: amazonOrderData,
        channelDetails,
      });
    }

    const [{ pdf }, { InvoicePdfDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("./invoice-pdf-document"),
    ]);

    const effectiveVatRate =
      customVatRate !== undefined
        ? customVatRate
        : typeof amazonOrderData?.vat_percentage === "number"
        ? amazonOrderData.vat_percentage
        : undefined;

    const doc = (
      <InvoicePdfDocument
        order={order}
        customVatRate={effectiveVatRate}
        shopUrl={channelDetails.shop_url}
      />
    );
    const blob = await pdf(doc).toBlob();

    const fileName = `Invoice-${order.marketplaceOrderId || order.id}.pdf`;
    downloadPDF(blob, fileName);

    openSuccessNotification({
      description: `Invoice downloaded: ${fileName}`,
    });
  } catch (error: any) {
    console.error("Invoice generation error:", error);
    openErrorNotification({
      description: error?.message || "Failed to generate invoice. Please try again.",
    });
  }
}

export function useDownloadDispatchedInvoice() {
  const qc = useQueryClient();
  const [isDownloading, setIsDownloading] = useState(false);

  const { userInformation } = useAuth();
  const companyId = userInformation?.company_uid;

  async function downloadSingle({
    dispatchedOrder,
    batchInfo,
    customVatRate,
    prefetchedOrderData,
  }: {
    dispatchedOrder: DispatchedOrderDetails;
    batchInfo?: Partial<DispatchOrders> | null;
    customVatRate?: number;
    prefetchedOrderData?: any;
  }) {
    setIsDownloading(true);
    try {
      await downloadDispatchedOrderInvoice({
        dispatchedOrder,
        batchInfo,
        customVatRate,
        companyUuid: companyId,
        qc,
        prefetchedOrderData,
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return {
    downloadSingle,
    isDownloading,
  };
}

export const useDownloadOrderInvoice = useDownloadDispatchedInvoice;
