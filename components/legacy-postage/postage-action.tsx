import { MouseEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  usePostageAtom,
  usePostageServiceName,
  useSelectedPostageChannelId,
} from "@/atoms/postageAtom";
import { base64ToPDF, removeDuplicateByField } from "@/utils/helpers";
import { Download, Eye, Loader2, Send } from "lucide-react";

import { Postage } from "@/types/postage";
import getPdfFromUrls from "@/lib/pdf-from-urls";
import getPdfFromUrl2 from "@/lib/pdf-from-urls2";
import useAuth from "@/hooks/custom/useAuth";
import useBuyPostage from "@/hooks/queries/postage/useBuyPostage";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function arrayDifference<T>(a: T[], b: T[]): T[] {
  return a.filter((item) => !b.includes(item));
}

export default function PostageAction({ order }: { order: Postage }) {
  const { userInformation } = useAuth();
  const { setPostageInfo } = usePostageAtom();
  const { setPostageServiceName } = usePostageServiceName();
  const { setSelectedPostageChannelId } = useSelectedPostageChannelId();
  const { mutate: buyPostage, isLoading: isBuyLoading } = useBuyPostage();

  // Separate loading states for two download methods
  const [isDownloadPending, setIsDownloadPending] = useState(false);
  const [isExperimentalDownloadPending, setIsExperimentalDownloadPending] =
    useState(false);

  const [isDownloadClicked, setIsDownloadClicked] = useState(false);

  const missingIds = arrayDifference(
    order.successOrderIds,
    order.orders.map((o) => o.orderId)
  );

  // Auto-reset download clicked flag after 10s
  useEffect(() => {
    if (!isDownloadClicked) return;
    const timer = setTimeout(() => setIsDownloadClicked(false), 10000);
    return () => clearTimeout(timer);
  }, [isDownloadClicked]);

  const handleViewDetails = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setPostageInfo((prev) => ({
        ...prev,
        selectedPostage: order,
        isPostageDetailsModalOpen: true,
      }));
      setSelectedPostageChannelId(order.channelUuid);
      setPostageServiceName(order?.service?.type);
    },
    [order, setPostageInfo, setPostageServiceName, setSelectedPostageChannelId]
  );

  const handleTryAgain = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      const payload = {
        serviceType: order?.service?.type,
        data: JSON.parse(localStorage.getItem("postagePayloadData") || "{}"),
      };
      buyPostage(payload, {
        onError: (error) => {
          console.error("Error while trying to buy postage:", error);
        },
      });
    },
    [order, buyPostage]
  );

  // 🔸 Normal base64 download
  const downloadPostages = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      setIsDownloadPending(true);

      const fieldName =
        order.service.type === "CLICKANDDROP" ? "labelLink" : "trackingNumber";

      const links = removeDuplicateByField(order.orders, fieldName)
        .filter((o) => o.status === "SUCCESS" && o.labelLink)
        .map((o) => o.labelLink) as string[];

      try {
        const pdfBase64 = await getPdfFromUrls(links);
        base64ToPDF(pdfBase64);
        setIsDownloadClicked(true);
      } catch (error) {
        console.error("Failed to download postages:", error);
      } finally {
        setIsDownloadPending(false);
      }
    },
    [order, userInformation]
  );

  // 🔸 Experimental blob download
  const downloadPostagesExperimental = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      setIsExperimentalDownloadPending(true);

      const fieldName =
        order.service.type === "CLICKANDDROP" ? "labelLink" : "trackingNumber";

      const links = removeDuplicateByField(order.orders, fieldName)
        .filter((o) => o.status === "SUCCESS" && o.labelLink)
        .map((o) => o.labelLink) as string[];

      try {
        const pdfUrl = await getPdfFromUrl2(links);

        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "postage.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Optional: revoke blob after short delay
        setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);

        setIsDownloadClicked(true);
      } catch (error) {
        console.error("Failed to download postages (experimental):", error);
      } finally {
        setIsExperimentalDownloadPending(false);
      }
    },
    [order, userInformation]
  );

  if (!order?.createdAt) return null;

  const renderStatusActions = () => {
    switch (order.status) {
      case "PENDING":
        return (
          <div className="ml-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <Image
                src="/images/loading.gif"
                width={20}
                height={20}
                alt="Processing"
                unoptimized
              />
              <small className="text-destructive">Processing</small>
            </div>
            <small className="text-xs text-muted-foreground">
              Download button will appear when ready
            </small>
          </div>
        );

      case "FINISHED":
        return (
          <>
            {/* Normal Download */}
            <Button
              variant="outline"
              size="sm"
              className="ml-4 size-8 p-0"
              onClick={downloadPostages}
              disabled={isDownloadPending}
            >
              {isDownloadPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
            </Button>

            {/* View Details */}
            <Button
              variant="outline"
              size="sm"
              className="size-8 p-0"
              onClick={handleViewDetails}
            >
              <Eye className="size-4" />
            </Button>

            {/* Experimental Download */}
            <Button
              variant="outline"
              size="sm"
              className="size-7 border-0 p-0"
              onClick={downloadPostagesExperimental}
              disabled={isExperimentalDownloadPending}
            >
              {isExperimentalDownloadPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Download className="size-3" />
              )}
            </Button>
          </>
        );

      case "FAILED":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="ml-4 size-8 p-0"
              onClick={handleTryAgain}
              disabled={isBuyLoading}
            >
              {isBuyLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="size-8 p-0"
              onClick={handleViewDetails}
            >
              <Eye className="size-4" />
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {renderStatusActions()}
      {missingIds.length > 0 && (
        <Popover>
          <PopoverTrigger>
            <Button size="sm" variant="outline">
              Missing IDs ({missingIds.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>{missingIds.join(", ")}</div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
