"use client";

import { User } from "@/schema/users";
import { getInitials } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { DataTableColumnHeader } from "../../core/data-table/data-table-column-header";
import MfaStatusColumn from "./mfa-status-column";

type Variant = "default" | "secondary" | "destructive" | "outline";

export let columns: ColumnDef<User>[] = [
  {
    id: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
  },
  {
    id: "Name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const { firstname, lastname } = row?.original ?? {};
      const fullName = `${firstname} ${lastname}`;

      return (
        <div className="flex w-[250px] items-center space-x-2">
          <Avatar className="size-8">
            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
          </Avatar>

          <span className="ml-3">{fullName}</span>

          {!row.original.verified && (
            <Badge
              variant="destructive"
              className="px-1.5 py-px text-[10px] font-semibold"
            >
              Not Verified
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

  {
    accessorKey: "mfa_status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MFA" />,
    cell: ({ row }) => <MfaStatusColumn data={row.original} />,
  },

  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },

  {
    accessorKey: "features",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Features" />,
    cell: ({ row }) =>
      ["owner", "parent"]?.includes(row.original.type) ? (
        <Badge variant="default" className="mb-2 mr-2">
          All Permissions
        </Badge>
      ) : row.original?.features?.length > 0 ? (
        row.original.features.map((feature) => {
          let variant: Variant = "default";

          switch (feature.name) {
            case "Open Order Report":
              variant = "default";
              break;
            case "Channels":
              variant = "destructive";
              break;
            case "Locations":
              variant = "outline";
              break;
            case "Carriers":
              variant = "secondary";
              break;
            case "Sales Report":
              variant = "destructive";
              break;
            case "Stock Report":
              variant = "outline";
              break;
            case "Products":
              variant = "outline";
              break;
            default:
              variant = "default";
              break;
          }

          return (
            <Badge className="mb-2 mr-2" variant={variant}>
              {feature.name}
            </Badge>
          );
        })
      ) : (
        <Badge className="mb-2 mr-2" variant="destructive">
          No Features Assigned Yet
        </Badge>
      ),
  },

  // {
  //   id: "actions",
  //   cell: (info) => <UserTableActions data={info.row.original} />,
  // },
];
