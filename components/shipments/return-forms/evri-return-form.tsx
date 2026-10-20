"use client";

import { useState } from "react";

import type { Order } from "@/types/shipments";
import { useBuyReturnShipment } from "@/hooks/queries/shipments/use-buy-return-shipment";

import SelectOption from "../../order/open-orders/options/select-option";
import { Button } from "../../ui/button";

type Props = {
  order: Order;
  carrierAccountId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function EvriReturnForm({
  order,
  carrierAccountId,
  onCancel,
  onSuccess,
}: Readonly<Props>) {
  const [evriService, setEvriService] = useState("STANDARD");
  const { mutate: buyReturn, isLoading: isBuying } = useBuyReturnShipment("EVRI");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const metadata = {
      service: evriService,
      shipment_service_uuid: carrierAccountId,
    };

    buyReturn(
      {
        orderId: order.id,
        carrierId: carrierAccountId,
        metadata,
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectOption
        label="Select Service"
        className="w-full"
        options={[{ label: "Standard", value: "STANDARD" }]}
        defaultOption={evriService}
        onValueChange={setEvriService}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isBuying}>
          Cancel
        </Button>
        <Button type="submit" disabled={isBuying}>
          {isBuying ? "Buying..." : "Buy Return Label"}
        </Button>
      </div>
    </form>
  );
}
