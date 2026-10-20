"use client";

import { useState } from "react";
import { Eye, MoreHorizontal, ShoppingCart } from "lucide-react";

import { InventoryStockRequestData } from "@/types/inventory-stock-request";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RestockAlertDialog } from "./restock-alert-dialog";
import { RestockProductsDialog } from "./restock-products-dialog";

type Props = {
  data: InventoryStockRequestData;
};

export function DataTableRowActions(props: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <DropdownMenuItem onClick={() => setIsOpenDialog(true)}>
            <Eye className="text-muted-foreground/70 mr-2 size-3.5" />
            Product Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <ShoppingCart className="text-muted-foreground/70 mr-2 size-3.5" />
            Restock
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RestockProductsDialog
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        data={props?.data}
      />
      <RestockAlertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
