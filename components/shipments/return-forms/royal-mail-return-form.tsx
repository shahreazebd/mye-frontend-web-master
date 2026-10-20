"use client";

import { useState } from "react";

import type { Order } from "@/types/shipments";
import {
  useBuyReturnShipment,
  useGetRoyalMailReturnServices,
} from "@/hooks/queries/shipments/use-buy-return-shipment";

import SelectOption from "../../order/open-orders/options/select-option";
import { Button } from "../../ui/button";

const packageFormats = [
  { label: "Letter", value: "Letter" },
  { label: "Large Letter", value: "LargeLetter" },
  { label: "Small Parcel", value: "SmallParcel" },
  { label: "Medium Parcel", value: "MediumParcel" },
];

type Props = {
  order: Order;
  carrierAccountId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function RoyalMailReturnForm({
  order,
  carrierAccountId,
  onCancel,
  onSuccess,
}: Readonly<Props>) {
  const [rmService, setRmService] = useState("");
  const [rmPackageFormat, setRmPackageFormat] = useState("SmallParcel");

  const { data: rmReturnServices } = useGetRoyalMailReturnServices();
  const { mutate: buyReturn, isLoading: isBuying } = useBuyReturnShipment("ROYAL_MAIL");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const metadata = {
      shipping_service_uuid: carrierAccountId,
      postage_service_code: rmService,
      packageFormatIdentifier: rmPackageFormat,
      serviceCode: rmService,
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

  const rmServicesOptions =
    rmReturnServices?.services?.map((s: any) => ({
      label: `${s.name} (${s.serviceCode})`,
      value: s.serviceCode,
    })) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectOption
        label="Select Service"
        className="w-full"
        placeholder="Select Royal Mail return service"
        options={rmServicesOptions}
        onValueChange={setRmService}
      />
      <SelectOption
        label="Package Format"
        className="w-full"
        placeholder="Select package size"
        options={packageFormats}
        defaultOption={rmPackageFormat}
        onValueChange={setRmPackageFormat}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isBuying}>
          Cancel
        </Button>
        <Button type="submit" disabled={!rmService || isBuying}>
          {isBuying ? "Buying..." : "Buy Return Label"}
        </Button>
      </div>
    </form>
  );
}
