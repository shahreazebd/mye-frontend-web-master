"use client";

import dayjs from "dayjs";

import useGetTopSellingProduct from "@/hooks/queries/dashboard/use-get-top-selling-products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function TopSellingProducts() {
  const { data: topSellingProduct, isLoading } = useGetTopSellingProduct();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Selling Products of {`${dayjs().format("MMMM YYYY")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[265px] w-full overflow-y-scroll">
          {isLoading ? (
            <SkeletonLoader />
          ) : topSellingProduct?.length === 0 ? (
            <NoDataPlaceholder title="No top selling product" />
          ) : (
            topSellingProduct?.map((e: any, id: number) => (
              <div key={id} className="mb-4 flex items-center gap-4">
                <Avatar className="hidden h-14 w-12 rounded-none sm:flex">
                  <AvatarImage
                    className="shrink-0 rounded-sm border"
                    src={`/images/random/${id}.jpg`}
                  />

                  <AvatarFallback className="uppercase">
                    {e?.channel_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid">
                  <p className="text-sm font-medium text-gray-800">
                    Cloth Demo Color 2XL
                  </p>
                  <p className="ml-2 text-xs text-gray-800">{e?.remote_sku}</p>
                  <p className="ml-2 text-[11px] leading-none text-gray-500">
                    {e?.channel_name}
                  </p>
                </div>
                <div className="ml-auto mr-4 text-right">
                  <p className="pb-0.5 text-[13px] font-medium leading-4 text-gray-700">
                    Earned ${e?.total_quantity * 9993}
                  </p>
                  <p className="text-[11px] leading-none text-gray-500">
                    {e?.total_quantity} products sold
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
