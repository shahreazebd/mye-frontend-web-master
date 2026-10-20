import { Metadata } from "next";

import SalesWrapper from "@/components/settings/reports/sales/sales-wrapper";

export const metadata: Metadata = {
  title: "Sales Reports",
  description: "Authentication forms built using the components.",
};

export default function page() {
  return <SalesWrapper />;
}
