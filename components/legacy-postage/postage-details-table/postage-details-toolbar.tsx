"use client";

import { useEffect, useState } from "react";
import { usePostageAtom } from "@/atoms/postageAtom";
import {
  base64ToPDF,
  downloadCsv,
  mergeCell,
  removeDuplicateByField,
  removeSpecialChar,
} from "@/utils/helpers";

import type { Postage } from "@/types/postage";
import fetch from "@/config/xior";
import getPdfFromUrls from "@/lib/pdf-from-urls";
import useDispatchAfterLabelCreate from "@/hooks/queries/postage/use-dispatch-after-label-create";
import { useFindZPL } from "@/hooks/queries/postage/use-find-zpl";
import { useGenerateAmazonLabels } from "@/hooks/queries/postage/use-generate-amazon-labels";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import PostageReportDownloadButton from "./report-download-button";
import { ShippingCodesSelect } from "./shipping-codes-select";

type Props = {
  postage: Postage;
  currentTab: string;
  selectedOrderID: string[];
};

export function PostageDetailsToolbar({
  postage,
  currentTab,
  selectedOrderID,
}: Readonly<Props>) {
  const { toast } = useToast();
  const { data: zpls, mutate } = useFindZPL();
  const { postageInfo, setPostageInfo } = usePostageAtom();
  const { mutate: dispatchOrder } = useDispatchAfterLabelCreate();
  const [isDownloadPending, setIsDownloadPending] = useState(false);
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const [isFailedLoading, setIsFailedLoading] = useState(false);
  const { mutate: generateAmazonLabels, isLoading } = useGenerateAmazonLabels();

  const channelType = postage.channel?.channel_type;
  const reportSortedBy = postage?.channel.report_sorted_by || "sku";
  const labelLinks = postageInfo.selectedPostage.orders.map(
    (order: any) => order.labelLink
  );
  const failedOrderCount = postage?.orders?.filter((e) => e.status === "FAILED").length;
  const successOrderCount = postage?.orders?.filter((e) => e.status === "SUCCESS").length;

  useEffect(() => {
    mutate(labelLinks.filter(Boolean));
  }, []);

  async function downloadPostages() {
    setIsDownloadPending(true);

    const fieldName =
      postage.service.type === "CLICKANDDROP" ? "labelLink" : "trackingNumber";

    const links = removeDuplicateByField(postage.orders, fieldName)
      .filter((o) => o.status === "SUCCESS" && selectedOrderID.includes(o.orderId))
      .map((o) => o.labelLink) as string[];

    try {
      const pdfBase64 = await getPdfFromUrls(links);
      base64ToPDF(pdfBase64);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Failed to download postages:", error);
    } finally {
      setIsDownloadPending(false);
    }
  }

  function regenerateLabels() {
    const payload = {
      batchID: postageInfo.selectedPostage._id,
      channelUuid: postageInfo.selectedPostage.channelUuid,
      companyUuid: postageInfo.selectedPostage.companyUuid,
      zpl: zpls?.zpl as string[],
    };

    generateAmazonLabels(payload, {
      onSuccess: () => {
        setPostageInfo((prev) => ({
          ...prev,
          isPostageDetailsModalOpen: false,
        }));
      },
    });
  }

  async function downloadSuccessOrderReport() {
    try {
      const successChannelOrderIds = postage?.orders
        .filter((e) => e.status === "SUCCESS")
        .map((order) => order.orderId);

      const payload = {
        channel_uid: postage.channelUuid,
        company_uid: postage.companyUuid,
        channel_order_id: successChannelOrderIds,
      };

      setIsSuccessLoading(true);

      toast({
        title: "Please wait",
        description: "File is downloading...",
      });

      const { data } = await fetch.post(
        "/orders/api/v1/orders/get-selected-order-details/",
        payload
      );

      const orders = mergeCell(data.data)
        .map((order) => {
          const sku = order.items
            .map((item) => {
              const quantity = item.quantity > 1 ? `)${item.quantity}` : "";
              return `${item.local_SKU} ${quantity}`;
            })
            .join(",");

          return {
            ...order,
            sku,
          };
        })
        .sort((a, b) => {
          if (reportSortedBy === "sku") {
            return (
              a.sku.localeCompare(b.sku) ||
              a.shipping_address.buyer_name.localeCompare(b.shipping_address.buyer_name)
            );
          } else if (reportSortedBy === "buyer") {
            return (
              a.shipping_address.buyer_name.localeCompare(
                b.shipping_address.buyer_name
              ) || a.sku.localeCompare(b.sku)
            );
          }

          return 0;
        })
        .flatMap((e) => {
          return e.items.map((item) => {
            return {
              ...(channelType === "amazon" && {
                "Order ID": e.channel_order_id,
              }),
              SKU: item.local_SKU,
              Quantity: item.quantity,
              Buyer: e.shipping_address.buyer_name,
            };
          });
        });

      downloadCsv(orders);

      setIsSuccessLoading(false);
    } finally {
      setIsSuccessLoading(false);
    }
  }

  async function downloadFailedOrderReport() {
    try {
      const failedChannelOrderIds = postage?.orders
        .filter((e) => e.status === "FAILED")
        .map((order) => order.orderId);

      const url = "/orders/api/v1/orders/get-selected-order-details/";

      const payload = {
        channel_uid: postage.channelUuid,
        company_uid: postage.companyUuid,
        channel_order_id: failedChannelOrderIds,
      };

      setIsFailedLoading(true);

      toast({
        title: "Please wait",
        description: "File is downloading...",
      });

      const res = await fetch.post(url, payload);

      downloadCsv(removeSpecialChar(res.data.data));

      setIsFailedLoading(false);
    } finally {
      setIsFailedLoading(false);
    }
  }

  function dispatchHandler() {
    const payload = {
      channel_uid: postage.channelUuid,
      company_uid: postage.companyUuid,
      channel_order_id: selectedOrderID,
    };

    dispatchOrder(payload);
  }

  return (
    <section className="flex w-full justify-between">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="success">Success</TabsTrigger>
        <TabsTrigger value="failed">Failed</TabsTrigger>
      </TabsList>

      <div className="flex items-center gap-2">
        {channelType === "ebay" && <ShippingCodesSelect marketplace={channelType} />}

        {zpls?.isZPLFound && (
          <Button onClick={regenerateLabels} disabled={isLoading} size="sm">
            Generate Label Links
          </Button>
        )}

        <PostageReportDownloadButton
          data={postage.orders}
          disabled={isSuccessLoading}
          channelType={postage.channel.channel_type}
        />

        {!!successOrderCount && currentTab === "success" && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadPostages}
              disabled={isDownloadPending}
            >
              Download Postage
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSuccessOrderReport}
              disabled={isSuccessLoading}
            >
              Download Success Orders Report
            </Button>
          </>
        )}

        {!!failedOrderCount && currentTab === "failed" && (
          <Button
            variant="outline"
            size="sm"
            onClick={downloadFailedOrderReport}
            disabled={isFailedLoading}
          >
            Download Failed Orders Report
          </Button>
        )}

        {!!successOrderCount && ["success"].includes(currentTab) && (
          <Button disabled={!selectedOrderID.length} size="sm" onClick={dispatchHandler}>
            Dispatch ({selectedOrderID?.length})
          </Button>
        )}
      </div>
    </section>
  );
}
