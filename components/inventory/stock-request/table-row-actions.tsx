"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import { InventoryStockRequestData } from "@/types/inventory-stock-request";

import { RestockProductsDialog } from "./restock-products-dialog";

type Props = {
  data: InventoryStockRequestData;
};

export function DataTableRowActions(props: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
      <Eye
        className="text-muted-foreground/70 size-3.5 cursor-pointer"
        onClick={() => setIsOpenDialog(true)}
      />

      <RestockProductsDialog
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        data={props?.data}
      />
    </>
  );
}
