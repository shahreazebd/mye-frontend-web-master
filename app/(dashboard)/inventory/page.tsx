import { Metadata } from "next";

import InventoryWrapper from "@/components/inventory/inventory-wrapper";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Authentication forms built using the components.",
};

export default async function Inventory() {
  return <InventoryWrapper />;
}
