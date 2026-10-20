import { MouseEvent, useState } from "react";
import { usePostageAtom } from "@/atoms/postageAtom";
import { Download, Eye, Loader2, Trash2 } from "lucide-react";

import { ShipmentList } from "@/types/shipments";
import { fetchPostage } from "@/config/xior";
import { useBuyShipment } from "@/hooks/queries/shipments/use-buy-shipment";
import { useDeleteShipment } from "@/hooks/queries/shipments/use-delete-shipment";
import { Button } from "@/components/ui/button";
import DeleteAlert from "@/components/delete-alert";

export default function ShipmentAction({
  shipment,
}: Readonly<{ shipment: ShipmentList }>) {
  const { setPostageInfo } = usePostageAtom();
  const { mutate: buyShipment, isLoading } = useBuyShipment();
  const { mutate: deleteShipment, isLoading: isDeleteLoading } = useDeleteShipment();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewDetails = (e: MouseEvent) => {
    e.stopPropagation();
    setPostageInfo((prev) => ({
      ...prev,
      selectedPostage: shipment,
      isPostageDetailsModalOpen: true,
      activeDetailsTab: "success",
    }));
  };

  const downloadPostages = async (e: MouseEvent, shippingId: string) => {
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
      a.download = `${shipment.marketplace}-${shipment.carrier.type}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      globalThis.URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  function handleBuyPostage(e: MouseEvent) {
    e.stopPropagation();
    buyShipment(shipment?.id);
  }

  function deleteShipmentHandler(e: MouseEvent) {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    deleteShipment(shipment?.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  }

  return (
    <div className="flex items-center justify-start gap-2">
      {shipment.status === "SUCCESS" && (
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0"
          onClick={(e) => downloadPostages(e, shipment?.id)}
          disabled={isDownloading}
          title="Download labels"
        >
          {isDownloading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
        </Button>
      )}

      {/* {["SUCCESS", "FAILED"].includes(shipment?.status) && (
        
      )} */}

      <Button
        variant="outline"
        size="sm"
        className="size-8 p-0"
        onClick={handleViewDetails}
        title="View Details"
      >
        <Eye className="size-4" />
      </Button>

      {["WAITING", "FAILED"].includes(shipment.status) && (
        <Button
          disabled={isLoading || shipment.status === "PROCESSING"}
          onClick={handleBuyPostage}
          size="sm"
        >
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Buy Shipment
        </Button>
      )}

      {["WAITING"].includes(shipment.status) && (
        <Button
          variant="outline"
          size="sm"
          className="size-8 p-0 text-destructive"
          title="Delete Shipment"
          onClick={deleteShipmentHandler}
        >
          <Trash2 className="size-4" />
        </Button>
      )}

      <DeleteAlert
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        deletedItemName="Shipment"
        removeFunction={confirmDelete}
        isLoading={isDeleteLoading}
      />
    </div>
  );
}
