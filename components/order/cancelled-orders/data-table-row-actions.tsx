"use client";

import { useState } from "react";
import {
  useActiveOpenOrderAtom,
  useIsOpenOrderDetailsModalOpenAtom,
} from "@/atoms/openOrderAtom";
import type { CancelledOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";
import { Eye, MoreHorizontal, RotateCcw } from "lucide-react";

import useRestoreCancelledOrder from "@/hooks/queries/order/use-restore-cancelled-order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

export default function DataTableRowActions(props: CellContext<CancelledOrder, unknown>) {
  const { setIsOpenOrderDetailsModalOpen } = useIsOpenOrderDetailsModalOpenAtom();
  const { setActiveOpenOrder } = useActiveOpenOrderAtom();
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const { mutate: restoreCancelledOrder, isLoading } = useRestoreCancelledOrder();

  const order = props?.row?.original;

  function detailsButtonHandler() {
    setActiveOpenOrder(order as any);
    setIsOpenOrderDetailsModalOpen(true);
  }

  function handleRestoreConfirm() {
    if (!order?.channel_uid || !order?.channel_order_id) {
      toast({
        title: "Error",
        description: "Channel UID or Order ID is missing.",
        variant: "destructive",
      });
      return;
    }

    restoreCancelledOrder(
      {
        channelId: order.channel_uid,
        channelOrderId: order.channel_order_id,
      },
      {
        onSuccess: () => {
          setIsRestoreModalOpen(false);
        },
      }
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsRestoreModalOpen(true)}>
            <RotateCcw className="text-muted-foreground/70 mr-2 size-3.5" />
            Restore
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isRestoreModalOpen} onOpenChange={setIsRestoreModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Cancelled Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore cancelled order{" "}
              <span className="font-semibold text-foreground">
                {order?.channel_order_id}
              </span>
              ? This action will move the order back to active open orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleRestoreConfirm();
              }}
            >
              {isLoading ? "Restoring..." : "Restore Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
