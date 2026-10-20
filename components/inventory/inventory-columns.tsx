"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import type { Inventory } from "@/types/inventory";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import MinimumQuantityCell from "./minimum-quantity-cell";
import SKUCell from "./sku-cell";
import StockLevelCell from "./stock-level-cell";

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "#",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center text-xs text-slate-400">{row?.index + 1}</div>
    ),
  },
  {
    accessorKey: "local_product.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="group flex items-center gap-3">
        {row?.original?.local_product?.image ? (
          <HoverCard openDelay={50} closeDelay={0}>
            <HoverCardTrigger>
              <div className="size-8 shrink-0 cursor-zoom-in overflow-hidden rounded-full border border-gray-300 bg-white px-0.5">
                <Image
                  src={row?.original?.local_product?.image || ""}
                  className="size-full shrink-0"
                  alt="no-image"
                  width={60}
                  height={100}
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="ml-6">
              <Image
                src={row?.original?.local_product?.image || ""}
                className="h-80 w-min shrink-0 rounded-sm border"
                alt="no-image"
                width={250}
                height={320}
              />
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div className="size-8 shrink-0 overflow-hidden rounded-full border border-slate-200 p-1">
            <Image
              src="/images/no-image-available.svg"
              className="size-full shrink-0"
              alt="no-image"
              width={40}
              height={40}
            />
          </div>
        )}
        <p className="text-sm">{row?.original?.local_product?.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "local_product.sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <SKUCell data={row?.original} />,
  },

  {
    accessorKey: "stock_level",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock Level" />,
    cell: StockLevelCell,
  },
  {
    accessorKey: "in_open",
    header: ({ column }) => <DataTableColumnHeader column={column} title="In Open" />,
    cell: ({ row }) => {
      return (
        <div className="w-[80px] text-center">
          {row?.original?.in_open - row?.original?.pending_quantity}
        </div>
      );
    },
  },
  {
    accessorKey: "pending_quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pending" />,
    cell: ({ row }) => (
      <div className="w-[80px] text-center">{row?.getValue("pending_quantity")}</div>
    ),
  },
  {
    accessorKey: "available",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Available" />,
    cell: ({ row }) => {
      const available = row?.original?.stock_level - row?.original?.in_open;
      let colorCode = "";

      if (available >= row?.original?.minimum_quantity) {
        colorCode = "bg-[#065089]";
      } else if (available > 0 && available < row?.original?.minimum_quantity) {
        colorCode = "bg-[#fab512]";
      } else {
        colorCode = "bg-[#ee1e5f]";
      }

      return (
        <section
          className={`flex h-6 w-12 items-center justify-center rounded-full text-xs font-medium text-white ${colorCode}`}
        >
          {Math.max(available, 0)}
        </section>
      );
    },
  },
  {
    accessorKey: "minimum_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Minimum Quantity" />
    ),
    cell: MinimumQuantityCell,
  },
  // {
  //   accessorKey: "minimum_quantity",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Sold in 24h" />,
  //   cell: MinimumQuantityCell,
  // },

  // {
  //   accessorKey: "sync_details",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Sync Status" />,
  //   cell: InventorySyncStatus,
  // },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions data={row?.original} />,
  },
];
