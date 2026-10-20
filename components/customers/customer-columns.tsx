import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { CircleChevronRight } from "lucide-react";

import type { Customer } from "@/types/customer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DataTableColumnHeader } from "../core/data-table/data-table-column-header";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "#",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => (
      <div className="text-center text-xs text-slate-400">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "buyer_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="w-[250px] 2xl:w-[350px]">
        <span className="block truncate break-words text-sm font-medium capitalize">
          {row?.original?.buyer_name}
        </span>
        <span className="block truncate break-words text-xs capitalize text-slate-600">
          {row?.original?.address1?.toLowerCase()}{" "}
          {row?.original?.address2?.toLowerCase()} - {row?.original?.state?.toLowerCase()}{" "}
          {row?.original?.country ?? ""}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "market_place",
    header: "Marketplace",
    cell: ({ row }) => {
      return (
        <Avatar className="h-5 w-16 rounded-none">
          <AvatarImage
            className="object-contain"
            src={`/logos/marketplaces/${row?.original?.market_place?.toLocaleLowerCase()}.svg`}
            alt={row?.original?.market_place}
          />
          <AvatarFallback>{row?.original?.market_place ?? "N/A"}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Info" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] 2xl:w-[180px]">
        <span className="block truncate break-words text-sm">{row?.original?.email}</span>
        <span className="block truncate break-words text-xs text-slate-600">
          {row?.original?.phone}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "last_order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Order" />,
    cell: ({ row }) => (
      <div>
        <span className="block text-sm">{row?.original?.last_order_id}</span>
        <span className="text-xs text-slate-600">
          {dayjs(row?.original?.createdAt).format("DD MMM YYYY, h:mm a")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "total_number_of_order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Orders" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Products" />
    ),
  },
  {
    accessorKey: "total_spend",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Spent" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`/customers/${row?.original?.buyer_name}?phone=${row?.original?.phone}`}
        >
          <CircleChevronRight className="size-5 cursor-pointer text-gray-400 hover:text-gray-600" />
        </Link>
      );
    },
  },
];
