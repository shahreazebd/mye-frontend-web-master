"use client";

import Image from "next/image";
import { Data } from "@/schema/product";
import { ColumnDef } from "@tanstack/react-table";

// import { Check, CircleOff } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import ProductSkuCell from "./product-sku-cell";
import { ProductsTableActions } from "./products-table-actions";

export let columns: ColumnDef<Data>[] = [
  {
    id: "aa",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="text-xs text-slate-400">{row.index + 1}</div>,
  },

  {
    accessorKey: "sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="group flex items-center gap-3">
        <div>
          {!row?.original?.image ? (
            <div className="size-12 shrink-0 overflow-hidden rounded-none">
              <Image
                src="/images/no-image-available.svg"
                className="aspect-square size-full shrink-0 rounded-sm border"
                alt="no-image"
                width={60}
                height={60}
              />
            </div>
          ) : (
            <HoverCard openDelay={50} closeDelay={0}>
              <HoverCardTrigger>
                <div className="size-12 shrink-0 cursor-zoom-in overflow-hidden rounded-none">
                  <Image
                    src={row?.original?.image || ""}
                    className="aspect-square size-full shrink-0 rounded-sm border"
                    alt="no-image"
                    width={250}
                    height={320}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <Image
                  src={row?.original?.image || ""}
                  className="h-80 w-min shrink-0 rounded-sm border"
                  alt="no-image"
                  width={250}
                  height={320}
                />
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <div>
          <div className="relative mb-1 text-sm font-medium text-gray-800">
            <ProductSkuCell data={row?.original} />
          </div>

          <p className="text-xs text-gray-600">{row?.original?.name} </p>
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  //   cell: ({ row }) => <div>{row.getValue("name")}</div>,
  // },
  // {
  //   accessorKey: "sku",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
  //   cell: ({ row }) => <ProductSkuCell data={row.original} />,
  // },
  // {
  //   accessorKey: "is_composite",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Comp." />,
  //   cell: ({ row }) => (
  //     <div className="mx-auto w-20 text-center">
  //       {row.getValue("is_composite") ? (
  //         <Check size={16} color="green" />
  //       ) : (
  //         <CircleOff size={16} color="red" />
  //       )}
  //     </div>
  //   ),
  // },

  {
    accessorKey: "selling_price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <div>
        <p className="mb-1 flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Selling:</span>{" "}
          {row?.original?.selling_price}
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Purchase:</span>{" "}
          {row?.original?.purchase_price}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "height",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dimention (cm)" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="mb-1 flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Width:</span> {row?.original?.width}
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Height:</span> {row?.original?.height}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "weight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Size" />,
    cell: ({ row }) => (
      <div>
        <p className="mb-1 flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Weight:</span> {row?.original?.weight}{" "}
          gm
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-800">
          <span className="text-xs text-gray-400">Length:</span> {row?.original?.depth} cm
        </p>
      </div>
    ),
  },
  {
    id: "actions",
    cell: (info) => <ProductsTableActions data={info?.row?.original} />,
  },

  // {
  //   accessorKey: "height",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Height" />,
  //   cell: ({ row }) => <div>{row.getValue("height")}</div>,
  // },
  // {
  //   accessorKey: "width",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Width" />,
  //   cell: ({ row }) => <div>{row.getValue("width")}</div>,
  // },

  // {
  //   accessorKey: "weight",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
  //   cell: ({ row }) => <div>{row.getValue("weight")}</div>,
  // },
  // {
  //   accessorKey: "depth",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Depth" />,
  //   cell: ({ row }) => <div>{row.getValue("depth")}</div>,
  // },
  // {
  //   accessorKey: "purchase_price",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Purchase price" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("purchase_price")}</div>,
  // },
  // {
  //   accessorKey: "selling_price",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Selling price" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("selling_price")}</div>,
  // },
];
