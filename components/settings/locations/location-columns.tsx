"use client";

import { Location } from "@/schema/location";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import { LocationsTableActions } from "./locations-table-actions";

export let columns: ColumnDef<Location>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="ml-3">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },

  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "country",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "post_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Post Code" />,
    cell: ({ row }) => <div>{row.getValue("post_code")}</div>,
  },
  {
    accessorKey: "Actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: (info) => <LocationsTableActions data={info.row.original} />,
  },
];
