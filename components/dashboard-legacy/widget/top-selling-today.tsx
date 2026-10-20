"use client";

// import dayjs from "dayjs";
import useGetTopSellingProduct from "@/hooks/queries/dashboard/use-get-top-selling-products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function TopSellingToday() {
  const { data: topSellingProduct, isLoading } = useGetTopSellingProduct();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today&apos;s Top 10 Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[265px]">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="">
              {topSellingProduct?.slice(0, 1).map((e: any, id: number) => (
                <div key={id} className="mb-4 flex items-center justify-center gap-3">
                  <Avatar className="hidden h-20 w-16 rounded-none sm:flex">
                    <AvatarImage
                      className="shrink-0 rounded-sm border"
                      src={`/images/random/${id}.jpg`}
                    />

                    <AvatarFallback className="uppercase">
                      {e?.channel_name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="-mt-1">
                    <p className="inline rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] leading-none text-red-700">
                      #1 Top Selling Product
                    </p>
                    <div className="flex items-center gap-x-1">
                      <p className="text-center text-sm font-medium text-gray-800">
                        T-shirt Demo Blue XXL
                      </p>
                      <p className="fadeinout text-sm">🔥</p>
                    </div>
                    <p className="text-xs text-gray-600">{e?.remote_sku}</p>
                  </div>

                  <div className="ml-auto mr-4 text-right">
                    <p className="text-[11px] leading-none text-gray-500">
                      {e?.total_quantity} units are sold
                    </p>
                    <p className="text-[11px] leading-none text-gray-500">
                      in {e?.channel_name}
                    </p>
                    <p className="text-base font-medium leading-5 text-gray-700">
                      Total earned ${e?.total_quantity * 999}
                    </p>
                  </div>
                </div>
              ))}

              <div className="max-h-[180px] overflow-y-auto">
                {topSellingProduct?.slice(1, 10).map((e: any, id: number) => (
                  <div
                    key={id}
                    className="mb-4 flex items-center justify-center gap-4 last:mb-0"
                  >
                    <Avatar className="ml-1 hidden h-16 w-14 rounded-none sm:flex">
                      <AvatarImage
                        className="shrink-0 rounded-sm border"
                        src={`/images/random/${id}.jpg`}
                      />

                      <AvatarFallback className="uppercase">
                        {e?.channel_name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="-mt-1">
                      <p className="inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] leading-none text-blue-700">
                        #{id + 2}
                      </p>
                      <p className="text-xs font-medium text-gray-800">
                        Cloth Demo Color 2XL
                      </p>
                      <p className="text-xs text-gray-600">{e?.remote_sku}</p>
                    </div>

                    <div className="ml-auto mr-4 text-right">
                      <p className="text-[11px] leading-none text-gray-500">
                        {e?.total_quantity} units are sold
                      </p>
                      <p className="text-[11px] leading-none text-gray-500">
                        in {e?.channel_name}
                      </p>
                      <p className="text-[13px] font-medium leading-5 text-gray-700">
                        Total earned ${e?.total_quantity * 999}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
