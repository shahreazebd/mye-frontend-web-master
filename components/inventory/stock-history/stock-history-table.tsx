"use client";

import {
  // useInventoryAtom,
  useStockHistoryListPaginationAtom,
} from "@/atoms/inventoryAtom";

import { useGetStockHistory } from "@/hooks/queries/inventory/use-get-stock-history";
import { DataTable2 } from "@/components/core/data-table/data-table-2";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { columns } from "./columns";
import { StockHistoryToolbar } from "./stock-history-toolbar";

export function StockHistoryTable() {
  const { data: stockHistoryList, isLoading } = useGetStockHistory();

  const { setStockHistoryListPagination, stockHistoryListPagination } =
    useStockHistoryListPaginationAtom();

  return (
    <div>
      <DataTableToolbar
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
