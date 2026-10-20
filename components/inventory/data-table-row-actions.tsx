"use client";

import { useInventoryAtom } from "@/atoms/inventoryAtom";
import { CircleChevronRight } from "lucide-react";

import { Inventory } from "@/types/inventory";

interface Props {
  data: Inventory;
}

export function DataTableRowActions({ data }: Props) {
  const {
    local_product: { local_product_id, sku },
    location,
  } = data;

  const { setInventoryStore } = useInventoryAtom();

  function handelEditClick() {
    setInventoryStore((prev) => ({
      ...prev,
      localProductId: local_product_id,
      sku: sku,
      isInventoryDetailsModalOpen: true,
      locationId: location,
      selectedInventory: data,
    }));

    document.body.style.pointerEvents = "";
  }

  return (
    <CircleChevronRight
      onClick={handelEditClick}
      className="size-5 cursor-pointer text-gray-400 hover:text-gray-600"
    />
    // <>
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button
    //         variant="ghost"
    //         className="flex h-8 w-8 p-0 data-[state=open]:bg-transparent"
    //       >
    //         {/* <MoreHorizontal className="h-4 w-4" /> */}
    //         <CircleChevronRight onClick={handelEditClick} className="h-5 w-5 text-gray-400 hover:text-gray-600" />
    //         <span className="sr-only">Open menu</span>
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align="end" className="w-[160px]">
    //       <DropdownMenuItem onClick={handelEditClick}>
    //         <Eye className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
    //         Details
    //       </DropdownMenuItem>

    //       {/*
    //         <DropdownMenuItem>
    //           <Star className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
    //           Favorite
    //         </DropdownMenuItem> */}
    //       {/* <DropdownMenuSeparator />

    //         <DropdownMenuSeparator /> */}
    //       {/* <DropdownMenuItem>
    //           <Trash className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
    //           Delete
    //           <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //         </DropdownMenuItem> */}
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </>
  );
}
