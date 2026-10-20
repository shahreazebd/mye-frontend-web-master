import type { Metadata } from "next";

import DispatchOrders from "@/components/order/dispatched-orders/dispatched-orders";

export const metadata: Metadata = {
  title: "Dispatch Orders",
  description: "Authentication forms built using the components.",
};

export default function NewDispatchedOrdersPage() {
  return <DispatchOrders />;
}
