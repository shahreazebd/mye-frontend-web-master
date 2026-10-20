import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare, Copy } from "lucide-react";

import useSkuCopy from "@/hooks/custom/useSkuCopy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";

export const columns: ColumnDef<any>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },

  {
    accessorKey: "source",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Source" />,
    cell: (info) => {
      return (
        <div>
          <Avatar className="h-10 w-16 rounded-none">
            <AvatarImage
              className="object-contain"
              src={`/logos/marketplaces/${info.row.original?.channel_type}.svg`}
              alt={info.row.original?.souce}
            />
            <AvatarFallback>{info.row.original?.souce ?? "N/A"}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },

  {
    accessorKey: "channel_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sub Source" />,
  },

  {
    accessorKey: "local_sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local Product SKU" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { handleCopy, isClicked } = useSkuCopy();

      return (
        <div className="flex w-max items-center justify-between">
          <div className="w-full text-left">{row?.original?.local_sku} </div>

          {isClicked ? (
            <CheckSquare className="ml-2 size-4 cursor-pointer text-green-600 transition ease-in-out" />
          ) : (
            <Copy
              onClick={() => handleCopy(row?.original?.local_sku)}
              className="ml-2 size-4 cursor-pointer transition ease-in-out"
            />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "total_number_of_order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Number of order" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] text-center">{row.getValue("total_number_of_order")}</div>
    ),
  },

  {
    accessorKey: "number_of_remote_sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remote Sku Order Count" />
    ),
    cell: ({ row }) => (
      <div className="w-[140px] text-center">{row.getValue("number_of_remote_sku")}</div>
    ),
  },

  {
    accessorKey: "total_selling_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Quantity Sell" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-center">{row.getValue("total_selling_quantity")}</div>
    ),
  },
  {
    accessorKey: "return_quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Returned" />,
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Sell" />,
    cell: ({ row }) => (
      <div className="mx-auto w-[100px]">
        {Number(row.original.total_price).toFixed(3)}
      </div>
    ),
  },
];
