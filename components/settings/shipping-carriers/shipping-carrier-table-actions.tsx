"use client";

import { EditCarrierType, useShippingCarrierAtom } from "@/atoms/shippingCarrierAtom";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: EditCarrierType;
}

export function ShippingCarrierTableActions({ data }: Props) {
  const { handleCarrier } = useShippingCarrierAtom();

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
          <DropdownMenuItem
            onClick={() => {
              document.body.style.pointerEvents = "";
              handleCarrier({ editCarrierData: data, isOpenEditSheet: true });
            }}
          >
            <Edit className="text-muted-foreground/70 mr-2 size-3.5" />
            Edit
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* 
            <DropdownMenuItem>
              <Star className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Favorite
            </DropdownMenuItem> */}
          {/* <DropdownMenuSeparator />

            <DropdownMenuSeparator /> */}
          <div className="w-full">
            <DropdownMenuItem
              onClick={() =>
                handleCarrier({ carrierDeleteAlert: true, deleteCarrierId: data?.uuid })
              }
            >
              <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
