import React from "react";
import { Metadata } from "next";

import ProductsWrapper from "@/components/settings/products/products-wrapper";

export const metadata: Metadata = {
  title: "All Products",
  description: "Authentication forms built using the components.",
};

export default function Products() {
  return <ProductsWrapper />;
}
