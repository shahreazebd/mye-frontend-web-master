import { Row } from "@tanstack/react-table";

import { Order } from "@/types/shipments";

import { Button } from "../../ui/button";
import { UploadTrackingButton } from "./upload-tracking-button";

type ShipmentDetailsTableLabelLinkCellProps = {
  marketplace?: string;
  channelUid?: string;
  row: Row<Order>;
};

export function ShipmentDetailsTableLabelLinkCell({
  row,
  marketplace,
  channelUid,
}: Readonly<ShipmentDetailsTableLabelLinkCellProps>) {
  function downloadHandler() {
    if (!row.original.labelLink) return;

    fetch(row.original.labelLink)
      .then((res) => res.blob())
      .then((blob) => {
        const url = globalThis.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${row.original.marketplaceOrderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        globalThis.URL.revokeObjectURL(url);
      });
  }

  return (
    <div className="flex items-center gap-2">
      {row?.original?.labelLink && (
        <Button
          className="z-[2] h-8"
          variant="default"
          onClick={(e) => {
            e.stopPropagation();
            downloadHandler();
          }}
        >
          Download
        </Button>
      )}

      {marketplace &&
        ["ebay", "otto"].includes(marketplace.toLowerCase()) &&
        row.original.trackingUploadStatus !== "SUCCESS" && (
          <UploadTrackingButton
            marketplace={marketplace}
            postageDetails={row?.original}
            channelUid={channelUid}
          />
        )}
    </div>
  );
}
