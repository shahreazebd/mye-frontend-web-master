"use client";

import React, { useState } from "react";

import { useGetReturnOrders } from "@/hooks/queries/order/use-get-return-orders";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./return-order-columns";
import { ReturnOrderHeader } from "./return-order-header";

export function ReturnOrderWrapper() {
  const [q, setQ] = useState<any>("");
  const { data: returnOrders, isLoading, refetch, isRefetching } = useGetReturnOrders();

  return (
    <div>
      <DataTableToolbar
        title="Return Orders"
        description="Track your return orders"
        q={q}
        setQ={setQ}
        search={true}
        component={
          <ReturnOrderHeader
            refetch={refetch}
            isLoading={isLoading || isRefetching}
            data={returnOrders}
          />
        }
      />

      <DataTable
        className="pt-3"
        query={q}
        header={false}
        columns={columns}
        data={returnOrders}
        loading={isLoading}
        pagination={true}
        dataSize={20}
        pageOptions={[20, 50, 100, 200]}
      />
    </div>
  );
}
