"use client";

import { EditCarrierType } from "@/atoms/shippingCarrierAtom";
import { ShippingCarrier } from "@/schema/shipping-carrier";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import DefaultAccountSwitch from "./default-account-switch";
import { ShippingCarrierTableActions } from "./shipping-carrier-table-actions";

export let columns: ColumnDef<ShippingCarrier>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-[300px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "is_default",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Default" />,
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          <DefaultAccountSwitch
            isDefault={row.getValue("is_default")}
            uuid={row.original?.uuid}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "credential_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credential Type" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("credential_type")}</div>,
  },
  {
    accessorKey: "shipping_service_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Service" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("shipping_service_name")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ShippingCarrierTableActions data={row.original as EditCarrierType} />
    ),
  },
];
