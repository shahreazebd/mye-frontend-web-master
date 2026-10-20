import { Metadata } from "next";

import StockWrapper from "@/components/settings/reports/stock/stock-wrapper";

export const metadata: Metadata = {
  title: "Stock Reports",
  description: "Authentication forms built using the components.",
};

export default function Stock() {
  return <StockWrapper />;
}
