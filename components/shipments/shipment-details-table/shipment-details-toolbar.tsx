"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { ShipmentDetails } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";
import useDispatchAfterLabelCreate from "@/hooks/queries/postage/use-dispatch-after-label-create";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShippingCodesSelect } from "@/components/legacy-postage/postage-details-table/shipping-codes-select";

import ShipmentReportDownloadButton from "./report-download-button";

type Props = {
  shipment: ShipmentDetails | undefined;
  currentTab: string;
  selectedOrderID: string[];
};

export function ShipmentDetailsToolbar({
  shipment,
  currentTab,
  selectedOrderID,
}: Readonly<Props>) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [dispatchCooldown, setDispatchCooldown] = useState(0);
  const successOrderCount = shipment?.orders?.filter((e) => e.labelLink).length;

  const { mutate: dispatchOrder, isLoading } = useDispatchAfterLabelCreate();

  React.useEffect(() => {
    if (dispatchCooldown <= 0) return;

    const timer = setTimeout(() => {
      setDispatchCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatchCooldown]);

  async function downloadPostages(
    e: React.MouseEvent<HTMLButtonElement>,
    shippingId: string
  ) {
    e.stopPropagation();
    setIsDownloading(true);

    try {
      const res = await fetchPostage.get(`/shipments/${shippingId}/download`, {
        responseType: "blob",
      });

      const blob = res.data;
      const url = globalThis.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `shipment.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      globalThis.URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }

  function dispatchHandler() {
    const payload = {
      channel_uid: shipment?.storeId,
      company_uid: shipment?.companyId,
      channel_order_id: selectedOrderID,
    };

    dispatchOrder(payload, {
      onSuccess: () => {
        setDispatchCooldown(15);
      },
    });
  }

  return (
    <section className="flex w-full justify-between">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="success">Success</TabsTrigger>
        <TabsTrigger value="failed">Failed</TabsTrigger>
      </TabsList>

      {currentTab !== "email" && shipment && (
        <div className="flex items-center gap-2">
          {["otto", "ebay"].includes(shipment?.marketplace?.toLowerCase()) && (
            <ShippingCodesSelect
              marketplace={shipment?.marketplace?.toLocaleLowerCase()}
            />
          )}

          <ShipmentReportDownloadButton
            shipmentId={shipment?.id}
            marketplace={shipment?.marketplace}
          />

          {!!successOrderCount && currentTab === "success" && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => downloadPostages(e, shipment?.id)}
              disabled={isDownloading}
            >
              {isDownloading && <Loader2 size={18} className="animate-spin" />}
              Download Shipment
            </Button>
          )}

          {!!successOrderCount && ["success"].includes(currentTab) && (
            <Button
              size="sm"
              onClick={dispatchHandler}
              disabled={!selectedOrderID?.length || isLoading || dispatchCooldown > 0}
            >
              {dispatchCooldown > 0
                ? `Dispatch (${selectedOrderID?.length}) (${dispatchCooldown}s)`
                : `Dispatch (${selectedOrderID?.length})`}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
