"use client";

import { useSearchParams } from "next/navigation";

import { useGetCustomerDetails } from "@/hooks/queries/customers/use-get-customer-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./order-table-columns";

export function OrderTable({ slug }: { slug: string }) {
  const decode = decodeURI(slug);

  const searchParams = useSearchParams();

  const { data: customerDetails, isLoading } = useGetCustomerDetails(
    decode,
    searchParams.get("phone") as string
  );

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold">Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          header={false}
          columns={columns}
          data={customerDetails?.data?.order_details}
          singleRowSelection={false}
          search={false}
          loading={isLoading}
          pagination={false}
        />
      </CardContent>
    </Card>
  );
}
