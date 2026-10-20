"use client";

import { useState } from "react";

import type { Order } from "@/types/shipments";
import { useBuyReturnShipment } from "@/hooks/queries/shipments/use-buy-return-shipment";

import SelectOption from "../../order/open-orders/options/select-option";
import { Button } from "../../ui/button";

const fedexServiceTypes = [
  { label: "FedEx Priority Overnight®", value: "PRIORITY_OVERNIGHT" },
  { label: "FedEx First Overnight®", value: "FIRST_OVERNIGHT" },
  { label: "FedEx International Priority®", value: "FEDEX_INTERNATIONAL_PRIORITY" },
  { label: "FedEx Ground®", value: "FEDEX_GROUND" },
  { label: "FedEx Home Delivery®", value: "GROUND_HOME_DELIVERY" },
];

const fedexPackageTypes = [
  { label: "FedEx Envelope", value: "FEDEX_ENVELOPE" },
  { label: "FedEx Box", value: "FEDEX_BOX" },
  { label: "FedEx Small Box", value: "FEDEX_SMALL_BOX" },
  { label: "FedEx Medium Box", value: "FEDEX_MEDIUM_BOX" },
  { label: "FedEx Large Box", value: "FEDEX_LARGE_BOX" },
  { label: "FedEx Pak", value: "FEDEX_PAK" },
  { label: "FedEx Tube", value: "FEDEX_TUBE" },
];

const fedexPickupTypes = [
  { label: "Contact FedEx to Schedule", value: "CONTACT_FEDEX_TO_SCHEDULE" },
  { label: "Drop off at FedEx Location", value: "DROPOFF_AT_FEDEX_LOCATION" },
  { label: "Use Scheduled Pickup", value: "USE_SCHEDULED_PICKUP" },
];

type Props = {
  order: Order;
  carrierAccountId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function FedExReturnForm({
  order,
  carrierAccountId,
  onCancel,
  onSuccess,
}: Readonly<Props>) {
  const [fedexService, setFedexService] = useState("");
  const [fedexPackage, setFedexPackage] = useState("");
  const [fedexPickup, setFedexPickup] = useState("");

  const { mutate: buyReturn, isLoading: isBuying } = useBuyReturnShipment("FEDEX");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const metadata = {
      serviceType: fedexService,
      packagingType: fedexPackage,
      pickupType: fedexPickup,
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

  const isFormValid = fedexService && fedexPackage && fedexPickup;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectOption
        label="Select Service Type"
        className="w-full"
        placeholder="Select FedEx service"
        options={fedexServiceTypes}
        onValueChange={setFedexService}
      />
      <SelectOption
        label="Select Package Type"
        className="w-full"
        placeholder="Select package type"
        options={fedexPackageTypes}
        onValueChange={setFedexPackage}
      />
      <SelectOption
        label="Select Pickup Type"
        className="w-full"
        placeholder="Select pickup type"
        options={fedexPickupTypes}
        onValueChange={setFedexPickup}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isBuying}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isFormValid || isBuying}>
          {isBuying ? "Buying..." : "Buy Return Label"}
        </Button>
      </div>
    </form>
  );
}
