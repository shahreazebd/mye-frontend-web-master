import { Metadata } from "next";

import CancelOrdersWrapper from "@/components/order/cancelled-orders/cancel-order-wrapper";

export const metadata: Metadata = {
  title: "Cancelled Orders",
  description: "Authentication forms built using the components.",
};

export default function CancelOrder() {
  return <CancelOrdersWrapper />;
}
