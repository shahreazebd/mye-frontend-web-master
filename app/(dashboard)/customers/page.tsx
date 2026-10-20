import { Metadata } from "next";

import { CustomerWrapper } from "@/components/customers/customer-wrapper";

export const metadata: Metadata = {
  title: "Customers",
  description: "Analyze your customers purchase behavior to increase sell",
};

export default async function Customers() {
  return <CustomerWrapper />;
}
