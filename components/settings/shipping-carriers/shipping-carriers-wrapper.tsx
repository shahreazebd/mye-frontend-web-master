"use client";

import { useShippingCarrierAtom } from "@/atoms/shippingCarrierAtom";
import { groupBy } from "@/utils/helpers";
import { Loader2 } from "lucide-react";

import { useDeleteCarrier } from "@/hooks/queries/carriers/use-delete-carrier";
import useGetAllShippingCarrier from "@/hooks/queries/carriers/useGetAllShippingCarrier";
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
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";

import ShippingCarrierHeader from "./shipping-carrier-header";
import SingleShippingCarrierCard from "./single-shipping-carrier-card";

export default function ShippingCarrierWrapper() {
  const { carrier, handleCarrier } = useShippingCarrierAtom();
  const { data: carriers, isLoading } = useGetAllShippingCarrier();
  const { mutate, isLoading: deleteLoading } = useDeleteCarrier();

  const groupedCarriers = groupBy(carriers, (e) => e.shipping_service_name);

  const handelAlertChange = (value: boolean) => {
    handleCarrier({ carrierDeleteAlert: value, deleteCarrierId: "" });
  };

  const handelDelete = () => {
    mutate(carrier.deleteCarrierId, {
      onSuccess: () => handelAlertChange(false),
    });
  };

  return (
    <>
      <ShippingCarrierHeader />
      {isLoading ? (
        <div className="flex h-[calc(100vh-130px)] items-center justify-center">
          <Loader2 className="size-16 animate-spin" />
        </div>
      ) : carriers?.length ? (
        groupedCarriers.map((carrier) => {
          return (
            <SingleShippingCarrierCard
              data={carrier.values}
              isLoading={isLoading}
              logo={`/logos/carriers/round/${carrier.key.toLocaleLowerCase()}.svg`}
              alt={carrier.key}
            />
          );
        })
      ) : (
        <NoDataPlaceholder
          className="h-[calc(100vh-130px)]"
          title="No shipping carriers found"
        />
      )}

      <AlertDialog open={carrier.carrierDeleteAlert} onOpenChange={handelAlertChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will close the syncing process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handelDelete} disabled={deleteLoading}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
