import { Metadata } from "next";

import { StockRequestWrapper } from "@/components/inventory/stock-request/stock-request-wrapper";

export const metadata: Metadata = {
  title: "Stock Request",
  description: "Inventory Stock Request",
};

export default async function Inventory() {
  return <StockRequestWrapper />;
}
