"use client";

import dynamic from "next/dynamic";
import { useInventoryAtom, useInventoryPaginationAtom } from "@/atoms/inventoryAtom";

import useGetInventories from "@/hooks/queries/inventory/useGetInventories";
import { DataTable2 } from "@/components/core/data-table/data-table-2";
import { DataTableBackendToolbar } from "@/components/core/data-table/data-table-backend-toolbar";

import { columns } from "./inventory-columns";

const Header = dynamic(() => import("./header"));
const InventoryDetailsModal = dynamic(() => import("./inventory-details-modal"));
const SettingsSheet = dynamic(() => import("./settings-sheet"));

export default function InventoryWrapper() {
  const { inventoryStore } = useInventoryAtom();
  const { pagination, setPagination } = useInventoryPaginationAtom();
  const { data: inventories, isLoading, refetch, isFetching } = useGetInventories();

  return (
    <>
      <DataTableBackendToolbar
        title="Inventory"
        description="Manage All Inventory"
        component={
          <Header
            refetch={refetch}
            isFetching={isFetching}
            inventories={inventories?.data}
          />
        }
      />

      <DataTable2
        header={false}
        columns={columns}
        data={inventories?.data}
        dataSize={100}
        pageOptions={[100, 500, 1000]}
        loading={isLoading}
        loadingRowCount={20}
        count={inventories?.count}
        pagination={pagination}
        setPagination={setPagination}
      />

      <SettingsSheet />
      {inventoryStore?.isInventoryDetailsModalOpen && <InventoryDetailsModal />}
    </>
  );
}
