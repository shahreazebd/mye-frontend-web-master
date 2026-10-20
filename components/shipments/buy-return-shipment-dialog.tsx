"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import type { Order } from "@/types/shipments";
import { useGetShipmentOrderById } from "@/hooks/queries/shipments/use-get-shipment-order-by-id";
import { Checkbox } from "@/components/ui/checkbox";
import CarrierAccountSelect from "@/components/order/open-orders/options/carrier-account-select";
import SelectOption from "@/components/order/open-orders/options/select-option";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DhlReturnForm } from "./return-forms/dhl-return-form";
import { EvriReturnForm } from "./return-forms/evri-return-form";
import { FedExReturnForm } from "./return-forms/fedex-return-form";
import { RoyalMailReturnForm } from "./return-forms/royal-mail-return-form";

type Props = {
  orderId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const carrierFormsMap: Record<
  string,
  React.ComponentType<{
    order: Order;
    carrierAccountId: string;
    onCancel: () => void;
    onSuccess: () => void;
  }>
> = {
  ROYAL_MAIL: RoyalMailReturnForm,
  DHL: DhlReturnForm,
  EVRI: EvriReturnForm,
  FEDEX: FedExReturnForm,
};

export function BuyReturnShipmentDialog({
  orderId,
  isOpen,
  onOpenChange,
}: Readonly<Props>) {
  const { data: detailedOrder, isLoading: isOrderLoading } = useGetShipmentOrderById(
    orderId || "",
    isOpen
  );

  const activeOrder = detailedOrder;

  const carrierType = activeOrder?.shipment?.carrierType;

  const carrierAccountId = activeOrder?.shipment?.carrier?.id || "";

  const carrierName = activeOrder?.shipment?.carrier?.name || carrierType || "-";

  const [isManualSelection, setIsManualSelection] = useState(false);
  const [manualCarrierType, setManualCarrierType] = useState<string>("");
  const [manualCarrierAccountId, setManualCarrierAccountId] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setIsManualSelection(false);
      setManualCarrierType("");
      setManualCarrierAccountId("");
    }
  }, [isOpen]);

  const activeCarrierType = isManualSelection ? manualCarrierType : carrierType;
  const activeCarrierAccountId = isManualSelection
    ? manualCarrierAccountId
    : carrierAccountId;

  function renderCarrierForm() {
    if (!activeOrder) return null;

    if (isManualSelection) {
      if (!activeCarrierType) {
        return (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
            Please select a carrier service.
          </div>
        );
      }
      if (!activeCarrierAccountId) {
        return (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
            Please select a carrier account.
          </div>
        );
      }
    }

    const CarrierFormComponent = activeCarrierType
      ? carrierFormsMap[activeCarrierType]
      : null;

    if (CarrierFormComponent) {
      return (
        <CarrierFormComponent
          order={activeOrder}
          carrierAccountId={activeCarrierAccountId}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      );
    }

    return (
      <div className="space-y-4 py-2">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Carrier ({activeCarrierType || "Unknown"}) is not supported for return labels.
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Buy Return Shipment</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the details to buy a return shipment label.
          </DialogDescription>
        </DialogHeader>

        {isOrderLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2 rounded-lg border bg-gray-50/50 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Carrier
                </span>
                <span className="font-medium text-slate-900">{carrierName}</span>
              </div>

              <div className="flex items-center space-x-2 border-t pt-2">
                <Checkbox
                  id="override-carrier"
                  checked={isManualSelection}
                  onCheckedChange={(checked) => {
                    setIsManualSelection(!!checked);
                    if (checked) {
                      const isSupported = carrierType && carrierType in carrierFormsMap;
                      setManualCarrierType(isSupported ? carrierType : "ROYAL_MAIL");
                      setManualCarrierAccountId(isSupported ? carrierAccountId : "");
                    } else {
                      setManualCarrierType("");
                      setManualCarrierAccountId("");
                    }
                  }}
                />
                <label
                  htmlFor="override-carrier"
                  className="cursor-pointer select-none text-xs font-medium text-gray-700"
                >
                  Select carrier and account manually
                </label>
              </div>
            </div>

            {isManualSelection && (
              <div className="grid grid-cols-2 gap-3 rounded-lg border bg-slate-50/30 p-3">
                <SelectOption
                  label="Carrier"
                  placeholder="Select carrier"
                  className="h-9 w-full text-xs"
                  options={[
                    { label: "Royal Mail", value: "ROYAL_MAIL" },
                    { label: "DHL", value: "DHL" },
                    { label: "Evri", value: "EVRI" },
                    { label: "FedEx", value: "FEDEX" },
                  ]}
                  defaultOption={manualCarrierType}
                  onValueChange={(val) => {
                    setManualCarrierType(val);
                    setManualCarrierAccountId("");
                  }}
                />

                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Account
                    <CarrierAccountSelect
                      carrier={manualCarrierType}
                      className="mt-2 h-9 w-full text-xs"
                      defaultAccount={manualCarrierAccountId}
                      onValueChange={setManualCarrierAccountId}
                    />
                  </label>
                </div>
              </div>
            )}

            {renderCarrierForm()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
