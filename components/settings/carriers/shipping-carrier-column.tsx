"use client";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Carrier } from "@/types/shipping-carriers";
import { normalizeCarrierName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import { TextTableCell } from "../../core/text-table-cell";
import { ShippingCarrierTableActions } from "./shipping-carrier-table-actions";

export const columns: ColumnDef<Carrier>[] = [
  {
    accessorKey: "#",
    header: () => <div className="text-center">#</div>,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;

      const serial = pageIndex * pageSize + row.index + 1;

      return <div className="text-center text-xs text-slate-400">{serial}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Carrier" />,
    cell: ({ row }) => {
      const type = row.original.type?.toLowerCase();
      const logoSrc =
        type === "royal_mail"
          ? "/logos/carriers/round/clickanddrop.svg"
          : `/logos/carriers/round/${type}.svg`;

      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="size-8">
            <AvatarImage className="object-cover" src={logoSrc} alt={row.original.type} />
            <AvatarFallback className="text-[10px]">
              {row.original.type?.slice(0, 2) ?? "N/A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{row.original.name}</span>
            <span className="text-[10px] capitalize text-slate-500">
              {normalizeCarrierName(row.original.type || "")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "shipperName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipper info" />
    ),
    cell: ({ row }) => {
      const shipperDetails = [
        { label: "Name", value: row?.original?.shipperName },
        { label: "Phone", value: row?.original?.shipperPhone },
        { label: "City", value: row?.original?.city },
        { label: "Country Code", value: row?.original?.countryCode },
        { label: "Postal Code", value: row?.original?.postalCode },
        { label: "State or Province Code", value: row?.original?.stateOrProvinceCode },
      ];

      return (
        <HoverCard openDelay={20} closeDelay={40}>
          <HoverCardTrigger className="cursor-pointer">
            <TextTableCell title={row?.original?.shipperName || ""} />
          </HoverCardTrigger>
          <HoverCardContent className="w-[300px] p-4">
            <div className="space-y-1">
              {shipperDetails.map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-xs">{value || "—"}</p>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "Date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Added" />,
    cell: ({ row }) => (
      <TextTableCell
        title={dayjs(row.original.updatedAt).format("DD MMM YYYY, hh:mm A")}
      />
    ),
  },
  {
    accessorKey: "isDefault",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Default" />,
    cell: ({ row }) => <Switch checked={row.getValue("isDefault")} />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    cell: ({ row }) => (
      <Switch
        checked={row.getValue("isActive")}
        // onCheckedChange={(value) =>
        //   onOrderSyncChange({
        //     order_sync: value,
        //     channel_uid: row.original.id,
        //     company_uid: row.original.company_uuid,
        //   })
        // }
      />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <ShippingCarrierTableActions data={row.original} />,
  },
];
