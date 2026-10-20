import { Metadata } from "next";

import { PendingOrdersWrapper } from "@/components/order/pending-orders/pending-orders-wrapper";

export const metadata: Metadata = {
  title: "Pending Orders",
  description: "Check all the pending orders",
};

export default function PendingOrdersPage() {
  return <PendingOrdersWrapper />;
}
