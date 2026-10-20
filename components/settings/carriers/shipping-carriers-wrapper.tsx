"use client";

import { useShippingCarrierAtom } from "@/atoms/newShippingCarriersAtom";

import { useDeleteCarrier } from "@/hooks/queries/new-carriers/use-delete-carrier";
import { useGetCarrierList } from "@/hooks/queries/new-carriers/use-get-carrier-list";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { DataTable } from "../../core/data-table/data-table";
import { columns } from "./shipping-carrier-column";
import { ShippingCarrierHeader } from "./shipping-carrier-header";

export function ShippingCarrierWrapper() {
  const { carrier, setCarrier } = useShippingCarrierAtom();

  const { data: carriers, isLoading } = useGetCarrierList();
  const { mutate: deleteCarrier, isLoading: deleteLoading } = useDeleteCarrier();

  function handleAlertChange(value: boolean) {
    setCarrier((prev) => ({
      ...prev,
      isOpenCarrierDeleteAlert: value,
    }));
  }

  function handleDelete() {
    deleteCarrier(carrier?.carrierData?.id, {
      onSuccess: () => handleAlertChange(false),
    });
  }

  return (
    <>
      <DataTableToolbar
        title="Carriers"
        description="Control your shipping carrier"
        component={<ShippingCarrierHeader />}
      />

      <DataTable
        className="mt-3"
        header={false}
        columns={columns}
        data={carriers}
        singleRowSelection={false}
        search={false}
        loading={isLoading}
        dataSize={15}
        pagination={true}
        pageOptions={[10, 15, 20, 30, 50]}
      />

      <AlertDialog
        open={carrier?.isOpenCarrierDeleteAlert}
        onOpenChange={handleAlertChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will close the syncing process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} disabled={deleteLoading}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
