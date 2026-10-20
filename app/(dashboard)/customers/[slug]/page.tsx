import { Metadata } from "next";

import CustomerInfo from "@/components/customers/overview/customer-info";
import FavouriteProducts from "@/components/customers/overview/favourite-products";
import { OrderTable } from "@/components/customers/overview/order-table";
import { ProductsStatistics } from "@/components/customers/overview/product-stat";

export const metadata: Metadata = {
  title: "Customers Overview",
  description: "Analyze your customers purchase behavior to increase sell",
};

export default async function CustomerOverview(props: PageProps<"/customers/[slug]">) {
  const { slug } = await props.params;
  return (
    <div>
      <div className="flex gap-8">
        <CustomerInfo slug={slug} />
        <FavouriteProducts />
        <ProductsStatistics />
      </div>
      <div className="pt-8">
        <OrderTable slug={slug} />
      </div>
    </div>
  );
}
