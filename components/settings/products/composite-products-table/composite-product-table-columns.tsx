"use client";

import { Data } from "@/schema/product";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Trash } from "lucide-react";

import type { ChildProduct } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";
import { deleteCompositeProduct } from "../product-details-modal";
import ProductSkuCell from "../product-sku-cell";
import QuantityCell from "./quantity-cell";

let compositeProductGetColumns: ColumnDef<ChildProduct>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="ml-3">{row.index + 1}</div>,
  },
  {
    accessorKey: "child_product_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <div>{row.getValue("child_product_sku")}</div>,
  },

  {
    accessorKey: "child_product_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("child_product_name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div
          onClick={() =>
            deleteCompositeProduct(
              row.original.parent_product_id,
              row.original.child_product_id
            )
          }
        >
          <Trash className="text-muted-foreground/70 mr-2 size-3.5 cursor-pointer" />
        </div>
      );
    },
  },
];

let compositeProductAddColumns: ColumnDef<Data>[] = [
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
    cell: ({ row }) => <div className="ml-3">{row.index + 1}</div>,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => <ProductSkuCell data={row.original} />,
  },

  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "is_composite",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Composite" />
    ),
    cell: ({ row }) => (
      <div className="mx-auto w-20 text-center">
        {row.getValue("is_composite") ? <Check size={20} /> : ""}
      </div>
    ),
  },
  {
    accessorKey: "composite_quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: QuantityCell,
  },
];

export { compositeProductAddColumns, compositeProductGetColumns };
