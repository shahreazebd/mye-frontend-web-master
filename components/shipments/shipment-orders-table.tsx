"use client";

import { useShipmentOrdersPaginationAtom } from "@/atoms/postageAtom";

import { useGetShipmentOrders } from "@/hooks/queries/shipments/use-get-shipment-orders";
import { DataTable2 } from "@/components/core/data-table/data-table-2";

import { shipmentOrderColumns } from "./shipment-order-columns";

export function ShipmentOrdersTable() {
  const { data, isLoading } = useGetShipmentOrders();
  const { pagination, setPagination } = useShipmentOrdersPaginationAtom();

  return (
    <DataTable2
      header={false}
      columns={shipmentOrderColumns}
      data={data?.orders}
      dataSize={100}
      pageOptions={[100, 200, 500, 1000]}
      loading={isLoading}
      loadingRowCount={20}
      count={data?.count}
      pagination={pagination}
      setPagination={setPagination}
      tableRowClass="[&>td]:py-2"
    />
  );
}
