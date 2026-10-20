import { useState } from "react";
import { usePostageAtom, usePostageServiceName } from "@/atoms/postageAtom";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTable } from "@/components/core/data-table/use-data-table";

import { postageDetailsColumns } from "./postage-details-columns";
import { PostageDetailsToolbar } from "./postage-details-toolbar";

export function PostageDetailsTabs() {
  const { postageInfo } = usePostageAtom();
  const { postageServiceName } = usePostageServiceName();
  const [selectedOrderID, setSelectedOrderID] = useState<string[]>([]);

  const [currentTab, setCurrentTab] = useState("success");

  const { tableComponent: allTable } = useDataTable({
    data: postageInfo.selectedPostage?.orders,
    columns: postageDetailsColumns(postageServiceName),
    pagination: false,
    singleRowSelection: false,
    selectedRowData: (rows) => {
      const selectedOrderId = rows.map((row) => row.orderId);

      setSelectedOrderID(selectedOrderId);
    },
  });

  const { tableComponent: successTable } = useDataTable({
    data: postageInfo.selectedPostage?.orders.filter((e: any) => e.status === "SUCCESS"),
    columns: postageDetailsColumns(postageServiceName),
    pagination: false,
    singleRowSelection: false,
    selectedRowData: (rows) => {
      const selectedOrderId = rows.map((row) => row.orderId);

      setSelectedOrderID(selectedOrderId);
    },
  });

  const { tableComponent: failedTable } = useDataTable({
    data: postageInfo.selectedPostage?.orders.filter((e: any) => e.status === "FAILED"),
    columns: postageDetailsColumns(postageServiceName),
    pagination: false,
    noDataClassName: "h-[calc(100vh-350px)]",
  });

  return (
    <Tabs value={currentTab} onValueChange={(currentTab) => setCurrentTab(currentTab)}>
      <PostageDetailsToolbar
        postage={postageInfo.selectedPostage}
        currentTab={currentTab}
        selectedOrderID={selectedOrderID}
      />
      <TabsContent value="all">{allTable}</TabsContent>
      <TabsContent value="success">{successTable}</TabsContent>
      <TabsContent value="failed">{failedTable}</TabsContent>
    </Tabs>
  );
}
