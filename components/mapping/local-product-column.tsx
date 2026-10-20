"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare, Copy } from "lucide-react";

import useSkuCopy from "@/hooks/custom/useSkuCopy";
import type { LocalProduct } from "@/hooks/queries/mapping/useGetLocalProducts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import LocalProductLink from "./local-product-link";

export let columns: ColumnDef<LocalProduct>[] = [
  {
    id: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Action" />,
    cell: () => <LocalProductLink />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { handleCopy, isClicked } = useSkuCopy();

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="w-auto overflow-hidden text-sm"
                style={{ whiteSpace: "nowrap" }}
              >
                {isClicked ? (
                  <CheckSquare className="inline size-4 cursor-pointer text-green-600 transition ease-in-out" />
                ) : (
                  <Copy
                    onClick={() => handleCopy(row.getValue("sku"))}
                    className="inline size-4 cursor-pointer transition ease-in-out"
                  />
                )}{" "}
                {row.getValue("sku")}
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-[200px]">
              {(row.getValue("sku") as string)?.toString()?.trim()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div
        className=" w-[200px] overflow-hidden text-sm"
        style={{ whiteSpace: "nowrap" }}
      >
        {row.getValue("name")}
      </div>
    ),
  },
];
