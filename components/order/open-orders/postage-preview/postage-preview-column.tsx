"use client";

import { MappedOpenOrder } from "@/schema/open-order";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";
import { PostagePreviewActionCell } from "./postage-preview-action-cell";

export const postagePreviewColumns: ColumnDef<MappedOpenOrder>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <>{row?.index + 1}</>,
    enableSorting: false,
  },
  {
    id: "select",
    header: ({ table }) => {
      const rows = table.getRowModel().rows;

      // Find which rows are valid (no errors)
      const validRows = rows.filter((row) => {
        const rowErrors = (table.options.meta as any)?.errors?.[row.index];
        return !(rowErrors && Object.values(rowErrors).some(Boolean));
      });

      const selectedValidRows = validRows.filter((row) => row.getIsSelected());

      const allValidSelected =
        validRows.length > 0 && selectedValidRows.length === validRows.length;

      return (
        <Checkbox
          checked={allValidSelected}
          onCheckedChange={(value) => {
            if (value) {
              // ✅ Select only rows WITHOUT errors
              validRows.forEach((row) => row.toggleSelected(true));
            } else {
              // ✅ Deselect only the valid rows
              validRows.forEach((row) => row.toggleSelected(false));
            }
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row, table }) => {
      const rowErrors = (table.options.meta as any)?.errors?.[row.index];
      const hasError = rowErrors && Object.values(rowErrors).some(Boolean);

      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Checkbox
                  checked={row.getIsSelected()}
                  disabled={hasError}
                  onCheckedChange={(value) => {
                    if (hasError) return;
                    row.toggleSelected(!!value);
                  }}
                  aria-label="Select row"
                  className={cn(
                    "translate-y-[2px]",
                    hasError && "cursor-not-allowed opacity-50"
                  )}
                />
              </span>
            </TooltipTrigger>
            {hasError && (
              <TooltipContent
                side="top"
                className="rounded bg-red-600 px-2 py-1 text-xs text-white"
              >
                This row has validation errors
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "shipping_address.buyer_name",
    accessorKey: "shipping_address.buyer_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Buyer Name" />,
  },

  {
    accessorKey: "channel_order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
  },

  {
    id: "shipping_address.address1",
    accessorKey: "shipping_address.address1",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address 1" />,
  },

  {
    id: "shipping_address.address2",
    accessorKey: "shipping_address.address2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address 2" />,
  },
  {
    id: "shipping_address.country",
    accessorKey: "shipping_address.country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  },
  {
    id: "shipping_address.city",
    accessorKey: "shipping_address.city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
  },
  {
    id: "modified_sku",
    accessorKey: "modified_sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
  },
  {
    id: "total_weight",
    accessorKey: "total_weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Weight (gm)" />
    ),
    meta: {
      type: "number",
    },
  },

  {
    id: "shipping_address.post_code",
    accessorKey: "shipping_address.post_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Post Code" />,
  },
  {
    id: "Action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: PostagePreviewActionCell,
  },
];
