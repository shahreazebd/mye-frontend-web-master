"use client";

import {
  useActiveOpenOrderAtom,
  useIsOpenOrderDetailsModalOpenAtom,
} from "@/atoms/openOrderAtom";
import { CellContext } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DataTableRowActions(props: CellContext<any, unknown>) {
  const { setIsOpenOrderDetailsModalOpen } = useIsOpenOrderDetailsModalOpenAtom();
  const { setActiveOpenOrder } = useActiveOpenOrderAtom();

  function detailsButtonHandler() {
    setActiveOpenOrder(props?.row?.original);
    setIsOpenOrderDetailsModalOpen(true);
    document.body.style.pointerEvents = "";
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
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem onClick={detailsButtonHandler}>
            <Eye className="text-muted-foreground/70 mr-2 size-3.5" />
            Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
