import React from "react";

import type { Order } from "@/types/shipments";

import { AmazonInvoiceTemplate } from "./amazon-invoice-template";

export function InvoicePdfDocument({
  order,
  customVatRate,
}: Readonly<{
  order: Order;
  customVatRate?: number;
  shopUrl?: string;
}>) {
  return <AmazonInvoiceTemplate order={order} customVatRate={customVatRate} />;
}
