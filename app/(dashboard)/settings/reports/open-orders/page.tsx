import { Metadata } from "next";

import OpenOrderReportsWrapper from "@/components/settings/reports/open-orders/open-orders-wrapper";

export const metadata: Metadata = {
  title: "Open Orders Reports",
  description: "Authentication forms built using the components.",
};

export default function OpenOrderReports() {
  return <OpenOrderReportsWrapper />;
}
