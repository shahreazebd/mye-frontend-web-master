"use client";

import Image from "next/image";
import dayjs from "dayjs";

import { useGetMonthlyTopTenProducts } from "@/hooks/queries/dashboard/use-get-monthly-top-ten-products";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function TopSellingProducts() {
  const { data: products, isLoading } = useGetMonthlyTopTenProducts();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Selling Products of {`${dayjs().format("MMMM YYYY")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[350px] overflow-x-hidden overflow-y-scroll">
          {isLoading ? (
            <SkeletonLoader />
          ) : products?.length === 0 ? (
            <NoDataPlaceholder title="No top selling product" />
          ) : (
            <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
              {products?.map((product) => (
                <div
                  key={product?.sku}
                  className="flex w-36 flex-col items-center overflow-hidden rounded-lg"
                >
                  <Image
                    height={80}
                    width={80}
                    src={product?.image || "/images/no-image-available.jpg"}
                    alt={product?.sku}
                    className="mb-4 size-28 rounded-xl border bg-[#f6f6f6] object-contain p-3"
                  />

                  <div className="-mt-7 mb-2 rounded-full bg-orange-500 px-3 py-0.5 text-xs font-semibold text-white">
                    {product?.quantity} Sold
                  </div>
                  <div className="marquee text-center">
                    <div className="marquee-content truncate text-xs font-semibold leading-none text-gray-800">
                      {product?.sku}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
