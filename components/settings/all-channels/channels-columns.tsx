"use client";

import { Channel } from "@/schema/channel";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import AllChannelActions from "./all-channel-actions";
import { onInventorySyncChange, onOrderSyncChange } from "./all-channels-wrapper";

export const columns: ColumnDef<Channel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="w-auto">
          <span className="block">{row.getValue("name")}</span>
          <span className="text-xs text-gray-500">
            {dayjs(row.original.created_at).fromNow()}
          </span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "country",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  //   cell: ({ row }) => <div className="w-[180px] ">{row.getValue("country")}</div>,
  // },
  {
    accessorKey: "channel_max_stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max Stock" />,
    cell: ({ row }) => <div>{row.getValue("channel_max_stock")}</div>,
  },
  {
    accessorKey: "channel_state",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <>
        {row.original.is_authorized ? (
          <div>
            {" "}
            <Badge variant="outline">Authorized</Badge>
          </div>
        ) : (
          <div>
            <Badge variant="destructive">Unauthorized</Badge>
          </div>
        )}
      </>
    ),
  },
  {
    accessorKey: "inventory_sync",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory Sync" />
    ),
    cell: ({ row }) => (
      <AlertDialogTrigger asChild>
        <div className="flex items-center">
          <Switch
            checked={row.getValue("inventory_sync")}
            onCheckedChange={(value) =>
              onInventorySyncChange({
                inventory_sync: value,
                channel_uid: row.original.channel_uid,
                company_uid: row.original.company_uid,
              })
            }
          />
        </div>
      </AlertDialogTrigger>
    ),
  },
  {
    accessorKey: "order_sync",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Sync" />,
    cell: ({ row }) => (
      <AlertDialogTrigger asChild>
        <div className="flex items-center">
          <Switch
            checked={row.getValue("order_sync")}
            onCheckedChange={(value) =>
              onOrderSyncChange({
                order_sync: value,
                channel_uid: row.original.channel_uid,
                company_uid: row.original.company_uid,
              })
            }
          />
        </div>
      </AlertDialogTrigger>
    ),
  },

  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <AllChannelActions row={row} />,
  },
];
