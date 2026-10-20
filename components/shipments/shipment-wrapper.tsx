"use client";

import { useEffect, useState } from "react";
import { useShipmentOrderDialogAtom } from "@/atoms/postageAtom";
import { useQueryClient } from "@tanstack/react-query";

import { shipmentSocket } from "@/lib/socket";
import useAuth from "@/hooks/custom/useAuth";
import { useGetAllShipments } from "@/hooks/queries/shipments/use-get-all-shipments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTable } from "@/components/core/data-table/use-data-table";

import { BuyReturnShipmentDialog } from "./buy-return-shipment-dialog";
import { OrderDetailsDialog } from "./order-details-dialog";
import { shipmentColumns } from "./shipment-columns";
import { ShipmentFilters } from "./shipment-filters";
import ShipmentOrderDetailsDialog from "./shipment-order-details-dialog";
import { ShipmentOrdersFilters } from "./shipment-orders-filters";
import { ShipmentOrdersTable } from "./shipment-orders-table";

export function ShipmentWrapper() {
  const { dialogState, closeDialogs } = useShipmentOrderDialogAtom();
  const [activeTab, setActiveTab] = useState("shipments");

  const { data, isLoading } = useGetAllShipments();

  const { tableComponent: shipmentTable } = useDataTable({
    data: data,
    columns: shipmentColumns,
    pagination: false,
    singleRowSelection: true,
    rowClickSelection: false,
    loading: isLoading,
    tableRowClass: "[&>td]:py-2",
  });

  const { userInformation } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userInformation?.company_uid) {
      shipmentSocket.emit("company:join", userInformation?.company_uid);

      shipmentSocket.on("order:update", () => {
        queryClient.invalidateQueries(["get-all-shipments"]);
      });
    }
  }, [userInformation?.company_uid]);

  // Reset dialog state on unmount
  useEffect(() => {
    return () => {
      closeDialogs();
    };
  }, []);

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          {activeTab === "shipments" ? <ShipmentFilters /> : <ShipmentOrdersFilters />}
        </div>

        <TabsContent value="shipments">{shipmentTable}</TabsContent>

        <TabsContent value="orders">
          <ShipmentOrdersTable />
        </TabsContent>
      </Tabs>

      <ShipmentOrderDetailsDialog />

      <OrderDetailsDialog
        orderId={dialogState.selectedOrderId}
        isOpen={dialogState.isDetailsOpen}
        onOpenChange={(open) => !open && closeDialogs()}
      />

      <BuyReturnShipmentDialog
        orderId={dialogState.selectedOrderId || ""}
        isOpen={dialogState.isBuyReturnOpen}
        onOpenChange={(open) => !open && closeDialogs()}
      />
    </>
  );
}
