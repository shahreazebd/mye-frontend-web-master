"use client";

import {
  useStockHistoryListFiltersAtom,
  // useInventoryAtom,
  useStockHistoryListPaginationAtom,
} from "@/atoms/inventoryAtom";

import { useGetStockHistory } from "@/hooks/queries/inventory/use-get-stock-history";
import { DataTable2 } from "@/components/core/data-table/data-table-2";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./inventory-history-columns";
import { StockHistoryToolbar } from "./inventory-history-toolbar";

export function InventoryHistoryWrapper() {
  const { data: stockHistoryList, isLoading } = useGetStockHistory();

  const { setStockHistoryListPagination, stockHistoryListPagination } =
    useStockHistoryListPaginationAtom();
  const { stockHistoryListFilters } = useStockHistoryListFiltersAtom();
  // console.log({ stockHistoryList, stockHistoryListFilters });
  return (
    <div>
      <DataTableToolbar
        title="Inventory History"
        description="Check your inventory history"
        search={false}
        component={<StockHistoryToolbar stockHistoryList={stockHistoryList?.data} />}
      />

      <DataTable2
        columns={columns}
        data={stockHistoryList?.data}
        count={stockHistoryList?.count}
        dataSize={10}
        pageOptions={[10, 20, 30, 50, 100]}
        loading={isLoading}
        pagination={stockHistoryListPagination}
        setPagination={setStockHistoryListPagination}
      />
    </div>
  );
}
