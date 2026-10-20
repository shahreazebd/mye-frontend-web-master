"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare, Copy } from "lucide-react";

import { RemoteProduct } from "@/types/remote-product";
import useSkuCopy from "@/hooks/custom/useSkuCopy";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import { InventorySyncCell } from "./inventory-sync-cell";
import { InventorySyncHeader } from "./inventory-sync-header";
import { RemoteProductActionHeader } from "./remote-product-action-header";
import { RemoteProductMappingColumn } from "./remote-product-mapping-column";
import { RemoteProductSkuCell } from "./remote-product-sku-cell";
import RemoteProductUnlink from "./remote-product-unlink";

export function colFunc(channelType: string) {
  const isFba = channelType === "amazon";

  const columns: ColumnDef<RemoteProduct>[] = [
    {
      accessorKey: "sync_inventory",
      header: ({ column }) => <InventorySyncHeader column={column} title="Sync" />,
      cell: ({ row }) => <InventorySyncCell row={row} />,
    },
    {
      accessorKey: "remote_product_sku",
      header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
      cell: ({ row }) => <RemoteProductSkuCell row={row} />,
    },
    {
      accessorKey: "fba_status",
      header: ({ column }) =>
        isFba && <DataTableColumnHeader column={column} title="FBA" />,
      cell: ({ row }) =>
        row.original.fba_status && <div className="w-8 text-center">✓</div>,
    },
    {
      accessorKey: "remote_product_title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { handleCopy, isClicked } = useSkuCopy();
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="w-[100px] overflow-hidden text-sm "
                  style={{ whiteSpace: "nowrap" }}
                >
                  {isClicked ? (
                    <CheckSquare className="inline size-4 cursor-pointer text-green-600 transition ease-in-out" />
                  ) : (
                    <Copy
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(row.getValue("remote_product_title"));
                      }}
                      className="inline size-4 cursor-pointer transition ease-in-out"
                    />
                  )}{" "}
                  {row.getValue("remote_product_title")}
                </div>
              </TooltipTrigger>
              <TooltipContent className="w-[200px]">
                {row.getValue("remote_product_title")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "mapping.mapped_local_product.sku",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mapping" />,
      cell: ({ row }) => <RemoteProductMappingColumn row={row?.original} />,
    },
    {
      id: "mapping",
      header: () => <RemoteProductActionHeader />,
      cell: ({ row }) => <RemoteProductUnlink row={row} />,
    },
  ];

  return columns;
}
