"use client";

import { useGetAllInventoryStockRequest } from "@/hooks/queries/inventory/use-get-all-inventory-request-stock";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./columns";

export function StockRequestWrapper() {
  const { data: inventoryStocks, isLoading } = useGetAllInventoryStockRequest();

  return (
    <div>
      <DataTableToolbar
        title="Stock Request"
        description="Manage Inventory Stock Request"
        search={false}
      />

      <DataTable
        header={false}
        columns={columns}
        data={inventoryStocks}
        loading={isLoading}
      />
    </div>
  );
}
