"use client";

import { useShippingCarrierAtom } from "@/atoms/newShippingCarriersAtom";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Carrier } from "@/types/shipping-carriers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: Carrier;
}

export function ShippingCarrierTableActions({ data }: Props) {
  const { setCarrier } = useShippingCarrierAtom();

  function handleEdit() {
    setCarrier((prev) => ({
      ...prev,
      carrierData: data,
      isOpenCarrierEditDialog: true,
    }));

    document.body.style.pointerEvents = "";
  }

  function handleDelete() {
    setCarrier((prev) => ({
      ...prev,
      carrierData: data,
      isOpenCarrierDeleteAlert: true,
    }));

    document.body.style.pointerEvents = "";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="text-muted-foreground/70 mr-2 size-3.5" />
          Edit
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>

        <div className="w-full">
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
