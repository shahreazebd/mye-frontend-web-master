import { Metadata } from "next";

import { ShipmentSocketProvider } from "@/components/shipment-socket-provider";
import { ShipmentWrapper } from "@/components/shipments/shipment-wrapper";

export const metadata: Metadata = {
  title: "Shipments",
  description: "Shipments",
};

export default function ShipmentsPage() {
  return (
    <ShipmentSocketProvider>
      <ShipmentWrapper />
    </ShipmentSocketProvider>
  );
}
