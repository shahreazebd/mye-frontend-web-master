"use client";

import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { useGetCustomerDetails } from "@/hooks/queries/customers/use-get-customer-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerInfo({ slug }: { slug: string }) {
  const decode = decodeURI(slug);

  const searchParams = useSearchParams();

  const { data: customerDetails } = useGetCustomerDetails(
    decode,
    searchParams.get("phone") as string
  );

  const data = customerDetails?.data;

  return (
    <Card className="w-3/12">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold capitalize">
          {data?.buyer_name?.toLowerCase()}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-xs text-slate-500">{data?.email}</p>
        <p className="text-xs text-slate-500">{data?.phone}</p>
        <p className="mt-6 text-sm font-semibold">Address:</p>
        <p className="text-xs capitalize">
          {data?.order_details?.[0]?.address1?.toLowerCase()}{" "}
          {data?.order_details?.[0]?.address2?.toLowerCase()} -{" "}
          {data?.order_details?.[0]?.state?.toLowerCase()}{" "}
          {data?.order_details?.[0]?.country ?? ""}
        </p>
        <div className="my-10 flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm font-semibold">Total Orders</p>
            <p className="text-2xl font-bold">{data?.total_number_of_orders}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">Total Products</p>
            <p className="text-2xl font-bold">{data?.total_quantity}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">Total Spent</p>
            <p className="text-2xl font-bold">
              {data?.total_spend}
              <span className="pl-1 text-sm font-semibold text-gray-400">
                {data?.order_details?.[0]?.currency}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">First Order:</p>
            <p className="text-xs leading-tight">
              {dayjs(data?.first_order_date).format("ddd DD-MM-YYYY, hh:mm a")}
            </p>
            <p className="pt-1 text-xs font-normal text-gray-500">
              Order ID:
              <br />
              {data?.first_order_id}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Latest Order:</p>
            <p className="text-xs leading-tight">
              {dayjs(data?.last_order_date).format("ddd DD-MM-YYYY, hh:mm a")}
            </p>
            <p className="pt-1 text-xs font-normal text-gray-500">
              Order ID:
              <br />
              {data?.last_order_id}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
