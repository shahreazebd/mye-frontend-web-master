"use client";

// import { OpenOrder } from "@/schema/open-order";
import { truncateName } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import type { DispatchOrders } from "@/types/dispatched-order";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

import ActionColumn from "./action-column";
import DispatchedBy from "./dispatched-by";

export const columns: ColumnDef<DispatchOrders>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: "#",
    cell: ({ row }) => <>{row?.index + 1}</>,
  },

  {
    accessorKey: "channel_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Channel Info" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-auto">
          <section className="flex h-full min-w-[280px] items-center gap-3 border-r">
            <Avatar className="size-14">
              <AvatarImage
                src={`/logos/marketplaces/round/${row?.original?.channel_type
                  ?.trim()
                  ?.toLowerCase()}.svg`}
              />
              <AvatarFallback>EB</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <h6 className="text-sm">{truncateName(row?.original?.channel_name, 30)}</h6>
              <small className="text-xs text-slate-500">
                {dayjs(row?.original?.time).format("DD MMMM YYYY, h:mm A")}
              </small>
            </div>
          </section>
        </div>
      );
    },
  },

  {
    accessorKey: "order_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Orders" />
    ),
  },
  {
    accessorKey: "order_counts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dispatched By" />
    ),
    cell: DispatchedBy,
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ActionColumn,
  },
];
