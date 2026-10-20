import React from "react";
import { Metadata } from "next";

import ProductsHelthWrapper from "@/components/settings/products/products-health/products-health-wrapper";

export const metadata: Metadata = {
  title: "Products Health Check",
  description: "Authentication forms built using the components.",
};

export default function Products() {
  return <ProductsHelthWrapper />;
}
