import { useState } from "react";
import { usePostageAtom } from "@/atoms/postageAtom";

import { useGetShipmentById } from "@/hooks/queries/shipments/use-get-shipment-by-id";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTable } from "@/components/core/data-table/use-data-table";

import { shipmentDetailsColumns } from "./shipment-details-columns";
import { ShipmentDetailsToolbar } from "./shipment-details-toolbar";

export function ShipmentDetailsTabs() {
  const { postageInfo, setPostageInfo } = usePostageAtom();
  const currentTab = postageInfo.activeDetailsTab ?? "success";

  function setCurrentTab(tab: string) {
    setPostageInfo((prev) => ({
      ...prev,
      activeDetailsTab: tab,
    }));
  }

  const [selectedOrderID, setSelectedOrderID] = useState<string[]>([]);

  const { data, isLoading } = useGetShipmentById();

  const { tableComponent: allTable } = useDataTable({
    data: data?.orders,
    columns: shipmentDetailsColumns(data?.marketplace, data?.storeId),
    pagination: false,
    singleRowSelection: false,
    selectedRowData: (rows) => {
      const allSelectedIds = rows.flatMap((row) => {
        if (Array.isArray(row.mergedOrderIds) && row.mergedOrderIds.length > 0) {
          return [row.id, ...row.mergedOrderIds];
        }
        return [row.id];
      });

      const uniqueIds = Array.from(new Set(allSelectedIds));

      setSelectedOrderID(uniqueIds);
    },
    loading: isLoading,
  });

  const { tableComponent: successTable } = useDataTable({
    data: data?.orders?.filter((e) => e.status === "SUCCESS"),
    columns: shipmentDetailsColumns(data?.marketplace, data?.storeId),
    pagination: false,
    singleRowSelection: false,
    selectedRowData: (rows) => {
      const allSelectedIds = rows.flatMap((row) => {
        if (Array.isArray(row.mergedOrderIds) && row.mergedOrderIds.length > 0) {
          return [row.marketplaceOrderId, ...row.mergedOrderIds];
        }
        return [row.marketplaceOrderId];
      });

      const uniqueIds = Array.from(new Set(allSelectedIds));

      setSelectedOrderID(uniqueIds);
    },
    loading: isLoading,
  });

  const { tableComponent: failedTable } = useDataTable({
    data: data?.orders?.filter((e) => e.status === "FAILED"),
    columns: shipmentDetailsColumns(),
    pagination: false,
    loading: isLoading,
  });

  return (
    <Tabs value={currentTab} onValueChange={(tab) => setCurrentTab(tab)}>
      <ShipmentDetailsToolbar
        shipment={data}
        currentTab={currentTab}
        selectedOrderID={selectedOrderID}
      />
      <TabsContent value="all">{allTable}</TabsContent>
      <TabsContent value="success">{successTable}</TabsContent>
      <TabsContent value="failed">{failedTable}</TabsContent>
    </Tabs>
  );
}
