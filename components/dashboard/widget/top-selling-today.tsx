"use client";

import { useGetTodaysTopFiveProducts } from "@/hooks/queries/dashboard/use-get-todays-top-five-products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function TopSellingToday() {
  const { data: todaysTopFiveProduct, isLoading } = useGetTodaysTopFiveProducts();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today&apos;s Top 5 Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[280px] overflow-auto">
          {isLoading ? (
            <SkeletonLoader count={7} />
          ) : todaysTopFiveProduct && todaysTopFiveProduct.length === 0 ? (
            <NoDataPlaceholder title="No top selling product" />
          ) : (
            <div className="max-h-[280px]">
              {todaysTopFiveProduct?.map((product, id) => (
                <div
                  key={id}
                  className="mb-2.5 grid grid-cols-12 items-center justify-center last:mb-0"
                >
                  <div>
                    <p className="inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] leading-none text-blue-700">
                      #{id + 1}
                    </p>
                  </div>

                  <div className="col-span-7 flex gap-x-4">
                    <Avatar className="hidden shrink-0 rounded-none sm:flex">
                      <AvatarImage
                        className="shrink-0 rounded-sm border p-1"
                        src={product.image || "/images/no-image-available.jpg"}
                      />

                      <AvatarFallback className="uppercase">
                        {product.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="mt-0.5">
                      <p className="text-xs font-medium text-gray-800">{product.name}</p>
                      <p className="my-1 text-[10px] leading-3 text-gray-600">
                        {product.sku}
                      </p>
                    </span>
                  </div>

                  <div className="col-span-4 ml-auto mr-4 text-right">
                    <p className="text-[13px] font-medium leading-5 text-gray-700">
                      {product?.quantity} units are sold
                    </p>
                    <p className="text-[11px] leading-none text-gray-500">
                      Total earned {product?.total_sold} {product.currency}
                    </p>
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
